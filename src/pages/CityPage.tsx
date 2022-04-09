import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getForecastWeather,
    getWeatherDataForCity,
    setForecastWeather,
    setWeatherDataForCity,
} from '../store/slices/appSlice'
import { Box, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { RootStateType } from '../store'
import { InfoField } from '../components/InfoField/InfoField'
import { TemperatureBlock } from '../components/TemperatureBlock/TemperatureBlock'

export const CityPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const currentCity = useSelector((state: RootStateType) => state.app.weatherDataForCity)
    const forecastWeather = useSelector((state: RootStateType) => state.app.forecastWeather)

    const [isLoading, setIsLoading] = useState(false)
    const getWeather = async () => {
        setIsLoading(true)
        await dispatch(getForecastWeather(params.cityName as string))
        await dispatch(getWeatherDataForCity(params.cityName as string))
        setIsLoading(false)
    }

    useEffect(() => {
        getWeather()
        return () => {
            dispatch(setForecastWeather([]))
            dispatch(setWeatherDataForCity(null))
        }
    }, [])

    if (currentCity) {
        const currentTime = new Date(currentCity.dt * 1000).toDateString()
        const sunriseTime = new Date(currentCity.sys.sunrise * 1000).toLocaleTimeString()
        const sunsetTime = new Date(currentCity.sys.sunset * 1000).toLocaleTimeString()
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
                        <InfoField
                            title={'Feels like'}
                            value={`${currentCity.main.feels_like}°C`}
                        />
                        <InfoField title={'Max'} value={`${currentCity.main.temp_max}°C`} />
                        <InfoField title={'Min'} value={`${currentCity.main.temp_min}°C`} />
                        <InfoField title={'Pressure'} value={`${currentCity.main.pressure}hPa`} />
                        <InfoField title={'Humidity'} value={`${currentCity.main.humidity}%`} />
                        <InfoField title={'Visibility'} value={`${currentCity.visibility}m`} />
                        <InfoField title={'Wind speed'} value={`${currentCity.wind.speed}m/s`} />
                        <InfoField title={'Sunrise'} value={sunriseTime} />
                        <InfoField title={'Sunsets'} value={sunsetTime} />
                    </Grid>
                    {forecastWeather.length > 0 && (
                        <TemperatureBlock weatherList={forecastWeather} />
                    )}
                </Container>
            </Box>
        )
    } else {
        return <CircularProgress />
    }
}
