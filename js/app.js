function scrollHeader() {
  const nav = document.getElementById("header");

  if (this.scrollY >= 50) nav.classList.add("active-header");
  else nav.classList.remove("active-header");
}

window.addEventListener("scroll", scrollHeader);

// MENU MOBILE
const showMenu = () => {
  const toggle = document.getElementById("bx");
  const nav = document.getElementById("menu-mobile");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active-bx");
      nav.classList.toggle("active-menu-mobile");

      if (nav.classList.contains("active-menu-mobile")) {
        document.body.style.overflow = "hidden";
        window.scrollTo({
          top: 0,
        });
      } else {
        document.body.style.overflow = "";
      }
    });
  }

  const menuItems = nav.querySelectorAll("a");
  menuItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = item.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });

        toggle.classList.remove("active-bx");
        nav.classList.remove("active-menu-mobile");
        document.body.style.overflow = "";
      }
    });
  });
};

showMenu();

const handleScroll = (targetSection, headerHeight) => {
  if (targetSection) {
    const scrollToPosition = targetSection.offsetTop - headerHeight;
    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });
  }
};

// SCROLL ADJUSTMENT SO THAT THE HEADER DOES NOT COVER THE SECTION
document.addEventListener("DOMContentLoaded", () => {
  const headerHeight = document.querySelector("#header").offsetHeight;
  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      handleScroll(targetSection, headerHeight);
    });
  });

  // CALL TO ACTION
  document.querySelectorAll(".call-to-action").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetSection = document.getElementById("contact-us");
      handleScroll(targetSection, headerHeight);
    });
  });
});

// FORM
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("form-name").value;
  const email = document.getElementById("form-email").value;
  const text = document.getElementById("form-description").value;

  fetch("https://eti.eticasolucoes.com.br/api/contact-us/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      text,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Problema ao enviar solicitação, tente novamente!", error);
    });

  document.getElementById("form-name").value = "";
  document.getElementById("form-email").value = "";
  document.getElementById("form-description").value = "";
});

// COPYRIGHT YEAR
document.getElementById("footer-year").textContent = new Date().getFullYear();

AOS.init({
  easing: "ease-out-quart",
  duration: 1000,
});

const swiperConfig = {
  slidesPerView: "auto",
  spaceBetween: 16,
  grabCursor: true,
  autoplay: {
    delay: 0,
  },
  loop: true,
  speed: 3 * 1000,
};

new Swiper(".companies-swiper-container", swiperConfig);
new Swiper(".pictures-swiper-container", {
  ...swiperConfig,
  spaceBetween: 16,
  speed: 2 * 1000,
});
new Swiper(".leaders-swiper-container", {
  speed: 1 * 1000,
  spaceBetween: 40,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
});
