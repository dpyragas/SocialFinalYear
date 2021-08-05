import axios from 'axios';
import { useRef } from 'react';
import { useHistory } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='/'>
        BCU Connect
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://i.ibb.co/XtkDRzB/klipartz-com.png)',

    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[0]
        : theme.palette.grey[0],

    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity('Passwords do not match!');
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post('auth/register', user);
        history.push('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const classes = useStyles();

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Register
          </Typography>
          <form className={classes.form} onSubmit={handleClick} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Username'
              name='username'
              inputRef={username}
              autoComplete='username'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              inputRef={email}
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />

            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              inputRef={password}
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              inputRef={passwordAgain}
              name='confirm password'
              label='Confirm Password'
              type='password'
              id='password'
              autoComplete='confirm-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label={
                <label>
                  <a href='/'>I accept the Terms of Service</a>
                </label>
              }
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/login' variant='body2'>
                  {'Have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );

  // return (
  //   <div className="login">
  //     <div className="loginWrapper">
  //       <div className="loginLeft">
  //         <h3 className="loginLogo">Lamasocial</h3>
  //         <span className="loginDesc">
  //           Connect with friends and the world around you on Lamasocial.
  //         </span>
  //       </div>
  //       <div className="loginRight">
  //         <form className="loginBox" onSubmit={handleClick}>
  //           <input
  //             placeholder="Username"
  //             required
  //             ref={username}
  //             className="loginInput"
  //           />
  //           <input
  //             placeholder="Email"
  //             required
  //             ref={email}
  //             className="loginInput"
  //             type="email"
  //           />
  //           <input
  //             placeholder="Password"
  //             required
  //             ref={password}
  //             className="loginInput"
  //             type="password"
  //             minLength="6"
  //           />
  //           <input
  //             placeholder="Password Again"
  //             required
  //             ref={passwordAgain}
  //             className="loginInput"
  //             type="password"
  //           />
  //           <button className="loginButton" type="submit">
  //             Sign Up
  //           </button>
  //           <button className="loginRegisterButton">Log into Account</button>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
}
