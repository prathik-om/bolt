'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  AppShell, 
  Navbar, 
  NavLink, 
  Group, 
  Text, 
  Burger,
  ThemeIcon,
  Stack,
  Badge,
  Divider
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { 
  IconDashboard, 
  IconUsers, 
  IconBook, 
  IconSchool, 
  IconBuilding,
  IconBolt, 
  IconCalendar,
  IconBrandOpenai
} from '@tabler/icons-react'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: IconDashboard, href: '/' },
  { id: 'teachers', label: 'Teachers', icon: IconUsers, href: '/teachers' },
  { id: 'subjects', label: 'Subjects', icon: IconBook, href: '/subjects' },
  { id: 'classes', label: 'Classes', icon: IconSchool, href: '/classes' },
  { id: 'rooms', label: 'Rooms', icon: IconBuilding, href: '/rooms' },
  { id: 'generator', label: 'AI Generator', icon: IconBolt, href: '/generator' },
  { id: 'timetables', label: 'Timetables', icon: IconCalendar, href: '/timetables' },
]

interface NavigationProps {
  children: React.ReactNode
}

export function Navigation({ children }: NavigationProps) {
  const [opened, { toggle }] = useDisclosure()
  const pathname = usePathname()

  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group gap="xs">
              <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                <IconBrandOpenai size={20} />
              </ThemeIcon>
              <div>
                <Text size="lg" fw={700}>TimetableAI</Text>
                <Text size="xs" c="dimmed">K-12 Scheduler</Text>
              </div>
            </Group>
          </Group>
          
          <Badge variant="light" color="blue" size="sm">
            v1.0
          </Badge>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="xs">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <NavLink
                key={item.id}
                component={Link}
                href={item.href}
                label={item.label}
                leftSection={<Icon size={20} />}
                active={isActive}
                variant="filled"
                onClick={() => opened && toggle()}
              />
            )
          })}
        </Stack>

        <Divider my="md" />
        
        <Text size="xs" c="dimmed" ta="center">
          Powered by AI • Version 1.0
        </Text>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}