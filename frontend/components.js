class LoginNavbar extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `<nav class="gradient_blue">
                <ul class="shadow no_select nav_bar">
                <li>
                    <a href="#" class="flex flex_center"><img src="assets/home.svg" width="30px" alt="home"></a>
                </li>
                <li><a href="#">About</a></li>
                <li class="logo">
                    <a href="#" class="flex"><img src="assets/winter_logo-w.svg" alt="Winter"></a>
                </li>
            </ul>
            </nav>`
    }
}

class GuestNavbar extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `<nav class="gradient_blue">
                <ul class="shadow no_select nav_bar">
                <li>
                    <a href="#" class="flex flex_center"><img src="assets/home.svg" width="30px" alt="home"></a>
                </li>
                <li><a href="#">About</a></li>
                <li class="logo">
                    <a href="#" class="flex"><img src="assets/winter_logo-w.svg" alt="Winter"></a>
                </li>
                <li class="m_left_auto">
                    <a href="login_page.html" class="medium button login_bg shadow flex flex_center rounded" id="nav_login_button">
                    login
                    </a>
                </li>
            </ul>
            </nav>`
    }

    connectedCallback(){
        this.nav_login_button = this.querySelector("#nav_login_button");
        changeChildImg(this.logout_button, "logout-w.svg", "logout.svg");
    }
}

class MainNavbar extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `<nav class="gradient_blue">
                <ul class="shadow no_select nav_bar">
                <li>
                    <a href="#" class="flex flex_center"><img src="assets/home.svg" width="30px" alt="home"></a>
                </li>
                <li><a href="#">About</a></li>
                <li class="logo">
                    <a href="#" class="flex"><img src="assets/winter_logo-w.svg" alt="Winter"></a>
                </li>
                <li class="m_left_auto">
                    <a href="#" class="medium button white rounded blue_hover shadow flex flex_center" id="create_button">
                        <img src="assets/plus-b.svg" alt="plus icon">create
                    </a>
                </li>
                <li>
                    <button class="circle button gold_hover shadow flex flex_center rounded white" id="bell_button">
                        <img src="assets/bell_icon-g.svg" alt="bell">
                    </button>
                </li>
                <li>
                    <button class="circle button blue_hover shadow flex flex_center rounded" id="profile_button">
                        <img src="assets/Profile-w-b.png" width="55px" alt="profile">
                    </button>
                </li>
            </ul>
            <div class="profile_dropdown white rounded-s thin_blue_border" id="profile_dropdown">
                <div class="info_dropdown flex gap">
                    <img class="blue_border rounded" id="profile_pic_dropdown" src="assets/Profile-w-b.png" width="40px">
                    <div>
                        <span class="name_dropdown">Peerawat<br>Ingkhasantatikul</span>
                        <span class="username_dropdown">@Marklnwza007</span>
                    </div>
                </div>
                <hr class="blue_line">
                <ul>
                    <li class="btn_dropdown">
                        <a>
                            <img src="assets/person.svg">My Profile
                        </a>
                    </li>
                    <hr class="blue_line_dash">
                    <li class="btn_dropdown">
                        <a>
                            <img src="assets/activity.svg">My Activity
                        </a>
                    </li>
                    <hr class="blue_line_dash">
                    <li class="btn_dropdown">
                        <a>
                            <img src="assets/star_outline.svg">My Ratings
                        </a>
                    </li>
                    <hr class="blue_line_dash">
                    <li>
                        <div class="log_out_dropdown h_center flex flex_center gap" id="logout_button">
                            <img src="assets/logout.svg">log out
                        </div>
                    </li>
                </ul>
            </div>
            </nav>`

        this.toggle_dropdown = this.toggle_dropdown.bind(this);
    }

    connectedCallback(){
        this.profile_button = this.querySelector("#profile_button");
        this.profile_dropdown = this.querySelector("#profile_dropdown");

        console.log("Profile button:", this.profile_button);
        console.log("Profile dropdown:", this.profile_dropdown);

        this.profile_button.addEventListener("click", this.toggle_dropdown);
        changeChildImg(this.profile_button, "Profile-b.png", "Profile-w-b.png");
    }

    disconnectedCallback() {
        this.profile_button.removeEventListener("click", this.toggle_dropdown);
    }

    toggle_dropdown() {
        this.profile_dropdown.classList.toggle("show");
        console.log("Toggled class:", this.profile_dropdown.classList);
    }
}

