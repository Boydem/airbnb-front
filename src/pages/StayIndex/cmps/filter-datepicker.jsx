import { useSelector } from 'react-redux'

export function FilterDatepicker() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    console.log('filterBy:', filterBy)
    return <section className='filter-modal filter-datepicker'>Hello from FilterDatepicker</section>
}
