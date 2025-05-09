document.addEventListener("DOMContentLoaded", function () {
    // Testimonial Reveal Functionality
    const testimonials = document.querySelectorAll(".testimonial");

    function revealTestimonials() {
        testimonials.forEach(testimonial => {
            const rect = testimonial.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                testimonial.classList.add("in-view");
            }
        });
    }

    window.addEventListener("scroll", revealTestimonials);
    revealTestimonials(); // Run on page load in case they are already in view

    // Popup Functionality
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");

    // Show the popup with a fade-in and slide-in effect after 1 second
    setTimeout(() => {
        popup.classList.add("show");
    }, 1000);

    // Close the popup when the close button is clicked
    closePopup.addEventListener("click", function () {
        popup.classList.remove("show");
    });
});
