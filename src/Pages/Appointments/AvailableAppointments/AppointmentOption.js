import React from 'react';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
  const { name, slots } = appointmentOption;
  return (
    <div className="card shadow-xl">
      <div className="card-body text-center">
        <h2 className="text-secondary font-bold text-xl">{name}</h2>
        <p>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
        <p>{slots.length} {slots.length > 1 ? 'Spaces' : 'Space'} Available</p>
        <div className="card-actions justify-center">
          <label
            onClick={() => setTreatment(appointmentOption)}
            htmlFor="booking-appointment"
            className="btn btn-primary text-white bg-gradient-to-r from-primary to-secondary"
          >Book Appointment</label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;