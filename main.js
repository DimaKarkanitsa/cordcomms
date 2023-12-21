const slide = document.querySelector(".slide")
const screenWidth = window.innerWidth
const navIcon = document.querySelector(".navBar_icon")
const navMenu = document.querySelector(".navBar_list")
const navLink = document.querySelectorAll(".link[data-goto]")
if (navLink.length > 0) {
  navLink.forEach((el) => {
    el.addEventListener("click", onLinkClick)
  })
}
function onLinkClick(e) {
  const navLink = e.target
  if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
    const gotoBlock = document.querySelector(navLink.dataset.goto)
    const gotoBlockValue =
      gotoBlock.getBoundingClientRect().top +
      scrollY -
      document.querySelector(".navBar").offsetHeight

    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth",
    })
    document.body.classList.toggle("_lock")
    navMenu.classList.toggle("_show")
    navIcon.classList.toggle("_active")
    e.preventDefault()
  }
}

navIcon.addEventListener("click", (e) => {
  e.preventDefault()
  document.body.classList.toggle("_lock")
  navMenu.classList.toggle("_show")
  navIcon.classList.toggle("_active")
})

const wideImages = [
  {
    url: "./img/test-1.png",
    alt: "test_img_1",
  },
  {
    url: "./img/test-2.png",
    alt: "test_img_2",
  },
  {
    url: "./img/test-3.png",
    alt: "test_img_3",
  },
  {
    url: "./img/test-4.png",
    alt: "test_img_4",
  },
]
const narrowImages = [
  {
    url: "./img/test_mb-1.png",
    alt: "test_img_1",
  },
  {
    url: "./img/test_mb-2.png",
    alt: "test_img_2",
  },
  {
    url: "./img/test_mb-3.png",
    alt: "test_img_3",
  },
  {
    url: "./img/test_mb-4.png",
    alt: "test_img_4",
  },
]
let slideIndex = 1
let isMoving = false

function processImages(item) {
  return `<img src="${item.url}" alt="${item.alt}">`
}

function moveSlides() {
  slide.style.transform = `translateX(-${slideIndex * 100}%)`
}

function moveHandler(direction) {
  isMoving = true
  slide.style.transition = `transform 450ms ease-in-out`
  direction !== "right" ? (slideIndex -= 1) : (slideIndex += 1)
  moveSlides()
}

function fetchImages(narrowImages, wideImages) {
  let data = screenWidth < 600 ? narrowImages : wideImages
  data.push(data[0])
  data.unshift(data[data.length - 2])

  slide.innerHTML = data.map(processImages).join("")
  moveSlides()
}

fetchImages(narrowImages, wideImages)

document.querySelector(".slider__btn--right").addEventListener("click", () => {
  if (isMoving) {
    return
  }
  moveHandler("right")
})

document.querySelector(".slider__btn--left").addEventListener("click", () => {
  if (isMoving) {
    return
  }
  moveHandler()
})

slide.addEventListener("transitionend", () => {
  isMoving = false
  const slidesArray = [...slide.querySelectorAll("img")]

  if (slideIndex === 0) {
    slide.style.transition = "none"
    slideIndex = slidesArray.length - 2
    moveSlides()
  }
  if (slideIndex === slidesArray.length - 1) {
    slide.style.transition = "none"
    slideIndex = 1
    moveSlides()
  }
})
