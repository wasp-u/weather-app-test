import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../store'

test('full app rendering/navigating', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        { wrapper: HashRouter }
    )
    expect(screen.getByText(/Weather App/i)).toBeInTheDocument()
})
