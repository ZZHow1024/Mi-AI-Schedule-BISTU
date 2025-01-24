function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) { // 函数名不要动
    const cards = dom.getElementsByTagName("tr")
    let res = ''

    for (let i = 1; i < cards.length; i++) {
        for (let j = 1; j < cards[i].children.length; j++) {
            if (cards[i].children[j].innerText === '')
                continue

            for (let k = 0; k < cards[i].children[j].children.length; k++) {
                res += cards[i].children[j].attributes[1].value + '\n' + cards[i].children[j].children[k].innerText + '&#&'
            }
        }
    }

    return res
}