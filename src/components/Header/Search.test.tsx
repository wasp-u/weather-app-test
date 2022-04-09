import { render, screen } from '@testing-library/react'
import { Search } from './Search'
import userEvent from '@testing-library/user-event'

const onSearch = jest.fn()

describe('Search component', () => {
    it('renders Search component', () => {
        render(<Search isFocus={false} onSearch={onSearch} />)

        expect(screen.getByTestId('search-element')).toBeInTheDocument()
    })
})
