import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { weatherApi } from '../../api/weatherApi'

const initialState = {
    weatherData: [] as WeatherForCity[],
    weatherDataForCity: null as WeatherForCity | null,
    forecastWeather: [] as any[],
    error: null as string | null,
}

export type WeatherForCity = {
    coord: {
        lon: string
        lat: string
    }
    weather: [
        {
            id: number
            main: string
            description: string
            icon: string
        }
    ]
    base: string
    main: {
        temp: number
        feels_like: number
        pressure: number
        humidity: number
        temp_min: number
        temp_max: number
        sea_level: number
        grnd_level: number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
        gust: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    }

    timezone: number
    id: number
    name: string
    cod: number
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
        setWeatherData(state, action: PayloadAction<WeatherForCity>) {
            let isNewCity = true
            state.weatherData.forEach(item => {
                if (item.name === action.payload.name) {
                    isNewCity = false
                }
            })
            if (isNewCity) {
                state.weatherData = [...state.weatherData, action.payload]
            }
        },
        setWeatherDataForCity(state, action: PayloadAction<WeatherForCity | null>) {
            state.weatherDataForCity = action.payload
        },
        setForecastWeather(state, action: PayloadAction<any>) {
            state.forecastWeather = action.payload
        },
        deleteCity(state, action: PayloadAction<number>) {
            state.weatherData = [...state.weatherData.filter(city => city.id !== action.payload)]
        },
        updateCityWeather(state, action: PayloadAction<WeatherForCity>) {
            state.weatherData = [
                ...state.weatherData.map(city => {
                    if (city.name === action.payload.name) {
                        return action.payload
                    } else {
                        return city
                    }
                }),
            ]
        },
    },
})

export const {
    setWeatherData,
    deleteCity,
    setError,
    updateCityWeather,
    setForecastWeather,
    setWeatherDataForCity,
} = appSlice.actions

export const getWeatherDataByCityName = (cityName: string) => async (dispatch: any) => {
    const res = await weatherApi.getWeatherByCityName(cityName)
    const data = await res.json()
    if (data.hasOwnProperty('cod') && data.hasOwnProperty('message')) {
        dispatch(setError(data.message))
    } else {
        dispatch(setError(null))
        dispatch(setWeatherData(data))
    }
}
export const refreshCityWeather = (cityName: string) => async (dispatch: any) => {
    const res = await weatherApi.getWeatherByCityName(cityName)
    const data = await res.json()
    dispatch(updateCityWeather(data))
}
export const getForecastWeather = (cityName: string) => async (dispatch: any) => {
    const res = await weatherApi.getForecastWeather(cityName)
    const data = await res.json()
    dispatch(setForecastWeather(data.list))
}
export const getWeatherDataForCity = (cityName: string) => async (dispatch: any) => {
    const res = await weatherApi.getWeatherByCityName(cityName)
    const data = await res.json()
    dispatch(setWeatherDataForCity(data))
}

export default appSlice.reducer
