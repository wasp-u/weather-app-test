import { render, screen } from '@testing-library/react'
import { CityCard } from './CityCard'
import { WeatherForCity } from '../../store/slices/appSlice'
import { HashRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const weatherForCity: WeatherForCity = {
    coord: {
        lon: '',
        lat: '',
    },
    weather: [
        {
            id: 1,
            main: 'main',
            description: 'description',
            icon: 'icon',
        },
    ],
    base: 'base',
    main: {
        temp: 10,
        feels_like: 11,
        pressure: 100,
        humidity: 100,
        temp_min: 1,
        temp_max: 2,
        sea_level: 0,
        grnd_level: 0,
    },
    visibility: 10000,
    wind: {
        speed: 10,
        deg: 90,
        gust: 100,
    },
    clouds: {
        all: 100,
    },
    dt: 1000000,
    sys: {
        type: 1,
        id: 1,
        country: 'UA',
        sunrise: 1,
        sunset: 1,
    },

    timezone: 0,
    id: 111,
    name: 'Test City',
    cod: 1,
}

const deleteHandler = jest.fn()
const refreshHandler = jest.fn()

describe('CityCard component', () => {
    it('renders CityCard component with data', () => {
        render(
            <CityCard
                city={weatherForCity}
                refreshHandler={refreshHandler}
                deleteHandler={deleteHandler}
            />,
            { wrapper: HashRouter }
        )

        expect(screen.getByText('Test City')).toBeInTheDocument()
        expect(screen.getByText('description')).toBeInTheDocument()
        expect(screen.getByText('Feels like: 11°C')).toBeInTheDocument()
        expect(screen.getByText('10°C')).toBeInTheDocument()
    })

    it('delete handler works', () => {
        render(
            <CityCard
                city={weatherForCity}
                refreshHandler={refreshHandler}
                deleteHandler={deleteHandler}
            />,
            { wrapper: HashRouter }
        )

        userEvent.click(screen.getByTestId('delete-button'))
        expect(deleteHandler).toHaveBeenCalled()
    })
    it('refresh handler works', () => {
        render(
            <CityCard
                city={weatherForCity}
                refreshHandler={refreshHandler}
                deleteHandler={deleteHandler}
            />,
            { wrapper: HashRouter }
        )

        userEvent.click(screen.getByText(/refresh/i))
        expect(refreshHandler).toHaveBeenCalled()
    })
})
