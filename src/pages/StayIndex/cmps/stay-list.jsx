import { StayPreview } from './stay-preview.jsx'

export function StayList({ stays, onSelectStay, onAddToWishlist }) {
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
        </section>
    )
}
