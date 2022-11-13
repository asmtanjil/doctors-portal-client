import React from 'react';
import clock from '../../../assets/icons/clock.svg'
import marker from '../../../assets/icons/marker.svg'
import phone from '../../../assets/icons/phone.svg'
import InfoCard from './InfoCard';

const InfoCards = () => {
  const cardData = [
    {
      id: 1,
      name: 'Opening Hours',
      icon: clock,
      description: 'Opens at 9am and Closes at 8pm',
      bgClass: 'bg-gradient-to-r from-primary to-secondary'
    },
    {
      id: 2,
      name: 'Visit Our Location',
      icon: marker,
      description: 'Brooklyn, NY 10036, United States',
      bgClass: 'bg-accent'
    },
    {
      id: 3,
      name: 'Contact Us Now',
      icon: phone,
      description: '+88-01767-676799',
      bgClass: 'bg-gradient-to-r from-primary to-secondary'
    }
  ]
  return (
    <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {
        cardData.map(card => <InfoCard
          key={card.id}
          card={card}
        ></InfoCard>)
      }
    </div>
  );
};

export default InfoCards;