// const { Divide } = require("lucide-svelte");

var path = "/assets/";

function getCookie(name) {
  const cookieArr = document.cookie.split("; ");
  for (let cookie of cookieArr) {
    let [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

class ApprovedNoti extends HTMLElement {
  constructor() {
    super();
    this.activity_id = this.getAttribute("activity-id");
    this.activity_title = this.getAttribute("activity-title");
    this.time = this.getAttribute("time");
    this.innerHTML = `<li class="noti-list">
            <div class="noti-icon gr-w flex">
                <svg-check></svg-check>
            </div>
            <span class="noti-act-title">
                ${this.activity_title}
            </span>
            <span class="noti-message">
                your request to join has been approved.
            </span>
            <span class="noti-datetime">
              ${this.time}
            </span>
        </li>`;

    this.addEventListener('click', this.navigateToActivityDetail);
    this.style.cursor = 'pointer';
  }

  navigateToActivityDetail() {
    const url = `${window.location.origin}/ActivityDetail/${this.activity_id}`;
    window.location.href = url;
  }
}
customElements.define("approved-noti", ApprovedNoti);

class DeniedNoti extends HTMLElement {
  constructor() {
    super();
    this.activity_id = this.getAttribute("activity-id");
    this.activity_title = this.getAttribute("activity-title");
    this.time = this.getAttribute("time");
    this.innerHTML = `<li class="noti-list">
            <div class="noti-icon r-w flex">
                <svg-deny></svg-deny>
            </div>
            <span class="noti-act-title">
                ${this.activity_title}
            </span>
            <span class="noti-message">
                your request to join has been denied.
            </span>
            <span class="noti-datetime">
                ${this.time}
            </span>
        </li>`;
      
    this.addEventListener('click', this.navigateToActivityDetail);
    this.style.cursor = 'pointer';
  }

  navigateToActivityDetail() {
    const url = `${window.location.origin}/ActivityDetail/${this.activity_id}`;
    window.location.href = url;
  }
}
customElements.define("denied-noti", DeniedNoti);

class KickNoti extends HTMLElement {
  constructor() {
    super();
    this.activity_id = this.getAttribute("activity-id");
    this.activity_title = this.getAttribute("activity-title");
    this.time = this.getAttribute("time");
    this.innerHTML = `<li class="noti-list">
            <div class="noti-icon r-w flex">
                <svg-minus></svg-minus>
            </div>
            <span class="noti-act-title">
                ${this.activity_title}
            </span>
            <span class="noti-message">
                You have been kicked out of this activity.
            </span>
            <span class="noti-datetime">
                ${this.time}
            </span>
        </li>`;

        this.addEventListener('click', this.navigateToActivityDetail);
        this.style.cursor = 'pointer';
  }

  navigateToActivityDetail() {
    const url = `${window.location.origin}/ActivityDetail/${this.activity_id}`;
    window.location.href = url;
  }
}
customElements.define("kick-noti", KickNoti);


class JoinedNoti extends HTMLElement {
  constructor() {
    super();
    this.activity_id = this.getAttribute("activity-id");
    this.activity_title = this.getAttribute("activity-title");
    this.name = this.getAttribute("name");
    this.time = this.getAttribute("time");
    this.innerHTML = `<li class="noti-list">
            <div class="noti-icon gr-w flex">
                <svg-plus></svg-plus>
            </div>
            <span class="noti-act-title">
                ${this.activity_title}
            </span>
            <span class="noti-message">
                ${this.name} has joined your activity.
            </span>
            <span class="noti-datetime">
                ${this.time}
            </span>
        </li>`;
  
    this.addEventListener('click', this.navigateToActivityDetail);
    this.style.cursor = 'pointer';
  }

  navigateToActivityDetail() {
    const url = `${window.location.origin}/ActivityDetail/${this.activity_id}`;
    window.location.href = url;
  }
}
customElements.define("joined-noti", JoinedNoti);

class LeaveNoti extends HTMLElement {
  constructor() {
    super();
    this.activity_id = this.getAttribute("activity-id");
    this.activity_title = this.getAttribute("activity-title");
    this.name = this.getAttribute("name");
    this.time = this.getAttribute("time");
    this.innerHTML = `<li class="noti-list">
            <div class="noti-icon r-w flex">
                <svg-minus></svg-minus>
            </div>
            <span class="noti-act-title">
                ${this.activity_title}
            </span>
            <span class="noti-message">
                ${this.name} has left your activity.
            </span>
            <span class="noti-datetime">
                ${this.time}
            </span>
        </li>`;
  
    this.addEventListener('click', this.navigateToActivityDetail);
    this.style.cursor = 'pointer';
  }

  navigateToActivityDetail() {
    const url = `${window.location.origin}/ActivityDetail/${this.activity_id}`;
    window.location.href = url;
  }
}
customElements.define("leave-noti", LeaveNoti);

class PendingNoti extends HTMLElement {
  constructor() {
    super();
    this.activity_id = this.getAttribute("activity-id");
    this.activity_title = this.getAttribute("activity-title");
    this.name = this.getAttribute("name");
    this.time = this.getAttribute("time");
    this.innerHTML = `<li class="noti-list">
            <div class="noti-icon y-w flex">
                <svg-plus></svg-plus>
            </div>
            <span class="noti-act-title">
                ${this.activity_title}
            </span>
            <span class="noti-message">
                ${this.name} want to join your activity.
            </span>
            <span class="noti-datetime">
                ${this.time}
            </span>
        </li>`;
  
    this.addEventListener('click', this.navigateToActivityDetail);
    this.style.cursor = 'pointer';
  }

  navigateToActivityDetail() {
    const url = `${window.location.origin}/ActivityDetail/${this.activity_id}`;
    window.location.href = url;
  }
}
customElements.define("pending-noti", PendingNoti);

class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = 
    `<form class="search-bar shadow">
        <input id="search_input" type="text" name="search_string" placeholder="search activities..." required>
        <div class="search-bar-x">
            <button type="button" class="btn" id="clear-search-button">
                <svg-x></svg-x>
            </button>
        </div>
        <button type="submit" class="btn search-bar-search" id="seach-button">
            <svg-search></svg-search>
        </button>
    </form>`;
    this.search_key = null;
    this.clear_search = this.clear_search.bind(this);
  }

  connectedCallback() {
    this.clear_search_button = this.querySelector("#clear-search-button");
    this.clear_search_button.addEventListener("click", this.clear_search);

    this.search_btn = this.querySelector("#seach-button");
    this.search_input = this.querySelector("input");
    this.search_btn.addEventListener("click", () => {
      this.search_key = this.search_input.value;
    });
  }

  get result() {
    return this.search_key;
  }

  clear_search() {
    this.search_input = this.querySelector("#search_input");
    this.search_input.value = "";
    this.search_key = null;
  }
}

class SearchFriendBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = 
    `<form class="search-bar shadow">
        <input id="search_input" type="text" name="search_string" placeholder="search friend username..." required>
        <div class="search-bar-x">
            <button class="btn" id="clear_search_button">
                <svg-x></svg-x>
            </button>
        </div>
        <button type="button" class="btn search-bar-search" id="seach-button">
            <svg-search></svg-search>
        </button>
    </form>`;
    this.search_key = null;
    this.clear_search = this.clear_search.bind(this);
  }

  connectedCallback() {
    this.clear_search_button = this.querySelector("#clear_search_button");
    this.clear_search_button.addEventListener("click", this.clear_search);

    this.search_btn = this.querySelector("#seach-button");
    this.search_input = this.querySelector("input");
    this.search_btn.addEventListener("click", () => {
      console.log(this.search_input.value);
      this.search_key = this.search_input.value;
    });
  }

  get result() {
    return this.search_key;
  }

  clear_search() {
    this.search_input = this.querySelector("#search_input");
    console.log("seach key: ", this.search_input);
    this.search_input.value = "";
  }
}

class TagsSelector extends HTMLElement {
  constructor() {
    super();
    this.tag_name = this.getAttribute("data-tag_name");
    this.innerHTML = `<div class="pseudo-btn tag-show">
            <input type="checkbox" name="Tags" value="${this.tag_name}" id="tag_${this.tag_name}">
            <label for="tag_${this.tag_name}" class="btn tag-selector round shadow hover-w-bb-bb">${this.tag_name}</label>
        </div>`;
  }
}

class TagFilter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML =
    `<form class="flex gap tag-filter" id="tag_filter_form">
      <tag-selector data-tag_name="All"></tag-selector>
      <tag-selector data-tag_name="Art"></tag-selector>
      <tag-selector data-tag_name="Beauty"></tag-selector>
      <tag-selector data-tag_name="Entertain"></tag-selector>
      <tag-selector data-tag_name="Food"></tag-selector>
      <tag-selector data-tag_name="Hobby"></tag-selector>
      <tag-selector data-tag_name="Pet"></tag-selector>
      <tag-selector data-tag_name="Sport"></tag-selector>
      <tag-selector data-tag_name="Study"></tag-selector>
      <tag-selector data-tag_name="Travel"></tag-selector>
    </form>`;
  }

  connectedCallback() {
    this.tags = this.querySelectorAll("input");
    this.tag_all = this.querySelector("input[value='All']");
    this.tags.forEach((tag) => {
      tag.addEventListener("change", () => this.toggle_check(tag));
      tag.checked = tag.value === "All";
    });
  }

  disconnectedCallback() {
    this.tags.forEach((tag) => {
      tag.removeEventListener("change", () => this.toggle_check(tag));
    });
  }

  toggle_check(tag) {
    if (tag.value == "All" && tag.checked) {
      this.tags.forEach((input) => {
        if (input.value != "All") input.checked = false;
      });
    } else if (this.querySelectorAll("input:checked").length == 0) {
      this.tag_all.checked = true;
    } else {
      this.tag_all.checked = false;
    }
  }

  get result() {
    const selectedTags = [];

    if (this.tag_all.checked) return [];

    this.querySelectorAll("input:checked").forEach((input) => {
      selectedTags.push(input.value);
    });

    return selectedTags;
  }
}

