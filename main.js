const screenWidth = window.innerWidth
const navLink = document.querySelectorAll('.link[data-goto]')
const slide = document.querySelector('.slide')
const navIcon = document.querySelector('.navBar_icon')
const navMenu = document.querySelector('.navBar_list')
const header = document.querySelector('header')
const main = document.querySelector('main')
const filePath = ['./privacyDoc.html', './termsDoc.html']
const innerDoc = document.querySelector('.innerDoc')
const intLinks = document.querySelectorAll('.btn')
const wideImages = [
  {
    url: './img/test-1.png',
    alt: 'test_img_1',
  },
  {
    url: './img/test-2.png',
    alt: 'test_img_2',
  },
  {
    url: './img/test-3.png',
    alt: 'test_img_3',
  },
  {
    url: './img/test-4.png',
    alt: 'test_img_4',
  },
]
const narrowImages = [
  {
    url: './img/test_mb-1.png',
    alt: 'test_img_1',
  },
  {
    url: './img/test_mb-2.png',
    alt: 'test_img_2',
  },
  {
    url: './img/test_mb-3.png',
    alt: 'test_img_3',
  },
  {
    url: './img/test_mb-4.png',
    alt: 'test_img_4',
  },
]
let slideIndex = 1
let isMoving = false

//Event Listeners

window.addEventListener('resize', () => window.location.reload())

if (navLink.length > 0) {
  navLink.forEach((el) => {
    el.addEventListener('click', onLinkClick)
  })
}

navIcon.addEventListener('click', (e) => {
  e.preventDefault()
  document.body.classList.toggle('_lock')
  navMenu.classList.toggle('_show')
  navIcon.classList.toggle('_active')
})

intLinks.forEach((btn) => {
  btn.addEventListener('click', handleBtnClick)
})

document.querySelector('.slider__btn--right').addEventListener('click', () => {
  if (isMoving) {
    return
  }
  moveHandler('right')
})

document.querySelector('.slider__btn--left').addEventListener('click', () => {
  if (isMoving) {
    return
  }
  moveHandler()
})

slide.addEventListener('transitionend', () => {
  isMoving = false
  const slidesArray = [...slide.querySelectorAll('img')]

  if (slideIndex === 0) {
    slide.style.transition = 'none'
    slideIndex = slidesArray.length - 2
    moveSlides()
  }
  if (slideIndex === slidesArray.length - 1) {
    slide.style.transition = 'none'
    slideIndex = 1
    moveSlides()
  }
})

//Functions
function onLinkClick(e) {
  const navLink = e.target
  if (main.classList.contains('_hide')) {
    header.classList.remove('_hide')
    main.classList.remove('_hide')
    innerDoc.innerHTML = ''
  }

  if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
    const gotoBlock = document.querySelector(navLink.dataset.goto)
    const gotoBlockValue =
      gotoBlock.getBoundingClientRect().top +
      scrollY -
      document.querySelector('.navBar').offsetHeight / 2

    window.scrollTo({
      top: gotoBlockValue,
      behavior: 'smooth',
    })
    document.body.classList.toggle('_lock')
    navMenu.classList.toggle('_show')
    navIcon.classList.toggle('_active')
    e.preventDefault()
  }
}

function processImages(item) {
  return `<img src="${item.url}" alt="${item.alt}">`
}

function moveSlides() {
  slide.style.transform = `translateX(-${slideIndex * 100}%)`
}

function moveHandler(direction) {
  isMoving = true
  slide.style.transition = `transform 450ms ease-in-out`
  direction !== 'right' ? (slideIndex -= 1) : (slideIndex += 1)
  moveSlides()
}

function fetchImages(narrowImages, wideImages) {
  slide.innerHTML = ''
  let data = screenWidth < 600 ? narrowImages : wideImages
  data.push(data[0])
  data.unshift(data[data.length - 2])

  slide.innerHTML = data.map(processImages).join('')
  moveSlides()
}

function loadHTMLFile(filePath) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch file: ${response.status} ${response.statusText}`
        )
      }
      return response.text()
    })
    .then((data) => {
      document.querySelector('.innerDoc').innerHTML = data
    })
}

function handleBtnClick(e) {
  e.preventDefault()
  const navLink = e.target
  if (e.target.classList.contains('privacy_link')) {
    header.classList.add('_hide')
    main.classList.add('_hide')
    loadHTMLFile(filePath[0])
    window.scrollTo({
      top: 0,
    })
  } else if (e.target.classList.contains('terms_link')) {
    header.classList.add('_hide')
    main.classList.add('_hide')
    loadHTMLFile(filePath[1])
    window.scrollTo({
      top: 0,
    })
  }
}

fetchImages(narrowImages, wideImages)
