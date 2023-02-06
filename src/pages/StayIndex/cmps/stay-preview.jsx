import { ImgCarousel } from './img-carousel'

export function StayPreview({ stay, onSelectStay, onAddToWishlist }) {
    if (!stay) return <div>Loading...</div>
    return (
        <article className='stay-preview'>
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