class RangeFilterLi extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = 
      `<li>
        <div class="btn filter-header w-db hover-bb-w">
            <svg-star-outline></svg-star-outline>
            Age range
            <svg-down-arrow class="right"></svg-down-arrow>
        </div>
        <div class="range-filter-container">
            <div class="number-input">
                <input type="number" min="0" max="100" id="min-age-input" value="0">
                <input type="number" min="0" max="100" id="max-age-input" value="100">
            </div>
            <div class="pseudo-slider">
                <div class="pseudo-slider-progress"></div>
            </div>
            <div class="range-slider">
                <input type="range" min="0" max="100" value="0" step="1" id="min-age-input-range">
                <input type="range" min="0" max="100" value="100" step="1" id="max-age-input-range">
            </div>
            <div class="min-max-text">
                <span>min</span>
                <span>max</span>
            </div>
        </div>
    </li>`;
  }

  connectedCallback() {
    this.range_filter_header = this.querySelector(".filter-header");
    this.range_filter_container = this.querySelector(".range-filter-container");
    this.range_filter_header.addEventListener("click", () => {
      this.range_filter_container.classList.toggle("show");
      this.range_filter_header.classList.toggle("bb-w");
    });
    this.range_input = this.querySelectorAll(".range-slider input");
    this.num_input = this.querySelectorAll(".number-input input");
    this.progress = this.querySelector(".pseudo-slider div");
    this.num_gap = 1;
    this.handle_num_input();
    this.handle_range_input();
  }

  disconnectedCallback() {
    this.range_filter_header.removeEventListener("click");
  }

  get result() {
    return {
      min: parseInt(this.range_input[0].value),
      max: parseInt(this.range_input[1].value),
    };
  }

  reset() {
    this.range_input[0].value = 0;
    this.range_input[1].value = 100;
    this.num_input[0].value = 0;
    this.num_input[1].value = 100;
    this.progress.style.left = 0;
    this.progress.style.right = 0;
  }

  handle_num_input() {
  this.num_input.forEach((input) => {
    input.addEventListener("input", (e) => {
      let min_num = parseInt(this.num_input[0].value) || 0;
      let max_num = parseInt(this.num_input[1].value) || 100;

      if (min_num >= max_num) {
        min_num = max_num - this.num_gap;
        this.num_input[0].value = min_num;
      }

      if (max_num <= min_num) {
        max_num = min_num + this.num_gap;
        this.num_input[1].value = max_num;
      }

      this.range_input[0].value = min_num;
      this.range_input[1].value = max_num;

      this.progress.style.left = (min_num / this.range_input[0].max) * 100 + "%";
      this.progress.style.right = 100 - (max_num / this.range_input[1].max) * 100 + "%";
    });
  });
}


  handle_range_input() {
    this.range_input.forEach((input) => {
      input.addEventListener("input", (e) => {
        (this.min_val = parseInt(this.range_input[0].value)),
          (this.max_val = parseInt(this.range_input[1].value));

        if (this.max_val - this.min_val < 0) {
          if (e.target.className === "range-min") {
            this.range_input[0].value = this.max_val - this.num_gap;
          } else {
            this.range_input[1].value = this.min_val + this.num_gap;
          }
        } else {
          this.num_input[0].value = this.min_val;
          this.num_input[1].value = this.max_val;
          this.progress.style.left =
            (this.min_val / this.range_input[0].max) * 100 + "%";
          this.progress.style.right =
            100 - (this.max_val / this.range_input[1].max) * 100 + "%";
        }
      });
    });
  }
}
customElements.define("range-filter-li", RangeFilterLi);

class CheckFilterLi extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<li>
            <div class="btn filter-header w-db hover-bb-w">
                <svg-star-outline></svg-star-outline>
                Gender
                <svg-down-arrow class="right"></svg-down-arrow>
            </div>
            <div class="check-filter-container" id="gender-filter-container">
                <span class="check-filter-item">
                    <input type="checkbox" id="filter-male-check" name="check" value="male">
                    <label for="filter-male-check">male</label>
                </span>
                <span class="check-filter-item">
                    <input type="checkbox" id="filter-female-check" name="check" value="female">
                    <label for="filter-female-check">female</label>
                </span>
                <span class="check-filter-item">
                    <input type="checkbox" id="filter-lgbtq-check" name="check" value="lgbtq">
                    <label for="filter-lgbtq-check">lgbtq+</label>
                </span>
            </div>
        </li>`;
  }

  connectedCallback() {
    this.filter_header = this.querySelector(".filter-header");
    this.check_filter_container = this.querySelector(".check-filter-container");
    this.filter_header.addEventListener("click", () => {
      this.check_filter_container.classList.toggle("show");
      this.filter_header.classList.toggle("bb-w");
    });
  }

  disconnectedCallback() {
    this.filter_header.removeEventListener("click");
  }

  get result() {
    return Array.from(this.querySelectorAll("input:checked")).map(
      (input) => input.value
    );
  }

  reset() {
    this.querySelectorAll("input").forEach((input) => {
      input.checked = false;
    });
  }
}
customElements.define("check-filter-li", CheckFilterLi);

class DisplayFilter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<button class="filter-btn btn w-bb-bb display-filter hover-bb-w" id="display-filter">
            <svg-filter></svg-filter>
        </button>
        <div class="filter-dropdown shadow">
            <ul>
                <range-filter-li id="age-filter"></range-filter-li>
                <check-filter-li id="gender-filter"></check-filter-li>
            </ul>
            <div class="filter-button-container">
                <button class="btn w-bb-bb edge hover-w-mb-mb" id="clear-filter-btn">
                    <svg-delete></svg-delete>
                    clear
                </button>
                <button class="btn mb-w edge hover-lb-w-glow" id="save-filter-btn">
                    <svg-save></svg-save>
                    save
                </button>
            </div>
        </div>`;
    this.age_range = null;
    this.gender = null;
  }

  connectedCallback() {
    this.display_filter = this.querySelector("#display-filter");
    this.filter_dropdown = this.querySelector(".filter-dropdown");
    this.display_filter.addEventListener("click", () => {
      this.open();
    });

    this.age_filter = this.querySelector("#age-filter");
    this.gender_filter = this.querySelector("#gender-filter");

    this.querySelector("#clear-filter-btn").addEventListener("click", () => {
      this.clear_filter();
    });

    this.querySelector("#save-filter-btn").addEventListener("click", () => {
      this.age_range = this.age_filter.result;
      this.gender = this.gender_filter.result;
    });
  }

  disconnectedCallback() {
    this.display_filter.removeEventListener("click");
    this.querySelector("#clear-filter-btn").removeEventListener("click");
    this.querySelector("#save-filter-btn").removeEventListener("click");
  }

  get result() {
    this.data = {
      age: this.age_range,
      gender: this.gender,
    };
    return this.data;
  }

  open() {
    this.filter_dropdown.classList.toggle("show-dropdown");
    this.display_filter.classList.toggle("bb-w");
    this.sort = document.querySelector("display-sort");
    this.sort.close();
  }

  close() {
    if (this.filter_dropdown.classList.contains("show-dropdown")) {
      this.filter_dropdown.classList.toggle("show-dropdown");
      this.display_filter.classList.toggle("bb-w");
    }
  }

  clear_filter() {
    this.gender_filter.reset();
    this.age_filter.reset();
    this.age_range = null;
    this.gender = null;
  }
}
customElements.define("display-filter", DisplayFilter);

class DisplaySort extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<button class="filter-btn btn w-bb-bb display-sort hover-bb-w" id="display-sort">
            <svg-sort></svg-sort>
        </button>
        <div class="sort-dropdown shadow">
            <ul>
                <li class="pseudo-btn">
                    <input type="radio" value="Create_date" name="sort_option" id="create-date-sort" checked>
                    <label for="create-date-sort" class="btn sort-option-btn">Creation Date</label>    
                </li>
                <li class="pseudo-btn">
                    <input type="radio" value="Popular" name="sort_option" id="popular-sort">
                    <label for="popular-sort" class="btn sort-option-btn">Popularity</label>    
                </li>
                <li class="pseudo-btn">
                    <input type="radio" value="Activity_time" name="sort_option" id="act-time-sort">
                    <label for="act-time-sort" class="btn sort-option-btn">Activity Date</label>
                </li>
                <li class="pseudo-btn">
                    <input type="radio" value="Participants" name="sort_option" id="participant-sort">
                    <label for="participant-sort" class="btn sort-option-btn">Number of Members</label>
                </li>
            </ul>
        </div>`;
  }

  connectedCallback() {
    this.display_sort = this.querySelector("#display-sort");
    this.dropdown = this.querySelector(".sort-dropdown");
    this.display_sort.addEventListener("click", () => {
      this.open();
    });
  }

  disconnectedCallback() {
    this.sort_filter.removeEventListener("click");
  }

  get result() {
    this.selected = this.querySelector("input:checked").value;
    // console.log("sort:", this.selected);
    return this.selected;
  }

  open() {
    this.dropdown.classList.toggle("show-dropdown");
    this.display_sort.classList.toggle("bb-w");
    this.filter = document.querySelector("display-filter");
    this.filter.close();
  }

  close() {
    if (this.dropdown.classList.contains("show-dropdown")) {
      this.dropdown.classList.toggle("show-dropdown");
      this.display_sort.classList.toggle("bb-w");
    }
  }
}
customElements.define("display-sort", DisplaySort);

class TagSelect extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<div class="tag-col">
            <tag-selector data-tag_name="Art"></tag-selector>
            <tag-selector data-tag_name="Beauty"></tag-selector>
            <tag-selector data-tag_name="Entertain"></tag-selector>
            <tag-selector data-tag_name="Food"></tag-selector>
            <tag-selector data-tag_name="Hobby"></tag-selector>
            <tag-selector data-tag_name="Pet"></tag-selector>
            <tag-selector data-tag_name="Sport"></tag-selector>
            <tag-selector data-tag_name="Study"></tag-selector>
            <tag-selector data-tag_name="Travel"></tag-selector>
        </div>
        `;
  }

  connectedCallback() {
    this.addEventListener("change", (event) => {
      event.preventDefault();
      this.showselected();
    });
    this.querySelectorAll("input").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const checkedCount = this.querySelectorAll("input:checked").length;
        if (checkedCount > 3) {
          checkbox.checked = false;
        }
      });
    });
  }

  showselected() {
    const selectedTags = [];

    this.querySelectorAll("input:checked").forEach((input) => {
      selectedTags.push(input.value);
    });

    console.log("create activity Tags:", selectedTags);
  }
}

