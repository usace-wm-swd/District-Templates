window.addEventListener("load", () => {
    document.querySelectorAll("[data-template]").forEach(e => {
        const dataValue = e.getAttribute("data-template");
        const fileType = dataValue.split('.').pop();

        if (fileType === 'html') {
            // For HTML files
            fetch(dataValue)
                .then(response => response.text())
                .then(html => {
                    e.innerHTML = html;
                })
                .catch(error => {
                    console.error(`Error loading HTML template from ${dataValue}:`, error);
                    e.innerHTML = `<div style="margin: 10px; color: red; font-size: 1.1em;">${error}</div>`
                });
        } else if (fileType === 'css') {
            // For CSS files
            const link = document.createElement('link');
            link.href = dataValue;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        } else if (fileType === 'js') {
            // For JavaScript files
            const script = document.createElement('script');
            script.src = dataValue;
            document.body.appendChild(script);
        }
    });
});
