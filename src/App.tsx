import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CityPage } from './pages/CityPage'

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path=':cityName' element={<CityPage />} />
            </Routes>
        </div>
    )
}

export default App
