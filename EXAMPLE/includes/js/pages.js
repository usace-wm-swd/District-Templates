// Loads content of another html page as a replacement for ielems
// Allows dynamic insertion of css styles

window.addEventListener("load", () => {
    document.querySelectorAll("[data-template-url]").forEach(async (elem) =>  {
        const template_url = elem.getAttribute("data-template-url");
        elem.innerHTML = await loadContent(template_url)
    })
})
async function loadContent(url) {
    return await fetch(url + "?_=1")
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                return `<div>Failed to load page. Status: ${response.status} - ${response.statusText}</div>`
            }
        })
        .then((html) => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");
            let javaScript = doc.querySelectorAll('script');
            javaScript.forEach((script) => {
                // NOTICE: There's a chance one of these will not get loaded in when it needs to
                // Ignore any template script tags
                try {
                    let scriptTag = document.createElement("script");
                    if (script?.src)
                        scriptTag.src = script.src;
                    scriptTag.textContent = script.textContent;
                    document.head.appendChild(scriptTag);
                } catch(err) {
                    console.warn(`Failed to load ${scriptTag.src}`)
                }
            });
            let styleSheets = doc.querySelectorAll('link[rel="stylesheet"]');
            styleSheets.forEach((sheet) => {
                try {
                    let styleSheet = document.createElement("link");
                    styleSheet.rel = "stylesheet";
                    styleSheet.href = sheet.href;
                    document.head.appendChild(styleSheet);
                } catch(err) {
                    console.warn(`Failed to load ${styleSheet?.href}`)
                }
            });
            return new XMLSerializer().serializeToString(doc);
        })
        .catch((error) => {
            console.error(error)
            return `<div style="margin: 10px; color: red; font-size: 1.1em;">${elem}</div>`
        });
}

function replaceRemove(elem) {
    // blanks out the inner html and removes and element from the DOM
    elem.innerHTML = ""
    elem.remove()
}

