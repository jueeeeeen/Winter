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
                <li><a href="/AllActivity">Activity</a></li>
                <li class="logo">
                    <a href="#" class="flex"><img src="assets/winter_logo-w.svg" alt="Winter"></a>
                </li>
                <li class="m_left_auto">
                    <button class="btn medium w-mb round hover-db-w" id="create_button">
                        <img src="assets/plus-b.svg" alt="plus icon">create
                    </button>
                </li>
                <li>
                    <button class="btn circle round w-mb hover-y-w" id="bell_button">
                        <img src="assets/bell_icon-g.svg" alt="bell">
                    </button>
                </li>
                <li>
                    <button class="btn circle round w-mb hover-b-w" id="profile_button">
                        <img src="assets/Profile-w-b.png" width="55px" alt="profile">
                    </button>
                </li>
            </ul>
            <div class="profile_dropdown w-mb-mb edge" id="profile_dropdown">
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
                    <svg-x></svg-x>
                </button>
            </div>
            <button type="submit" class="btn search-bar-search">
                <svg-search></svg-search>
            </button>
        </form>`;
        this.clear_search = this.clear_search.bind(this);
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

class TagsSelector extends HTMLElement{
    constructor() {
        super();
        this.tag_name = this.getAttribute("data-tag_name");
        this.innerHTML =
        `<div class="pseudo-btn">
            <input type="checkbox" name="${this.tag_name}" value="${this.tag_name}" id="tag_${this.tag_name}">
            <label for="tag_${this.tag_name}" class="btn medium round shadow hover-w-bb-bb">${this.tag_name}</label>
        </div>`;
        this.input = this.querySelector("input");
        this.toggle_check = this.toggle_check.bind(this);
    }

    connectedCallback() {
        this.input.addEventListener("change", this.toggle_check);
    }

    disconnectedCallback() {
        this.input.removeEventListener("change", this.toggle_check);
    }

    toggle_check() {
        console.log("toggle");
        if ((this.tag_name == "All") && (this.input.checked)){
                document.querySelectorAll('#tag_filter_form input:not([name="All"])').forEach(input => {
                input.checked = false;
            });
        }
        else{
            document.querySelector('#tag_filter_form input[name="All"]').checked = false
        }
    }
}


class TagFilter extends HTMLElement{
    constructor(){
        super()
        this.innerHTML = 
        `<form class="flex gap" id="tag_filter_form" action="/AllActivity" method="post">
            <tag-selector data-tag_name="All"></tag-selector>
            <tag-selector data-tag_name="Entertain"></tag-selector>
            <tag-selector data-tag_name="Sport"></tag-selector>
            <tag-selector data-tag_name="Study"></tag-selector>
            <tag-selector data-tag_name="Hobby"></tag-selector>
            <tag-selector data-tag_name="Travel"></tag-selector>
        </form>
        `

        this.inputs = this.querySelector('input');
    }

    connectedCallback() {
        this.addEventListener("change", (event) => {
            event.preventDefault();
            this.submitForm()});

    }

    clear_tags(tag) {
        this.inputs.forEach(input => {
            if ((tag != null && input.name == tag) || input.name != "All"){
                input.checked = false;
            }
        });
    }

    submitForm() {
        const form = this.querySelector("#tag_filter_form");
        const selectedTags = [];

        form.querySelectorAll('input:checked').forEach(input => {
            selectedTags.push(input.value);
        });
        
        // console.log("Selected Tags:", selectedTags);

        fetch(form.action, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(selectedTags)
        })
        .then(response => response.json())
        .then(data => {
            const tag_list = document.querySelector('#show-tags')
            tag_list.innerHTML = data["tags"].join(" | ");
        })
    }
}

// class ActivityCardContainer extends HTMLElement {
//     constructor() {
//         super();
//         this.innerHTML = `<div id="all-activities-container"></div>`;
//     }

//     connectedCallback() {
//         document.addEventListener("DOMContentLoaded", () => {
//             fetch("/AllActivity/GetActivityCards")
//                 .then(response => response.json())
//                 .then(activities => {
//                     this.container = this.querySelector("#all-activities-container")
//                     activities.forEach(activity => {
//                         this.container.appendChild(new ActivityCard(activity));
//                     });
//                 })
//         })
//     }
// }

// replace button with better element later****
class TagDisplay extends HTMLElement {
    constructor() {
        super();
        this.tag_name = this.getAttribute("data-tag_name");
        this.innerHTML = `<button class="tag lb-w-w small round shadow">${this.tag_name}</button>`;
    }
}

class RequirementTag extends HTMLElement {
    constructor() {
        super();
        this.type = this.getAttribute("data-type");
        this.value = this.getAttribute("data-value");
        if (this.type == "age"){
            this.innerHTML = `<button class="tag w-r-r small round">${this.value}</button>`;
        }
        else {
            if (this.value == "female")
            {
                this.innerHTML = `<button class="tag w-p-p small round">${this.value}</button>`;
            }
            else if (this.value == "male") {
                this.innerHTML = `<button class="tag w-mb-mb small round">${this.value}</button>`;
            }
            else if (this.value == "lgbtq") {
                this.innerHTML = `<button class="tag w-rb-rb small"><span>${this.value}</span></button>`;
            }
        }
    }
}

// still missing
class ActivityCard extends HTMLElement {
    constructor(activity) {
        super();
        [this.act_date, this.act_time] = activity.activity_time.split(" ");
        this.innerHTML = `
        <div class="activity-card shadow">
            <div class="profile-info">
                <div><img src="${path+activity.host.profile_pic ? path+activity.host.profile_pic:path + "profile-g.png"}"></div>
                <div>
                    <span>${activity.host.name}</span>
                    <svg-${activity.host.gender} aria-label="${activity.host.gender}"></svg-${activity.host.gender}>
                </div>
                <div>
                    <span>${activity.create_time}</span>
                    <span aria-label="review" class="act-pre-review">
                        <svg-star-sharp></svg-star-sharp>
                        ${activity.host.review}
                    </span>
                </div>
                <div>${activity.membership}</div>
            </div>
            <ul class="act-tags-container">
                ${activity.tags.map(tag => `
                    <li>
                        <tag-display data-tag_name="${tag}"></tag-display>
                    </li>
                `).join("")}
            </ul>
            <div class="title">
                <h2>${activity.title}</h2>
            </div>
            <ul class="act-tags-container">
                ${Object.entries(activity.requirements).map(([type, value]) => `
                    <li>
                        <req-tag data-type="${type}" data-value="${value}"></req-tag>
                    </li>
                `).join("")}
            </ul>
            <ul class="act-info">
                <li>
                    <svg-clock></svg-clock><span>${this.act_time + "(" + activity.duration + ")"}</span>
                </li>
                <li>
                    <svg-calendar></svg-calendar><span>${this.act_date}</span>
                </li>
                <li>
                    <button class="btn small round mb-w">
                        join
                    </button>
                </li>
            </ul>
        </div>`
    }
}

// just for preview test
class ActivityCard_test extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <div class="activity-card shadow">
            <div class="profile-info">
                <div><img src="${path+"profile-g.png"}"></div>
                <div>
                    <span>Peerawat Ingkhasantatikul</span>
                    <svg-male aria-label="male"></svg-male>
                </div>
                <div>
                    <span>15 Jan 2025 12:59 </span>
                    <span aria-label="review" class="act-pre-review">
                        <svg-star-sharp></svg-star-sharp>
                        1.55
                    </span>
                </div>
                <div>2/5</div>
            </div>
            <ul class="act-tags-container">
                <li>
                    <tag-display data-tag_name="Entertain"></tag-display>
                </li>
            </ul>
            <div class="title">
                <h2>หาเพื่อนดูหนังครับ !!!</h2>
            </div>
            <ul class="act-tags-container">
                <li>
                    <req-tag data-type="gender" data-value="lgbtq"></req-tag>
                </li>
            </ul>
            <ul class="act-info">
                <li>
                    <svg-clock></svg-clock><span>13:00 (5 hours)</span>
                </li>
                <li>
                    <svg-calendar></svg-calendar><span>Sat, 18 Jan, 2025</span>
                </li>
                <li>
                    <button class="btn small round mb-w">
                        join
                    </button>
                </li>
            </ul>
        </div>`
    }
}