class NumberInput extends HTMLElement {
  constructor() {
    super();
    this.name = this.getAttribute("data-name");
    this.default = this.getAttribute("default-value");
    this.innerHTML = `
            <div class="number-input-container">
                <button type="button" id="decrease">-</button>
                <input type="text" name="${this.name}" id="number" value=${this.default}>
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
    if (newValue < 0) newValue = 0;
    this.input.value = newValue;
  }

  validateInput() {
    let value = this.input.value;
    this.input.value = value.replace(/[^0-9]/g, "");
  }
}

// Register custom element

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
            this.innerHTML = `<li><label class="tag w-r-r small round">${this.value} or older</label></li>`;
        }
        else {
            if (this.value == "female")
            {
                this.innerHTML = `<li><label class="tag w-p-p small round">female</label></li>`;
            }
            else if (this.value == "male") {
                this.innerHTML = `<li><label class="tag w-mb-mb small round">male</label></li>`;
            }
            else if (this.value == "lgbtq") {
                this.innerHTML = `<li><label class="tag w-rb-rb small"><span>lgbtq</span></label></li>`;
            }
        }
    }
}

// still missing
class ActivityCard extends HTMLElement {
  constructor(activity) {
    super();
    // this.style.display = "block";
    if (activity) {
      [this.act_date, this.act_time] = activity.activity_time.split("-");
      this.innerHTML = `
            <div class="activity-card shadow">
                <div class="act-card-header">
                    <div class="act-card-profile-info">
                        <div><img src="${
                          activity.host.profile_pic
                        }" class="profile-img" ></div>
                        <div>
                            <span>${
                              activity.host.firstName +
                              " " +
                              activity.host.lastName
                            }</span>
                            <svg-${activity.host.gender} aria-label="${
        activity.host.gender
      }"></svg-${activity.host.gender}>
                        </div>
                        <div>
                            <span>${activity.create_time}</span>
                            <span aria-label="review" class="act-card-review">
                                <svg-star-sharp></svg-star-sharp>
                                ${activity.host.review}
                            </span>
                        </div>
                    </div>
                    <div class="act-card-member">${activity.member_count + "/" + activity.max_member}</div>
                </div>
                
                <ul class="act-card-tags-container">
                    ${activity.tags
                      .map(
                        (tag) => `
                        <li>
                            <tag-display data-tag_name="${tag}"></tag-display>
                        </li>
                    `
                      )
                      .join("")}
                </ul>
                <div class="title">
                    <h2>${activity.title}</h2>
                </div>
                <ul class="act-card-tags-container">
                    ${activity.requirement.age ? `<req-tag data-type="age" data-value="${activity.requirement.age}"></req-tag>`:""}
                    ${activity.requirement.gender=="none" ? "":`<req-tag data-type="gender" data-value="${activity.requirement.gender}"></req-tag>`}
                </ul>
                <ul class="act-card-info">
                    <li>
                        <svg-clock></svg-clock><span>${
                          this.act_time + " (" + activity.duration + " hr)"
                        }</span>
                    </li>
                    <li>
                        <svg-calendar></svg-calendar><span>${
                          this.act_date
                        }</span>
                    </li>
                    <li>
                        <act-card-join-btn data-act-id="${
                          activity.activity_id
                        }"></act-card-join-btn>
                    </li>
                </ul>
            </div>`;
    } else {
      this.innerHTML = `
            <div class="activity-card shadow">
                <div class="act-card-profile-info">
                    <div><img src="${path + "profile-g.png"}"></div>
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
            </div>`;
    }
  }
}

class ActCardJoinBtn extends HTMLElement {
    constructor() {
        super();
        this.act_id = this.getAttribute("data-act-id");
        this.innerHTML=`<button onclick="window.location.href='ActivityDetail/${this.act_id}'" class="btn small round mb-w hover-w-bb-bb hover-ani-bounce">join</button>`;
        this.act_id = this.getAttribute("data-act-id");
        this.innerHTML=`<button onclick="window.location.href='ActivityDetail/${this.act_id}'" class="btn small round mb-w hover-w-bb-bb">join</button>`;
    }
}

class Pagination extends HTMLElement {
  constructor() {
    super();
    this._max_page = 0;
    this._current_page = 1;
    this.innerHTML = `<div class="pagination-container round shadow">
            <button class="pagination-btn btn round" id="prev_button"><svg-prev></svg-prev></button>
            <div id="page-number-container"></div>
            <button class="pagination-btn btn round" id="next_button"><svg-next></svg-next></button>
        </div>`;
  }

  connectedCallback() {
    this.handle_page_change();
  }

  render(max_page) {
    this.container = this.querySelector("#page-number-container");
    this._max_page = max_page;
    this.container.innerHTML = Array.from(
      { length: max_page },
      (_, i) => `<pagination-item data-value="${i + 1}"></pagination-item>`
    ).join("");
    this.apply_style();
    this.disable_dir_btn();
  }

  handle_page_change() {
    this.prev_btn = this.querySelector("#prev_button");
    this.prev_btn.addEventListener("click", () => this.change_page(-1));

    this.next_btn = this.querySelector("#next_button");
    this.next_btn.addEventListener("click", () => this.change_page(1));

    this.addEventListener("change", () => {
      this.selected_page = parseInt(
        this.querySelector("input:checked").value,
        10
      );
      this.to_page(this.selected_page);
    });
  }

  change_page(dir) {
    if (
      this._current_page + dir >= 1 &&
      this._current_page + dir <= this.max_page
    ) {
      this._current_page += dir;
    }
    this.apply_style();
    this.disable_dir_btn();
    this.dispatchEvent(
      new CustomEvent("page-changed", {
        detail: { page: this._current_page },
        bubbles: true,
        composed: true,
      })
    );
  }

  to_page(page) {
    this._current_page = page;
    this.disable_dir_btn();
    this.dispatchEvent(
      new CustomEvent("page-changed", {
        detail: { page: this._current_page },
        bubbles: true,
        composed: true,
      })
    );
  }

  apply_style() {
    if (this.max_page > 0) {
      this.querySelector(`input[value='${this._current_page}']`).checked = true;
    }
  }

  disable_dir_btn() {
    this.prev_btn.disabled = (this._current_page === 1 || this._max_page === 0);
    this.next_btn.disabled = (this._current_page === this._max_page || this._max_page === 0);
  }

  get max_page() {
    return this._max_page;
  }

  get current_page() {
    return this._current_page;
  }
}

customElements.define("custom-pagination", Pagination);

class PaginationItem extends HTMLElement {
  constructor() {
    super();
    this.page_value = this.getAttribute("data-value");
    this.innerHTML = `<div class="pseudo-btn pagination-item">
            <input type="radio" value="${this.page_value}" name="page" id="page_${this.page_value}">
            <label class="pagination-btn btn round" for="page_${this.page_value}">${this.page_value}</label>
        </div>`;
  }

  connectedCallback() {}

  disconnectedCallback() {}

  get page() {
    return this.page_value;
  }
}

//separate later
class MemberListItem extends HTMLElement {
    constructor() {
        super();
        this.name = this.getAttribute("name");
        this.username = this.getAttribute("username")
        this.profile_pic = this.getAttribute("profile-pic");
        this.innerHTML = 
            `<li class="w-bb-bb member-list-item">
                <div class="member-list-item-profile">
                    <img class="profile" src="${this.profile_pic}">
                </div>
                <a href="/Profile/${this.username}" class="member-list-item-name">${this.name}</a>
                <span class="member-list-item-role flex">(Member)</span>
            </li>`;
  }
}
class HostListItem extends HTMLElement {
    constructor() {
        super();
        this.name = this.getAttribute("name");
        this.username = this.getAttribute("username")
        this.profile_pic = this.getAttribute("profile-pic");
        this.innerHTML = 
        `<li class="radial-blue-bg member-list-item shadow">
            <div class="member-list-item-profile">
                <img class="profile" src="${this.profile_pic}">
                <img class="crown" src="../../assets/crown.svg">
            </div>
            <a href="/Profile/${this.username}" class="member-list-item-name">${this.name}</a>
            <span class="member-list-item-role flex">(Host)</span>
        </li>`;
  }
}
class PendingListItem extends HTMLElement {
    constructor() {
        super();
        this.number = this.getAttribute("number");
        this.innerHTML = 
        `<li class="pending-member-item">
            <svg-pending></svg-pending>
            <span>${this.number} more ${this.number > 1 ? "people":"person"} applied...</span>
        </li>`;
  }
}

class PendingHostViewListItem extends HTMLElement {
    constructor() {
        super();
        this.activity_id = this.getAttribute("data-activity-id");
        this.name = this.getAttribute("name")
        this.username = this.getAttribute("username")
        this.profile_pic = this.getAttribute("profile-pic")
        this.innerHTML = 
        `<li class="w-bb-bb member-list-item">
            <div class="member-list-item-profile">
                <img class="profile" src="${this.profile_pic}">
            </div>
            <a href="/Profile/${this.username}" class="member-list-item-name">${this.name}</a>
            <span class="member-list-item-role flex">waiting for approval...</span>
            <div class="member-list-item-approval flex">
                <button id="approveBtn" class="btn approval gr-w hover-w-gr-gr round">
                    <svg-check></svg-check>
                </button>
                <button id="denyBtn" class="btn approval r-w hover-w-r-r round">
                    <svg-deny></svg-deny>
                </button>
            </div>
        </li>`;
    }

    connectedCallback() {
        this.querySelector(".btn.approval.gr-w").addEventListener("click", () => this.approve_activity());
        this.querySelector(".btn.approval.r-w").addEventListener("click", () => this.deny_activity());
    }

    approve_activity() {
        fetch(`ApproveActivity/${this.activity_id}?username=${this.username}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log(data.message);
                window.location.reload();
            } else {
                console.error("Failed to approve activity");
            }
        })
        .catch(error => console.error("Error:", error));
    }

    deny_activity() {
        fetch(`DenyActivity/${this.activity_id}?username=${this.username}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log(data.message);
                window.location.reload();
            } else {
                console.error("Failed to deny activity");
            }
        })
        .catch(error => console.error("Error:", error));
    }
}

class MemberHostViewListItem extends HTMLElement {
    constructor() {
        super();
        this.activity_id = this.getAttribute("data-activity-id");
        this.name = this.getAttribute("name")
        this.username = this.getAttribute("username")
        this.profile_pic = this.getAttribute("profile-pic")
        this.innerHTML = 
        `<li class="w-bb-bb member-list-item">
            <div class="member-list-item-profile">
                <img class="profile" src="${this.profile_pic}">
            </div>
            <a href="/Profile/${this.username}" class="member-list-item-name">${this.name}</a>
            <span class="member-list-item-role flex">(Member)</span>
            <div class="member-list-item-approval flex">
                <button class="btn approval r-w hover-w-r-r round">
                    <svg-minus></svg-minus>
                </button>
            </div>
        </li>`;
    }

    connectedCallback() {
        this.querySelector("button").addEventListener("click", () => this.kick_activity());
    }

    kick_activity() {
        fetch(`KickActivity/${this.activity_id}?username=${this.username}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log(data.message);
                window.location.reload();
            } else {
                console.error("Failed to kick this member from activity");
            }
        })
        .catch(error => console.error("Error:", error));
    }
}

