import { stayService } from '../../services/stay.service'
import { store } from '../store'

export async function loadStays(filterBy, staysToDisplay) {
    // TODO : ADD IS LOADING DISPATCHES
    store.dispatch({ type: 'SET_IS_LOADING', isLoading: true })
    try {
        const stays = await stayService.query(filterBy, staysToDisplay)
        store.dispatch({ type: 'SET_STAYS', stays })
    } catch (err) {
        console.log('StayActions: Had issues loading stays', err)
        throw err
    } finally {
        store.dispatch({ type: 'SET_IS_LOADING', isLoading: false })
    }
}

export function setFilter(filterBy) {
    store.dispatch({ type: 'SET_FILTER', filterBy })
}

export function setSort(sortBy) {
    store.dispatch({ type: 'SET_SORT', sortBy })
}
