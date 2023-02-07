export const carrousel = () => {
  let slideIndex = 1; // Current slide
  showSlides(slideIndex); // Show the current slide

  // Next/previous controls
  function plusSlides(n) {
    // Move to the next/previous slide
    showSlides((slideIndex += n));
  }

  // Thumbnail image controls
  function currentSlide(n) {
    // Select a specific slide and display it
    showSlides((slideIndex = n));
  }

  // Display the specified slide and hide all others
  function showSlides(n) {
    let i;

    let slides = document.getElementsByClassName("review-slide");

    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
  }
};
