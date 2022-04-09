import { Search } from './Search'
import { useDispatch } from 'react-redux'
import { getWeatherDataByCityName } from '../../store/slices/appSlice'
import { Box, Grid, Typography } from '@mui/material'

type Props = {
    isSearchFocus: boolean
    onSearch: (searchedValue: string) => void
}

export const Header: React.FC<Props> = ({ isSearchFocus, onSearch }) => {
    return (
        <Grid container p={2} alignItems={'center'}>
            <Grid item xs={3}>
                <Typography variant={'h4'}>Weather App</Typography>
            </Grid>
            <Grid item xs={6}>
                <Search isFocus={isSearchFocus} onSearch={onSearch} />
            </Grid>
        </Grid>
    )
}
