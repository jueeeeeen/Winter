var path = "../assets/"

class LoginNavbar extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `<nav class="gradient_blue">
                <ul class="shadow no_select nav_bar">
                <li>
                    <a href="#" class="flex flex_center"><img src="assets/home.svg" width="30px" alt="home"></a>
                </li>
                <li><a href="#">Activity</a></li>
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
                <li><a href="#">Activity</a></li>
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
        change_icon(this.logout_button, "logout-w.svg", "logout.svg");
    }
}

class MainNavbar extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = 
            `<nav class="gradient_blue shadow">
                <ul class="no_select nav_bar">
                <li>
                    <a href="#" class="flex flex_center"><img src="assets/home.svg" width="30px" alt="home"></a>
                </li>
                <li><a href="#">Activity</a></li>
                <li class="logo">
                    <a href="#" class="flex"><img src="assets/winter_logo-w.svg" alt="Winter"></a>
                </li>
                <li class="m_left_auto">
                    <button class="btn medium w-b round hover-db-w" id="create_button">
                        <img src="assets/plus-b.svg" alt="plus icon">create
                    </button>
                </li>
                <li>
                    <button class="btn circle round w-b hover-y-w" id="bell_button">
                        <img src="assets/bell_icon-g.svg" alt="bell">
                    </button>
                </li>
                <li>
                    <button class="btn circle round w-b hover-b-w" id="profile_button">
                        <img src="assets/Profile-w-b.png" width="55px" alt="profile">
                    </button>
                </li>
            </ul>
            <div class="profile_dropdown w-b-b edge" id="profile_dropdown">
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
        this.profile_button.addEventListener("click", this.toggle_dropdown);
        change_icon(this.profile_button, "Profile-b.png", "Profile-w-b.png");

        var bell_button = this.querySelector("#bell_button");
        change_icon(bell_button, "bell_icon-w.svg", "bell_icon-g.svg");

        var create_button = this.querySelector("#create_button");
        change_icon(create_button, "plus-w.svg", "plus-b.svg");

        var logout_button = this.querySelector("#logout_button");
        change_icon(logout_button, "logout-w.svg", "logout.svg");
    }

    disconnectedCallback() {
        this.profile_button.removeEventListener("click", this.toggle_dropdown);
    }

    toggle_dropdown() {
        this.profile_dropdown = this.querySelector("#profile_dropdown");
        this.profile_dropdown.classList.toggle("show");
        console.log(this.profile_dropdown);
    }
}

class SearchBar extends HTMLElement{
    constructor() {
        super();
        this.innerHTML = 
        `<form class="search-bar shadow" action="/AllActivity" method="get">
            <input id="search_input" type="text" name="search_string" placeholder="search activities..." required>
            <div class="search-bar-x">
                <button class="btn" id="clear_search_button">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1L1 14M1 1L14 14" stroke="var(--gray70)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <button type="submit" class="btn search-bar-search">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.25 18.25L14.2625 14.2625M16.4167 9.08333C16.4167 13.1334 13.1334 16.4167 9.08333 16.4167C5.03325 16.4167 1.75 13.1334 1.75 9.08333C1.75 5.03325 5.03325 1.75 9.08333 1.75C13.1334 1.75 16.4167 5.03325 16.4167 9.08333Z" stroke="var(--white)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </form>`;
        this.clear_search = this.clear_search.bind(this);
        this.search_activity = this.search_activity.bind(this);
    }

    connectedCallback() {
        this.clear_search_button = this.querySelector("#clear_search_button");
        this.clear_search_button.addEventListener("click", this.clear_search);
    }

    clear_search() {
        this.search_input = this.querySelector("#search_input");
        console.log(this.search_input);
        this.search_input.value = "";
        console.log("clear");
    }
}



customElements.define("main-navbar", MainNavbar);
customElements.define("guest-navbar", GuestNavbar);
customElements.define("login-navbar", LoginNavbar);
customElements.define("search-bar", SearchBar);

