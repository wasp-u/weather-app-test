import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

const searchHandler = jest.fn()

describe('Header component', () => {
    it('renders Header component', () => {
        render(<Header onSearch={searchHandler} isSearchFocus={false} />)
        expect(screen.getByText(/Weather App/i)).toBeInTheDocument()
    })
})
