import React from 'react';
import {Box, Button, IconButton, styled, Toolbar, Typography} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import {drawerWidth} from "../../App.tsx";
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['Товары', 'Склады', 'О системе', 'Личный кабинет'];

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({open}) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));


interface NavigationProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
      <AppBar position="fixed" open={isSidebarOpen}>
          <Toolbar>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleSidebar}
                  edge="start"
                  sx={[
                      {
                          mr: 2,
                      },
                      isSidebarOpen && {display: 'none'},
                  ]}
              >
                  <MenuIcon/>
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                  LOGO
              </Typography>
              <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                  {pages.map((page) => (
                      <Button
                          key={page}
                          sx={{my: 0, color: 'white', display: 'block'}}
                      >
                          {page}
                      </Button>
                  ))}
              </Box>
          </Toolbar>
      </AppBar>
  );
};

export default Navigation;