import { format } from 'date-fns/esm';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
  const { name: treatmentName, slots } = treatment;
  const date = format(selectedDate, 'PP')

  const { user } = useContext(AuthContext)

  const handleBooking = event => {
    event.preventDefault()
    const form = event.target;

    const slot = form.slot.value
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const booking = {
      appointmentDate: date,
      patientName: name,
      treatment: treatmentName,
      slot,
      email,
      phone
    }

    fetch('https://doctors-portal-server-two-lovat.vercel.app/bookings', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(booking)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.acknowledged) {
          setTreatment(null)
          toast.success('Booking Confirmed')
          refetch()
        }
        else {
          toast.error(data.message)
        }
      })
  }

  return (
    <div>
      <input type="checkbox" id="booking-appointment" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="booking-appointment" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">{treatmentName}</h3>
          <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-6'>
            <input type="text" disabled className="input w-full input-bordered" defaultValue={date} />
            <select name='slot' className="select select-bordered w-full">
              <option>Select your Appointment Time</option>
              {
                slots.map((slot, idx) => <option
                  key={idx}
                  value={slot}
                >{slot}</option>)
              }
            </select>
            <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Name" className="input w-full input-bordered" />
            <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Email" className="input w-full input-bordered" />
            <input name='phone' type="text" placeholder="Phone" className="input w-full input-bordered" />
            <input className='btn btn-accent w-full' type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;