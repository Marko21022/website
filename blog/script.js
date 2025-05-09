document.addEventListener("DOMContentLoaded", () => {
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    // Expand search on click
    searchBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevents it from closing immediately
        searchContainer.classList.toggle("active");
        searchInput.focus();
    });

    // Close search when clicking outside
    document.addEventListener("click", (e) => {
        if (!searchContainer.contains(e.target)) {
            searchContainer.classList.remove("active");
        }
    });
});
