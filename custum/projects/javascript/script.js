document.addEventListener("DOMContentLoaded", function() {
    const boxes = document.querySelectorAll(".content-box"); // Select all boxes

    boxes.forEach(box => {
        const toggler = box.querySelector(".toggler");
        const description = box.querySelector(".description");
        const boxTitleWrapper = box.querySelector(".box-title-wrapper");

        toggler.addEventListener("click", function() {
            if (description.style.display === "none" || description.style.display === "") {
                description.style.display = "block";
                setTimeout(() => {
                    description.style.opacity = 1;
                }, 10); // slight delay for transition effect
                boxTitleWrapper.style.transform = "translateY(-10px)"; // adjust to move up
                toggler.innerHTML = "&#x25BC;"; // change icon to down arrow
            } else {
                description.style.opacity = 0;
                setTimeout(() => {
                    description.style.display = "none";
                }, 1000); // match with CSS transition duration
                boxTitleWrapper.style.transform = "translateY(0px)"; // adjust to move back to original position
                toggler.innerHTML = "&#x25B6;"; // change icon to right arrow
            }
        });
    });
});