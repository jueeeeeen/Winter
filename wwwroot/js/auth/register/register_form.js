document.addEventListener("DOMContentLoaded", function () {
  let nextButton = document.querySelector(".next-button");
  let slidePage = document.querySelector(".form-outer form");
  let bullet = document.querySelectorAll(".bullet");
  let progressText = document.querySelectorAll(".step p");
  let submitBtn = document.getElementById("registerButton");
  let step = document.querySelectorAll(".step");
  let current = 0;
  const pages = document.querySelectorAll(".page");
  const genderButtons = document.querySelectorAll(".gender-button button");
  const genderInput = document.getElementById("gender");
  slidePage.style.transform = `translateX(0%)`;

  if (bullet.length > 0) {
    bullet[0].classList.add("current");
    step[0].classList.add("current");
  }

  nextButton.addEventListener("click", function (event) {
    event.preventDefault();
    const activePage = pages[current];
    const inputs = activePage.querySelectorAll("input[required]");
    let isValid = true;
    const errorSpans = document.querySelectorAll(".error");

    inputs.forEach((input, index) => {
      // ตรวจสอบช่องว่างเมื่อคลิกปุ่ม
      if (!input.value.trim()) {
          isValid = false;
          input.classList.add("error");
          if (errorSpans[index]) {
              errorSpans[index].innerText = `${input.placeholder} is required`;
              console.log(`${input.placeholder} is required`);
          }
      }
  
      // ลบข้อความ error เมื่อเริ่มพิมพ์
      input.addEventListener("input", () => {
          if (input.value.trim()) {
              input.classList.remove("error");
              if (errorSpans[index]) {
                  errorSpans[index].innerText = "";
              }
          }
      });
  });

    if (current === 0) {
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        isValid = false;
        document.getElementById("confirm-password").classList.add("error");
        document.getElementById("password-error").innerHTML =
          "Passwords don't match";
      }
    }

    if (isValid) {
      bullet.forEach((b) => b.classList.remove("current"));
      if (current < bullet.length - 1) {
        bullet[current + 1].classList.add("current");
      }
      step.forEach((b) => b.classList.remove("current"));
      if (current < step.length - 1) {
        step[current + 1].classList.add("current");
      }
      current += 1;
      slidePage.style.transform = `translateX(-${current}%)`;
      bullet[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      step[current - 1].classList.add("active");
      pages[current - 1].classList.remove("active");
      current = Math.min(current, pages.length - 1);
      pages[current].classList.add("active");
    }
  });

  console.log(pages);

  genderButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      genderButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      genderInput.value = this.getAttribute("data-gender");
      console.log("Gender selected:", genderInput.value);
    });
  });

  submitBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    const registerButton = document.getElementById("registerButton");
    if (registerButton.disabled) return;

    registerButton.disabled = true;
    registerButton.innerText = "Registering...";

    const Username = document.getElementById("username").value;
    const Email = document.getElementById("email").value;
    const Password = document.getElementById("password").value;
    const FirstName = document.getElementById("firstname").value;
    const LastName = document.getElementById("lastname").value;
    const DateOfBirth = document.getElementById("dateofbirth").value;
    const Gender = document.getElementById("gender").value;
    console.log(Gender);

    try {
      const response = await fetch("/account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username,
          Email,
          Password,
          FirstName,
          LastName,
          DateOfBirth,
          Gender,
        }),
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/account/login";
      } else {
        document.getElementById("errorMessage").innerText =
          "Invalid username or password.";
      }
    } catch (error) {
      document.getElementById("errorMessage").innerText =
        "An error occurred. Please try again later.";
    } finally {
      registerButton.disabled = false;
      registerButton.innerText = "Register";
    }
  });
});
