import { Box, Stack } from '@mui/material'
import React from 'react'
import { HourItem } from './HourItem'

type Props = {
    weatherList: any[]
}
export const TemperatureBlock: React.FC<Props> = ({ weatherList }) => {
    return (
        <Box
            sx={{
                bgcolor: 'action.hover',
                borderRadius: 2,
            }}>
            <Stack direction={'row'} py={2} px={5} overflow={'auto'}>
                {weatherList.map(item => (
                    <HourItem key={item.dt} temp={item.main.temp} time={item.dt} />
                ))}
            </Stack>
        </Box>
    )
}
