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

  const clearErrorOnInput = (inputId, errorId) => {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    const eventType = input.type === "hidden" ? "change" : "input";

    input.addEventListener(eventType, () => {
      if (input.value.trim() !== "") {
        error.innerHTML = "";
      }
    });
  }

  clearErrorOnInput("username", "username-error");
  clearErrorOnInput("email", "email-error");
  clearErrorOnInput("password", "password-error");
  clearErrorOnInput("confirm-password", "confirm-password-error");
  clearErrorOnInput("firstname", "firstname-error");
  clearErrorOnInput("lastname", "lastname-error");
  clearErrorOnInput("dateofbirth", "birth-error");
  clearErrorOnInput("gender", "gender-error");

  nextButton.addEventListener("click", function (event) {
    event.preventDefault();
    const activePage = pages[current];
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@@$!%*?&_])[A-Za-z\d@@$!%*?&_]{8,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let isValid = true;

    if (current === 0) {
      if(!username) {
        isValid = false;
        document.getElementById("username-error").innerHTML = "username is required"
      }
      if(!email) {
        isValid = false;
        document.getElementById("email-error").innerHTML = "email is required"
      } else if (!emailPattern.test(email)) {
        isValid = false;
        alert("Invalid email format.")
      }
      if(!password) {
        isValid = false;
        document.getElementById("password-error").innerHTML = "password is required"
      } else if (!passwordPattern.test(password)) {
        isValid = false;
        alert("Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character (@, $, !, %, *, ?, &, _).")
      }
      if(!confirmPassword) {
        isValid = false;
        document.getElementById("confirm-password-error").innerHTML = "confirm password is required"
      } 

      if (password !== confirmPassword) {
        isValid = false;
        document.getElementById("confirm-password").classList.add("error");
        document.getElementById("check-password-error").innerHTML =
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
      const genderError = document.getElementById("gender-error");
      if (genderInput.value) {
        genderError.innerHTML = "";
      }
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
    const namePattern = /^[A-Za-z]{2,50}$/;

    if(!FirstName) {
      isValid = false;
      document.getElementById("firstname-error").innerHTML = "firstname is required"
    } else if (!namePattern.test(FirstName)) {
      alert("Firstname must contains just characters.")
    }
    if(!LastName) {
      isValid = false;
      document.getElementById("lastname-error").innerHTML = "lastname is required"
    } else if (!namePattern.test(LastName)) {
      alert("Lastname must contains just characters.")
    }
    if(!DateOfBirth) {
      isValid = false;
      document.getElementById("birth-error").innerHTML = "date of birth is required"
    }
    if(!Gender) {
      isValid = false;
      document.getElementById("gender-error").innerHTML = "gender is required"
    }

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
