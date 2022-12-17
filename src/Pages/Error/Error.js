import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../assets/images/error.webp'

const Error = () => {
  return (
    <div className='mx-auto my-72 text-center flex justify-center'>
      <div className='border-r-2 border-slate-500 w-full'>
        <div>
          <img src={error} alt="" />
        </div>
      </div>

      <div className='ml-4 text-left w-full'>
        <h1 className='mr-4 text-6xl text-red-600 font-bold'>404</h1>
        <h1 className='text-5xl font-bold'>Page Not Found</h1>
        <p className='my-2 font-semibold'>Please Check the URL in the address bar and try again</p>
        <Link to='/'><button className='btn btn-primary text-white'>Go Back Home</button></Link>
      </div>
    </div>
  );
};

export default Error;