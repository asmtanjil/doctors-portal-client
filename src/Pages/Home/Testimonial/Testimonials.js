import React from 'react';
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import Testimonial from './Testimonial';

const Testimonials = () => {

  const reviews = [
    {
      _id: 1,
      name: 'Winson Henry',
      image: people1,
      detail: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
      location: 'California'
    },
    {
      _id: 2,
      name: 'Winson Henry',
      image: people2,
      detail: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
      location: 'California'
    },
    {
      _id: 3,
      name: 'Winson Henry',
      image: people3,
      detail: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
      location: 'California'
    },
  ]

  return (
    <div className='my-16'>
      <div className='flex justify-between mb-20'>
        <div>
          <h2 className='text-primary font-bold text-xl'>Testimonial</h2>
          <h2 className='text-4xl font-bold'>What Our Patients Say</h2>
        </div>
        <figure>
          <img src={quote} className='w-24 lg:w-48' alt="" />
        </figure>
      </div>
      <div className='grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {
          reviews.map(review => <Testimonial
            key={review._id}
            review={review}
          ></Testimonial>)
        }
      </div>
    </div>
  );
};

export default Testimonials;