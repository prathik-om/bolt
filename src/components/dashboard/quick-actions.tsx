'use client'

import Link from 'next/link'
import { SimpleGrid, Paper, Text, Group, ThemeIcon, Stack } from '@mantine/core'
import { IconBolt, IconUsers, IconSchool } from '@tabler/icons-react'

export function QuickActions() {
  const actions = [
    {
      title: 'Generate New Timetable',
      description: 'Use AI to create optimized schedules',
      icon: IconBolt,
      color: 'blue',
      href: '/generator'
    },
    {
      title: 'Manage Teachers',
      description: 'Add, edit, or remove teaching staff',
      icon: IconUsers,
      color: 'green',
      href: '/teachers'
    },
    {
      title: 'Configure Classes',
      description: 'Set up grades, sections, and subjects',
      icon: IconSchool,
      color: 'violet',
      href: '/classes'
    }
  ]

  return (
    <Paper p="md" radius="md" withBorder>
      <Text size="lg" fw={600} mb="md">Quick Actions</Text>
      <SimpleGrid cols={{ base: 1, md: 3 }}>
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Paper
              key={action.title}
              component={Link}
              href={action.href}
              p="lg"
              radius="md"
              style={(theme) => ({
                background: `linear-gradient(135deg, ${theme.colors[action.color][6]}, ${theme.colors[action.color][8]})`,
                color: 'white',
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              })}
            >
              <Stack gap="md">
                <Group justify="space-between">
                  <ThemeIcon size="lg" variant="white" color={action.color}>
                    <Icon size={24} />
                  </ThemeIcon>
                  <div style={{ width: 8, height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '50%' }} />
                </Group>
                <div>
                  <Text fw={600} size="lg" mb={4}>{action.title}</Text>
                  <Text size="sm" opacity={0.9}>{action.description}</Text>
                </div>
              </Stack>
            </Paper>
          )
        })}
      </SimpleGrid>
    </Paper>
  )
}