class Pagination extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = ``;
    }
}

class PaginationItem extends HTMLElement {
    constructor() {
        super();
        this.value = this.getAttribute("data-value");
        if (this.value == "prev") {
            this.innerHTML = `<button class="pagination-item round"><svg-prev></svg-prev></button>`;
        }
        else if (this.value == "..."){
            this.innerHTML = `<button class="pagination-item round">...</button>`; 
        }
        else if (this.value == "next"){
            this.innerHTML = `<button class="pagination-item round"><svg-next></svg-next></button>`; 
        }
        else {
            this.innerHTML = `<button class="pagination-item round">${this.value}</button>`;
        }
    }
}
// SVG Components Class
class BaseSVGElement extends HTMLElement {
    constructor() {
        super();
        this.style.display = "inline-flex";
    }
}


class SVGCalendar extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.3125 7.89996H20.6875M4.6875 1V2.80021M18.0625 1V2.79999M22 5.94999V18.85C22 20.5897 20.433 22 18.5 22H4.5C2.567 22 1 20.5897 1 18.85V5.94999C1 4.21029 2.567 2.79999 4.5 2.79999H18.5C20.433 2.79999 22 4.21029 22 5.94999Z" stroke="#65DA8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `
    }
}

class SVGClock extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = `<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.3146 10.7116L10.2781 10.6752L10.2381 10.6426L10.1875 10.6015V6.3025H10.8125V10.0538V10.468L11.1054 10.7609L11.9979 11.6534L12.0175 11.673L12.0382 11.6915L12.2479 11.8791L11.8529 12.2742L11.6652 12.0645L11.6467 12.0438L11.6271 12.0241L10.3146 10.7116ZM1 10.5C1 5.27728 5.27728 1 10.5 1C15.7227 1 20 5.27728 20 10.5C20 15.7227 15.7227 20 10.5 20C5.27728 20 1 15.7227 1 10.5ZM19.375 10.5C19.375 5.59022 15.4098 1.625 10.5 1.625C5.59022 1.625 1.625 5.59022 1.625 10.5C1.625 15.4098 5.59022 19.375 10.5 19.375C15.4098 19.375 19.375 15.4098 19.375 10.5Z" fill="#FDC330" stroke="#FDC330" stroke-width="2"/>
        </svg>`;
    }
}

