function generateId() {
    function generateRandomString(len, charSet) {
        charSet = charSet || "abcdefghijklmnopqrstuvwxyz0123456789";
        var randomString = "";
        var i = 0;
        while (i < len) {
            let randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
            i++;
        }
        return randomString;
    }
    return "el" + generateRandomString(5, null).toLowerCase();
}
// function getAttrsWithId(id) {
//     return {
//         "ng-class": `sitecontent['${id}']['classes']`,
//         "ng-style": `sitecontent['${id}']['style']`,
//         "ng-attr-modelid": `{{sitecontent['${id}']['modelid']}}`
//     }
// }


export function addAttrs() {
    const hiddenHTML = document.querySelector('.hiddenHTML')
    const nodes = hiddenHTML.querySelectorAll('*')
    
    let generatedSpans = []

    nodes.forEach(node => {
        let id = null
        let childNodes = node.childNodes
        const textTags = /\bDIV\b|\bP\b|\bSPAN\b|\bH1\b|\bH2\b|\bH3\b|\bH4\b|\bH5\b|\bH6\b|\bB\b|\bSTRONG\b|\bBLOQUOTE\b|\bI\b|\bLABEL\b|\bQ\b|\bS\b/

        let element = {}
        // let text = ""
        // let classes = ""
        // let style = {}
        // let src = ""

        //если айди есть, ставим его, иначе генерируем
        if (!node.hasAttribute("elementid")) {
            id = generateId()
            node.setAttribute("elementid", id)
        } else {
            id = node.getAttribute('elementid')
        }

        //оборачиваем в span текстовые узлы
        for (let i = 0; i < childNodes.length; i++) {
            console.log(childNodes[i]);
            if (childNodes[i].nodeType == 3) {
                if (childNodes[i].textContent.trim() != '' && node == childNodes[i].parentNode && node.children.length > 0) {
                    const span = document.createElement('span');
                    childNodes[i].data.trim()
                    childNodes[i].after(span);


                    span.appendChild(childNodes[i]);
                    generatedSpans.push(span)
                }
            }
        }
        node.setAttribute("ng-class", `sitecontent['${id}']['classes']`)
        node.setAttribute("ng-style", `sitecontent['${id}']['style']`)
        node.setAttribute("ng-attr-modelid", `{{sitecontent['${id}']['modelid']}}`)

        element = {
            id: {
                "classes": "",
                "style": {}
            }
        }
        console.log(element);

        console.log(node.textContent);

        if (node.tagName === 'A') {
            node.setAttribute("ng-href", `{{sitecontent['${id}']['href']}}`)
            node.setAttribute("ng-attr-target", `{{sitecontent['${id}']['target']}}`)
        }
        if (node.tagName === 'IMG') {
            node.setAttribute("ng-src", `{{sitecontent['${id}']['src']}}`)
        }

        //ставим атрибут, если нет потомков (node.children.length == 0) и если есть текстовый узел
        if (node.tagName.match(textTags) && node.children.length > 0) {
            node.setAttribute("ng-model", `sitecontent['${id}']['text']`)
        }
    })


    //так как спаны, которым оборачиваем текстовые узлы, не присутствуют в nodes, нужно их проходить отдельно
    generatedSpans.forEach(span => {
        let id = generateId()

        span.setAttribute("ng-class", `sitecontent['${id}']['classes']`)
        span.setAttribute("ng-style", `sitecontent['${id}']['style']`)
        span.setAttribute("ng-attr-modelid", `{{sitecontent['${id}']['modelid']}}`)
        span.setAttribute("ng-model", `sitecontent['${id}']['text']`)
    })

    return hiddenHTML.innerHTML
}