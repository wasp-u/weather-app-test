import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography,
} from '@mui/material'
import { WeatherForCity } from '../../store/slices/appSlice'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import { useNavigate } from 'react-router-dom'

type Props = {
    city: WeatherForCity
    deleteHandler: (id: number) => void
    refreshHandler: (cityName: string) => void
}

export const CityCard: React.FC<Props> = ({ city, deleteHandler, refreshHandler }) => {
    let navigate = useNavigate()

    return (
        <Grid item xs>
            <Card
                sx={{
                    minWidth: '350px',
                    height: '100%',
                    '&:hover': {
                        cursor: 'pointer',
                        bgcolor: 'action.hover',
                    },
                }}>
                <CardContent onClick={() => navigate(`${city.name}`)}>
                    <Grid container spacing={1} alignItems={'center'} justifyContent={'center'}>
                        <Grid item xs={6}>
                            <Typography variant={'h4'}>{city.name}</Typography>
                            <Typography variant={'caption'}>
                                {city.weather[0].description}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack alignItems={'center'}>
                                <Typography variant={'h4'}>
                                    <ThermostatIcon />
                                    {Math.round(city.main.temp)}°C
                                </Typography>
                                <Typography variant={'caption'}>
                                    Feels like: {Math.round(city.main.feels_like)}°C
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs>
                            <Chip label={`Wind speed: ${city.wind.speed}m/s`} />
                        </Grid>
                        <Grid item xs>
                            <Chip label={`Pressure: ${city.main.pressure}hPa`} />
                        </Grid>
                        <Grid item xs>
                            <Chip color={'warning'} label={`Max: ${city.main.temp_max}°C`} />
                        </Grid>
                        <Grid item xs>
                            <Chip color={'primary'} label={`Min: ${city.main.temp_min}°C`} />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button size='small' onClick={() => refreshHandler(city.name)}>
                        Refresh
                    </Button>
                    <Button size='small' color={'error'} onClick={() => deleteHandler(city.id)}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
