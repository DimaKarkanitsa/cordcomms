const slide = document.querySelector(".slide")
const screenWidth = window.innerWidth
const navIcon = document.querySelector(".navBar_icon")
const navMenu = document.querySelector(".navBar_list")
const link = document.querySelector(".link")
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

// move when clicked

function moveHandler(direction) {
  isMoving = true
  slide.style.transition = `transform 450ms ease-in-out`
  direction !== "right" ? (slideIndex -= 1) : (slideIndex += 1)
  moveSlides()
}

// fetch images
// async function fetchImages() {
//   await fetch("./images.json")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not okay")
//       }
//       return response.json()
//     })
//     .then((data) => {
//       // cloned first and last image
//       data.push(data[0])
//       data.unshift(data[data.length - 2])
//       // show slider
//       slide.innerHTML = data.map(processImages).join("")
//       moveSlides()
//     })
//     .catch((error) => {
//       console.error(
//         "There has been a problem with your fetch operation:",
//         error
//       )
//     })
// }
function fetchImages(narrowImages, wideImages) {
  let data = screenWidth < 600 ? narrowImages : wideImages
  // cloned first and last image
  data.push(data[0])
  data.unshift(data[data.length - 2])
  // show slider
  slide.innerHTML = data.map(processImages).join("")
  moveSlides()
}

fetchImages(narrowImages, wideImages)

// keyboard arrow handler
// window.addEventListener("keyup", (e) => {
//   if (isMoving) {
//     return
//   }
//   switch (e.key) {
//     case "ArrowLeft":
//       moveHandler()
//       break
//     case "ArrowRight":
//       moveHandler("right")
//       break

//     default:
//       break
//   }
// })

// click right btn
document.querySelector(".slider__btn--right").addEventListener("click", () => {
  if (isMoving) {
    return
  }
  moveHandler("right")
})

// click left btn
document.querySelector(".slider__btn--left").addEventListener("click", () => {
  if (isMoving) {
    return
  }
  moveHandler()
})

slide.addEventListener("transitionend", () => {
  isMoving = false
  const slidesArray = [...slide.querySelectorAll("img")]
  // root.style.setProperty(
  //   "--slide-progress--transition",
  //   `${
  //     slideIndex === slidesArray.length - 1
  //       ? "none"
  //       : "all 400ms cubic-bezier(0.82, 0.02, 0.39, 1.01)"
  //   }`
  // )
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

navIcon.addEventListener("click", (event) => {
  document.body.classList.toggle("_lock")
  navMenu.classList.toggle("_show")
  navIcon.classList.toggle("_active")
})
link.addEventListener("click", (event) => {
  document.body.classList.toggle("_lock")
  navMenu.classList.toggle("_show")
  navIcon.classList.toggle("_active")
})
