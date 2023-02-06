import './assets/styles/styles.scss'
import { Route, Routes } from 'react-router-dom'
import { StayIndex } from './pages/StayIndex/stay-index'
import { AppHeader } from './common/app-header'

export function App() {
    return (
        <div className='app'>
            <AppHeader />
            <main className='main-content main-layout'>
                <Routes>
                    <Route path='/airbnb-clone-frontend' element={<StayIndex />} />
                </Routes>
            </main>
        </div>
    )
}
