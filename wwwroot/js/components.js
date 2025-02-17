var path = "/assets/"

class LoginNavbar extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `<nav class="gradient_blue">
                <ul class="shadow no_select nav_bar">
                <li>
                    <a href="/" class="flex flex_center"><img src="${path}home.svg" width="30px" alt="home"></a>
                </li>
                <li><a href="/AllActivity">Activity</a></li>
                <li class="logo">
                    <a href="/" class="flex"><img src="${path}winter_logo-w.svg" alt="Winter"></a>
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
                    <a href="/" class="flex flex_center"><img src="${path}home.svg" width="30px" alt="home"></a>
                </li>
                <li><a href="/AllActivity">Activity</a></li>
                <li class="logo">
                    <a href="/" class="flex"><img src="${path}winter_logo-w.svg" alt="Winter"></a>
                </li>
                <li class="m_left_auto">
                    <a href="/Account/Login" class="medium button login_bg shadow flex flex_center rounded" id="nav_login_button">
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
            `<nav class="gradient_blue shadow nav_bar_container">
                <ul class="no_select nav_bar">
                <li>
                    <a href="/" class="flex flex_center"><img src="${path}home.svg" width="30px" alt="home"></a>
                </li>
                <li><a href="/Activity">Activity</a></li>
                <li class="logo">
                    <a href="/" class="flex"><img src="${path}winter_logo-w.svg" alt="Winter Logo" /></a>
                </li>
                <li class="m_left_auto">
                    <button class="btn medium w-mb round hover-db-w" id="create_button" onclick="window.location.href='/Create'">
                        <img src="${path}plus-b.svg" alt="plus icon">create
                    </button>
                </li>
                <li>
                    <button class="btn circle round w-mb hover-y-w" id="bell_button">
                        <img src="${path}bell_icon-g.svg" alt="bell">
                    </button>
                </li>
                <li>
                    <button class="btn circle round w-mb hover-b-w" id="profile_button">
                        <img src="${path}Profile-w-b.png" width="55px" alt="profile">
                    </button>
                </li>
            </ul>
            <div class="profile_dropdown w-mb-mb edge" id="profile_dropdown">
                <div class="info_dropdown flex gap">
                    <img class="blue_border rounded" id="profile_pic_dropdown" src="${path}Profile-w-b.png" width="40px">
                    <div>
                        <span class="name_dropdown">Peerawat<br>Ingkhasantatikul</span>
                        <span class="username_dropdown">@Marklnwza007</span>
                    </div>
                </div>
                <hr class="blue_line">
                <ul>
                    <li class="btn_dropdown">
                        <a href="/Profile">
                            <img src="${path}person.svg">My Profile
                        </a>
                    </li>
                    <hr class="blue_line_dash">
                    <li class="btn_dropdown">
                        <a href="/MyActivity">
                            <img src="${path}activity.svg">My Activity
                        </a>
                    </li>
                    <hr class="blue_line_dash">
                    <li class="btn_dropdown">
                        <a href="/MyRating">
                            <img src="${path}star_outline.svg">My Ratings
                        </a>
                    </li>
                    <hr class="blue_line_dash">
                    <li>
                        <div class="log_out_dropdown h_center flex flex_center gap" id="logout_button">
                            <img src="${path}logout.svg">log out
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

class TagSelect extends HTMLElement{
    constructor(){
        super()
        this.innerHTML = 
        `<div class="tag-col">
            <tag-selector data-tag_name="Entertain"></tag-selector>
            <tag-selector data-tag_name="Sport"></tag-selector>
            <tag-selector data-tag_name="Study"></tag-selector>
            <tag-selector data-tag_name="Hobby"></tag-selector>
            <tag-selector data-tag_name="Travel"></tag-selector>
            <tag-selector data-tag_name="Art"></tag-selector>
            <tag-selector data-tag_name="Music"></tag-selector>
            <tag-selector data-tag_name="Beauty"></tag-selector>
            <tag-selector data-tag_name="Pet"></tag-selector>
        </div>
        `
    }
}