function change_icon(element, icon_hover, icon_default) {
    element.onmouseover = () => {
        element.firstElementChild.src = path + icon_hover;
    }
    
    element.onmouseleave = () => {
        element.firstElementChild.src = path + icon_default;
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
class SelectActivities extends HTMLElement{
    constructor() {
        super();
        this.innerHTML = `
        <ul class="select_type">
            <li>
                <button class="type" id="Upcoming_button">
                    Upcoming
                </button>
            </li>
            <li>
                <button class="type" id="History_button">
                    History
                </button>
            </li>
        </ul>
        `};
    
}
class Activities extends HTMLElement{
    constructor() {
        super();
        this.innerHTML = `
        <div class="activities-bg">
            <h2 class="activities-header">Upcoming</h2>

            <button class="activity-dropdown">
                <span>หาเพื่อนดูหนังครับ!!!</span>
                <div class="tags">
                    <span class="tag">tag</span>
                    <span class="tag">tag</span>
                    <span class="tag">tag</span>
                </div>
                <span class="date">
                    <img src="calendar-icon.png" alt="calendar"> Jan 5, 2025, 8:15 am
                </span>
            </button>

            <div class="dropdown-content">
                <img src="" alt="">
                <ul class="members">
                    <li class="member">
                        <img src="assets/Profile-w-b.png" alt="Profile">
                        <span class="member-name">Peerawat Ingk.</span>
                        <span class="member-role">(Host)</span>
                    </li>
                    <li class="member">
                        <img src="assets/Profile-w-b.png" alt="Profile">
                        <span class="member-name">Peerawat Ingk.</span>
                        <span class="member-role">(Host)</span>
                    </li>
                </ul>
            </div>
        </div>
        `
    }
}
customElements.define("select-activities", SelectActivities);

// var lgbtq_select_btn = document.getElementById("lgbtq_select_btn");
// var select_lgbtq_txt = document.getElementById("select_lgbtq_txt");
// var lgbtq_icon = document.getElementById("lgbtq_icon");
// let toggle_lgbtq_select_btn = false;

// lgbtq_select_btn.onmouseover = () => {
//     select_lgbtq_txt.style.display = "inline-block";
// }

// lgbtq_select_btn.onmouseleave = () => {
//     select_lgbtq_txt.style.display = "none";
// }

// lgbtq_select_btn.onclick = () => {
//     toggle_lgbtq_select_btn = !toggle_lgbtq_select_btn;
//     if (toggle_lgbtq_select_btn){
//         lgbtq_select_btn.style.backgroundImage = "linear-gradient(to right, var(--dark_pink), var(--yellow), var(--medium_blue))";
//         select_lgbtq_txt.style.setProperty("-webkit-text-fill-color", "white");
//         lgbtq_icon.src = "../assets/heart-w.svg"; //white
//     }
//     else {
//         lgbtq_select_btn.style.backgroundImage = "none";
//         select_lgbtq_txt.style.setProperty("-webkit-text-fill-color", "transparent");
//         lgbtq_icon.src = "../assets/heart.svg"; //rainbow
//     }
// }

// var male_select_btn = document.getElementById("male_select_btn");
// let toggle_male_select_btn = false;
// toggleInvertColor(male_select_btn, toggle_male_select_btn, "male_icon-w.svg", "male_icon-b.svg");

// var female_select_btn = document.getElementById("female_select_btn");
// var female_icon = document.getElementById("female_icon");
// let toggle_female_select_btn = false;
// toggleInvertColor(female_select_btn, toggle_female_select_btn, "female_icon-w.svg", "female_icon-p.svg", "var(--dark_pink)");

// var back_buttons = document.getElementsByClassName("back_button");
// Array.from(back_buttons).forEach(element => {
//     change_icon(element, "back-b.svg", "back-w.svg");
// });

