'use client'

import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Stack,
  Avatar,
  Skeleton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { 
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
  FiberManualRecord as DotIcon
} from '@mui/icons-material'
import { useSystemStatus } from '@/hooks/use-system-status'

export function SystemStatus() {
  const { data: status, isLoading } = useSystemStatus()

  if (isLoading) {
    return (
      <Stack spacing={3}>
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
        <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 3 }} />
      </Stack>
    )
  }

  return (
    <Stack spacing={3}>
      {/* System Status */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
            System Status
          </Typography>
          <Stack spacing={2}>
            <Box 
              sx={{ 
                p: 2, 
                bgcolor: '#e8f5e8', 
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#388e3c', width: 32, height: 32 }}>
                  <CheckCircleIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Typography fontWeight={600} color="#2e7d32">
                  Database Connection
                </Typography>
              </Box>
              <Chip label="Active" color="success" size="small" />
            </Box>
            
            <Box 
              sx={{ 
                p: 2, 
                bgcolor: '#e8f5e8', 
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#388e3c', width: 32, height: 32 }}>
                  <CheckCircleIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Typography fontWeight={600} color="#2e7d32">
                  Data Configuration
                </Typography>
              </Box>
              <Chip label="Ready" color="success" size="small" />
            </Box>
            
            <Box 
              sx={{ 
                p: 2, 
                bgcolor: '#fff3e0', 
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#f57c00', width: 32, height: 32 }}>
                  <WarningIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Typography fontWeight={600} color="#ef6c00">
                  AI Generation
                </Typography>
              </Box>
              <Chip 
                label={status?.hasGeneratedTimetables ? 'Generated' : 'Pending'} 
                color="warning" 
                size="small" 
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
            Getting Started
          </Typography>
          <List dense>
            {[
              { text: 'Set up teachers and their subjects', color: '#1976d2' },
              { text: 'Configure subjects and requirements', color: '#388e3c' },
              { text: 'Define classes and sections', color: '#7b1fa2' },
              { text: 'Generate optimized timetables', color: '#f57c00' }
            ].map((step, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <DotIcon sx={{ color: step.color, fontSize: 12 }} />
                </ListItemIcon>
                <ListItemText 
                  primary={step.text}
                  primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Last Updated */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'grey.100', color: 'text.secondary', width: 32, height: 32 }}>
              <ScheduleIcon sx={{ fontSize: 18 }} />
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              Last updated: {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  )
}