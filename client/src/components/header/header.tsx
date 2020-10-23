import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { UserContext } from '../../state/userState'
import { isUserLoggedIn, clearTokenAndUser } from '../../utils/userUtils'
import { logoutUser } from '../../actions/userActions';

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
  }),
);

export const Header = () => {
  const classes = useStyles();
  const { user, userDispatch } = useContext(UserContext)
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
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Vantinerary
          </Typography>
          <Button color="inherit" onClick={onClick}>
            {  isLoggedIn ? 'Logout' : 'Login' }
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}