class NumberInput extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
            <div class="number-input-container">
                <button type="button" id="decrease">-</button>
                <input type="text" id="number" value="1">
                <button type="button" id="increase">+</button>
            </div>
        `;

        this.input = this.querySelector("#number");
        this.decreaseBtn = this.querySelector("#decrease");
        this.increaseBtn = this.querySelector("#increase");

        this.decreaseBtn.addEventListener("click", () => this.updateValue(-1));
        this.increaseBtn.addEventListener("click", () => this.updateValue(1));

        this.input.addEventListener("input", () => this.validateInput());
    }

    updateValue(change) {
        let currentValue = parseInt(this.input.value) || 0;
        let newValue = currentValue + change;
        if (newValue < 1) newValue = 1;
        this.input.value = newValue;
    }

    validateInput() {
        let value = this.input.value;
        this.input.value = value.replace(/[^0-9]/g, '');
    }
}


// Register custom element

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
                this.innerHTML = `<button class="tag w-p-p small round">female</button>`;
            }
            else if (this.value == "male") {
                this.innerHTML = `<button class="tag w-mb-mb small round">male</button>`;
            }
            else {
                this.innerHTML = `<button class="tag w-rb-rb small"><span>lgbtq</span></button>`;
            }
        }
    }
}

// still missing
class ActivityCard extends HTMLElement {
    constructor(activity) {
        super();
        if (activity) {
            [this.act_date, this.act_time] = activity.activity_time.split(" ");
            this.innerHTML = `
            <div class="activity-card shadow">
                <div class="act-card-profile-info">
                    <div><img src="${path+activity.host.profile_pic ? path+activity.host.profile_pic:path + "profile-g.png"}"></div>
                    <div>
                        <span>${activity.host.name}</span>
                        <svg-${activity.host.gender} aria-label="${activity.host.gender}"></svg-${activity.host.gender}>
                    </div>
                    <div>
                        <span>${activity.create_time}</span>
                        <span aria-label="review" class="act-card-review">
                            <svg-star-sharp></svg-star-sharp>
                            ${activity.host.review}
                        </span>
                    </div>
                    <div>${activity.membership}</div>
                </div>
                <ul class="act-card-tags-container">
                    ${activity.tags.map(tag => `
                        <li>
                            <tag-display data-tag_name="${tag}"></tag-display>
                        </li>
                    `).join("")}
                </ul>
                <div class="title">
                    <h2>${activity.title}</h2>
                </div>
                <ul class="act-card-tags-container">
                    ${Object.entries(activity.requirements).map(([type, value]) => `
                        <li>
                            <req-tag data-type="${type}" data-value="${value}"></req-tag>
                        </li>
                    `).join("")}
                </ul>
                <ul class="act-card-info">
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
        else {
            this.innerHTML = `
            <div class="activity-card shadow">
                <div class="act-card-profile-info">
                    <div><img src="${path+"profile-g.png"}"></div>
                    <div>
                        <span>Peerawat Ingkhasantatikul</span>
                        <svg-male aria-label="male"></svg-male>
                    </div>
                    <div>
                        <span>15 Jan 2025 12:59 </span>
                        <span aria-label="review" class="act-card-review">
                            <svg-star-sharp></svg-star-sharp>
                            1.55
                        </span>
                    </div>
                    <div>2/5</div>
                </div>
                <ul class="act-card-tags-container">
                    <li>
                        <tag-display data-tag_name="Entertain"></tag-display>
                    </li>
                </ul>
                <div class="title">
                    <h2>หาเพื่อนดูหนังครับ !!!</h2>
                </div>
                <ul class="act-card-tags-container">
                    <li>
                        <req-tag data-type="gender" data-value="lgbtq"></req-tag>
                    </li>
                </ul>
                <ul class="act-card-info">
                    <li>
                        <svg-clock></svg-clock><span>13:00 (5 hours)</span>
                    </li>
                    <li>
                        <svg-calendar></svg-calendar><span>Sat, 18 Jan, 2025</span>
                    </li>
                    <li>
                        <act-card-join-btn></act-card-join-btn>
                    </li>
                </ul>
            </div>`
            }
    }
}

