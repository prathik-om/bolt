'use client'

import { Paper, Text, Stack, Group, ThemeIcon, Badge, Skeleton } from '@mantine/core'
import { IconCheck, IconAlertTriangle, IconClock } from '@tabler/icons-react'
import { useSystemStatus } from '@/hooks/use-system-status'

export function SystemStatus() {
  const { data: status, isLoading } = useSystemStatus()

  if (isLoading) {
    return (
      <Stack gap="md">
        <Skeleton height={200} radius="md" />
        <Skeleton height={150} radius="md" />
      </Stack>
    )
  }

  return (
    <Stack gap="md">
      {/* System Status */}
      <Paper p="md" radius="md" withBorder>
        <Text size="lg" fw={600} mb="md">System Status</Text>
        <Stack gap="sm">
          <Group justify="space-between" p="sm" style={{ backgroundColor: 'var(--mantine-color-green-0)', borderRadius: 'var(--mantine-radius-sm)' }}>
            <Group gap="sm">
              <ThemeIcon color="green" variant="light" size="sm">
                <IconCheck size={16} />
              </ThemeIcon>
              <Text fw={500} c="green.8">Database Connection</Text>
            </Group>
            <Badge color="green" variant="light" size="sm">Active</Badge>
          </Group>
          
          <Group justify="space-between" p="sm" style={{ backgroundColor: 'var(--mantine-color-green-0)', borderRadius: 'var(--mantine-radius-sm)' }}>
            <Group gap="sm">
              <ThemeIcon color="green" variant="light" size="sm">
                <IconCheck size={16} />
              </ThemeIcon>
              <Text fw={500} c="green.8">Data Configuration</Text>
            </Group>
            <Badge color="green" variant="light" size="sm">Ready</Badge>
          </Group>
          
          <Group justify="space-between" p="sm" style={{ backgroundColor: 'var(--mantine-color-yellow-0)', borderRadius: 'var(--mantine-radius-sm)' }}>
            <Group gap="sm">
              <ThemeIcon color="yellow" variant="light" size="sm">
                <IconAlertTriangle size={16} />
              </ThemeIcon>
              <Text fw={500} c="yellow.8">AI Generation</Text>
            </Group>
            <Badge color="yellow" variant="light" size="sm">
              {status?.hasGeneratedTimetables ? 'Generated' : 'Pending'}
            </Badge>
          </Group>
        </Stack>
      </Paper>

      {/* Getting Started */}
      <Paper p="md" radius="md" withBorder>
        <Text size="lg" fw={600} mb="md">Getting Started</Text>
        <Stack gap="xs">
          {[
            'Set up teachers and their subjects',
            'Configure subjects and requirements',
            'Define classes and sections',
            'Generate optimized timetables'
          ].map((step, index) => (
            <Group key={index} gap="sm" p="xs">
              <div style={{ 
                width: 8, 
                height: 8, 
                backgroundColor: ['var(--mantine-color-blue-6)', 'var(--mantine-color-green-6)', 'var(--mantine-color-violet-6)', 'var(--mantine-color-orange-6)'][index],
                borderRadius: '50%' 
              }} />
              <Text size="sm" c="dimmed">{step}</Text>
            </Group>
          ))}
        </Stack>
      </Paper>

      {/* Last Updated */}
      <Paper p="sm" radius="md" withBorder>
        <Group gap="sm">
          <ThemeIcon color="gray" variant="light" size="sm">
            <IconClock size={16} />
          </ThemeIcon>
          <Text size="sm" c="dimmed">
            Last updated: {new Date().toLocaleDateString()}
          </Text>
        </Group>
      </Paper>
    </Stack>
  )
}