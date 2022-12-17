import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext)
  const [signUpError, setSignUpError] = useState('')

  const [createdUserEmail, setCreatedUserEmail] = useState('')
  const [token] = useToken(createdUserEmail)
  const navigate = useNavigate()

  if (token) {
    navigate('/')
  }

  const handleSignUp = data => {
    // console.log(data)
    setSignUpError('')
    createUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log(user)
        toast.success('User Created Successfully')
        const userInfo = {
          displayName: data.name
        }
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email)
          })
          .catch(err => console.error(err))
      })
      .catch(error => {
        console.error(error)
        setSignUpError(error.message)
      })
  }

  const saveUser = (name, email) => {
    const user = { name, email }
    fetch('https://doctors-portal-server-two-lovat.vercel.app/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        setCreatedUserEmail(email)
      })
  }

  return (
    <div className='h-[800px] flex justify-center items-center'>
      <div className='w-96 p-7'>
        <h2 className='text-2xl text-center font-bold'>Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>

          <div className="form-control w-full">
            <label className="label"><span className="label-text">Name</span></label>
            <input
              type="text"
              placeholder="Enter Your Name"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
            />
            {errors.name && <p className='text-red-500' role="alert">{errors.name?.message}</p>}
          </div>

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
                minLength: { value: 8, message: 'Pass must be with 8 Characters' },
                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/, message: "Password Must Be Strong" }
              })}
              className="input input-bordered w-full"
            />
            {errors.password && <p className='text-red-500' role="alert">{errors.password?.message}</p>}
            <label className="label"><span className="label-text">Forgot Password?</span></label>
          </div>

          <input className='btn btn-accent w-full mt-4' type="submit" value="Sign Up" />
          {signUpError && <p className='text-red-500'>{signUpError}</p>}
        </form>
        <p className='py-2 text-center'>Already have an account? <Link to='/login' className='text-secondary'>Please Login</Link></p>
        <div className="divider">OR</div>
        <button onClick={signInWithGoogle} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default SignUp;