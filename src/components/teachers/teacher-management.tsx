'use client'

import { useState } from 'react'
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl,
  InputLabel,
  Card,
  CardContent,
  InputAdornment
} from '@mui/material'
import { 
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon
} from '@mui/icons-material'
import { TeacherList } from './teacher-list'
import { TeacherForm } from './teacher-form'
import { useTeachers } from '@/hooks/use-teachers'

export function TeacherManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')

  const { data: teachers, isLoading } = useTeachers()

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              Teacher Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage teaching staff and their subject assignments
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddModalOpen(true)}
            sx={{ borderRadius: 2 }}
          >
            Add Teacher
          </Button>
        </Box>

        {/* Filters */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ flex: 1, maxWidth: 400 }}
              />

              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Department</InputLabel>
                <Select
                  value={filterDepartment}
                  label="Department"
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  startAdornment={<FilterIcon sx={{ mr: 1, color: 'action.active' }} />}
                >
                  <MenuItem value="all">All Departments</MenuItem>
                  <MenuItem value="mathematics">Mathematics</MenuItem>
                  <MenuItem value="science">Science</MenuItem>
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="social_studies">Social Studies</MenuItem>
                  <MenuItem value="arts">Arts</MenuItem>
                  <MenuItem value="physical_education">Physical Education</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>

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
      </Box>
    </Container>
  )
}