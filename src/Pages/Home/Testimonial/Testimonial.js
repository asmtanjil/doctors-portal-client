import React from 'react';

const Testimonial = ({ review }) => {
  const { name, location, detail, image } = review;
  return (
    <div className="card shadow-xl">
      <div className="card-body">
        <h2 className='mb-8'>{detail}</h2>
        <div className='card-actions flex gap-4'>
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={image} alt='' />
            </div>
          </div>
          <div>
            <h2 className="card-title">{name}</h2>
            <p>{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;