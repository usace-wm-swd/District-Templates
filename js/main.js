import Template from "./templates.js"

const template = new Template()

template.load("./templates/header.html", document.querySelector("header"))
template.load("./templates/breadcrumbs.html", document.querySelector("breadcrumbs"))
template.load("./templates/sidebar.html", document.querySelector("aside"))
template.load("./templates/footer.html", document.querySelector("footer"))