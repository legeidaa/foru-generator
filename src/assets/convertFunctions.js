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

function getAttrsWithId(id) {
    return {
        "ng-class": `sitecontent['${id}']['classes']`,
        "ng-style": `sitecontent['${id}']['style']`,
        "ng-attr-modelid": `{{sitecontent['${id}']['modelid']}}`
    }
}

export function addAttrs() {
    const hiddenHTML = document.querySelector('.hiddenHTML')
    const nodes = hiddenHTML.querySelectorAll('*')  

    nodes.forEach(node => {
        let id = null

        //если айди есть, ставим его, иначе генерируем
        if (!node.hasAttribute("elementid")) {
            id = generateId()
            // console.log(node, id);
            node.setAttribute("elementid", id)
        } else {
            id = node.getAttribute('elementid')
        }

        const attributes = getAttrsWithId(id)

        for (const key in attributes) {
            if (!node.hasAttribute(key)) {
                // console.log(key, attributes.key);
                node.setAttribute(key, attributes[key])
            }
        }

        if (node.tagName === 'A') {
            node.setAttribute("ng-href", `{{sitecontent['${id}']['href']}}`)
            node.setAttribute("ng-attr-target", `{{sitecontent['${id}']['target']}}`)
        }

        if (node.tagName === 'IMG') {
            node.setAttribute("ng-src", `{{sitecontent['${id}']['src']}}`)
        }

        const regexp = /DIV|P|SPAN|H1|H2|H3|H4|H5|H6|B|STRONG|BLOQUOTE|I|LABEL|Q|S|||||||||||/

        if (node.tagName.match(regexp)){
            console.log(node);
        }
    })

    return hiddenHTML.innerHTML
}

