import { StayPreview } from './stay-preview.jsx'

export function StayList({ stays, onSelectStay, onAddToWishlist }) {
    return (
        <section className='stay-list'>
            {stays.map(stay => {
                return (
                    <StayPreview
                        stay={stay}
                        key={`${stay._id}`}
                        onSelectStay={onSelectStay}
                        onAddToWishlist={onAddToWishlist}
                    />
                )
            })}
        </section>
    )
}
