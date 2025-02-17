document.addEventListener("DOMContentLoaded", function () {
    let nextButton = document.querySelector(".next-button");
    let slidePage = document.querySelector(".form-outer form");
    let bullet = document.querySelectorAll(".bullet");
    let progressText = document.querySelectorAll(".step p");
    let submitBtn = document.querySelector(".register-button");
    let step = document.querySelectorAll(".step");
    let current = 0; 

    slidePage.style.transform = `translateX(0%)`;

    nextButton.addEventListener("click", function(event){
        event.preventDefault();
        current += 1;
        slidePage.style.transform = `translateX(-${current * 49}%)`;
        bullet[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        step[current - 1].classList.add("active");
    });

    submitBtn.addEventListener("click", function(){
        current += 1;
        bullet[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
      });
});