class SVGXMark extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 1L1 14M1 1L14 14" stroke="var(--gray70)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }
}

class SVGSearch extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.25 18.25L14.2625 14.2625M16.4167 9.08333C16.4167 13.1334 13.1334 16.4167 9.08333 16.4167C5.03325 16.4167 1.75 13.1334 1.75 9.08333C1.75 5.03325 5.03325 1.75 9.08333 1.75C13.1334 1.75 16.4167 5.03325 16.4167 9.08333Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `;
    }
}

class SVGGenderFemale extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = `<svg width="32" height="37" viewBox="0 0 32 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.2502 28.5H20.7502M16.0002 20.5833V33.25M16.0002 20.5833C20.3724 20.5833 23.9168 17.0389 23.9168 12.6667C23.9168 8.29441 20.3724 4.75 16.0002 4.75C11.6279 4.75 8.0835 8.29441 8.0835 12.6667C8.0835 17.0389 11.6279 20.5833 16.0002 20.5833Z" stroke="#F78AFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `;
    }
}

class SVGGenderLGBT extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = 
        `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.8265 27.7466C16.3732 27.9066 15.6265 27.9066 15.1732 27.7466C11.3065 26.4266 2.6665 20.92 2.6665 11.5866C2.6665 7.46663 5.9865 4.1333 10.0798 4.1333C12.5065 4.1333 14.6532 5.30663 15.9998 7.11997C17.3465 5.30663 19.5065 4.1333 21.9198 4.1333C26.0132 4.1333 29.3332 7.46663 29.3332 11.5866C29.3332 20.92 20.6932 26.4266 16.8265 27.7466Z" stroke="url(#paint0_linear_206_1029)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
            <linearGradient id="paint0_linear_206_1029" x1="2.6665" y1="16" x2="29.3332" y2="16" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF8AF1"/>
            <stop offset="0.48" stop-color="#FFCF56"/>
            <stop offset="1" stop-color="#36B2FF"/>
            </linearGradient>
            </defs>
        </svg>`;
    }
}

class SVGGenderMale extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = 
        `<svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_247_858)">
        <path d="M20.9899 17.7504C17.8982 14.6588 12.8857 14.6588 9.79402 17.7504C6.70237 20.8421 6.70237 25.8546 9.79402 28.9463C12.8857 32.0379 17.8982 32.0379 20.9899 28.9463C24.0815 25.8546 24.0815 20.8421 20.9899 17.7504ZM20.9899 17.7504L29.9466 8.79373M29.9466 8.79373L29.9466 17.7504M29.9466 8.79373L20.9899 8.79373" stroke="#56BEFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_247_858">
        <rect width="20.6371" height="33.2074" fill="white" transform="translate(24.0054 0.0258789) rotate(45)"/>
        </clipPath>
        </defs>
        </svg>`;
    }
}

class SVGStarSharp extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = `<svg width="15" height="15" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 0L11.625 11.625H0L9.6875 19.375L5.8125 31L15.5 23.25L25.1875 31L21.3125 19.375L31 11.625H19.375L15.5 0Z" fill="#FDC330"/>
        </svg>`;
    }
}

class SVGPrev extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = 
        `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.4 6L8 10.6L6.6 12L0.6 6L6.6 0L8 1.4L3.4 6Z" fill="#9F9F9F"/>
        </svg>`;
    }
}

class SVGNext extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = 
        `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.6 6L0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6Z" fill="#9F9F9F"/>
        </svg>`;
    }
}

customElements.define("main-navbar", MainNavbar);
customElements.define("guest-navbar", GuestNavbar);
customElements.define("login-navbar", LoginNavbar);
customElements.define("search-bar", SearchBar);
customElements.define("tag-selector", TagsSelector);
customElements.define("tag-filter", TagFilter);
customElements.define("tag-display", TagDisplay);
customElements.define("req-tag", RequirementTag);
customElements.define("act-card", ActivityCard);
customElements.define("act-card-test", ActivityCard_test);
customElements.define("pagination-item", PaginationItem);

// SVG Components define
customElements.define("svg-calendar", SVGCalendar);
customElements.define("svg-clock", SVGClock);
customElements.define("svg-x", SVGXMark);
customElements.define("svg-search", SVGSearch);
customElements.define("svg-star-sharp", SVGStarSharp);
customElements.define("svg-male", SVGGenderMale);
customElements.define("svg-lgbt", SVGGenderLGBT);
customElements.define("svg-female", SVGGenderFemale);
customElements.define("svg-prev", SVGPrev);
customElements.define("svg-next", SVGNext);

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

