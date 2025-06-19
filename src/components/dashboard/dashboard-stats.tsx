'use client'

import { useSchoolStats } from '@/hooks/use-school-stats'
import { SimpleGrid, Paper, Text, Group, ThemeIcon, Skeleton } from '@mantine/core'
import { IconUsers, IconBook, IconSchool, IconCalendar } from '@tabler/icons-react'

export function DashboardStats() {
  const { data: stats, isLoading } = useSchoolStats()

  if (isLoading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} height={120} radius="md" />
        ))}
      </SimpleGrid>
    )
  }

  const statsData = [
    {
      title: 'Teachers',
      value: stats?.teachers || 0,
      icon: IconUsers,
      color: 'blue',
    },
    {
      title: 'Subjects',
      value: stats?.subjects || 0,
      icon: IconBook,
      color: 'green',
    },
    {
      title: 'Classes',
      value: stats?.classSections || 0,
      icon: IconSchool,
      color: 'violet',
    },
    {
      title: 'Timetables',
      value: stats?.timetables || 0,
      icon: IconCalendar,
      color: 'orange',
    }
  ]

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
      {statsData.map((stat) => {
        const Icon = stat.icon
        return (
          <Paper key={stat.title} p="md" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
                  {stat.title}
                </Text>
                <Text fw={700} size="xl">
                  {stat.value}
                </Text>
              </div>
              <ThemeIcon color={stat.color} variant="light" size={38} radius="md">
                <Icon size={22} stroke={1.5} />
              </ThemeIcon>
            </Group>
          </Paper>
        )
      })}
    </SimpleGrid>
  )
}