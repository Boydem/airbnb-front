import { useEffect, useRef, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { BsChevronLeft } from 'react-icons/bs'

export function ImgCarousel({ imgUrls }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)
    const elCarousel = useRef()
    const isNavigatingByDot = useRef(false)

    useEffect(() => {
        setCurrentImageIndex(0)
    }, [imgUrls])

    useEffect(() => {
        const options = {
            root: elCarousel.current,
            rootMargin: '0px',
            threshold: 0.5,
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = parseInt(entry.target.getAttribute('data-idx'))
                    setCurrentImageIndex(idx)
                }
            })
        }, options)

        document.querySelectorAll('.carousel-item-container').forEach(el => observer.observe(el))

        return () => {
            observer.disconnect()
        }
    }, [])

    function handleNext() {
        const isLastIndex = currentImageIndex === imgUrls.length - 1
        if (!isLastIndex) {
            scrollToImage(currentImageIndex + 1)
        }
    }

    function handlePrev() {
        const isFirstIndex = currentImageIndex === 0
        if (!isFirstIndex) {
            scrollToImage(currentImageIndex - 1)
        }
    }

    function handleDotClick(idx) {
        isNavigatingByDot.current = true
        scrollToImage(idx)
    }

    function scrollToImage(idx) {
        const itemWidth = elCarousel.current.offsetWidth // Width of a single item
        const scrollPosition = idx * itemWidth // Scroll position of the container
        elCarousel.current.scrollTo({
            left: scrollPosition,
            behavior: 'smooth',
        })
    }

    function handleScroll() {
        if (elCarousel.current.scrollLeft % elCarousel.current.offsetWidth === 0) {
            isNavigatingByDot.current = false
        }
    }

    return (
        <div className='img-carousel'>
            <div ref={elCarousel} className='images-container' onScroll={handleScroll}>
                {imgUrls.map((imgUrl, idx) => (
                    <div key={'i' + idx} data-idx={idx} className='carousel-item-container'>
                        <img src={imgUrl} />
                    </div>
                ))}
            </div>
            <div
                className={`arrow-right ${currentImageIndex === imgUrls.length - 1 ? 'hidden' : ''}`}
                disabled={isScrolling}
                onClick={handleNext}
            >
                <BsChevronRight />
            </div>
            <div
                className={`arrow-left ${currentImageIndex === 0 ? 'hidden' : ''}`}
                onClick={handlePrev}
                disabled={currentImageIndex === 0 || isScrolling}
            >
                <BsChevronLeft />
            </div>
            <div className='dots-pagination'>
                {imgUrls.map((_, idx) => (
                    <div
                        onClick={() => handleDotClick(idx)}
                        key={'p' + idx}
                        className={`${currentImageIndex === idx ? 'active' : ''}`}
                    ></div>
                ))}
            </div>
        </div>
    )
}
