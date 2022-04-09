import { Search } from './Search'
import { Grid, Typography } from '@mui/material'

type Props = {
    isSearchFocus: boolean
    onSearch: (searchedValue: string) => void
}

export const Header: React.FC<Props> = ({ isSearchFocus, onSearch }) => {
    return (
        <Grid container p={2} alignItems={'center'}>
            <Grid item xs={6}>
                <Typography variant={'h4'}>Weather App</Typography>
            </Grid>
            <Grid item xs>
                <Search isFocus={isSearchFocus} onSearch={onSearch} />
            </Grid>
        </Grid>
    )
}
