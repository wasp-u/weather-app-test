import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Box, Card, CardContent, IconButton } from '@mui/material'

type Props = {
    addCityHandler: () => void
}

export const AddCityCard: React.FC<Props> = ({ addCityHandler }) => {
    return (
        <Card sx={{ width: '100%', height: '100%' }}>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                    }}>
                    <IconButton onClick={addCityHandler}>
                        <AddCircleOutlineIcon
                            sx={{
                                fontSize: 90,
                            }}
                        />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    )
}
