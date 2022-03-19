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

// changes text content like in list into pop-up menu (for first)
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

// changes text content like in list into pop-up menu (for second)
optionListPeriod.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("option__item")) {
    optionBtnPeriod.textContent = target.textContent;
    //closes pop-up window
    optionListPeriod.classList.remove("option__list_active");
    for (const elem of optionListPeriod.querySelectorAll(".option__item")) {
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
//for button X
cityClose.addEventListener("click", () => {
  city.classList.remove("city_active");
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

//input vacancy cards

const createCard = (vacancy) => {
  //destucturization
  const {
    title,
    id,
    compensation,
    workSchedule,
    employer,
    address,
    description,
    date,
  } = vacancy;

  //crating card
  const card = document.createElement("li");
  card.classList.add("result__item");

  card.insertAdjacentHTML(
    "afterbegin",
    `<article class="vacancy">
      <h2 class="vacancy__title">
        <a class="vacancy__open-modal" href="#" data-vacancy=${id}>${title}</a>
      </h2>
      <p class="vacancy__compensation">${compensation}</p>
      <p class="vacancy__work-schedule">${workSchedule}</p>
      <div class="vacancy__employer">
        <p class="vacancy__employer-title">${employer}</p>
        <p class="vacancy__employer-address">${address}</p>
      </div>
      <p class="vacancy__description">${description}</p>
      <p class="vacancy__date">
        <time datetime=${date}>${date}</time>
      </p>
      <div class="vacancy__wrapper-btn">
        <a class="vacancy__response vacancy__open-modal" href="#" data-vacancy=${id}>Откликнуться</a>
        <button class="vacancy__contacts">Показать контакты</button>
      </div>
    </article>`
  );

  return card;
};

//render card
const renderCards = (data) => {
  resultList.textContent = "";
  const cards = data.map(createCard);
  resultList.append(...cards);
};

//getting data from server
const getData = ({ search } = {}) => {
  if (search) {
    return fetch(`http://localhost:3000/api/vacancy?search=${search}`).then(
      (response) => response.json()
    );
  }
  return fetch("http://localhost:3000/api/vacancy").then((response) =>
    response.json()
  );
};

//for search bar
const formSearch = document.querySelector(".bottom__search");
formSearch.addEventListener("submit", async (e) => {
  //cancel standart browser behaviour
  e.preventDefault();
  //from "name" of input
  const textSearch = formSearch.search.value;

  //checks that user needs more than 2 symbols
  if (textSearch.length > 2) {
    formSearch.search.style.borderColor = "";
    //get data from server
    const data = await getData({ search: textSearch });
    renderCards(data);
    formSearch.reset();
  } else {
    formSearch.search.style.borderColor = "red";
    setTimeout(() => {
      formSearch.search.style.borderColor = "";
    }, 2000);
  }
});

const init = async () => {
  const data = await getData();
  renderCards(data);
};

init();
