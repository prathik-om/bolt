import { Loader, Center } from '@mantine/core'

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  return (
    <Center p="xl">
      <Loader size={size} />
    </Center>
  )
}