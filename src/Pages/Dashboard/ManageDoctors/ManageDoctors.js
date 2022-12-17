import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {

  const [deleteDoctor, setDeleteDoctor] = useState(null)

  const closeModal = () => {
    setDeleteDoctor(null)
  }

  const { data: doctors, isLoading, refetch } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      try {
        const res = await fetch('https://doctors-portal-server-two-lovat.vercel.app/doctors', {
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        })
        const data = await res.json()
        return data
      }
      catch (error) {
        console.log(error.message)
      }
    }
  })


  const handleDeleteDoctor = doctor => {
    fetch(`https://doctors-portal-server-two-lovat.vercel.app/doctors/${doctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.deletedCount > 0) {
          refetch()
          toast.success(`${doctor.name} has been deleted successfully`)
        }
      })
  }

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <h2 className='text-3xl mb-5'>Manage Doctors</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              doctors && doctors.map((doctor, i) => <tr
                key={doctor._id}
                doctor={doctor}
              >
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={doctor.image} alt='' />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.specialty}</td>
                <td>
                  <label onClick={() => setDeleteDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-xs btn-error">Delete</label>
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
      {
        deleteDoctor && <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deleteDoctor.name}, It can't be undone`}
          closeModal={closeModal}
          successAction={handleDeleteDoctor}
          modalData={deleteDoctor}
          successButtonName='Delete'
        >
        </ConfirmationModal>
      }
    </div>
  );
};

export default ManageDoctors;