import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaMap } from 'react-icons/fa'
import { FaListUl } from 'react-icons/fa'
import { loadStays, setFilter, setSort } from '../../store/stay/stay.actions'

import { StayList } from './cmps/stay-list'
import { Map } from './cmps/map'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const isLoading = useSelector(storeState => storeState.stayModule.isLoading)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [mapView, setMapView] = useState(false)

    // Infinite scroll
    let staysToDisplay = useRef(0)

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

    function onAddToWishlist() {
        console.log('Todo:add to wishlist')
    }

    if (!stays || !stays.length) return <div>Loading...</div>
    return (
        <section className='stay-index full main-layout'>
            {!mapView ? (
                <StayList isLoading={isLoading} stays={stays} onAddToWishlist={onAddToWishlist} />
            ) : (
                <Map stays={stays} />
            )}
            <button onClick={() => setMapView(prev => !prev)} className='btn-toggle-view'>
                {mapView ? (
                    <span className='flex align-center'>
                        Show List <FaListUl />
                    </span>
                ) : (
                    <span className='flex align-center'>
                        Show Map <FaMap />
                    </span>
                )}
            </button>
        </section>
    )
}
