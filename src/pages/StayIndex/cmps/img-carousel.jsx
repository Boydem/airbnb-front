import { useEffect, useRef, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { BsChevronLeft } from 'react-icons/bs'

export function ImgCarousel({ imgUrls }) {
    const [currActive, setCurrActive] = useState(0)
    const elContainer = useRef()
    const [elContainerWidth, setElContainerWidth] = useState(0)

    useEffect(() => {
        setElContainerWidth(elContainer.current.offsetWidth)
    }, [window.innerWidth])

    function onNextPrev(dir) {
        if ((currActive <= 0 && dir === -1) || (currActive >= imgUrls.length - 1 && dir === 1)) return
        setCurrActive(currActive + dir)
    }

    return (
        <div ref={elContainer} className='img-carousel'>
            <div onClick={() => onNextPrev(-1)} className={`arrow-left ${currActive <= 0 ? 'hidden' : ''}`}>
                <BsChevronLeft />
            </div>
            {imgUrls.map((imgUrl, idx) => (
                <img
                    style={{ left: `${-elContainerWidth * currActive}px` }}
                    key={'i' + idx}
                    src={imgUrl}
                    className='carousel-item'
                />
            ))}
            <div
                onClick={() => onNextPrev(1)}
                className={`arrow-right ${currActive >= imgUrls.length - 1 ? 'hidden' : ''}`}
            >
                <BsChevronRight />
            </div>
            <div className='dots-pagination'>
                {imgUrls.map((_, idx) => (
                    <div key={'p' + idx} className={`${currActive === idx ? 'active' : ''}`}></div>
                ))}
            </div>
        </div>
    )
}