class ActCardJoinBtn extends HTMLElement {
    constructor() {
        super();
        this.innerHTML=`<button onclick="window.location.href='ActivityDetail'" class="btn small round mb-w">join</button>`
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

class MemberListItem extends HTMLElement {
    constructor() {
        super();
        this.role = this.getAttribute("data-role");
        if (this.role == "host") {
            this.innerHTML = 
            `<li class="radial-blue-bg member-list-item shadow">
                <div class="member-list-item-profile">
                    <img src="../../assets/profile-g.png">
                </div>
                <span class="member-list-item-name">Peerawat Ingkhasantatikul</span>
                <span class="member-list-item-role">(Host)</span>
            </li>`;
        }
        else if (this.role == "member"){
            this.innerHTML = 
            `<li class="w-bb-bb member-list-item">
                <div class="member-list-item-profile">
                    <img src="../../assets/profile-g.png">
                </div>
                <span class="member-list-item-name">Peerawat Ingkhasantatikul</span>
                <span class="member-list-item-role">(Member)</span>
            </li>`; 
        }
        else if (this.role == "pending"){
            this.innerHTML = `<button class="pagination-item round">${this.role}</button>`;
        }
    }
}

class ActDetailJoinBtn extends HTMLElement {
    constructor(actID) {
        super();
        this.innerHTML = `<button class="btn large lb-w round act-detail-join-btn">join</button>`;
    }
    connectedCallback() {

    }
}

class AllActBanner extends HTMLElement {
    constructor() {
        super();
        this.current_page = 0;
        this.pictures = ["winter_login_pic2.jpg", "winter_login_pic.jpg", "1657770518.jpeg"]

        this.innerHTML = 
        `<div class="banner-container">
            <div class="banner-arrow">
                <button class="btn round" id="prev-banner-btn"><svg-prev></svg-prev></button>
            </div>
            <div class="banner-display edge shadow">
                <img src="${path + this.pictures[this.current_page]}" id="banner_pic">
            </div>
            <div class="banner-arrow">
                <button class="btn round" id="next-banner-btn"><svg-next></svg-next></button>
            </div>
            <ul class="banner-page">
                <li>
                    <span class="w-bb-bb round" id="banner1"></span>
                </li>
                <li>
                    <span class="w-bb-bb round" id="banner2"></span>
                </li>
                <li>
                    <span class="w-bb-bb round" id="banner3"></span>
                </li>
            </ul>
        </div>`;


        this.handle_banner_change = this.handle_banner_change.bind(this);

        this.page_list = this.querySelectorAll("span");
        console.log(this.page_list)
    }
    connectedCallback() {
        this.handle_banner_change(0);
        this.querySelector("#prev-banner-btn").addEventListener("click", () => this.handle_banner_change(-1));
        this.querySelector("#next-banner-btn").addEventListener("click", () =>{this.handle_banner_change(1);});
    }

    handle_banner_change(value) {
        this.banner_pic = this.querySelector("#banner_pic");
        this.banner_pic.classList.add("fade-out")
        this.current_page += value;
        setTimeout(() => {
            if(this.current_page >= 3)
            {
                this.current_page = 0;
            }
            else if (this.current_page < 0)
            {
                this.current_page = 2
            }

            this.page_list.forEach((page, index) => {
                page.classList.toggle("bb-w", this.current_page === index);
            });
            console.log(this.current_page)
            this.banner_pic.src = path + this.pictures[this.current_page];
            this.banner_pic.classList.remove("fade-out")
        },500)
        
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

class SVGBookMark extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = 
        `<svg width="36" height="52" viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0V52L18 39L36 52V0H0Z" fill="url(#paint0_linear_196_723)"/>
            <defs>
            <linearGradient id="paint0_linear_196_723" x1="0" y1="26" x2="25.35" y2="26" gradientUnits="userSpaceOnUse">
            <stop stop-color="#56DFF4"/>
            <stop offset="1" stop-color="#ADF1FD"/>
            </linearGradient>
            </defs>
        </svg>`;
    }
}

class SVGMorePeople extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = 
        `<svg width="55" height="33" viewBox="0 0 55 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.5417 27.9584V32.5417H16.0417V27.9584C16.0417 27.9584 16.0417 18.7917 29.7917 18.7917C43.5417 18.7917 43.5417 27.9584 43.5417 27.9584ZM36.6667 7.33338C36.6667 5.97363 36.2635 4.64442 35.508 3.51383C34.7526 2.38324 33.6789 1.50206 32.4226 0.981705C31.1664 0.461353 29.784 0.325205 28.4504 0.590478C27.1168 0.855752 25.8918 1.51053 24.9303 2.47202C23.9688 3.4335 23.314 4.65851 23.0488 5.99213C22.7835 7.32575 22.9196 8.70808 23.44 9.96433C23.9603 11.2206 24.8415 12.2943 25.9721 13.0497C27.1027 13.8052 28.4319 14.2084 29.7917 14.2084C31.615 14.2084 33.3637 13.484 34.653 12.1947C35.9423 10.9054 36.6667 9.15674 36.6667 7.33338ZM44 18.9292C45.2527 20.0849 46.2626 21.4786 46.9709 23.0288C47.6791 24.5791 48.0715 26.2548 48.125 27.9584V32.5417H55V27.9584C55 27.9584 55 20.0521 44 18.9292ZM41.25 0.458377C40.5576 0.458417 39.8694 0.566667 39.2104 0.77921C40.5512 2.70185 41.27 4.98942 41.27 7.33338C41.27 9.67733 40.5512 11.9649 39.2104 13.8875C39.8694 14.1001 40.5576 14.2083 41.25 14.2084C43.0734 14.2084 44.822 13.484 46.1114 12.1947C47.4007 10.9054 48.125 9.15674 48.125 7.33338C48.125 5.51001 47.4007 3.76133 46.1114 2.47202C44.822 1.18271 43.0734 0.458377 41.25 0.458377ZM18.3333 11.9167H11.4583V5.04171H6.875V11.9167H0V16.5H6.875V23.375H11.4583V16.5H18.3333V11.9167Z" fill="#90E1FF"/>
        </svg>
        `;
    }
}

