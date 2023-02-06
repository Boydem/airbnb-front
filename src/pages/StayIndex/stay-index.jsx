import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loadStays, setFilter, setSort } from '../../store/stay/stay.actions'

import { StayList } from './cmps/stay-list'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const navigate = useNavigate()

    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])

    function onAddToWishlist() {
        console.log('Todo:add to wishlist')
    }

    function onSelectStay() {
        console.log('Todo:select stay')
    }

    if (!stays || !stays.length) return <div>Loading...</div>
    return (
        <section className='stay-index'>
            <StayList stays={stays} onSelectStay={onSelectStay} onAddToWishlist={onAddToWishlist} />
        </section>
    )
}