customElements.define("main-navbar", MainNavbar);
customElements.define("guest-navbar", GuestNavbar);
customElements.define("login-navbar", LoginNavbar);

function changeChildImg(element, img1, img2) {
    element.onmouseover = () => {
        element.firstElementChild.src = "assets/" + img1;
    }
    
    element.onmouseleave = () => {
        element.firstElementChild.src = "assets/" + img2;
    }
}

function toggleInvertColor(element, toggle, img1, img2, color1, color2) {
    element.onclick = () => {
        toggle = !toggle;
        if (toggle){
            element.style.backgroundColor = color1? color1 : "var(--medium_blue)";
            element.style.color = color2? color2 : "white";
            element.firstElementChild.src = "assets/" + img1;
        }
        else {
            element.style.backgroundColor = color2? color2 : "white";
            element.style.color = color1? color1 : "var(--medium_blue)";
            element.firstElementChild.src = "assets/" + img2;
        }
    }
}

var lgbtq_select_btn = document.getElementById("lgbtq_select_btn");
var select_lgbtq_txt = document.getElementById("select_lgbtq_txt");
var lgbtq_icon = document.getElementById("lgbtq_icon");
let toggle_lgbtq_select_btn = false;

lgbtq_select_btn.onmouseover = () => {
    select_lgbtq_txt.style.display = "inline-block";
}

lgbtq_select_btn.onmouseleave = () => {
    select_lgbtq_txt.style.display = "none";
}

lgbtq_select_btn.onclick = () => {
    toggle_lgbtq_select_btn = !toggle_lgbtq_select_btn;
    if (toggle_lgbtq_select_btn){
        lgbtq_select_btn.style.backgroundImage = "linear-gradient(to right, var(--dark_pink), var(--yellow), var(--medium_blue))";
        select_lgbtq_txt.style.setProperty("-webkit-text-fill-color", "white");
        lgbtq_icon.src = "../assets/heart-w.svg"; //white
    }
    else {
        lgbtq_select_btn.style.backgroundImage = "none";
        select_lgbtq_txt.style.setProperty("-webkit-text-fill-color", "transparent");
        lgbtq_icon.src = "../assets/heart.svg"; //rainbow
    }
}

var male_select_btn = document.getElementById("male_select_btn");
let toggle_male_select_btn = false;
toggleInvertColor(male_select_btn, toggle_male_select_btn, "male_icon-w.svg", "male_icon-b.svg");

var female_select_btn = document.getElementById("female_select_btn");
var female_icon = document.getElementById("female_icon");
let toggle_female_select_btn = false;
toggleInvertColor(female_select_btn, toggle_female_select_btn, "female_icon-w.svg", "female_icon-p.svg", "var(--dark_pink)");

var back_buttons = document.getElementsByClassName("back_button");
Array.from(back_buttons).forEach(element => {
    changeChildImg(element, "back-b.svg", "back-w.svg");
});

var bell_button = document.getElementById("bell_button");
changeChildImg(bell_button, "bell_icon-w.svg", "bell_icon-g.svg");

var profile_button = document.getElementById("profile_button");

var create_button = document.getElementById("create_button");
changeChildImg(create_button, "plus-w.svg", "plus-b.svg");

var logout_button = document.getElementById("logout_button");
changeChildImg(logout_button, "logout-w.svg", "logout.svg");