import { Alert, Box, Container, Snackbar, Stack } from '@mui/material'
import { Header } from '../components/Header/Header'
import { CitiesList } from '../components/CitiesList/CitiesList'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeatherDataByCityName } from '../store/slices/appSlice'
import { RootStateType } from '../store'

export const HomePage = () => {
    const [searchIsFocus, setSearchIsFocus] = useState(false)
    const [snackbarState, setSnackbarState] = useState({ open: false, message: '' })
    const error = useSelector((state: RootStateType) => state.app.error)

    useEffect(() => {
        error && setSnackbarState({ open: true, message: error })
    }, [error])

    const handleSnackbarClose = () => {
        setSnackbarState({ open: false, message: '' })
    }

    const addCityHandler = () => {
        setSearchIsFocus(true)
    }
    const dispatch = useDispatch()

    const onSearchHandler = (searchedCity: string) => {
        dispatch(getWeatherDataByCityName(searchedCity))
        setSearchIsFocus(false)
    }

    return (
        <Box sx={{ height: '100vh' }}>
            <Container maxWidth='xl'>
                <Stack>
                    <Header onSearch={onSearchHandler} isSearchFocus={searchIsFocus} />
                    <CitiesList addCityHandler={addCityHandler} />
                </Stack>
            </Container>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarState.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity='error'
                    sx={{ width: ['100vw', 400] }}>
                    {snackbarState.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
