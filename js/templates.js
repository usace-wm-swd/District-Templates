// Handles loading templates in and out of the DOM without the use of JQuery
// Requires browsers that support fetch


export default class Template {
    // Attempts to return the text of a provided file URL
    // If this URL is not from your domain on the same port you will almost certainly experience CORS errors. 
    // Use JQuery if you need polyfill
    async load(url, elem) {
        return fetch(url).then(res => {
            if (res.ok) return res.text()
            else {
                alert(`Unable to load Template Status: ${res.status == 404 ? "File not Found 404" : res.statusText}`)
                return `Unable to Find Template. URL: ${url}`
            }
        }).then(txt => {
            console.log(elem)
            // If an element is provided inject the HTML there
            if (elem) elem.innerHTML = txt
            // Otherwise return the text
            else return txt
        })
    }
}