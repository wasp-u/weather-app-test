import { Box, Grid, Typography } from '@mui/material'

type Props = {
    title: string
    value: string | number
}
export const InfoField: React.FC<Props> = ({ title, value }) => {
    return (
        <Grid item>
            <Box
                sx={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'action.selected',
                    borderRadius: 2,
                }}
                px={4}
                py={2}>
                <Typography variant={'h5'}>{title}</Typography>
                <Typography>{value}</Typography>
            </Box>
        </Grid>
    )
}
