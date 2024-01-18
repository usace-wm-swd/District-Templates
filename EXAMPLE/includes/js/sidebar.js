const mobilejumpmenu = document.getElementById("mobilejumpmenu")

if (mobilejumpmenu)
    mobilejumpmenu.addEventListener("change", function () {
        let url = this.value
        window.location = url
    })