class ActDetailJoinBtn extends HTMLElement {
    constructor() {
        super();
        this.activity_id = this.getAttribute("data-activity-id");
        this.innerHTML = `<button class="btn large lb-w round act-detail-btn hover-w-bb-bb ani-bounce">join</button>`;
    }
    
    connectedCallback() {
        this.querySelector("button").addEventListener("click", () => this.join_activity());
    }

    join_activity() {
        fetch(`JoinActivity/${this.activity_id}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log(data.message);
                window.location.reload();
            } else {
                console.error("Failed to join activity");
            }
        })
        .catch(error => console.error("Error:", error));
    }
}

class ActDetailLeaveBtn extends HTMLElement {
    constructor() {
        super();
        this.activity_id = this.getAttribute("data-activity-id");
        this.innerHTML = `<button class="act-detial-leave-btn large btn r-w round hover-w-r-r">leave<svg-logout></svg-logout></button>`;
    }
    
    connectedCallback() {
        this.querySelector("button").addEventListener("click", () => this.leave_activity());
    }

    leave_activity() {
        fetch(`LeaveActivity/${this.activity_id}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log(data.message);
                window.location.reload();
            } else {
                console.error("Failed to leave activity");
            }
        })
        .catch(error => console.error("Error:", error));
    }
}

class ViewReviewBtn extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<button class="btn large y-w round act-detail-btn hover-w-y ani-bounce">view review</button>`;
    }
}

class DeleteBtn extends HTMLElement {
  constructor() {
    super();
    this.activity_id = this.getAttribute("data-activity-id");
    this.innerHTML = `<button class="btn medium r-w round right hover-w-r-r">
            <svg-delete></svg-delete>delete
        </button>`;
  }

  connectedCallback() {
      this.querySelector("button").addEventListener("click", () => this.delete_activity());
  }

  delete_activity() {
      fetch(`DeleteActivity/${this.activity_id}`, {
          method: 'POST',
          headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
      .then(data => {
          if (data.message) {
              console.log(data.message);
              window.location.reload();
          } else {
              console.error("Failed to delete activity");
          }
      })
      .catch(error => console.error("Error:", error));
  }
}

class CloseBtn extends HTMLElement {
  constructor() {
    super();
    this.activity_id = this.getAttribute("data-activity-id");
    this.innerHTML = `<button class="btn medium y-w round right hover-w-y-y close-btn">
            <svg-x></svg-x>close
        </button>`;
  }

  connectedCallback() {
      this.querySelector("button").addEventListener("click", () => this.close_activity());
  }

  close_activity() {
      fetch(`CloseActivity/${this.activity_id}`, {
          method: 'POST',
          headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
      .then(data => {
          if (data.message) {
              console.log(data.message);
              window.location.reload();
          } else {
              console.error("Failed to close activity");
          }
      })
      .catch(error => console.error("Error:", error));
  }
}

class AllActBanner extends HTMLElement {
  constructor() {
    super();
    this.current_page = 0;
    this.pictures = [
      "winter_login_pic2.jpg",
      "winter_login_pic.jpg",
      "1657770518.jpeg",
    ];

    this.innerHTML = `<div class="banner-container">
            <div class="banner-arrow">
                <button class="btn round" id="prev-banner-btn"><svg-prev></svg-prev></button>
            </div>
            <div class="banner-display edge shadow">
                <img src="${
                  path + this.pictures[this.current_page]
                }" id="banner_pic">
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
  }
  connectedCallback() {
    this.handle_banner_change(0);
    this.querySelector("#prev-banner-btn").addEventListener("click", () =>
      this.handle_banner_change(-1)
    );
    this.querySelector("#next-banner-btn").addEventListener("click", () => {
      this.handle_banner_change(1);
    });
  }

  handle_banner_change(value) {
    this.banner_pic = this.querySelector("#banner_pic");
    this.banner_pic.classList.add("fade-out");
    this.current_page += value;
    setTimeout(() => {
      if (this.current_page >= 3) {
        this.current_page = 0;
      } else if (this.current_page < 0) {
        this.current_page = 2;
      }

      this.page_list.forEach((page, index) => {
        page.classList.toggle("bb-w", this.current_page === index);
      });
      this.banner_pic.src = path + this.pictures[this.current_page];
      this.banner_pic.classList.remove("fade-out");
    }, 500);
  }
}
// SVG Components Class
class BaseSVGElement extends HTMLElement {
  constructor() {
    super();
    this.style.display = "inline-flex";
    this.style.width = "fit-content"
  }
}

class SVGCalendar extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.3125 7.89996H20.6875M4.6875 1V2.80021M18.0625 1V2.79999M22 5.94999V18.85C22 20.5897 20.433 22 18.5 22H4.5C2.567 22 1 20.5897 1 18.85V5.94999C1 4.21029 2.567 2.79999 4.5 2.79999H18.5C20.433 2.79999 22 4.21029 22 5.94999Z" stroke="#65DA8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `;
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
    this.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    this.innerHTML = `<svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
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

class SVGStarOutline extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2974 2.63248L11.6174 5.27248C11.7974 5.63998 12.2774 5.99248 12.6824 6.05998L15.0749 6.45748C16.6049 6.71248 16.9649 7.82248 15.8624 8.91748L14.0024 10.7775C13.6874 11.0925 13.5149 11.7 13.6124 12.135L14.1449 14.4375C14.5649 16.26 13.5974 16.965 11.9849 16.0125L9.74243 14.685C9.33743 14.445 8.66993 14.445 8.25743 14.685L6.01493 16.0125C4.40993 16.965 3.43493 16.2525 3.85493 14.4375L4.38743 12.135C4.48493 11.7 4.31243 11.0925 3.99743 10.7775L2.13743 8.91748C1.04243 7.82248 1.39493 6.71248 2.92493 6.45748L5.31743 6.05998C5.71493 5.99248 6.19493 5.63998 6.37493 5.27248L7.69493 2.63248C8.41493 1.19998 9.58493 1.19998 10.2974 2.63248Z" stroke="#5FA2FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
  }
}
customElements.define("svg-star-outline", SVGStarOutline);

class SVGPrev extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.4 6L8 10.6L6.6 12L0.6 6L6.6 0L8 1.4L3.4 6Z" fill="#9F9F9F"/>
        </svg>`;
  }
}

