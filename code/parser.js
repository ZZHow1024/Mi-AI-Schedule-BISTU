function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的 HTML
    //可使用正则匹配
    //可使用解析 DOM 匹配，工具内置了$，跟 jquery 使用方法一样，直接用就可以了，参考：https://cnodejs.org/topic/5203a71844e76d216a727d2e
    let result = []
    const courses = html.split('&#&')
    for (let i = 0; i < courses.length; i++) {
        if (!courses[i].includes('\n'))
            continue

        const details = courses[i].split('\n') // [0]：星期。[1]：课程名称。[2]：教师名称。[3]：周数,周数,...,周数,节次,地点
        const time = details[3].split(',') // 周数,周数,...,周数,节次,地点

        let weeks = []
        let sections = []

        let index = 0
        // 取周数
        while (time[index].includes('周')) {
            const week = time[index++].split('周')[0]

            if (week.includes('-')) { // 格式：x-x周
                const weekStart = parseInt(week.split('-')[0])
                const weekEnd = parseInt(week.split('-')[1])
                for (let j = weekStart; j <= weekEnd; j++) {
                    weeks.push(j)
                }
            } else { // 格式：x周
                weeks.push(parseInt(week))
            }
        }

        // 取节次
        const section = time[index++]
        if (section.includes('-')) { // 格式：第x节-第x节
            const sectionStart = parseInt(section.split('-')[0].replace('第', '').replace('节', ''))
            const sectionEnd = parseInt(section.split('-')[1].replace('第', '').replace('节', ''))
            for (let j = sectionStart; j <= sectionEnd; j++) {
                sections.push(j)
            }
        } else { // 格式：第x节
            sections.push(parseInt(section.replace('第', '').replace('节', '')))
        }

        // 取地点
        const position = time[index]

        result.push({
            name: details[1], // 课程名称
            position, // 上课地点
            teacher: details[2], // 教师名称
            weeks, // 周数
            day: details[0], // 星期
            sections, // 节次
        })
    }

    // 去除重复课程
    return result.reduce((unique, o) => {
        if (!unique.some(obj => JSON.stringify(obj) === JSON.stringify(o))) {
            unique.push(o);
        }
        return unique
    }, [])
}