class SVGCheck extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = 
        `<svg width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.728271 0.524658V30.2909H29.1417V15.0251L25.0826 19.2774V26.0385H4.78733V4.77697H19.3594L23.4184 0.524658H0.728271ZM29.1417 0.524658L16.9645 13.2816L12.9054 9.02929L8.84639 13.2816L16.9645 21.7862L33.2007 4.77697L29.1417 0.524658Z" fill="#56BEFF"/>
        </svg>`;
    }
}

class SVGLocation extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML = 
        `<svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 18.2155C15.8693 18.2155 17.79 16.2355 17.79 13.7931C17.79 11.3506 15.8693 9.37067 13.5 9.37067C11.1307 9.37067 9.20997 11.3506 9.20997 13.7931C9.20997 16.2355 11.1307 18.2155 13.5 18.2155Z" stroke="#FF4E4E" stroke-width="3"/>
            <path d="M1.97747 11.2133C4.68622 -1.06168 22.3275 -1.0475 25.0225 11.2275C26.6037 18.4281 22.2587 24.5231 18.45 28.2935C15.6862 31.0433 11.3137 31.0433 8.53622 28.2935C4.74122 24.5231 0.396216 18.4139 1.97747 11.2133Z" stroke="#FF4E4E" stroke-width="3"/>
        </svg>`;
    }
}