class SVGNext extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.6 6L0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6Z" fill="#9F9F9F"/>
        </svg>`;
  }
}

class SVGDownArrow extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.75 1.625L5.5 5.375L9.25 1.625" stroke="#5FA2FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
  }
}
customElements.define("svg-down-arrow", SVGDownArrow);

class SVGSave extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1667 16V9.33333H4.83333V16M4.83333 1V5.16667H11.5M14.8333 16H3.16667C2.72464 16 2.30072 15.8244 1.98816 15.5118C1.67559 15.1993 1.5 14.7754 1.5 14.3333V2.66667C1.5 2.22464 1.67559 1.80072 1.98816 1.48816C2.30072 1.17559 2.72464 1 3.16667 1H12.3333L16.5 5.16667V14.3333C16.5 14.7754 16.3244 15.1993 16.0118 15.5118C15.6993 15.8244 15.2754 16 14.8333 16Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
  }
}
customElements.define("svg-save", SVGSave);

class SVGBookMark extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="36" height="52" viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    this.innerHTML = `<svg width="55" height="33" viewBox="0 0 55 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.5417 27.9584V32.5417H16.0417V27.9584C16.0417 27.9584 16.0417 18.7917 29.7917 18.7917C43.5417 18.7917 43.5417 27.9584 43.5417 27.9584ZM36.6667 7.33338C36.6667 5.97363 36.2635 4.64442 35.508 3.51383C34.7526 2.38324 33.6789 1.50206 32.4226 0.981705C31.1664 0.461353 29.784 0.325205 28.4504 0.590478C27.1168 0.855752 25.8918 1.51053 24.9303 2.47202C23.9688 3.4335 23.314 4.65851 23.0488 5.99213C22.7835 7.32575 22.9196 8.70808 23.44 9.96433C23.9603 11.2206 24.8415 12.2943 25.9721 13.0497C27.1027 13.8052 28.4319 14.2084 29.7917 14.2084C31.615 14.2084 33.3637 13.484 34.653 12.1947C35.9423 10.9054 36.6667 9.15674 36.6667 7.33338ZM44 18.9292C45.2527 20.0849 46.2626 21.4786 46.9709 23.0288C47.6791 24.5791 48.0715 26.2548 48.125 27.9584V32.5417H55V27.9584C55 27.9584 55 20.0521 44 18.9292ZM41.25 0.458377C40.5576 0.458417 39.8694 0.566667 39.2104 0.77921C40.5512 2.70185 41.27 4.98942 41.27 7.33338C41.27 9.67733 40.5512 11.9649 39.2104 13.8875C39.8694 14.1001 40.5576 14.2083 41.25 14.2084C43.0734 14.2084 44.822 13.484 46.1114 12.1947C47.4007 10.9054 48.125 9.15674 48.125 7.33338C48.125 5.51001 47.4007 3.76133 46.1114 2.47202C44.822 1.18271 43.0734 0.458377 41.25 0.458377ZM18.3333 11.9167H11.4583V5.04171H6.875V11.9167H0V16.5H6.875V23.375H11.4583V16.5H18.3333V11.9167Z" fill="#90E1FF"/>
        </svg>
        `;
  }
}

class SVGCheckBox extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.728271 0.524658V30.2909H29.1417V15.0251L25.0826 19.2774V26.0385H4.78733V4.77697H19.3594L23.4184 0.524658H0.728271ZM29.1417 0.524658L16.9645 13.2816L12.9054 9.02929L8.84639 13.2816L16.9645 21.7862L33.2007 4.77697L29.1417 0.524658Z" fill="#56BEFF"/>
        </svg>`;
  }
}

class SVGLocation extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 18.2155C15.8693 18.2155 17.79 16.2355 17.79 13.7931C17.79 11.3506 15.8693 9.37067 13.5 9.37067C11.1307 9.37067 9.20997 11.3506 9.20997 13.7931C9.20997 16.2355 11.1307 18.2155 13.5 18.2155Z" stroke="#FF4E4E" stroke-width="3"/>
            <path d="M1.97747 11.2133C4.68622 -1.06168 22.3275 -1.0475 25.0225 11.2275C26.6037 18.4281 22.2587 24.5231 18.45 28.2935C15.6862 31.0433 11.3137 31.0433 8.53622 28.2935C4.74122 24.5231 0.396216 18.4139 1.97747 11.2133Z" stroke="#FF4E4E" stroke-width="3"/>
        </svg>`;
  }
}

class SVGPlus extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.82812 0.125V6.5H0.453125V10.75H6.82812V17.125H11.0781V10.75H17.4531V6.5H11.0781V0.125H6.82812Z" fill="#77DAFF"/>
        </svg>`;
  }
}

class SVGCheck extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="18" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.8334 2.25L7.37502 13.7083L2.16669 8.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
  }
}

class SVGDeny extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="16" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 2.5L2.5 15.5M2.5 2.5L15.5 15.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
  }
}

class SVGMinus extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="19" height="4" viewBox="0 0 19 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2H17" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
  }
}

class SVGDelete extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="25" height="28" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.125 8.25H4.875M4.875 8.25H26.875M4.875 8.25V27.5C4.875 28.2293 5.16473 28.9288 5.68046 29.4445C6.19618 29.9603 6.89565 30.25 7.625 30.25H21.375C22.1043 30.25 22.8038 29.9603 23.3195 29.4445C23.8353 28.9288 24.125 28.2293 24.125 27.5V8.25M9 8.25V5.5C9 4.77065 9.28973 4.07118 9.80546 3.55546C10.3212 3.03973 11.0207 2.75 11.75 2.75H17.25C17.9793 2.75 18.6788 3.03973 19.1945 3.55546C19.7103 4.07118 20 4.77065 20 5.5V8.25M11.75 15.125V23.375M17.25 15.125V23.375" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
  }
}

class SVGClose extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="800px" height="800px" viewBox="0 0 31.668 31.668"
      xml:space="preserve">
    <g>
      <path d="M15.835,0C7.089,0,0.001,7.09,0.001,15.834s7.088,15.834,15.834,15.834c8.743,0,15.832-7.09,15.832-15.834
        S24.578,0,15.835,0z M22.167,22.168H9.501V9.5h12.666V22.168L22.167,22.168z"/>
    </g>
    </svg>`;
  }
}

class SVGMail extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.66666 33.3334C5.74999 33.3334 4.95833 33.014 4.29166 32.3751C3.65277 31.7084 3.33333 30.9167 3.33333 30.0001V10.0001C3.33333 9.08342 3.65277 8.30564 4.29166 7.66675C4.95833 7.00008 5.74999 6.66675 6.66666 6.66675H33.3333C34.25 6.66675 35.0278 7.00008 35.6667 7.66675C36.3333 8.30564 36.6667 9.08342 36.6667 10.0001V30.0001C36.6667 30.9167 36.3333 31.7084 35.6667 32.3751C35.0278 33.014 34.25 33.3334 33.3333 33.3334H6.66666ZM20 21.6667L33.3333 13.3334V10.0001L20 18.3334L6.66666 10.0001V13.3334L20 21.6667Z" fill="#4D4D4D"/>
        </svg>`;
  }
}

class SVGPhone extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.6667 28.2001V33.2001C36.6686 33.6642 36.5735 34.1237 36.3875 34.549C36.2016 34.9743 35.9288 35.3561 35.5868 35.6699C35.2448 35.9836 34.841 36.2226 34.4012 36.3713C33.9615 36.52 33.4956 36.5752 33.0333 36.5334C27.9047 35.9761 22.9783 34.2237 18.65 31.4167C14.623 28.8579 11.2089 25.4437 8.65 21.4167C5.8333 17.0688 4.08041 12.1184 3.53333 6.96675C3.49168 6.50586 3.54646 6.04135 3.69417 5.60279C3.84188 5.16423 4.07929 4.76123 4.39128 4.41945C4.70327 4.07767 5.08301 3.8046 5.50632 3.61762C5.92963 3.43064 6.38723 3.33385 6.85 3.33341H11.85C12.6588 3.32545 13.443 3.61188 14.0563 4.1393C14.6696 4.66672 15.0701 5.39916 15.1833 6.20008C15.3944 7.80019 15.7858 9.37129 16.35 10.8834C16.5742 11.48 16.6228 12.1283 16.4898 12.7515C16.3569 13.3748 16.0481 13.9469 15.6 14.4001L13.4833 16.5167C15.8559 20.6893 19.3108 24.1442 23.4833 26.5167L25.6 24.4001C26.0531 23.952 26.6253 23.6432 27.2485 23.5102C27.8718 23.3773 28.5201 23.4258 29.1167 23.6501C30.6288 24.2143 32.1999 24.6057 33.8 24.8167C34.6096 24.931 35.349 25.3388 35.8776 25.9626C36.4061 26.5864 36.6869 27.3827 36.6667 28.2001Z" stroke="#4D4D4D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
  }
}

