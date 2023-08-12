import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../Config/Config'

export const ForgotPassword = (props) => {

    const [email, setEmail]=useState('');

    const handleForgot=(e)=>{
        e.preventDefault();
        auth.sendPasswordResetEmail(email).then(()=>{
            setEmail('');
            props.history.push('/');
            alert('Password Reset link has been sent to your mail.Reset your password and Login Again.')
        }).catch(console.log)
    }

    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h2>Reset Your Password</h2>
            <br></br>
            <form autoComplete="off" className='form-group'
            onSubmit={handleForgot}>
                
                <label>Enter Email</label>
                <input type="email" className='form-control'
                    required onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                />
                <br></br>
                <br></br>
                <button type="submit" className='btn btn-success mybtn2'>
                   Send Password Reset Link
                </button>
            </form>
            
            <span>
            <Link to="login">Login</Link></span>
        </div>
    )
}