customElements.define("main-navbar", MainNavbar);
customElements.define("guest-navbar", GuestNavbar);
customElements.define("login-navbar", LoginNavbar);
customElements.define("search-bar", SearchBar);
customElements.define("tag-selector", TagsSelector);
customElements.define("tag-filter", TagFilter);
customElements.define("tag-select", TagSelect);
customElements.define("number-input", NumberInput);
customElements.define("tag-display", TagDisplay);
customElements.define("req-tag", RequirementTag);
customElements.define("act-card", ActivityCard);
customElements.define("act-card-join-btn", ActCardJoinBtn);
customElements.define("pagination-item", PaginationItem);
customElements.define("member-list-item", MemberListItem);
customElements.define("act-detail-join-btn", ActDetailJoinBtn);
customElements.define("all-act-banner", AllActBanner);

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
customElements.define("svg-bookmark", SVGBookMark);
customElements.define("svg-more-people", SVGMorePeople);
customElements.define("svg-check", SVGCheck);
customElements.define("svg-location", SVGLocation);

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
class SelectActivities extends HTMLElement {
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
        `;
        this.querySelector('#Upcoming_button').addEventListener('click', () => this.changeHeader('Upcoming'));
        this.querySelector('#History_button').addEventListener('click', () => this.changeHeader('History'));
    }

    // changeHeader(headerText) {
    //     const event = new CustomEvent('headerChange', { detail: { text: headerText } });
    //     console.log(event)
    //     this.dispatchEvent(event);
    // }
}

customElements.define("select-activities", SelectActivities);

class Member extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <li class="member">
            <div class="member-content">
                <img src="assets/Profile-w-b.png" alt="Profile">
                <span class="member-name"></span>
                <span class="member-role"></span>
            </div>
            <button class="rate-btn">
                <img src="assets/yellow_star_outline.png" alt="Rate">
                <span class="review-text">review</span>
            </button>
        </li>
        `;
    }

    connectedCallback() {
        this.querySelector(".member-name").textContent = this.getAttribute("name") || "Unknown";
        this.querySelector(".member-role").textContent = `(${this.getAttribute("role") || "Member"})`;
    }
}

class ActivityDropdown extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `        
        <div class="activity-dropdown">
            <button class="activity-dropdown-btn">
                <div class="activity-details">
                    <span class="activity-name"></span>
                    <div class="tags"></div>
                    <span class="date">
                        <img src="assets/calendar_icon.png" alt="calendar"> 
                        <span class="date-text"></span>
                    </span>
                </div>
                <img src="assets/down_arrow_icon.png" alt="Dropdown Arrow">
            </button>

            <div class="activity-dropdown-content">
                <div class="dropdown-container">
                    <img src="assets/people_icon.png" alt="People">
                    <ul class="members"></ul>
                </div>
                <button class="view-details">View Details</button>
            </div>
        </div>
        `;

        this.querySelector(".activity-dropdown-btn").addEventListener("click", () => {
            this.querySelector(".activity-dropdown").classList.toggle("open");
        });
    }

    connectedCallback() {
        this.querySelector(".activity-name").textContent = this.getAttribute("activity-name") || "No Activity";
        this.querySelector(".date-text").textContent = this.getAttribute("date") || "Unknown Date";

        const tagsContainer = this.querySelector(".tags");
        const tags = JSON.parse(this.getAttribute("tags") || "[]");
        tags.forEach(tag => {
            const span = document.createElement("span");
            span.classList.add("tag");
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });

        const membersContainer = this.querySelector(".members");
        const members = JSON.parse(this.getAttribute("members") || "[]");
        members.forEach(member => {
            const memberElement = document.createElement("custom-member");
            memberElement.setAttribute("name", member.name);
            memberElement.setAttribute("role", member.role);
            membersContainer.appendChild(memberElement);
        });
    }
}

class ActivitiesList extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `        
        <div class="activities-bg">
            <h2 class="activities-header">Upcoming</h2>
            <div class="activities"></div>
        </div>
        `;
    }

    connectedCallback() {
        this.addEventListener("activity-selected", this.handleActivitySelected);

        const activitiesContainer = this.querySelector(".activities");
        const activities = JSON.parse(this.getAttribute("activities") || "[]");

        activities.forEach(activity => {
            const activityElement = document.createElement("activity-dropdown");
            activityElement.setAttribute("activity-name", activity.name);
            activityElement.setAttribute("date", activity.date);
            activityElement.setAttribute("tags", JSON.stringify(activity.tags));
            activityElement.setAttribute("members", JSON.stringify(activity.members));
            activitiesContainer.appendChild(activityElement);
        });
    }

    // handleActivitySelected(event) {
    //     const activityType = event.detail.type;
    //     const header = this.querySelector(".activities-header");
    //     if (activityType === "Upcoming") {
    //         header.textContent = "Upcoming";
    //     } else if (activityType === "History") {
    //         header.textContent = "History";
    //     }
    // }
}

customElements.define("activities-list", ActivitiesList);
customElements.define("activity-dropdown", ActivityDropdown);
customElements.define("custom-member", Member);



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