class SVGEdit extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_648_2715)">
        <path d="M26.1697 5.43672C26.4745 5.13207 26.8877 4.96094 27.3186 4.96094C27.7495 4.96094 28.1627 5.13207 28.4675 5.43672L33.3425 10.3117C33.6471 10.6164 33.8183 11.0297 33.8183 11.4606C33.8183 11.8915 33.6471 12.3047 33.3425 12.6095L18.7175 27.2345C18.4128 27.5392 17.9995 27.7105 17.5686 27.7106H12.6936C12.2626 27.7106 11.8493 27.5394 11.5446 27.2346C11.2398 26.9299 11.0686 26.5166 11.0686 26.0856V21.2106C11.0687 20.7796 11.24 20.3664 11.5447 20.0617L26.1697 5.43672ZM14.3186 21.8833V24.4606H16.8959L29.8959 11.4606L27.3186 8.88334L14.3186 21.8833ZM4.5686 11.4606C4.5686 10.5986 4.91101 9.77199 5.52051 9.16249C6.13 8.553 6.95665 8.21059 7.8186 8.21059H15.9436C16.3746 8.21059 16.7879 8.3818 17.0927 8.68654C17.3974 8.99129 17.5686 9.40461 17.5686 9.83559C17.5686 10.2666 17.3974 10.6799 17.0927 10.9846C16.7879 11.2894 16.3746 11.4606 15.9436 11.4606H7.8186V30.9606H27.3186V22.8356C27.3186 22.4046 27.4898 21.9913 27.7946 21.6865C28.0993 21.3818 28.5126 21.2106 28.9436 21.2106C29.3746 21.2106 29.7879 21.3818 30.0927 21.6865C30.3974 21.9913 30.5686 22.4046 30.5686 22.8356V30.9606C30.5686 31.8225 30.2262 32.6492 29.6167 33.2587C29.0072 33.8682 28.1806 34.2106 27.3186 34.2106H7.8186C6.95665 34.2106 6.13 33.8682 5.52051 33.2587C4.91101 32.6492 4.5686 31.8225 4.5686 30.9606V11.4606Z" fill="white"/>
        </g>
        <defs>
        <filter id="filter0_d_648_2715" x="0.568604" y="0.960938" width="37.2496" height="37.2498" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_648_2715"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_648_2715" result="shape"/>
        </filter>
        </defs>
        </svg>`;
  }
}

class SVGLogin extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.4444 30C18.0352 30 17.6924 29.8613 17.416 29.584C17.1396 29.3067 17.001 28.9639 17 28.5556C16.999 28.1473 17.1377 27.8044 17.416 27.5271C17.6943 27.2498 18.0371 27.1111 18.4444 27.1111H27.1111V6.88889H18.4444C18.0352 6.88889 17.6924 6.75022 17.416 6.47289C17.1396 6.19556 17.001 5.85274 17 5.44444C16.999 5.03615 17.1377 4.69333 17.416 4.416C17.6943 4.13867 18.0371 4 18.4444 4H27.1111C27.9056 4 28.5859 4.28311 29.1521 4.84933C29.7183 5.41556 30.001 6.09541 30 6.88889V27.1111C30 27.9056 29.7174 28.5859 29.1521 29.1521C28.5868 29.7183 27.9065 30.001 27.1111 30H18.4444ZM15.8083 18.4444H5.44445C5.03519 18.4444 4.69238 18.3058 4.41601 18.0284C4.13963 17.7511 4.00097 17.4083 4 17C3.99904 16.5917 4.13771 16.2489 4.41601 15.9716C4.6943 15.6942 5.03712 15.5556 5.44445 15.5556H15.8083L13.1 12.8472C12.8352 12.5824 12.7028 12.2574 12.7028 11.8722C12.7028 11.487 12.8352 11.15 13.1 10.8611C13.3648 10.5722 13.7019 10.4215 14.1111 10.409C14.5204 10.3965 14.8694 10.5351 15.1583 10.825L20.3222 15.9889C20.6111 16.2778 20.7556 16.6148 20.7556 17C20.7556 17.3852 20.6111 17.7222 20.3222 18.0111L15.1583 23.175C14.8694 23.4639 14.5266 23.6026 14.1299 23.591C13.7331 23.5794 13.3899 23.4287 13.1 23.1389C12.8352 22.85 12.709 22.5072 12.7216 22.1104C12.7341 21.7137 12.8723 21.3824 13.1361 21.1167L15.8083 18.4444Z" fill="white"/>
            <defs>
            <filter id="filter0_d_1072_2161" x="0" y="0" width="34" height="34" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1072_2161"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1072_2161" result="shape"/>
            </filter>
            </defs>
        </svg>`;
  }
}

class SVGLogout extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = 
    `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75M12 12.75L15.75 9M15.75 9L12 5.25M15.75 9H6.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }
}
customElements.define("svg-logout", SVGLogout);

class SVGFilter extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.75 2.375H2.25L11.25 13.0175V20.375L15.75 22.625V13.0175L24.75 2.375Z" stroke="#90E1FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
  }
}
customElements.define("svg-filter", SVGFilter);

class SVGSort extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = `<svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.375 1.875H21.625M4.75 7.5H18.25M9.25 13.125H13.75" stroke="#56BEFF" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`;
  }
}
customElements.define("svg-sort", SVGSort);

class SVGOrder extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML = 
      `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8.66667L9 2L2 8.66667M16 18L9 11.3333L2 18" stroke="#90E1FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
  }
}
customElements.define("svg-order", SVGOrder);

class SVGSnowflake extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML =
        `<svg width="25" height="27.5" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12.5L5.5 13.5L4 18M1.35962 15.9887L18.6407 6.01141M16 4L14.5 8.5L19 9.5M4 4L5.5 8.5L1 9.5M1.3623 6L18.6828 16M19 12.5L14.5 13.5L16 18M7 2.5L10 5.5L13 2.5M10 1V21M7 19.5L10 16.5L13 19.5" stroke="var(--blue80)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
  }
}
customElements.define("svg-snowflake", SVGSnowflake);

class SVGPending extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML =
        `<svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.6666 11.0834H17.2291V14.0209L19.7708 15.4897L18.9895 16.8438L15.6666 14.9272V11.0834ZM16.7083 9.00008C15.327 9.00008 14.0022 9.54882 13.0254 10.5256C12.0487 11.5023 11.5 12.8271 11.5 14.2084C11.5 15.5898 12.0487 16.9145 13.0254 17.8913C14.0022 18.868 15.327 19.4167 16.7083 19.4167C18.0896 19.4167 19.4144 18.868 20.3911 17.8913C21.3679 16.9145 21.9166 15.5898 21.9166 14.2084C21.9166 12.8271 21.3679 11.5023 20.3911 10.5256C19.4144 9.54882 18.0896 9.00008 16.7083 9.00008ZM16.7083 6.91675C18.6422 6.91675 20.4968 7.68498 21.8643 9.05243C23.2317 10.4199 24 12.2745 24 14.2084C24 16.1423 23.2317 17.9969 21.8643 19.3644C20.4968 20.7319 18.6422 21.5001 16.7083 21.5001C13.802 21.5001 11.2916 19.7917 10.1145 17.3334H0.041626V14.2084C0.041626 11.4376 5.59371 10.0417 8.37496 10.0417C8.99996 10.0417 9.77079 10.1147 10.5833 10.2501C11.2439 9.22641 12.1507 8.38486 13.2208 7.8025C14.2909 7.22013 15.49 6.91559 16.7083 6.91675ZM9.41663 14.2084C9.41663 13.4792 9.52079 12.7709 9.71871 12.1251C9.28121 12.0522 8.82288 12.0209 8.37496 12.0209C5.28121 12.0209 2.02079 13.5417 2.02079 14.2084V15.3542H9.51038C9.44902 14.9754 9.41767 14.5922 9.41663 14.2084ZM8.37496 0.666748C9.48003 0.666748 10.5398 1.10573 11.3212 1.88714C12.1026 2.66854 12.5416 3.72835 12.5416 4.83342C12.5416 5.93848 12.1026 6.99829 11.3212 7.77969C10.5398 8.5611 9.48003 9.00008 8.37496 9.00008C7.26989 9.00008 6.21008 8.5611 5.42868 7.77969C4.64728 6.99829 4.20829 5.93848 4.20829 4.83342C4.20829 3.72835 4.64728 2.66854 5.42868 1.88714C6.21008 1.10573 7.26989 0.666748 8.37496 0.666748ZM8.37496 2.64591C7.7948 2.64591 7.2384 2.87638 6.82816 3.28662C6.41793 3.69685 6.18746 4.25325 6.18746 4.83342C6.18746 5.41358 6.41793 5.96998 6.82816 6.38021C7.2384 6.79045 7.7948 7.02092 8.37496 7.02092C8.95512 7.02092 9.51152 6.79045 9.92176 6.38021C10.332 5.96998 10.5625 5.41358 10.5625 4.83342C10.5625 4.25325 10.332 3.69685 9.92176 3.28662C9.51152 2.87638 8.95512 2.64591 8.37496 2.64591Z" fill="#FDC330"/>
        </svg>`;
    }
}
customElements.define("svg-pending", SVGPending);

class SVGHamburger extends BaseSVGElement {
    constructor() {
        super();
        this.innerHTML =
        `<svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_1210_390)">
          <path d="M5 5H25V7H5V5ZM5 12H25V14H5V12ZM6 19H5V21H25V19H6Z" fill="white"/>
          <path d="M5 4.5H4.5V5V7V7.5H5H25H25.5V7V5V4.5H25H5ZM5 11.5H4.5V12V14V14.5H5H25H25.5V14V12V11.5H25H5ZM5 18.5H4.5V19V21V21.5H5H25H25.5V21V19V18.5H25H6H5Z" stroke="white"/>
          </g>
          <defs>
          <filter id="filter0_d_1210_390" x="0" y="0" width="30" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1210_390"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1210_390" result="shape"/>
          </filter>
          </defs>
        </svg>`;
    }
}
customElements.define("svg-hamburger", SVGHamburger);

class SVGHome extends BaseSVGElement {
  constructor() {
      super();
      this.innerHTML =
      `<svg width="34" height="30" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 0L0 12.75H4.25V29.75H12.75V21.25H21.25V29.75H29.75V12.6225L34 12.75L17 0Z" fill="white"/>
      </svg>`;
  }
}
customElements.define("svg-home", SVGHome);

class SVGTile extends BaseSVGElement {
  constructor() {
      super();
      this.innerHTML =
      `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6.11111V11H6.998V6.11111H4ZM7.998 11H11V6.11111H7.998V11ZM11 4.88889V0H7.998V4.88889H11ZM6.998 0H4V4.88889H6.998V0ZM3 0H0V4.88889H3V0ZM0 6.11111H3V11H0V6.11111Z" fill="#5FA2FF"/>
      </svg>`;
  }
}
customElements.define("svg-tile", SVGTile);

