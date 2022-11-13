import React from 'react';
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';

const Contact = () => {
  return (
    <div style={{ backgroundImage: `url(${appointment})` }}>
      <div className='text-center py-24'>
        <h2 className='text-primary font-bold'>Contact Us</h2>
        <h2 className='text-4xl text-white font-semibold mb-12'>Stay Connected With Us</h2>
        <form>
          <div className='my-4'>
            <input type="email" placeholder="Email Address" className="input w-4/5 lg:w-1/2" />
          </div>
          <div className='my-4'>
            <input type="text" placeholder="Subject" className="input w-4/5 lg:w-1/2" />
          </div>
          <div className='my-4'>
            <textarea className="textarea w-4/5 lg:w-1/2 h-28" placeholder="Your Message"></textarea>
          </div>
          <PrimaryButton>Submit</PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default Contact;