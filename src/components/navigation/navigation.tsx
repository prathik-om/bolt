'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
  Chip,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Book as BookIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  Bolt as BoltIcon,
  Calendar as CalendarIcon,
  Menu as MenuIcon,
  SmartToy as SmartToyIcon,
} from '@mui/icons-material'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon, href: '/' },
  { id: 'teachers', label: 'Teachers', icon: PeopleIcon, href: '/teachers' },
  { id: 'subjects', label: 'Subjects', icon: BookIcon, href: '/subjects' },
  { id: 'classes', label: 'Classes', icon: SchoolIcon, href: '/classes' },
  { id: 'rooms', label: 'Rooms', icon: BusinessIcon, href: '/rooms' },
  { id: 'generator', label: 'AI Generator', icon: BoltIcon, href: '/generator' },
  { id: 'timetables', label: 'Timetables', icon: CalendarIcon, href: '/timetables' },
]

interface NavigationProps {
  children: React.ReactNode
}

export function Navigation({ children }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SmartToyIcon color="primary" sx={{ fontSize: 32 }} />
        <Box>
          <Typography variant="h6" fontWeight={700}>
            TimetableAI
          </Typography>
          <Typography variant="caption" color="text.secondary">
            K-12 Scheduler
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={isActive}
                onClick={() => isMobile && setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main + '15',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main + '25',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? theme.palette.primary.main : 'inherit' }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Chip 
          label="v1.0" 
          size="small" 
          color="primary" 
          variant="outlined"
        />
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SmartToyIcon color="primary" sx={{ fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" fontWeight={700} color="text.primary">
                    TimetableAI
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    K-12 Scheduler
                  </Typography>
                </Box>
              </Box>
            </Box>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Button
                      key={item.id}
                      component={Link}
                      href={item.href}
                      startIcon={<Icon />}
                      variant={isActive ? 'contained' : 'text'}
                      color={isActive ? 'primary' : 'inherit'}
                      sx={{
                        color: isActive ? 'white' : 'text.primary',
                        fontWeight: 600,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: isActive ? 'primary.dark' : 'action.hover',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  )
                })}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label="v1.0" 
                size="small" 
                color="primary" 
                variant="outlined"
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, sm: 9 },
          pb: 3,
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}