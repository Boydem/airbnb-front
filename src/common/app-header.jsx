import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import airBnbLogo from '../assets/images/logo.svg'
import { AppLogo } from './app-logo'
import { BiSearch } from 'react-icons/bi'
import { FilterLocation } from '../pages/StayIndex/cmps/filter-location'
import { FilterDatepicker } from '../pages/StayIndex/cmps/filter-datepicker'
import { FilterGuests } from '../pages/StayIndex/cmps/filter-guests'
import { setFilter } from '../store/stay/stay.actions'
export function AppHeader() {
    // const user = useSelector(storeState=>storeState.userModule.user)
    const [isFiltering, setIsFiltering] = useState(false)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [activeModule, setActiveModule] = useState(null)
    const elHeader = useRef()
    const elFilterForm = useRef()
    const elScreen = useRef()

    useEffect(() => {
        if (isFiltering) {
            elHeader.current.addEventListener('click', onFocusOut)
            elScreen.current.addEventListener('click', onFocusOut)
        } else {
            elHeader.current.removeEventListener('click', onFocusOut)
            elScreen.current.removeEventListener('click', onFocusOut)
        }
    }, [isFiltering])

    function onFocusOut({ target }) {
        if (!isFiltering) return
        if (target.classList.contains('screen')) {
            setIsFiltering(false)
            return
        }
        if (!elFilterForm.current.contains(target)) {
            setActiveModule(null)
        }
    }

    function onSelectRegion(region) {
        setFilter({ ...filterBy, whereTo: region })
    }

    return (
        <>
            <div ref={elScreen} className={`screen ${isFiltering ? 'open' : ''}`}></div>
            <header ref={elHeader} className={`app-header main-layout ${isFiltering ? 'filter-open' : ''}`}>
                <div className='container'>
                    <div className='logo'>
                        <AppLogo />
                    </div>

                    <div onClick={() => setIsFiltering(true)} className={`filter-cta ${isFiltering ? 'hide' : ''}`}>
                        <button onClick={() => setActiveModule('location')} className='filter-btn text-bold'>
                            Any location
                        </button>
                        <button onClick={() => setActiveModule('when')} className='filter-btn text-bold'>
                            Any week
                        </button>
                        <button onClick={() => setActiveModule('who')} className='filter-btn muted'>
                            Add guests
                        </button>
                        <button
                            onClick={() => setActiveModule('location')}
                            className='filter-btn btn-icon primary circled small'
                        >
                            <BiSearch />
                        </button>
                    </div>

                    <div className='user'>User</div>

                    <form
                        ref={elFilterForm}
                        className={`filter ${isFiltering ? 'shown' : ''} ${!activeModule ? 'out-of-focus' : ''}`}
                    >
                        <div
                            onClick={() => setActiveModule('location')}
                            className={`location-wrapper ${activeModule === 'location' ? 'active' : ''}`}
                        >
                            <label htmlFor='locationTo'>
                                <div className='text-bold filter-title'>Where</div>
                                <input type='text' id='locationTo' name='locationTo' value={filterBy.locationTo} />
                            </label>
                            {activeModule === 'location' && (
                                <FilterLocation filterBy={filterBy} onSelectRegion={onSelectRegion} />
                            )}
                        </div>
                        <div className={`dates-wrapper flex align-center`}>
                            <div
                                onClick={() => setActiveModule('when')}
                                className={`flex column justify-center ${activeModule === 'when' ? 'active' : ''}`}
                            >
                                <div className='text-bold filter-title'>Check in</div>
                                <div>Add dates</div>
                            </div>
                            <div
                                onClick={() => setActiveModule('when-out')}
                                className={`flex column justify-center ${activeModule === 'when-out' ? 'active' : ''}`}
                            >
                                <div className='text-bold filter-title'>Check out</div>
                                <div>Add dates</div>
                            </div>
                        </div>
                        <div
                            onClick={() => setActiveModule('who')}
                            className={`guests-wrapper flex align-center ${activeModule === 'who' ? 'active' : ''}`}
                        >
                            <div>
                                <div className='text-bold filter-title'>Who</div>
                                <div>Add guests</div>
                            </div>
                            <button type={'submit'} className='filter-btn btn-icon primary circled large'>
                                <BiSearch />
                            </button>
                            {activeModule === 'who' && <FilterGuests filterBy={filterBy} />}
                        </div>
                        {(activeModule === 'when' || activeModule === 'when-out') && (
                            <FilterDatepicker filterBy={filterBy} />
                        )}
                    </form>
                </div>
            </header>
        </>
    )
}
