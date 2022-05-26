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


function addClasses(node, id, element) {
    let classes = Array.from(node.classList).join(' ')

    if (classes == '') {
        classes = null
    }
    element[id]["classes"] = classes
    node.setAttribute("ng-class", `sitecontent['${id}']['classes']`)

}

function addStyles(node, id, element) {
    let style = node.getAttribute("style")
    let properties = {}


    if (style !== null && style !== '') {

        const styleRegex = /([\w-]*)\s*:\s*([^;]*)/g;

        for (let i = 0; i < style.split(';').length; i++) {
            const match = styleRegex.exec(style)
            properties[match[1]] = match[2].trim();
        }
    }
    element[id]["style"] = properties
    node.setAttribute("ng-style", `sitecontent['${id}']['style']`)
    node.removeAttribute('style')

}

function addNodeId(node, id, element) {
    let nodeId = node.getAttribute("id")

    if (nodeId == '') {
        nodeId = null
    }

    element[id]["modelid"] = nodeId
    node.setAttribute("ng-attr-modelid", `{{sitecontent['${id}']['modelid']}}`)
}


export function addAttrs() {
    const hiddenHTML = document.querySelector('.hiddenHTML')
    const nodes = hiddenHTML.querySelectorAll('*')

    let generatedSpans = []

    nodes.forEach(node => {
        let id = null
        let childNodes = node.childNodes
        // const textTags = /\bDIV\b|\bP\b|\bSPAN\b|\bH1\b|\bH2\b|\bH3\b|\bH4\b|\bH5\b|\bH6\b|\bB\b|\bSTRONG\b|\bBLOQUOTE\b|\bI\b|\bLABEL\b|\bQ\b|\bS\b/

        const element = {}


        //если айди есть, ставим его, иначе генерируем
        if (!node.hasAttribute("elementid")) {
            id = generateId()
            node.setAttribute("elementid", id)
        } else {
            id = node.getAttribute('elementid')
        }

        element[id] = {}


        //задаем классы
        addClasses(node, id, element)

        //задаем стили
        addStyles(node, id, element)

        //задаем айди узла
        addNodeId(node, id, element)

        //оборачиваем в span текстовые узлы
        for (let i = 0; i < childNodes.length; i++) {

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

        console.log(element);


        if (node.tagName === 'A') {

            node.setAttribute("ng-href", `{{sitecontent['${id}']['href']}}`)
            node.setAttribute("ng-attr-target", `{{sitecontent['${id}']['target']}}`)
        }
        if (node.tagName === 'IMG') {
            // const src =  node.getAttribute("src")
            node.setAttribute("ng-src", `{{sitecontent['${id}']['src']}}`)
        }

        //ставим атрибут, если нет потомков и если есть текстовый узел
        if (node.children.length == 0 && node.childNodes.length > 0) {
            // console.log(node.textContent, node.childNodes);
            node.setAttribute("ng-model", `sitecontent['${id}']['text']`)

            element[id]["text"] = node.textContent
            node.innerHTML = ''
        }
    })


    //так как спаны, которым оборачиваем текстовые узлы, не присутствуют в nodes, нужно их проходить отдельно

    // !!тоже надо добавлять в объект, проверить все теги
    generatedSpans.forEach(span => {
        let id = generateId()
        let element = {}
        element[id] = {}

        //классы можно не добавлять
        // span.setAttribute("ng-class", `sitecontent['${id}']['classes']`)
        // span.setAttribute("ng-style", `sitecontent['${id}']['style']`)
        // span.setAttribute("ng-attr-modelid", `{{sitecontent['${id}']['modelid']}}`)
        span.setAttribute("ng-model", `sitecontent['${id}']['text']`)
        element[id]["text"] = span.textContent
        span.innerHTML = ''

        console.log(element);
    })

    return hiddenHTML.innerHTML
}