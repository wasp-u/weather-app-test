import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getForecastWeather,
    getWeatherDataByCityName,
    setForecastWeather,
    WeatherForCity,
} from '../store/slices/appSlice'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import { Header } from '../components/Header/Header'
import { CitiesList } from '../components/CitiesList/CitiesList'
import { useParams } from 'react-router-dom'
import { RootStateType } from '../store'
import { InfoField } from '../components/InfoField/InfoField'
import { TemperatureBlock } from '../components/TemperatureBlock/TemperatureBlock'

export const CityPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const currentCity = useSelector((state: RootStateType) =>
        state.app.weatherData.find(city => city.name === params.cityName)
    ) as WeatherForCity
    const forecastWeather = useSelector((state: RootStateType) => state.app.forecastWeather)

    const currentTime = new Date(currentCity.dt * 1000).toDateString()
    const sunriseTime = new Date(currentCity.sys.sunrise * 1000).toLocaleTimeString()
    const sunsetTime = new Date(currentCity.sys.sunset * 1000).toLocaleTimeString()

    useEffect(() => {
        dispatch(getForecastWeather(currentCity.name))
        return () => {
            dispatch(setForecastWeather([]))
        }
    }, [])

    return (
        <Box sx={{ height: '100vh' }}>
            <Container maxWidth='xl'>
                <Grid container spacing={4} alignItems={'center'}>
                    <Grid item>
                        <Typography variant={'h1'}>{currentCity.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography color={'info.dark'} variant={'h3'}>
                            {currentTime}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant={'h4'}>{currentCity.weather[0].description}</Typography>
                <Grid container spacing={2} my={2}>
                    <InfoField title={'Temperature'} value={`${currentCity.main.temp}°C`} />
                    <InfoField title={'Feels like'} value={`${currentCity.main.feels_like}°C`} />
                    <InfoField title={'Max'} value={`${currentCity.main.temp_max}°C`} />
                    <InfoField title={'Min'} value={`${currentCity.main.temp_min}°C`} />
                    <InfoField title={'Pressure'} value={`${currentCity.main.pressure}hPa`} />
                    <InfoField title={'Humidity'} value={`${currentCity.main.humidity}%`} />
                    <InfoField title={'Visibility'} value={`${currentCity.visibility}m`} />
                    <InfoField title={'Wind speed'} value={`${currentCity.wind.speed}m/s`} />
                    <InfoField title={'Sunrise'} value={sunriseTime} />
                    <InfoField title={'Sunsets'} value={sunsetTime} />
                </Grid>
                {forecastWeather.length > 0 && <TemperatureBlock weatherList={forecastWeather} />}
            </Container>
        </Box>
    )
}
