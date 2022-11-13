import React from 'react';
import fluoride from '../../../assets/images/fluoride.png'
import cavity from '../../../assets/images/cavity.png'
import whitening from '../../../assets/images/cavity.png'
import Service from './Service';

const Services = () => {
  const services = [
    {
      id: 1,
      name: 'Fluoride Treatment',
      image: fluoride,
      details: 'Fluoride varnish can be applied to both baby teeth and adult teeth by a dentist'
    },
    {
      id: 2,
      name: 'Cavity Filling',
      image: cavity,
      details: 'A cavity filling is when the dentist fills the opening in your tooth with some kind of material.'
    },
    {
      id: 3,
      name: 'Teeth Whitening',
      image: whitening,
      details: 'Best Teeth Whitening At LASER DENTAL In Uttara'
    }
  ]
  return (
    <div className='mt-32'>
      <div className='text-center mb-16'>
        <h3 className='text-primary text-xl font-bold uppercase'>Our Services</h3>
        <h2 className='text-3xl font-bold'>Services We Provide</h2>
      </div>
      <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {
          services.map(service => <Service
            key={service.id}
            service={service}
          ></Service>)
        }
      </div>
    </div>
  );
};

export default Services;