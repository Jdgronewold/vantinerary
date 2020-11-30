import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { UserContext } from '../../state/userState'
import { isUserLoggedIn, clearTokenAndUser } from '../../utils/userUtils'
import { logoutUser } from '../../actions/userActions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DetailsIcon from '@material-ui/icons/Details';
import { AppContext } from '../../state';
import { flexStyles } from '../../utils/styleUtils';
import { switchMainView } from '../../actions/appActions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    mainView: {
      flex: 1,
      ...flexStyles({ justifyContent: 'flex-start'})
    },
    mainViewIcon: {
      height: 16,
      width: 16,
      marginLeft: theme.spacing(1)
    }
  }),
);

const options: ('calendar' | 'map')[] = ['calendar', 'map']

export const Header = () => {
  const classes = useStyles();
  const { user, userDispatch } = useContext(UserContext)
  const { mainView, appDispatch } = useContext(AppContext)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  const isLoggedIn = isUserLoggedIn(user)

  const handleLogout = () => {
    userDispatch(logoutUser())
    history.push('/welcome')
    clearTokenAndUser()
  }

  const handleLogin = () => {
    history.push('login', { from: history.location.pathname })
  }

  const onClick = isLoggedIn ? handleLogout : handleLogin

  // TODO: Turn into generic component
  const handleNavClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavClose = (event: React.MouseEvent) => {
    setAnchorEl(null);
  };

  const handleMenuSelection = (index: number) => {
    appDispatch(switchMainView(options[index]))
    if (history.location.pathname !== '/home') {
      history.push('/home')
    }
    setAnchorEl(null);
  };
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Vantinerary
          </Typography>
          { 
            isLoggedIn &&
            <div className={classes.mainView}>
              <Typography
                variant="inherit"
                color="inherit"
              >
                { mainView.toUpperCase() }
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                aria-controls="main-view-menu"
                size="small"
                onClick={handleNavClick}
              >
                < DetailsIcon className={classes.mainViewIcon}/>
              </IconButton>
              <Menu
                id="main-view-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleNavClose}
                getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
              >
                {
                  options.map((option, index) => {
                  return (
                    <MenuItem
                      onClick={() => handleMenuSelection(index)}
                      key={option}
                    >
                      <Typography variant="body1" color="inherit" className={classes.title}> { option.toUpperCase() } </Typography>
                    </MenuItem>
                  )
                })
                }              
              </Menu>
            </div>
          }
          <Button color="inherit" onClick={onClick}>
            {  isLoggedIn ? 'Logout' : 'Login' }
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}