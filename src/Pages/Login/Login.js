import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm()
  const { signIn, signInWithGoogle } = useContext(AuthContext)
  const [loginError, setLoginError] = useState('')

  const [loginUserEmail, setLoginUserEmail] = useState('')
  const [token] = useToken(loginUserEmail)

  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/';

  if (token) {
    navigate(from, { replace: true })
  }

  const handleLogin = data => {
    console.log(data)
    setLoginError('')
    signIn(data.email, data.password)
      .then(result => {
        const user = result.user
        console.log(user)
        setLoginUserEmail(data.email)
      })
      .catch(error => {
        console.error(error.message)
        setLoginError(error.message)
      })
  }

  return (
    <div className='h-[800px] flex justify-center items-center'>
      <div className='w-96 p-7'>
        <h2 className='text-2xl text-center font-bold'>Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>

          <div className="form-control w-full">
            <label className="label"><span className="label-text">Email</span></label>
            <input
              type="email"
              placeholder="Enter Your Email"
              {...register("email", { required: "Email address is required" })}
              className="input input-bordered w-full"
            />
            {errors.email && <p className='text-red-500' role="alert">{errors.email?.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text">Password</span></label>
            <input
              type="password"
              placeholder="Enter Your Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: 'Pass must be with 8 Characters' }
              })}
              className="input input-bordered w-full"
            />
            {errors.password && <p className='text-red-500' role="alert">{errors.password?.message}</p>}
            <label className="label"><span className="label-text">Forgot Password?</span></label>
          </div>

          {loginError && <p className='text-red-500'>{loginError}</p>}
          <input className='btn btn-accent w-full mt-4' type="submit" value="Login" />
        </form>
        <p className='py-2 text-center'>New to Doctors Portal? <Link to='/signup' className='text-secondary'>Create New Account</Link></p>
        <div className="divider">OR</div>
        <button onClick={signInWithGoogle} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default Login;