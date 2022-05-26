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


function addClasses(node, id, element) {
    
    let classes = Array.from(node.classList).join(' ')

    if (classes == '') {
        classes = ''
    }
    element["classes"] = classes
    node.setAttribute("ng-class", `sitecontent['${id}']['classes']`)

}

function addStyle(node, id, element) {
    let style = node.getAttribute("style")
    let properties = {}


    if (style !== null && style !== '') {

        const styleRegex = /([\w-]*)\s*:\s*([^;]*)/g;

        for (let i = 0; i < style.split(';').length; i++) {
            const match = styleRegex.exec(style)
            properties[match[1]] = match[2].trim();
        }
    }
    element["style"] = properties
    node.setAttribute("ng-style", `sitecontent['${id}']['style']`)
    // node.removeAttribute('style')

}

function addModelId(node, id, element) {
    let nodeId = node.getAttribute("id")

    if (nodeId != null) {
        element["modelid"] = nodeId
    }

    node.setAttribute("ng-attr-modelid", `{{sitecontent['${id}']['modelid']}}`)
}

function addModel(node, id, element) {
    if (node.children.length == 0 && node.childNodes.length > 0) {
        node.setAttribute("ng-model", `sitecontent['${id}']['text']`)

        let textContent = node.textContent
        textContent = textContent.replace(/\n/g, '').replace(/\s+/g, ' ')
        element["text"] = textContent
        node.innerHTML = ''
    }
}


export function addAttrs() {
    const hiddenHTML = document.querySelector('.hiddenHTML')
    const nodes = hiddenHTML.querySelectorAll('*')
    const elements = {}

    let generatedTextWrappers = []

    nodes.forEach(node => {
        let id = null
        let childNodes = node.childNodes
        // const textTags = /\bDIV\b|\bP\b|\bSPAN\b|\bH1\b|\bH2\b|\bH3\b|\bH4\b|\bH5\b|\bH6\b|\bB\b|\bSTRONG\b|\bBLOQUOTE\b|\bI\b|\bLABEL\b|\bQ\b|\bS\b/
    
        //если айди есть, ставим его, иначе генерируем
        if (!node.hasAttribute("elementid")) {
            id = generateId()
            node.setAttribute("elementid", id)
        } else {
            id = node.getAttribute('elementid')
        }
        elements[id] = {}
        const element =  elements[id]

        //задаем классы
        addClasses(node, id, element)

        //задаем стили
        addStyle(node, id, element)

        //задаем айди узла
        addModelId(node, id, element)

        //текстовый узел
        addModel(node, id, element)

        //оборачиваем в div текстовые узлы
        for (let i = 0; i < childNodes.length; i++) {

            if (childNodes[i].nodeType == 3) {
                if (childNodes[i].textContent.trim() != '' && node == childNodes[i].parentNode && node.children.length > 0) {
                    const div = document.createElement('div');
                    childNodes[i].data.trim()
                    childNodes[i].after(div);


                    div.appendChild(childNodes[i]);
                    generatedTextWrappers.push(div)
                }
            }
        }

        if (node.tagName === 'A') {
            const href = node.getAttribute('href')
            let target = node.getAttribute('target')

            if (!href) {
                alert("У ссылки (тега а) отсутствует атрибут href")
            } else {
                node.setAttribute("ng-href", `{{sitecontent['${id}']['href']}}`)
                element["href"] = href
                node.removeAttribute('href')
            }

            if (!target) {
                target = '_self'
            }
            node.setAttribute("ng-attr-target", `{{sitecontent['${id}']['target']}}`)
            element["target"] = target
            node.removeAttribute('target')
        }

        if (node.tagName === 'IMG') {
            const src = node.getAttribute("src")


            if (!src) {
                alert("У изображения (тега img) отсутствует атрибут src")
            } else {
                node.setAttribute("ng-src", `{{sitecontent['${id}']['src']}}`)
                element["src"] = src
                node.removeAttribute('src')
            }
        }

        console.log(node.tagName, element);
        // elements.push(element)
    })


    //так как спаны, которым оборачиваем текстовые узлы, не присутствуют в nodes, нужно их проходить отдельно

    // !!тоже надо добавлять в объект, проверить все теги
    generatedTextWrappers.forEach(div => {
        let id = generateId()
        elements[id] = {}
        const element =  elements[id]

        addClasses(div, id, element)

        addStyle(div, id, element)

        addModel(div, id, element)

        console.log(div.tagName, element);
        // elements.push(element)
    })

    console.log(elements);
    return hiddenHTML.innerHTML
}