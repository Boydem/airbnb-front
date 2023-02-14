import { useCallback, useEffect, useRef, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { BsChevronLeft } from 'react-icons/bs'

export function ImgCarousel({ imgUrls }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)
    const elCarousel = useRef()

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

    // useEffect(() => {
    //     const itemWidth = elCarousel.current.offsetWidth // Width of a single item
    //     console.log('currentImageIndex:', currentImageIndex)
    //     const scrollPosition = currentImageIndex * itemWidth // Scroll position of the container
    //     elCarousel.current.scrollTo({
    //         left: scrollPosition,
    //         behavior: 'smooth',
    //     })
    // }, [currentImageIndex])

    function handleNext() {
        const isLastIndex = currentImageIndex === imgUrls.length - 1
        if (!isLastIndex && !isScrolling) {
            setIsScrolling(true)
            scrollToImage(currentImageIndex + 1)
        } else {
            setIsScrolling(false)
        }
    }

    function handlePrev() {
        const isFirstIndex = currentImageIndex === 0
        if (!isFirstIndex && !isScrolling) {
            setIsScrolling(true)
            scrollToImage(currentImageIndex - 1)
        } else {
            setIsScrolling(false)
        }
    }

    function handleDotClick(idx) {
        const itemWidth = elCarousel.current.offsetWidth // Width of a single item
        console.log('currentImageIndex:', currentImageIndex)
        const scrollPosition = idx * itemWidth // Scroll position of the container
        elCarousel.current.scrollTo({
            left: scrollPosition,
            behavior: 'smooth',
        })
        setCurrentImageIndex(idx)
    }

    function scrollToImage(idx) {
        const itemWidth = elCarousel.current.offsetWidth // Width of a single item
        const scrollPosition = idx * itemWidth // Scroll position of the container
        elCarousel.current.scrollTo({
            left: scrollPosition,
            behavior: 'smooth',
        })
    }

    return (
        <div className='img-carousel'>
            <div ref={elCarousel} className='images-container'>
                {imgUrls.map((imgUrl, idx) => (
                    <div key={'i' + idx} data-idx={idx} className='carousel-item-container'>
                        <img src={imgUrl} />
                    </div>
                ))}
            </div>
            <div
                className='arrow-right'
                disabled={currentImageIndex === imgUrls.length - 1 || isScrolling}
                onClick={handleNext}
            >
                <BsChevronRight />
            </div>
            <div className='arrow-left' onClick={handlePrev} disabled={currentImageIndex === 0 || isScrolling}>
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
