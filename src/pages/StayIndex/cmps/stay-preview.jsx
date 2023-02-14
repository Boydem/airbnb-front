import { ImgCarousel } from './img-carousel'

export function StayPreview({ stay, onSelectStay, onAddToWishlist, mapView = false }) {
    if (!stay) return <div>Loading...</div>
    return (
        <article
            onClick={ev => {
                ev.stopPropagation()
            }}
            className={`stay-preview ${mapView ? 'map-view' : ''}`}
        >
            <ImgCarousel imgUrls={stay.imgUrls} />
            <div className='details'>
                <p className='inline-clamp name'>{stay.name}</p>
                <p className='inline-clamp labels'>
                    {stay.labels[1]} and {stay.labels[0]}
                </p>
                <p className='price'>
                    ${stay.price} <span className='prefix'>night</span>
                </p>
            </div>
        </article>
    )
}
// NAME , LABELS , PRICE , AVAILABLE DATES , IMG , ACTIONS
