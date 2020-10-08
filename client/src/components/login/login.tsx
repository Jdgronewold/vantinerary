import React, { useState, useContext } from 'react'
import { useForm } from "react-hook-form";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AirportShuttle from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { register as handleRegister, login as handleLogin, SuccessLogin } from '../../services/authService'
import { RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../state/userState';
import { loginUser } from '../../actions/userActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signIn: {
    color: 'blue',
    '&:hover': {
      cursor: 'pointer'
    }
  },
}));

interface RegisterData {
  name: string
  email: string,
  password: string
}

export function Login(props: RouteComponentProps) {
  console.log(props)
  const classes = useStyles();
  const { register, handleSubmit } = useForm()
  const { userDispatch } = useContext(UserContext)
  const [isRegistering, setRegistering] = useState<boolean>(true)

  const onRegister = ({ name, email, password}: RegisterData) => {
    if (isRegistering) {
      handleRegister(name, email, password).then((data: SuccessLogin) => {
        userDispatch(loginUser(data.user))
        props.history.push('/home')
      })
    } else {
      handleLogin(email, password).then((data: SuccessLogin) => {
        userDispatch(loginUser(data.user))
        props.history.push('/home')
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AirportShuttle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onRegister)}>
          <Grid container spacing={2}>
            {
              isRegistering &&
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  inputRef={register}
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
            }
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                inputRef={register}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputRef={register}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <div className={classes.signIn} onClick={() => setRegistering(!isRegistering)}>
                { isRegistering ? 
                  `Already have an account? Sign in` :
                  'Need to create an account? Register'
                }
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}