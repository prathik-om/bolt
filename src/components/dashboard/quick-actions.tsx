'use client'

import Link from 'next/link'
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Box,
  Avatar,
  alpha
} from '@mui/material'
import { 
  Bolt as BoltIcon,
  People as PeopleIcon,
  School as SchoolIcon
} from '@mui/icons-material'

export function QuickActions() {
  const actions = [
    {
      title: 'Generate New Timetable',
      description: 'Use AI to create optimized schedules',
      icon: BoltIcon,
      color: '#1976d2',
      bgColor: '#e3f2fd',
      href: '/generator'
    },
    {
      title: 'Manage Teachers',
      description: 'Add, edit, or remove teaching staff',
      icon: PeopleIcon,
      color: '#388e3c',
      bgColor: '#e8f5e8',
      href: '/teachers'
    },
    {
      title: 'Configure Classes',
      description: 'Set up grades, sections, and subjects',
      icon: SchoolIcon,
      color: '#7b1fa2',
      bgColor: '#f3e5f5',
      href: '/classes'
    }
  ]

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Grid item xs={12} md={4} key={action.title}>
                <Card
                  component={Link}
                  href={action.href}
                  sx={{
                    textDecoration: 'none',
                    background: `linear-gradient(135deg, ${action.color}, ${alpha(action.color, 0.8)})`,
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 12px 24px ${alpha(action.color, 0.3)}`,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          width: 48,
                          height: 48,
                        }}
                      >
                        <Icon sx={{ fontSize: 24 }} />
                      </Avatar>
                      <Box 
                        sx={{ 
                          width: 8, 
                          height: 8, 
                          bgcolor: 'rgba(255,255,255,0.3)', 
                          borderRadius: '50%' 
                        }} 
                      />
                    </Box>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {action.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </CardContent>
    </Card>
  )
}