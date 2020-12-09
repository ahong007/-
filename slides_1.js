const nextIndex = function(slide, offset) {
    let numberOfImgs = parseInt(slide.dataset.imgs, 10)
    let activeIndex = parseInt(slide.dataset.active, 10)
    let i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}

const bindEventSlide = function() {
    let selector = '.slide-button'
    bindAll(selector, 'click', function(event) {
        log('click next')
        let self = event.target
        // 找到 slide div
        let slide = self.closest('.slide')
        let offset = Number(self.dataset.offset)
        let index = nextIndex(slide, offset)
        showAtIndex(slide, index)
    })
}

const showAtIndex = function(slide, index) {
    // 设置 slide 元素的 data-active
    slide.dataset.active = index
    let nextSelector = '#id-image-' + String(index)
    // 删除当前图片的 class 给下一张图片加上 class
    let className = 'slide-image-active'
    removeClassAll(className)
    let img = e(nextSelector)
    img.classList.add(className)

    // 切换小圆点
    // 删除当前小圆点的 class
    removeClassAll('dot-active')
    let dotSelector = `#id-dot-${index}`
    let dot = e(dotSelector)
    dot.classList.add('dot-active')
}

const bindEventDot = function() {
    let selector = '.slide-dot'
    bindAll(selector, 'mouseover', function(event) {
        let self = event.target
        let index = Number(self.dataset.index)
        let slide = self.closest('.slide')
        // 直接播放第 n 张图片
        showAtIndex(slide, index)
    })
}

const bindEventTimer = function() {
    let slide = e('.slide')
    slide.addEventListener('mouseover', function(event) {
        let clock = Number(slide.dataset.clock)
        log('clock', clock, typeof clock)
        clearInterval(clock)
    })
    slide.addEventListener('mouseout', function() {
        autoPlay()
    })
}

const playNextImage = function() {
    let slide = e('.slide')
    let index = nextIndex(slide, 1)
    showAtIndex(slide, index)
}

const autoPlay = function() {
    let slide = e('.slide')
    let interval = 2000
    let clockId = setInterval(function() {
        playNextImage()
    }, interval)
    slide.dataset.clock = clockId
}

const bindEvents = function() {
    bindEventSlide()
    bindEventDot()
    bindEventTimer()
}

const demoTimer = function() {

    log('begin', new Date())
    let clockId = setInterval(function() {
        log('time in interval', new Date())
    }, 2000)
    log('clockId', clockId)
}

const __main = function() {
    bindEvents()
    autoPlay()
    demoTimer()
}

__main()
