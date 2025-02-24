document.addEventListener("DOMContentLoaded", function () {
  let nextButton = document.querySelector(".next-button");
  let slidePage = document.querySelector(".form-outer form");
  let bullet = document.querySelectorAll(".bullet");
  let progressText = document.querySelectorAll(".step p");
  let submitBtn = document.getElementById("registerButton");
  let step = document.querySelectorAll(".step");
  let current = 0;
  const pages = document.querySelectorAll(".page");
  let currentPage = 0;

  function nextPage() {
    if (currentPage < pages.length - 1) {
      pages[currentPage].classList.remove("active");
      currentPage++;
      pages[currentPage].classList.add("active");
    }
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest(".gender-button")) {
      const gender = event.target.closest(".gender-button").dataset.gender;
      document.getElementById("gender").value = gender;
      console.log("Gender set to:", gender);
    }
  });

  slidePage.style.transform = `translateX(0%)`;

  nextButton.addEventListener("click", function (event) {
    event.preventDefault();
    current += 1;
    slidePage.style.transform = `translateX(-${current * 49}%)`;
    bullet[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    step[current - 1].classList.add("active");
  });

  let genderButtons = document.querySelectorAll(".gender-button button");
  genderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      document.getElementById("gender").value = this.dataset.gender; // เก็บค่า gender ลง input ซ่อน
      genderButtons.forEach((btn) => btn.classList.remove("selected")); // เอา class ออกจากปุ่มอื่นๆ
      this.classList.add("selected"); // ใส่ class ให้ปุ่มที่ถูกเลือก
    });
  });

  submitBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    const registerButton = document.getElementById("registerButton");
    if (registerButton.disabled) return; // ✅ ป้องกันการกดซ้ำ

    registerButton.disabled = true;
    registerButton.innerText = "Registering...";

    const Username = document.getElementById("username").value;
    const Email = document.getElementById("email").value;
    const Password = document.getElementById("password").value;
    const FirstName = document.getElementById("firstname").value;
    const LastName = document.getElementById("lastname").value;
    const DateOfBirth = document.getElementById("dateofbirth").value;
    const Gender = "Male"; // ใช้ค่า default ไว้ก่อน

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
