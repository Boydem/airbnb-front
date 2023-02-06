import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { utilService } from '../../services/util.service'

import { loadStays, setFilter, setSort } from '../../store/stay/stay.actions'

import { StayList } from './cmps/stay-list'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const isLoading = useSelector(storeState => storeState.stayModule.isLoading)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    // Infinite scroll
    let staysToDisplay = useRef(24)
    const handleScroll = ev => {
        if (isLoading) return
        if (window.innerHeight + ev.target.scrollTop >= ev.target.scrollHeight) {
            staysToDisplay.current += 24
            loadMoreStays()
        }
    }

    useEffect(() => {
        document.body.addEventListener('scroll', handleScroll)
        loadMoreStays()
        return () => {
            document.body.removeEventListener('scroll', handleScroll)
        }
    }, [filterBy])

    function loadMoreStays() {
        loadStays(filterBy, staysToDisplay.current)
    }
    // list images carousel

    function onAddToWishlist() {
        console.log('Todo:add to wishlist')
    }

    function onSelectStay() {
        console.log('Todo:select stay')
    }
    console.log('staysToDisplay.current:', staysToDisplay.current)
    if (!stays || !stays.length) return <div>Loading...</div>
    return (
        <section className='stay-index'>
            <StayList stays={stays} onSelectStay={onSelectStay} onAddToWishlist={onAddToWishlist} />
        </section>
    )
}
