import React from 'react'
import { Box, Typography } from '@mui/material'
import { getColorForTemperature } from '../../common/getColorForTemperature'

type Props = {
    temp: number
    time: number
}
export const HourItem: React.FC<Props> = ({ temp, time }) => {
    const roundTemp = Math.round(temp)
    const displayTime = new Date(time * 1000).toLocaleTimeString().split(':')
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                width: 150,
                minWidth: 50,
                height: 250,
            }}>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: roundTemp * 3 + Math.abs(roundTemp) + 20,
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    bgcolor: getColorForTemperature(roundTemp),
                }}>
                <Typography>
                    {roundTemp <= 0 ? '-' : '+'}
                    {roundTemp}
                </Typography>
            </Box>
            <Typography>
                {Number(displayTime[0])}:{displayTime[1]}
            </Typography>
        </Box>
    )
}