class SVGMember extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML =
    `<svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 10.6C24 11.2 22.8 11.6 21.4 11.8C20.5 10.1 18.7 8.8 16.6 7.9C16.8 7.6 17 7.4 17.2 7.1H18C21.1 7 24 8.9 24 10.6ZM6.8 7H6C2.9 7 0 8.9 0 10.6C0 11.2 1.2 11.6 2.6 11.8C3.5 10.1 5.3 8.8 7.4 7.9L6.8 7ZM12 8C14.2 8 16 6.2 16 4C16 1.8 14.2 0 12 0C9.8 0 8 1.8 8 4C8 6.2 9.8 8 12 8ZM12 9C7.9 9 4 11.6 4 14C4 16 12 16 12 16C12 16 20 16 20 14C20 11.6 16.1 9 12 9ZM17.7 6H18C19.7 6 21 4.7 21 3C21 1.3 19.7 0 18 0C17.5 0 17.1 0.1 16.7 0.3C17.5 1.3 18 2.6 18 4C18 4.7 17.9 5.4 17.7 6ZM6 6H6.3C6.1 5.4 6 4.7 6 4C6 2.6 6.5 1.3 7.3 0.3C6.9 0.1 6.5 0 6 0C4.3 0 3 1.3 3 3C3 4.7 4.3 6 6 6Z" fill="#56BEFF"/>
    </svg>`;
  }
}
customElements.define("svg-member", SVGMember);

class SVGChat extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML =
    `<svg width="36" height="34" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_1280_4167)">
    <path d="M22.504 34.108C23.7698 34.0209 25.025 33.8172 26.254 33.4996C27.7719 33.9592 29.3741 34.0633 30.938 33.8038C31.0004 33.7961 31.0631 33.7914 31.126 33.7897C31.684 33.7897 32.416 34.1121 33.484 34.791V33.6749C33.4845 33.4804 33.5367 33.2896 33.6351 33.1224C33.7336 32.9551 33.8748 32.8175 34.044 32.7239C34.5093 32.4593 34.9393 32.1618 35.334 31.8314C36.89 30.5218 37.768 28.773 37.768 26.9235C37.768 26.3131 37.672 25.7046 37.482 25.1244C37.954 24.25 38.33 23.3373 38.61 22.3864C39.51 23.7262 39.994 25.3077 40 26.9235C40 29.4379 38.824 31.783 36.786 33.4976C36.4447 33.7837 36.088 34.0469 35.716 34.2873V36.9025C35.716 37.801 34.672 38.3188 33.936 37.7829C33.2386 37.266 32.5179 36.7819 31.776 36.3323C31.5617 36.2078 31.3399 36.0968 31.112 35.9999C30.4929 36.0922 29.8679 36.1387 29.242 36.1389C26.702 36.1389 24.354 35.3793 22.504 34.108ZM9.062 28.8798C5.854 26.1741 4 22.4851 4 18.5322C4 10.4572 11.664 4 21.022 4C30.382 4 38.048 10.4552 38.048 18.5322C38.048 26.6072 30.382 33.0624 21.022 33.0624C19.97 33.0624 18.9333 32.9818 17.912 32.8206C17.472 32.9234 15.708 33.965 13.168 35.8085C12.248 36.4773 10.944 35.8326 10.944 34.7064V30.2478C10.2852 29.8376 9.65693 29.3797 9.064 28.8778M17.974 30.0705C18.0513 30.0705 18.1293 30.0766 18.208 30.0887C19.128 30.2418 20.066 30.319 21.022 30.3204C28.928 30.3204 35.254 24.9914 35.254 18.5302C35.254 12.071 28.928 6.74204 21.024 6.74204C13.12 6.74204 6.79 12.075 6.79 18.5322C6.79 21.655 8.27 24.5965 10.882 26.7986C11.5407 27.352 12.258 27.849 13.034 28.2895C13.2445 28.4072 13.4202 28.5791 13.5432 28.7875C13.6662 28.996 13.732 29.2337 13.734 29.4762V32.047C15.744 30.7072 17.066 30.0705 17.974 30.0705Z" fill="#DFF9FF"/>
    <path d="M14.124 21.0002C14.7207 21.0002 15.293 20.7614 15.715 20.3364C16.1369 19.9113 16.374 19.3348 16.374 18.7337C16.374 18.1325 16.1369 17.556 15.715 17.131C15.293 16.7059 14.7207 16.4671 14.124 16.4671C13.5273 16.4671 12.955 16.7059 12.533 17.131C12.1111 17.556 11.874 18.1325 11.874 18.7337C11.874 19.3348 12.1111 19.9113 12.533 20.3364C12.955 20.7614 13.5273 21.0002 14.124 21.0002ZM21.438 21.0002C22.0347 21.0002 22.607 20.7614 23.029 20.3364C23.4509 19.9113 23.688 19.3348 23.688 18.7337C23.688 18.1325 23.4509 17.556 23.029 17.131C22.607 16.7059 22.0347 16.4671 21.438 16.4671C20.8413 16.4671 20.269 16.7059 19.847 17.131C19.4251 17.556 19.188 18.1325 19.188 18.7337C19.188 19.3348 19.4251 19.9113 19.847 20.3364C20.269 20.7614 20.8413 21.0002 21.438 21.0002ZM28.75 21.0002C29.3467 21.0002 29.919 20.7614 30.341 20.3364C30.7629 19.9113 31 19.3348 31 18.7337C31 18.1325 30.7629 17.556 30.341 17.131C29.919 16.7059 29.3467 16.4671 28.75 16.4671C28.1533 16.4671 27.581 16.7059 27.159 17.131C26.7371 17.556 26.5 18.1325 26.5 18.7337C26.5 19.3348 26.7371 19.9113 27.159 20.3364C27.581 20.7614 28.1533 21.0002 28.75 21.0002Z" fill="#DFF9FF"/>
    </g>
    <defs>
    <filter id="filter0_d_1280_4167" x="0" y="0" width="44" height="42" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1280_4167"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1280_4167" result="shape"/>
    </filter>
    </defs>
    </svg>`;
  }
}
customElements.define("svg-chat", SVGChat);

class SVGSend extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML =
    `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10L1 19L19 10L1 1L4 10ZM4 10H10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }
}
customElements.define("svg-send", SVGSend);

class SVGBell extends BaseSVGElement {
  constructor() {
    super();
    this.innerHTML =
    `<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.0954 0C10.9441 0 7.54768 3.39645 7.54768 7.54768C7.54768 11.4725 5.58528 15.0199 2.49073 17.5861C0.94346 18.8692 0 20.6806 0 22.643H30.1907C30.1907 20.6806 29.285 18.8692 27.7 17.5861C24.6054 15.0199 22.643 11.4725 22.643 7.54768C22.643 3.39645 19.2843 0 15.0954 0ZM11.3215 26.4169C11.3215 28.4925 13.0197 30.1907 15.0954 30.1907C17.171 30.1907 18.8692 28.4925 18.8692 26.4169H11.3215Z" stroke-width="0px" fill="white"/>
    </svg>`;
  }
}
customElements.define("svg-bell", SVGBell);

customElements.define("search-bar", SearchBar);
customElements.define("search-friend-bar", SearchFriendBar);
customElements.define("tag-selector", TagsSelector);
customElements.define("tag-filter", TagFilter);
customElements.define("tag-select", TagSelect);
customElements.define("number-input", NumberInput);
customElements.define("tag-display", TagDisplay);
customElements.define("req-tag", RequirementTag);
customElements.define("act-card", ActivityCard);
customElements.define("act-card-join-btn", ActCardJoinBtn);
customElements.define("pagination-item", PaginationItem);
customElements.define("act-detail-join-btn", ActDetailJoinBtn);
customElements.define("act-detail-leave-btn", ActDetailLeaveBtn);
customElements.define("all-act-banner", AllActBanner);
customElements.define("view-review-btn", ViewReviewBtn);
customElements.define("delete-btn", DeleteBtn);
customElements.define("close-btn", CloseBtn);
customElements.define("member-list-item", MemberListItem);
customElements.define("host-list-item", HostListItem);
customElements.define("pending-list-item", PendingListItem);
customElements.define("member-host-view", MemberHostViewListItem);
customElements.define("pending-member-host-view", PendingHostViewListItem);

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
customElements.define("svg-checkbox", SVGCheckBox);
customElements.define("svg-location", SVGLocation);
customElements.define("svg-plus", SVGPlus);
customElements.define("svg-check", SVGCheck);
customElements.define("svg-deny", SVGDeny);
customElements.define("svg-minus", SVGMinus);
customElements.define("svg-delete", SVGDelete);
customElements.define("svg-close", SVGClose);
customElements.define("svg-mail", SVGMail);
customElements.define("svg-phone", SVGPhone);
customElements.define("svg-edit", SVGEdit);
customElements.define("svg-login", SVGLogin);

function change_icon(element, icon_hover, icon_default) {
  element.onmouseover = () => {
    element.firstElementChild.src = path + icon_hover;
  };

  element.onmouseleave = () => {
    element.firstElementChild.src = path + icon_default;
  };
}

function toggleInvertColor(element, toggle, img1, img2, color1, color2) {
  element.onclick = () => {
    toggle = !toggle;
    if (toggle) {
      element.style.backgroundColor = color1 ? color1 : "var(--medium_blue)";
      element.style.color = color2 ? color2 : "white";
      element.firstElementChild.src = "assets/" + img1;
    } else {
      element.style.backgroundColor = color2 ? color2 : "white";
      element.style.color = color1 ? color1 : "var(--medium_blue)";
      element.firstElementChild.src = "assets/" + img2;
    }
  };
}
class SelectActivities extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <ul class="select_type">
            <li>
                <button class="type active" id="Upcoming_button">Upcoming</button>
            </li>
            <li>
                <button class="type" id="History_button">History</button>
            </li>
        </ul>
        `;
  }

  connectedCallback() {
    const buttons = this.querySelectorAll(".type");

    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        buttons.forEach((btn) => btn.classList.remove("active"));

        event.target.classList.add("active");

        this.dispatchEvent(
          new CustomEvent("change-header", {
            detail: event.target.textContent,
            bubbles: true,
          })
        );
      });
    });
  }
}

class Member extends HTMLElement {
  constructor(member,activity_title, activity_id, activity_type, username) {
    super();
    this.activity_id = activity_id;
    this.member = member;
    this.activity_title = activity_title;
    this.activity_type = activity_type
    this.username = username;
  }

