document.addEventListener('DOMContentLoaded', 
function () {
  var coll_mob = document.getElementsByClassName("collapsible-mobile");
  for (let col_m_idx = 0; col_m_idx < coll_mob.length; col_m_idx++) {
    coll_mob[col_m_idx].addEventListener("click", function (e) {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      
      console.log(content);
      if (content.style.display == "none") {
        content.style.display = "block";
      } else {
        content.style.display = "none";
      }
    });
  }
}, false);

// Mobile Burger Bar
function openNav() {
  var mobileNav = document.getElementById("mobileNav");
  mobileNav.classList.add("open");
  var child = document.getElementById("mobileNavContent");
  var open = document.getElementById("burgerBtn");
  open.style.display = "none";
  var child = document.getElementById("overlay-content");
}

// Mobile Search
function toggleSearch() {
  var mobileNav = document.getElementById("main-search");
  if(mobileNav.classList.contains("search-open")) {
    mobileNav.classList.remove("search-open");
  } else {
    mobileNav.classList.add("search-open");
  }
  var button = document.getElementById("search-form-trigger");
  if(button.classList.contains("search-open")) {
    button.classList.remove("search-open");
  } else {
    button.classList.add("search-open");
  }
}

function closeNav() {
  var myNav = document.getElementById("mobileNav");
  mobileNav.classList.remove("open");
  var open = document.getElementById("burgerBtn");
  open.style.display = null;
}
