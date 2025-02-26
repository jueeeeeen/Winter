﻿// const { Divide } = require("lucide-svelte");

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
    this.innerHTML = `<li class="noti-list">
            <div class="noti-icon gr-w flex">
                <svg-check></svg-check>
            </div>
            <span class="noti-act-title">
                Activity title
            </span>
            <span class="noti-message">
                your request to join has been approved.
            </span>
            <span class="noti-datetime">
                15 Jan 2025 12:59 
            </span>
        </li>`;
  }
}
customElements.define("approved-noti", ApprovedNoti);

class DeniedNoti extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<li class="noti-list">
            <div class="noti-icon r-w flex">
                <svg-deny></svg-deny>
            </div>
            <span class="noti-act-title">
                Activity title
            </span>
            <span class="noti-message">
                your request to join has been denied.
            </span>
            <span class="noti-datetime">
                15 Jan 2025 12:59 
            </span>
        </li>`;
  }
}
customElements.define("denied-noti", DeniedNoti);

class JoinedNoti extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<li class="noti-list">
            <div class="noti-icon y-w flex">
                <svg-plus></svg-plus>
            </div>
            <span class="noti-act-title">
                Activity title
            </span>
            <span class="noti-message">
                there is a new request to join this activity.
            </span>
            <span class="noti-datetime">
                15 Jan 2025 12:59 
            </span>
        </li>`;
  }
}
customElements.define("joined-noti", JoinedNoti);

