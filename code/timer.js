/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({
                                 providerRes,
                                 parserRes
                             } = {}) {
    // 引入 AIScheduleTools
    await loadTool('AIScheduleTools')

    // 询问用户开学时间
    const userInputStartSemester = await AISchedulePrompt({
        titleText: '开始时间', // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
        tipText: '请输入本课程表的开始时间，格式为 yyyy-mm-dd', // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，也可以不传就不显示
        defaultText: '2025-2-24', // 文字输入框的默认内容，不传会显示版本号，所以空内容要传个''
        validator: value => { // 校验函数，如果结果不符预期就返回字符串，会显示在屏幕上，符合就返回false
            const regExp = /^\d{4}-\d{1,2}-\d{1,2}$/ // 日期格式正则表达式 yyyy-mm-dd

            if (regExp.test(value))
                return false // 日期格式正确

            return '输入格式应为：yyyy-mm-dd' // 日期格式错误
        }
    })
    const milliseconds = new Date(userInputStartSemester + ' 08:00:00').getTime() // 获取开学时间 13 位时间戳

    // 询问用户本学期总周数
    const userInputTotalWeek = await AISchedulePrompt({
        titleText: '总周数', // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
        tipText: '请输入本学期总周数，格式为阿拉伯数字', // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，也可以不传就不显示
        defaultText: '17', // 文字输入框的默认内容，不传会显示版本号，所以空内容要传个''
        validator: value => { // 校验函数，如果结果不符预期就返回字符串，会显示在屏幕上，符合就返回false
            if (isNaN(Number(value, 10))) {
                return '格式应为纯阿拉伯数字'
            } else if (value < 1 || value > 30) {
                return '总周数的范围应为：[1, 30]之间的整数'
            }

            return false
        }
    })

    // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
    return {
        totalWeek: parseInt(userInputTotalWeek), // 总周数：[1, 30]之间的整数
        startSemester: milliseconds + '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: true, // 是否显示周末
        forenoon: 5, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 4, // 晚间课程节数：[0, 10]之间的整数
        sections: [
            {
                section: 1, // 节次：[1, 30]之间的整数
                startTime: '08:00', // 开始时间：参照这个标准格式5位长度字符串
                endTime: '08:45', // 结束时间：同上
            },
            {
                section: 2,
                startTime: '08:50',
                endTime: '09:35',
            },
            {
                section: 3,
                startTime: '09:50',
                endTime: '10:35',
            },
            {
                section: 4,
                startTime: '10:40',
                endTime: '11:25',
            },
            {
                section: 5,
                startTime: '11:30',
                endTime: '12:15',
            },
            {
                section: 6,
                startTime: '13:30',
                endTime: '14:15',
            },
            {
                section: 7,
                startTime: '14:20',
                endTime: '15:05',
            },
            {
                section: 8,
                startTime: '15:20',
                endTime: '16:05',
            },
            {
                section: 9,
                startTime: '16:10',
                endTime: '16:55',
            },
            {
                section: 10,
                startTime: '18:30',
                endTime: '19:15',
            },
            {
                section: 11,
                startTime: '19:20',
                endTime: '20:05',
            },
            {
                section: 12,
                startTime: '20:10',
                endTime: '20:55',
            },
            {
                section: 13,
                startTime: '21:00',
                endTime: '21:45',
            }], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
    }
}