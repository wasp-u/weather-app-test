import { Grid } from '@mui/material'
import { CityCard } from '../CityCard/CityCard'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from '../../store'
import { AddCityCard } from '../AddCityCard/AddCityCard'
import {
    deleteCity,
    getWeatherDataByCityName,
    refreshCityWeather,
} from '../../store/slices/appSlice'
import { useEffect, useState } from 'react'

type Props = {
    addCityHandler: () => void
}

export const CitiesList: React.FC<Props> = ({ addCityHandler }) => {
    const dispatch = useDispatch()
    const cities = useSelector((state: RootStateType) => state.app.weatherData)

    const deleteHandler = (id: number) => {
        dispatch(deleteCity(id))
    }
    const refreshHandler = (cityName: string) => {
        dispatch(refreshCityWeather(cityName))
    }

    const [localCities, setLocalCities] = useState<string[]>(
        JSON.parse(localStorage.getItem('cities') as string)
    )

    useEffect(() => {
        localStorage.setItem('cities', JSON.stringify(cities.map(c => c.name)))
    }, [cities])

    useEffect(() => {
        localCities &&
            localCities.length > 0 &&
            localCities.map(c => dispatch(getWeatherDataByCityName(c)))
    }, [])

    return (
        <Grid container p={2} spacing={2}>
            {cities.length > 0 &&
                cities.map(city => (
                    <CityCard
                        key={city.id}
                        city={city}
                        deleteHandler={deleteHandler}
                        refreshHandler={refreshHandler}
                    />
                ))}
            <Grid item xs minWidth={'350px'}>
                <AddCityCard addCityHandler={addCityHandler} />
            </Grid>
        </Grid>
    )
}
