import { Box, CircularProgress } from '@mui/material'

interface LoadingSpinnerProps {
  size?: number
}

export function LoadingSpinner({ size = 40 }: LoadingSpinnerProps) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        p: 4 
      }}
    >
      <CircularProgress size={size} />
    </Box>
  )
}