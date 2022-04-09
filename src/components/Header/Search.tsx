import { useEffect, useRef, useState, KeyboardEvent } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Close, SearchOutlined } from '@mui/icons-material'

type SearchProps = {
    isFocus: boolean
    onSearch: (searchedValue: string) => void
}

export const Search: React.FC<SearchProps> = ({ isFocus, onSearch }) => {
    const [searchedValue, setSearchValue] = useState('')

    const searchHandle = () => {
        searchedValue && onSearch(searchedValue)
        setSearchValue('')
    }

    const onEnterKeyClick = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchHandle()
        }
    }
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        isFocus && searchRef.current?.focus()
    }, [isFocus])

    return (
        <TextField
            inputRef={searchRef}
            autoComplete='off'
            placeholder='Enter city...'
            fullWidth
            sx={{
                bgcolor: 'action.selected',
            }}
            size='small'
            value={searchedValue}
            onChange={e => setSearchValue(e.target.value)}
            InputProps={{
                onKeyDown: onEnterKeyClick,
                endAdornment: (
                    <InputAdornment position='end'>
                        {searchedValue && (
                            <IconButton disableRipple onClick={() => setSearchValue('')}>
                                <Close />
                            </IconButton>
                        )}
                        <IconButton disableRipple onClick={searchHandle}>
                            <SearchOutlined />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}
