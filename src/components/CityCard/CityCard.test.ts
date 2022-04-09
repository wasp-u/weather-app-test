import { unmountComponentAtNode } from 'react-dom'
import { act, render } from '@testing-library/react'
import { CityCard } from './CityCard'

let container: any = null
beforeEach(() => {
    // подготавливаем DOM-элемент, куда будем рендерить
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    // подчищаем после завершения
    unmountComponentAtNode(container)
    container.remove()
    container = null
})
//
// it('renders with or without a name', () => {
//     act(() => {
//         render(<CityCard />, container)
//     })
//     expect(container.textContent).toBe('Hey, stranger')
//
//     act(() => {
//         render(<Hello name='Jenny' />, container)
//     })
//     expect(container.textContent).toBe('Hello, Jenny!')
//
//     act(() => {
//         render(<Hello name='Margaret' />, container)
//     })
//     expect(container.textContent).toBe('Hello, Margaret!')
// })
