// Controls the dropdown for the official gov header banner
const GOV_BANNER = document.querySelector("#gov-banner")
const GOV_BANNER_EXPAND = document.querySelector(".gov-banner-expand")
function toggleGovBanner(active) {
    if (active) {
        document.querySelector(".gov-banner-panel").classList.remove("active")
        document.querySelector(".gov-banner-expand").classList.remove("active")
    } else {
        document.querySelector(".gov-banner-panel").classList.add("active")
        document.querySelector(".gov-banner-expand").classList.add("active")
    }
}
let banner_scroll_px, scroll_banner_threshold_px;
function createScrollListener() {
    if (!GOV_BANNER) return
    // Create listener to hide the gov banner on scroll
    // Update to the new page size
    // Get 15% of the page height
    banner_scroll_px = document.body.clientHeight * 0.15
    // Set a minimum threshold of 25 pixels
    scroll_banner_threshold_px = 20 //banner_scroll_px < 25 ? 25 : banner_scroll_px
    return document.addEventListener("scroll", () => {
        if (document.body.scrollTop > scroll_banner_threshold_px || document.documentElement.scrollTop > scroll_banner_threshold_px) {
            toggleGovBanner(true)
            GOV_BANNER.classList.add("slide-out")
        } else
            GOV_BANNER.classList.remove("slide-out")
    })
}
// When the user scrolls, hide the Gov Banner at 15% the total scroll height
let govBannerScrollEvent = createScrollListener()

// Let the user click anywhere inside the banner to expand
GOV_BANNER && GOV_BANNER.addEventListener("click", (e)=> {
    e.preventDefault()
    // Remove the listener so the expansion does not get hidden
    removeEventListener("scroll", govBannerScrollEvent)
    toggleGovBanner(GOV_BANNER_EXPAND.classList.contains("active"))
    govBannerScrollEvent = createScrollListener()
})
// Enable the enter key on tab + enter of the gov message
GOV_BANNER_EXPAND && GOV_BANNER_EXPAND.addEventListener("keypress", (e)=> {
    if (e.key === "Enter")
        e.target.click()
})

// Show the banner on page load
window.addEventListener("load",()=> {
    GOV_BANNER && GOV_BANNER.classList.remove("hide")
})