class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = 
    `<form class="search-bar shadow">
        <input id="search_input" type="text" name="search_string" placeholder="search activities..." required>
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
    this.innerHTML = `<div class="pseudo-btn">
            <input type="checkbox" name="Tags" value="${this.tag_name}" id="tag_${this.tag_name}">
            <label for="tag_${this.tag_name}" class="btn tag-selector round shadow hover-w-bb-bb">${this.tag_name}</label>
        </div>`;
    this.input = this.querySelector("input");
  }
}

class TagFilter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML =
    `<form class="flex gap" id="tag_filter_form">
      <tag-selector data-tag_name="All"></tag-selector>
      <tag-selector data-tag_name="Entertain"></tag-selector>
      <tag-selector data-tag_name="Sport"></tag-selector>
      <tag-selector data-tag_name="Study"></tag-selector>
      <tag-selector data-tag_name="Hobby"></tag-selector>
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
    this.innerHTML = `<li>
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
        </li>
        `;
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

  // หาวิธีเขียนที่ดีกว่านี้ ตอนนี้ input ยังไม่ดัก invalid
  handle_num_input() {
    this.num_input.forEach((input) => {
      input.addEventListener("input", (e) => {
        (this.min_num = parseInt(this.num_input[0].value)),
          (this.max_num = parseInt(this.num_input[1].value));

        if (
          this.max_num - this.min_num >= this.num_gap &&
          this.max_num <= this.range_input[1].max
        ) {
          if (e.target.id === "min-age-input") {
            this.range_input[0].value = this.min_num;
            this.progress.style.left =
              (this.min_num / this.range_input[0].max) * 100 + "%";
          } else {
            this.range_input[1].value = this.max_num;
            this.progress.style.right =
              100 - (this.max_num / this.range_input[1].max) * 100 + "%";
          }
        }
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
    this.filter_dropdown.classList.toggle("show");
    this.display_filter.classList.toggle("bb-w");
    this.sort = document.querySelector("display-sort");
    this.sort.close();
  }

  close() {
    if (this.filter_dropdown.classList.contains("show")) {
      this.filter_dropdown.classList.toggle("show");
      this.display_filter.classList.toggle("bb-w");
    }
  }

  clear_filter() {
    console.log("clear");
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
    this.dropdown.classList.toggle("show");
    this.display_sort.classList.toggle("bb-w");
    this.filter = document.querySelector("display-filter");
    this.filter.close();
  }

  close() {
    if (this.dropdown.classList.contains("show")) {
      this.dropdown.classList.toggle("show");
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
                          path + activity.host.profile_pic
                            ? path + activity.host.profile_pic
                            : path + "profile-g.png"
                        }"></div>
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
        this.innerHTML = 
            `<li class="w-bb-bb member-list-item">
                <div class="member-list-item-profile">
                    <img class="profile" src="../../assets/profile-g.png">
                </div>
                <span class="member-list-item-name">${this.name}</span>
                <span class="member-list-item-role flex">(Member)</span>
            </li>`;
  }
}
class HostListItem extends HTMLElement {
    constructor() {
        super();
        this.name = this.getAttribute("name");
        this.innerHTML = 
        `<li class="radial-blue-bg member-list-item shadow">
            <div class="member-list-item-profile">
                <img class="profile" src="../../assets/profile-g.png">
                <img class="crown" src="../../assets/crown.svg">
            </div>
            <span class="member-list-item-name">${this.name}</span>
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
        this.innerHTML = 
        `<li class="w-bb-bb member-list-item">
            <div class="member-list-item-profile">
                <img class="profile" src="../../assets/profile-g.png">
            </div>
            <span class="member-list-item-name">${this.name}</span>
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
        this.innerHTML = 
        `<li class="w-bb-bb member-list-item">
            <div class="member-list-item-profile">
                <img class="profile" src="../../assets/profile-g.png">
            </div>
            <span class="member-list-item-name">${this.name}</span>
            <span class="member-list-item-role flex">(Member)</span>
            <div class="member-list-item-approval flex">
                <button class="btn approval r-w hover-w-r-r round">
                    <svg-minus></svg-minus>
                </button>
            </div>
        </li>`;
    }

    connectedCallback() {
        this.querySelector("button").addEventListener("click", () => this.deny_activity());
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

class ActDetailJoinBtn extends HTMLElement {
    constructor() {
        super();
        this.activity_id = this.getAttribute("data-activity-id");
        this.innerHTML = `<button class="btn large lb-w round act-detail-join-btn hover-w-bb-bb ani-bounce">join</button>`;
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
        this.innerHTML = `<button class="btn large r-w round act-detail-join-btn hover-w-r-r">leave</button>`;
    }
    
    connectedCallback() {
        this.querySelector("button").addEventListener("click", () => this.join_activity());
    }

    join_activity() {
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
        this.innerHTML = `<button class="btn large y-w round act-detail-join-btn hover-w-y ani-bounce">view review</button>`;
    }
}

class DeleteBtn extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<button class="btn medium r-w round right hover-w-r-r">
            <svg-delete></svg-delete>delete
        </button>`;
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
    this.innerHTML = `<svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.67636 10.3087C8.39511 10.0278 8.01386 9.87002 7.61636 9.87002C7.21885 9.87002 6.83761 10.0278 6.55635 10.3087L0.898356 15.9647C0.617093 16.2461 0.459135 16.6277 0.459229 17.0256C0.459322 17.4234 0.617461 17.8049 0.898855 18.0862C1.18025 18.3675 1.56185 18.5254 1.95971 18.5253C2.35757 18.5252 2.73909 18.3671 3.02036 18.0857L7.61636 13.4897L12.2124 18.0857C12.4951 18.3591 12.874 18.5104 13.2673 18.5072C13.6606 18.504 14.0369 18.3464 14.3151 18.0684C14.5933 17.7904 14.7513 17.4143 14.7549 17.021C14.7585 16.6277 14.6075 16.2487 14.3344 15.9657L8.67736 10.3077L8.67636 10.3087Z" stroke-width="2" fill="#56BEFF"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.67636 1.3087C8.39511 1.0278 8.01386 0.870022 7.61636 0.870022C7.21885 0.870022 6.83761 1.0278 6.55635 1.3087L0.898356 6.9647C0.617093 7.2461 0.459135 7.6277 0.459229 8.02556C0.459322 8.42342 0.617461 8.80494 0.898855 9.0862C1.18025 9.36746 1.56185 9.52542 1.95971 9.52533C2.35757 9.52524 2.73909 9.3671 3.02036 9.0857L7.61636 4.4897L12.2124 9.0857C12.4951 9.35908 12.874 9.51045 13.2673 9.50722C13.6606 9.50399 14.0369 9.34641 14.3151 9.06843C14.5933 8.79045 14.7513 8.4143 14.7549 8.02101C14.7585 7.62771 14.6075 7.24873 14.3344 6.9657L8.67736 1.3077L8.67636 1.3087Z" stroke-width="2" fill="#56BEFF"/>
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
customElements.define("act-detail-join-btn", ActDetailJoinBtn);
customElements.define("act-detail-leave-btn", ActDetailLeaveBtn);
customElements.define("all-act-banner", AllActBanner);
customElements.define("view-review-btn", ViewReviewBtn);
customElements.define("delete-btn", DeleteBtn);
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
    this.querySelector("#Upcoming_button").addEventListener("click", () =>
      this.changeHeader("Upcoming")
    );
    this.querySelector("#History_button").addEventListener("click", () =>
      this.changeHeader("History")
    );
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
    this.querySelector(".member-name").textContent =
      this.getAttribute("name") || "Unknown";
    this.querySelector(".member-role").textContent = `(${
      this.getAttribute("role") || "Member"
    })`;

    const ratingPopup = document.querySelector("rating-popup");
    this.querySelector(".rate-btn").addEventListener("click", () => {
      const activityName =
        this.closest("activity-dropdown")?.getAttribute("activity-name") ||
        "Unknown Activity";
      const name =
        this.querySelector(".member-name").textContent || "Unknown Name";
      ratingPopup.openPopup(
        this.querySelector(".member-name").textContent,
        activityName
      );
    });
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

    this.querySelector(".activity-dropdown-btn").addEventListener(
      "click",
      () => {
        this.querySelector(".activity-dropdown").classList.toggle("open");
      }
    );
  }

  connectedCallback() {
    this.querySelector(".activity-name").textContent =
      this.getAttribute("activity-name") || "No Activity";
    this.querySelector(".date-text").textContent =
      this.getAttribute("date") || "Unknown Date";

    const tagsContainer = this.querySelector(".tags");
    const tags = JSON.parse(this.getAttribute("tags") || "[]");
    tags.forEach((tag) => {
      const span = document.createElement("span");
      span.classList.add("tag");
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });

    const membersContainer = this.querySelector(".members");
    const members = JSON.parse(this.getAttribute("members") || "[]");
    members.forEach((member) => {
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

    activities.forEach((activity) => {
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

class RatingPopup extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="rating-overlay"></div>
        <div class="rating-pop-up">
            <div class="rating-header">
                Rate activity member
            </div>
            <div class="rating-info">
                <div class="rating-activity-name">หาเพื่อนดูหนังครับ !!!</div>
                <img src="assets/Profile-g.png" alt="">
                <div class="rating-user-name">Peerawat Ingkhasantatikul</div>
                <div class="rating-stars">
                    <img src="assets/star_sharp.svg" alt="">
                    <img src="assets/star_sharp.svg" alt="">
                    <img src="assets/star_sharp.svg" alt="">
                    <img src="assets/star_sharp.svg" alt="">
                    <img src="assets/star_sharp.svg" alt="">
                </div>
                <fieldset>
                    <legend>comment</legend>
                    <textarea placeholder="Write your comment..."></textarea>
                </fieldset>
            </div>
            <div class="post-btn">
                <button class="rating-cancel">Cancel</button>
                <button class="rating-post">Post</button>
            </div>
        </div>
        `;
    this.style.display = "none";
    this.classList.add("rating-popup-wrapper");

    this.querySelector(".rating-cancel").addEventListener("click", () =>
      this.closePopup()
    );
    this.querySelector(".rating-overlay").addEventListener("click", () =>
      this.closePopup()
    );
  }

  openPopup(memberName, activityName) {
    this.querySelector(".rating-user-name").textContent = memberName;
    this.querySelector(".rating-activity-name").textContent = activityName;
    this.style.display = "block";
  }

  closePopup() {
    this.style.display = "none";
  }
}

customElements.define("rating-popup", RatingPopup);
customElements.define("activities-list", ActivitiesList);
customElements.define("activity-dropdown", ActivityDropdown);
customElements.define("custom-member", Member);

class CommentCard extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="comment-card">
            <div class="comment-header">
                <div class="user-info">
                    <div class="comment-profile"><img src="Profile-g.png" alt="" /></div>
                    <div class="comment-details">
                        <span class="comment-owner">Emily Chow</span>
                        <span class="comment-date">15 ม.ค. 2567 เวลา 12:59 น.</span>
                        <span class="user-comment">มาสายมากเลยค่ะ นัด 10 โมง มาจริง 11 โมง</span>
                    </div>
                </div>

                <div class="comment-rating">
                    <p>star star star</p>
                </div>
            </div>

            <div class="comment-from">
                <p>From:<a href="">Activity</a></p>
            </div>
        </div>
        `;
  }
}

customElements.define("comment-card", CommentCard);

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
