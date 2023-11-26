window.onload = function () {
    var icon = document.getElementById("Button");

    // Toggle theme when the button is clicked
    icon.onclick = function () {
        document.body.classList.toggle("change-theme");

        var isThemeChanged = document.body.classList.contains("change-theme");
        localStorage.setItem("theme", isThemeChanged ? "change-theme" : "");
    };

    // Check for the theme in local storage when the page loads
    var currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
        document.body.classList.add(currentTheme);
    }
};