import { storageService } from './async-storage.service.js'
var gStays = require('../json/stay.json') || null

const STAY_DB_KEY = 'stayDB'

_createStays()

export const stayService = {
    query,
    get,
    remove,
    save,
    getEmptyStay,
    getDefaultFilter,
    getDefaultSort,
}

function getDefaultSort() {
    return { title: false, price: false, createdAt: false }
}

function getEmptyStay(
    name = '',
    price = 0,
    capacity = 0,
    labels = [],
    imgUrls = [],
    amenities = [],
    loc = {},
    summary = '',
    type = ''
) {
    return {
        name,
        price,
        summary,
        amenities,
        loc,
        labels,
        capacity,
        imgUrls,
        type,
    }
}

function getDefaultFilter() {
    return {
        labels: [],
        whereTo: '',
        checkIn: null,
        checkOut: null,
        guests: { adults: null, children: null, infants: null, pets: null },

    }
}

async function query(filterBy = getDefaultFilter(), staysToDisplay) {
    try {
        let stays = await storageService.query(STAY_DB_KEY)
        return stays.splice(0, staysToDisplay)
    } catch (err) {
        console.log('err:', err)
    }
}

function get(stayId) {
    return storageService.get(STAY_DB_KEY, stayId)
}

function remove(stayId) {
    return storageService.remove(STAY_DB_KEY, stayId)
}

function save(stay) {
    if (stay._id) {
        return storageService.put(STAY_DB_KEY, stay)
    } else {
        // stay.owner = userService.getLoggedinUser()
        return storageService.post(STAY_DB_KEY, stay)
    }
}

function _createStays() {
    let stays = JSON.parse(localStorage.getItem(STAY_DB_KEY)) || []
    if (!stays || !stays.length) {
        localStorage.setItem(STAY_DB_KEY, JSON.stringify(gStays))
    }
}

// function _createStay(name, price, labels, inStock, imgUrl) {
//     const stay = getEmptyStay(name, price, labels, inStock, imgUrl)
//     save(stay)
//     return stay
// }
