'use client'

import { useSchoolStats } from '@/hooks/use-school-stats'
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Skeleton,
  Avatar
} from '@mui/material'
import { 
  People as PeopleIcon,
  Book as BookIcon,
  School as SchoolIcon,
  Calendar as CalendarIcon
} from '@mui/icons-material'

export function DashboardStats() {
  const { data: stats, isLoading } = useSchoolStats()

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid item xs={12} sm={6} lg={3} key={i}>
            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3 }} />
          </Grid>
        ))}
      </Grid>
    )
  }

  const statsData = [
    {
      title: 'Teachers',
      value: stats?.teachers || 0,
      icon: PeopleIcon,
      color: '#1976d2',
      bgColor: '#e3f2fd',
    },
    {
      title: 'Subjects',
      value: stats?.subjects || 0,
      icon: BookIcon,
      color: '#388e3c',
      bgColor: '#e8f5e8',
    },
    {
      title: 'Classes',
      value: stats?.classSections || 0,
      icon: SchoolIcon,
      color: '#7b1fa2',
      bgColor: '#f3e5f5',
    },
    {
      title: 'Timetables',
      value: stats?.timetables || 0,
      icon: CalendarIcon,
      color: '#f57c00',
      bgColor: '#fff3e0',
    }
  ]

  return (
    <Grid container spacing={3}>
      {statsData.map((stat) => {
        const Icon = stat.icon
        return (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" sx={{ mb: 1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="text.primary">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar 
                    sx={{ 
                      bgcolor: stat.bgColor,
                      color: stat.color,
                      width: 56,
                      height: 56,
                    }}
                  >
                    <Icon sx={{ fontSize: 28 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}