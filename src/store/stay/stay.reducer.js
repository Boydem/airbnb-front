import { stayService } from '../../services/stay.service'

const initialState = {
    stays: [],
    filterBy: stayService.getDefaultFilter(),
    sortBy: stayService.getDefaultSort(),
    isLoading: false,
}

export function stayReducer(state = initialState, action) {
    // {type: SOME_TYPE, data}
    let stays
    let lastRemovedStay
    let lastUpdatedStay

    switch (action.type) {
        // Stays
        case 'SET_STAYS':
            return { ...state, stays: action.stays }
        case 'SET_IS_LOADING':
            return { ...state, isLoading: action.isLoading }
        case 'ADD_STAY':
            stays = [action.stay, ...state.stays]
            return { ...state, stays: stays }
        case 'REMOVE_STAY': {
            let idx = state.stays.findIndex(stay => stay._id === action.stayId)
            let stay = state.stays[idx]
            lastRemovedStay = { stay, idx }
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            return { ...state, stays, lastRemovedStay }
        }
        case 'UNDO_REMOVE_STAY': {
            state.stays.splice(state.lastRemovedStay.idx, 0, state.lastRemovedStay.stay)
            stays = [...state.stays]
            return { ...state, stays, lastRemovedStay: null }
        }
        case 'UPDATE_STAY':
            lastUpdatedStay = action.stay
            stays = state.stays.map(stay => (stay._id === action.stay._id ? action.stay : stay))
            return { ...state, stays, lastUpdatedStay }
        case 'UNDO_UPDATE_STAY':
            stays = state.stays.map(stay => (stay._id === action.stay._id ? state.lastUpdatedStay : stay))
            return { ...state, stays, lastUpdatedStay: null }
        // Filter
        case 'SET_FILTER':
            return { ...state, filterBy: action.filterBy }
        // Sort
        case 'SET_SORT':
            return { ...state, sortBy: action.sortBy }

        //   Defalut
        default:
            return { ...state }
    }
}
