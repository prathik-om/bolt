import { Suspense } from 'react'
import { Container, Stack, Paper, Group, ThemeIcon, Text } from '@mantine/core'
import { IconBrandOpenai } from '@tabler/icons-react'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { SystemStatus } from '@/components/dashboard/system-status'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <DashboardShell>
      <Container size="xl">
        <Stack gap="xl">
          {/* Header */}
          <Paper
            p="xl"
            radius="md"
            style={(theme) => ({
              background: `linear-gradient(135deg, ${theme.colors.blue[6]}, ${theme.colors.cyan[6]})`,
              color: 'white',
            })}
          >
            <Group justify="space-between">
              <div>
                <Text size="xl" fw={700} mb="xs">AI Timetable Generator</Text>
                <Text size="lg" opacity={0.9}>Intelligent scheduling for K-12 education</Text>
              </div>
              <ThemeIcon size={64} variant="white" color="blue" radius="md">
                <IconBrandOpenai size={32} />
              </ThemeIcon>
            </Group>
          </Paper>

          {/* Dashboard Content */}
          <Group align="flex-start" gap="xl">
            <Stack flex={2} gap="xl">
              <Suspense fallback={<LoadingSpinner />}>
                <DashboardStats />
              </Suspense>
              
              <Suspense fallback={<LoadingSpinner />}>
                <QuickActions />
              </Suspense>
            </Stack>
            
            <Stack flex={1} gap="xl">
              <Suspense fallback={<LoadingSpinner />}>
                <SystemStatus />
              </Suspense>
            </Stack>
          </Group>
        </Stack>
      </Container>
    </DashboardShell>
  )
}