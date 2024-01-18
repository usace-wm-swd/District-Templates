

const SEARCH_ELEM = document.querySelector("#headerSearch")
const SEARCH_BTN = document.querySelector("#searchButton")
const SEARCH_CONT = document.querySelector(".search-bar")

// Replace this string with the string used by your district division page
// Alternatively create your own site index by registering with search.gov 
// And adding your water control site to the domains to index, then use that affiliate text here
const AFFILIATE_TXT = "swt-wc"
// Run when the DOM is done loading
window.addEventListener("load", () => {
    // This version of the search uses search.gov for the backend
    if (SEARCH_BTN) {
        SEARCH_BTN.addEventListener("click", (e) => {
            const input_str = SEARCH_ELEM.value;
            if (input_str.length === 0) {
                let restore_str = SEARCH_ELEM.placeholder
                SEARCH_ELEM.placeholder = "Enter a Value to Search!"
                SEARCH_ELEM.style.border = "1px solid red"
                SEARCH_ELEM.blur();
                setTimeout(() => {
                    SEARCH_ELEM.placeholder = restore_str
                    SEARCH_ELEM.style.border = "1px solid black"
                }, 5000)
                return
            }
            window.open(`https://search.usa.gov/search?affiliate=${AFFILIATE_TXT}&query=${input_str}`);
        })
    }
    SEARCH_ELEM.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            SEARCH_BTN.click()
        }
    });
})