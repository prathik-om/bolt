import { Suspense } from 'react'
import { Container, Box, Card, CardContent, Typography, Avatar } from '@mui/material'
import { SmartToy as SmartToyIcon } from '@mui/icons-material'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { SystemStatus } from '@/components/dashboard/system-status'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <DashboardShell>
      <Container maxWidth="xl">
        <Box sx={{ py: 4 }}>
          {/* Header */}
          <Card 
            sx={{ 
              mb: 4,
              background: 'linear-gradient(135deg, #1976d2, #0288d1)',
              color: 'white',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                    AI Timetable Generator
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Intelligent scheduling for K-12 education
                  </Typography>
                </Box>
                <Avatar 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    width: 80,
                    height: 80,
                  }}
                >
                  <SmartToyIcon sx={{ fontSize: 40 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>

          {/* Dashboard Content */}
          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
            <Box sx={{ flex: 2 }}>
              <Box sx={{ mb: 4 }}>
                <Suspense fallback={<LoadingSpinner />}>
                  <DashboardStats />
                </Suspense>
              </Box>
              
              <Suspense fallback={<LoadingSpinner />}>
                <QuickActions />
              </Suspense>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Suspense fallback={<LoadingSpinner />}>
                <SystemStatus />
              </Suspense>
            </Box>
          </Box>
        </Box>
      </Container>
    </DashboardShell>
  )
}