'use client'

import { useState } from 'react'
import { Container, Stack, Group, Text, Button, TextInput, Select, Paper } from '@mantine/core'
import { IconPlus, IconSearch, IconFilter } from '@tabler/icons-react'
import { TeacherList } from './teacher-list'
import { TeacherForm } from './teacher-form'
import { useTeachers } from '@/hooks/use-teachers'

export function TeacherManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')

  const { data: teachers, isLoading } = useTeachers()

  return (
    <Container size="xl">
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between">
          <div>
            <Text size="xl" fw={700}>Teacher Management</Text>
            <Text c="dimmed" mt={4}>Manage teaching staff and their subject assignments</Text>
          </div>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Teacher
          </Button>
        </Group>

        {/* Filters */}
        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between">
            <TextInput
              placeholder="Search teachers..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              style={{ flex: 1, maxWidth: 400 }}
            />

            <Select
              placeholder="All Departments"
              leftSection={<IconFilter size={16} />}
              value={filterDepartment}
              onChange={(value) => setFilterDepartment(value || 'all')}
              data={[
                { value: 'all', label: 'All Departments' },
                { value: 'mathematics', label: 'Mathematics' },
                { value: 'science', label: 'Science' },
                { value: 'english', label: 'English' },
                { value: 'social_studies', label: 'Social Studies' },
                { value: 'arts', label: 'Arts' },
                { value: 'physical_education', label: 'Physical Education' },
              ]}
              style={{ minWidth: 200 }}
            />
          </Group>
        </Paper>

        {/* Teacher List */}
        <TeacherList 
          teachers={teachers || []}
          isLoading={isLoading}
          searchQuery={searchQuery}
          filterDepartment={filterDepartment}
        />

        {/* Add Teacher Modal */}
        {isAddModalOpen && (
          <TeacherForm
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={() => setIsAddModalOpen(false)}
          />
        )}
      </Stack>
    </Container>
  )
}