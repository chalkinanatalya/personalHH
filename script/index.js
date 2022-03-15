const optionBtnOrder = document.querySelector(".option__btn_order");
const optionBtnPeriod = document.querySelector(".option__btn_period");
const optionListOrder = document.querySelector(".option__list_order");
const optionListPeriod = document.querySelector(".option__list_period");

optionBtnOrder.addEventListener("click", () => {
  optionListOrder.classList.toggle("option__list_active");
  optionListPeriod.classList.remove("option__list_active");
});

optionBtnPeriod.addEventListener("click", () => {
  optionListPeriod.classList.toggle("option__list_active");
  optionListOrder.classList.remove("option__list_active");
});

// changes text content like in list into pop-up menu
optionListOrder.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("option__item")) {
    optionBtnOrder.textContent = target.textContent;
    //closes pop-up window
    optionListOrder.classList.remove("option__list_active");
    for (const elem of optionListOrder.querySelectorAll(".option__item")) {
      if (elem === target) {
        // creates a check mark
        elem.classList.add("option__item_active");
      } else {
        // removes other check marks
        elem.classList.remove("option__item_active");
      }
    }
  }
});

// city choise
const topCityBtn = document.querySelector(".top__city");
const city = document.querySelector(".city");
const cityClose = document.querySelector(".city__close");

topCityBtn.addEventListener("click", () => {
  city.classList.toggle("city_active");
});

// city selection
const cityRegionList = document.querySelector(".city__region-list");

cityRegionList.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("city__link")) {
    topCityBtn.textContent = target.textContent;
    //closes pop-up window
    city.classList.remove("city_active");
  }
});

// Modal window
//open
const overlayVacansy = document.querySelector(".overlay_vacancy");
const resultList = document.querySelector(".result__list");
resultList.addEventListener("click", (e) => {
  const target = e.target;
  if (target.dataset.vacancy) {
    e.preventDefault();
    overlayVacansy.classList.add("overlay_active");
  }
});
//close
overlayVacansy.addEventListener("click", (e) => {
  const target = e.target;
  if (target === overlayVacansy || target.classList.contains("modal__close")) {
    overlayVacansy.classList.remove("overlay_active");
  }
});
