const setType = (e, typeSelector) => {
  const collection = document.querySelector(".collection");
  collection.classList.remove(typeSelector(false));
  collection.classList.add(typeSelector(true));
};

const toggleType = (e) => {
  const typeSelector = (state) => [...document.querySelectorAll(".type-selector input")].find((element) =>
    state ? element.checked : !element.checked
  ).value;
  setType(e, typeSelector);
};
document
  .querySelector(".type-selector")
  .addEventListener("change", (e) => toggleType(e));
window.addEventListener("DOMContentLoaded", (e) => toggleType(e));

const tabUtil = () => {
  const headings = [...document.querySelectorAll(".collection h1")].map(
    (heading) => heading.innerText
  );
  const newUl = document.createElement("ul");
  const collection = document.querySelector(".collection");
  collection.insertBefore(newUl, collection.firstChild);
  const tabLi = headings.map(
    (heading, index) => `<li ${index === 0 && 'class="on"'}>${heading}</li>`
  );
  const tabUl = document.querySelector("ul");
  tabLi.map((tab) => (tabUl.innerHTML = tabUl.innerHTML + tab));

  collection.querySelector(".main-section").classList.add("on");

  const tabItems = document.querySelector(".tabbed ul");
  tabItems.addEventListener("click", (e) => {
    const theClickedLi = e.target.closest("li");
    tabIndex = Array.from(tabItems.children).indexOf(theClickedLi);
    [...tabItems.querySelectorAll("li.on")].forEach((tab) => {
      tab.classList.remove("on");
    });
    theClickedLi.classList.add("on");
    [...document.querySelectorAll(".tabbed .main-section")].forEach(
      (section, index) => {
        section.classList.remove("on");
        index === tabIndex && section.classList.add("on");
      }
    );
  });
};

const accordionUtil = () => {
  const collection = document.querySelector(".collection");
  const headings = document.querySelectorAll(".collection header");
  const initialHeight = collection.querySelector(".content").offsetHeight;
  collection.querySelector(".main-section").classList.add("on");
  collection.querySelector(
    ".content-section"
  ).style.height = `${initialHeight}px`;

  headings.forEach((heading) =>
    heading.addEventListener("click", (e) => {
      const contentSection = collection.querySelectorAll(".content-section");
      const mainSection = e.target.closest(".main-section");
      contentSection.forEach((section) => (section.style.height = "0px"));
      [...document.querySelectorAll(".accordion .main-section")].forEach(
        (section, index) => {
          const content = mainSection.querySelector(".content");
          section.classList.remove("on");
          const setHeight = content.offsetHeight;
          mainSection.querySelector(
            ".content-section"
          ).style.height = `${setHeight}px`;
        }
      );

      mainSection.classList.add("on");
    })
  );
};

const cleanUpUtil = (tabbed) => {
  !tabbed && document.querySelector(".collection ul").remove();
  document.querySelectorAll(".content-section").forEach((section) => {
    tabbed ? (section.style.height = "auto") : (section.style.height = "0px");
  });
  [...document.querySelectorAll(".main-section")].forEach((section, index) => {
    index === 0 ? section.classList.add("on") : section.classList.remove("on");
  });
};

window.addEventListener("DOMContentLoaded", (e) => {
  const isTabbed = document.querySelector(".collection.tabbed");
  isTabbed && tabUtil();
});

document.querySelector(".type-selector").addEventListener("change", (e) => {
  const isTabbed = document.querySelector(".collection.tabbed");
  cleanUpUtil(isTabbed);
  isTabbed ? tabUtil() : accordionUtil();
});