  connectedCallback() {
    if (this.username !== this.member.username && this.activity_type == "history" && this.activity_type !== null) {
      this.checkReviewStatus().then((hasReview) => {
        if (!hasReview) {
          this.innerHTML = `
          <li class="member">
            <div class="member-content">
              <img src="/assets/Profile-w-b.png" alt="Profile">
              <span class="member-name">${this.member.username}</span>
              <span class="member-role">${this.member.role}</span>
            </div>
            <button class="rate-btn">
              <img src="/assets/yellow_star_outline.png" alt="Rate">
              <span class="review-text">review</span>
            </button>
          </li>
          `;

        let ratingPopup = document.querySelector("rating-popup");
        if (!ratingPopup) {
          ratingPopup = new RatingPopup();
          document.body.appendChild(ratingPopup);
        }

        document.addEventListener("rating-completed", (event) => {
          if (event.detail.reviewedUser === this.member.username && 
              event.detail.activityId === this.activity_id) {
            const rateBtn = this.querySelector(".rate-btn");
            if (rateBtn) {
              rateBtn.style.display = "none";
            }
          }
        });

        this.querySelector(".rate-btn").addEventListener("click", () => {
          ratingPopup.openPopup(this.activity_title, this.activity_id,this.member.username);
        });
        } else {
          this.renderWithoutButton();
        }
    });
  } else {
    this.renderWithoutButton();
  }
}

  async checkReviewStatus() {
    try {
      const response = await fetch(`/Activity/HasReview?activityId=${this.activity_id}&reviewedUser=${this.member.username}`);
      if (!response.ok) throw new Error("Failed to check review status");
      const { hasReview } = await response.json();
      return hasReview;
    } catch (error) {
      console.error("Error checking review status:", error);
      return false;
    }
  }

  renderWithoutButton() {
    this.innerHTML = `
      <li class="member">
        <div class="member-content">
          <img src="/assets/Profile-w-b.png" alt="Profile">
          <span class="member-name">${this.member.username}</span>
          <span class="member-role">${this.member.role}</span>
        </div>
      </li>
      `;
  }
}

class ActivityDropdown extends HTMLElement {
  constructor(activity, username, activityType) {
    super();
    this.activityType = activityType;
    this.activity = activity;
    this.username = username;
    [this.act_date, this.act_time] = activity.activity_time.split("-");
    this.innerHTML = `
      <div class="activity-dropdown">
        <button class="activity-dropdown-btn">
          <div class="activity-details">
            <span class="activity-name">${activity.title}</span>
            <div class="tags-date">
              <div class="tags"></div>
              <span class="date">
                <svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="calendar">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <span class="date-text">${this.act_date} , ${this.act_time}</span>
              </span>
            </div>
          </div>
          <svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="chevon">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        <div class="activity-dropdown-content">
          <div class="dropdown-container">
            <svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="paticipants">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <ul class="members"></ul>
          </div>
          <button class="view-details">View Details</button>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    const tagsContainer = this.querySelector(".tags");
    this.activity.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.classList.add("tag");
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });

    const membersContainer = this.querySelector(".members");
    this.activity.participants.forEach((member) => {
      const memberElement = new Member(
        member,
        this.activity.title,
        this.activity.activity_id,
        this.activityType,
        this.username
      );
      membersContainer.appendChild(memberElement);
    });

    const dropdownBtn = this.querySelector(".activity-dropdown-btn");
    const dropdown = this.querySelector(".activity-dropdown");
    const content = this.querySelector(".activity-dropdown-content");
    const chevon = dropdownBtn.querySelector(".chevon");

    const closedPath = "m19.5 8.25-7.5 7.5-7.5-7.5";
    const openPath = "m4.5 15.75 7.5-7.5 7.5 7.5";

    dropdownBtn.addEventListener("click", () => {
      document.querySelectorAll(".activity-dropdown.open").forEach((openDropdown) => {
        if (openDropdown !== dropdown) {
          openDropdown.classList.remove("open");
          const openContent = openDropdown.querySelector(".activity-dropdown-content");
          openContent.style.height = "0px";
          openContent.style.marginTop = "-0.5rem";

          const otherChevon = openDropdown.querySelector(".chevon");
          if (otherChevon) {
            otherChevon.innerHTML = `
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            `;
          }
        }
      });

      if (dropdown.classList.contains("open")) {
        content.style.height = content.scrollHeight + "px";
        setTimeout(() => {
          content.style.height = "0px";
          content.style.marginTop = "-0.5rem";
          dropdown.classList.remove("open");

          chevon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          `;
        }, 10);
      } else {
        dropdown.classList.add("open");
        content.style.height = content.scrollHeight + "px";
        content.style.marginTop = "1rem";

        setTimeout(() => {
          content.style.height = "auto";
        }, 300);

        chevon.innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        `;
      }
    });
  }
}

class ActivitiesList extends HTMLElement {
  constructor() {
    super();
    this.initialHeader = this.getAttribute("header") || "Upcoming";

    this.innerHTML = `        
      <div class="activities-bg">
        <h2 class="activities-header">${this.initialHeader}</h2>
        <div class="activities" id="activities"></div>
      </div>
    `;
  }

  connectedCallback() {
    if (!this.hasAttribute("fixed-header")) {
      document.addEventListener("change-header", (event) => {
        this.querySelector(".activities-header").textContent = event.detail;
      });
    }
  }
}

class RatingPopup extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div class="rating-overlay"></div>
    <div class="rating-pop-up">
      <div class="rating-header">Rate activity member</div>
      <div class="rating-info">
        <div class="rating-activity-name"></div>
        <img src="/assets/Profile-g.png" alt="">
        <div class="rating-user-name"></div>
        <div class="rating-change-component">
          <div class="rating-stars">
            <span class="star" data-value="1">★</span>
            <span class="star" data-value="2">★</span>
            <span class="star" data-value="3">★</span>
            <span class="star" data-value="4">★</span>
            <span class="star" data-value="5">★</span>
          </div>
          <fieldset>
            <legend>Comment</legend>
            <textarea placeholder="Write your comment..."></textarea>
          </fieldset>
          <div class="post-btn">
            <button class="rating-cancel">Cancel</button>
            <button class="rating-post">Post</button>
          </div>
        </div>
      </div>
    </div>`;

    this.style.display = "none";
    this.classList.add("rating-popup-wrapper");

    
  }

  connectedCallback() {
    this.addEventListener("click", (event) => this.handleGlobalClick(event));
    this.originalContent = this.querySelector(
      ".rating-change-component"
    ).cloneNode(true);
    this.setupStarRating();
  }

  openPopup(activityTitle, activity_id,username) {
    this.activity_id = activity_id
    this.querySelector(".rating-activity-name").textContent = activityTitle;
    this.querySelector(".rating-user-name").textContent = username;
    this.resetComponent();
    this.style.display = "block";
  }

  closePopup() {
    this.style.display = "none";
  }

  resetComponent() {
    const container = this.querySelector(".rating-change-component");
    container.replaceWith(this.originalContent.cloneNode(true));
    this.querySelector(".rating-change-component").setAttribute("data-rating", "0");
    this.setupStarRating();
  }

  setupStarRating() {
    const stars = this.querySelectorAll(".star");
    const ratingComponent = this.querySelector(".rating-change-component");
    let selectedRating = 0;

    stars.forEach((star, index) => {
      star.addEventListener("click", () => {
        selectedRating = index + 1 === selectedRating ? 0 : index + 1;
        ratingComponent.setAttribute("data-rating", selectedRating);
        this.highlightStars(selectedRating);
      });
      star.addEventListener("mouseover", () => {
        this.highlightStars(index + 1);
      });
      this.querySelector(".rating-stars").addEventListener("mouseleave", () => {
        this.highlightStars(selectedRating);
      });
    });
  }

  highlightStars(count) {
    const stars = this.querySelectorAll(".star");
    stars.forEach((s, i) => {
      s.classList.toggle("active", i < count);
    });
  }

  handleGlobalClick(event) {
    if (
      event.target.classList.contains("rating-cancel") ||
      event.target.classList.contains("rating-overlay")
    ) {
      this.closePopup();
    } else if (event.target.classList.contains("rating-post")) {
      this.handlePostRating();
    }
  }

  async handlePostRating() {
    const comment = this.querySelector("textarea").value;

    const ratingComponent = this.querySelector(".rating-change-component");
    const rating = parseInt(ratingComponent.getAttribute("data-rating") || "0");

    const username = this.querySelector(".rating-user-name").textContent;

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    const reviewData = {
      Reviewed_user: username,
      Activity_id: this.activity_id,
      Rating: rating,
      Comment: comment
    };
    
    try {
      const container = this.querySelector(".rating-change-component");
      container.classList.add("fade-out");

      const response = await fetch("/Activity/Comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        console.log(reviewData);
        throw new Error("Failed to submit review");
      }

    setTimeout(() => {
      const successMessage = document.createElement("div");
      successMessage.classList.add("rating-success");
      successMessage.innerHTML = `
        <img src="assets/check_mark.png" alt="">
        <h3>Rating completed</h3>
      `;

        container.classList.remove("fade-out");
        container.innerHTML = "";
        container.appendChild(successMessage);

        const ratingCompletedEvent = new CustomEvent('rating-completed', {
          detail: {
            reviewedUser: username,
            activityId: this.activity_id
          },
          bubbles: true
        });
        this.dispatchEvent(ratingCompletedEvent);

        setTimeout(() => {
          successMessage.classList.add("fade-in");
        }, 10);
      }, 170);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");

      // Reset the fade-out effect
      const container = this.querySelector(".rating-change-component");
      container.classList.remove("fade-out");
    }
  }
}

customElements.define("select-activities", SelectActivities);
customElements.define("rating-popup", RatingPopup);
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
