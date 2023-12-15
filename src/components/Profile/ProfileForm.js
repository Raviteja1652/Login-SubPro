import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const ctx = useContext(AuthContext);
  const passRef = useRef()
  const submitHandler = (e) => {
    e.preventDefault();
    const changedPassword = passRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBAX17nBJFg6o4XXPR5zeqGA_dM1JM5XrM', {
      method: 'POST',
      body: JSON.stringify({
        idToken: ctx.token,
        password: changedPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passRef} />
      </div>
      <div className={classes.action}>
        <button onClick={submitHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
