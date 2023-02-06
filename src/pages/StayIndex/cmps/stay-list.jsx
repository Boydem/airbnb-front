import { StayPreview } from './stay-preview.jsx'

export function StayList({ stays, onSelectStay, onAddToWishlist, isLoading }) {
    console.log('isLoading:', isLoading)
    return (
        <section className='stay-list'>
            {stays.map((stay, idx) => {
                return (
                    <StayPreview
                        stay={stay}
                        key={`s${idx}`}
                        onSelectStay={onSelectStay}
                        onAddToWishlist={onAddToWishlist}
                    />
                )
            })}
            {isLoading &&
                Array.apply(null, Array(10)).map((_, idx) => (
                    <article key={idx} className='preview-placeholder flex column'>
                        <div className='img-carousel placeholder'></div>
                        <div className='details'>
                            <div className='placeholder'></div>
                            <div className='placeholder'></div>
                            <div className='placeholder'></div>
                        </div>
                    </article>
                ))}
        </section>
    )
}
