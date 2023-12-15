import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef('')
  const passRef = useRef('')

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value
    const enteredPass = passRef.current.value

    setIsLoading(true)
    let url = '';
    if(isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyBAX17nBJFg6o4XXPR5zeqGA_dM1JM5XrM'
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAX17nBJFg6o4XXPR5zeqGA_dM1JM5XrM'
    }
      fetch(url , 
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPass,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        setIsLoading(false)
        if(res.ok) {
          return res.json()
        } else {
          return res.json().then(data => {
            let errormsg = 'Athentication Failed!';
            if(data && data.error && data.error.message) {
              errormsg = data.error.message
            };
            throw new Error(errormsg)
          })
        }
      })
      .then((data) => {console.log(data)})
      .catch(err => {
        alert(err.message)
      })
    
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passRef}
            required
          />
        </div>
        
        <div className={classes.actions}>
          {!isLoading && <button onClick={submitHandler}>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Signing Up...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
