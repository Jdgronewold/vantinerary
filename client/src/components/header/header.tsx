import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { UserContext } from '../../state/userState'
import { isUserLoggedIn } from '../../utils/userUtils'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

export const Header = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext)
  console.log(user);
  
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            { isUserLoggedIn(user) ? 'Hello' : 'Login' }
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}