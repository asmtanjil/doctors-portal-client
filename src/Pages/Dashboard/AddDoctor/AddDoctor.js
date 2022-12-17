import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const imageHostKey = process.env.REACT_APP_IMAGEBB;
  const navigate = useNavigate()

  const { data: specialties = [], isLoading } = useQuery({
    queryKey: ['specialty'],
    queryFn: async () => {
      const res = await fetch('https://doctors-portal-server-two-lovat.vercel.app/appointmentSpecialty')
      const data = await res.json()
      return data
    }
  })

  const handleAddDoctor = data => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image)
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(imgData => {
        if (imgData.success) {
          console.log(imgData.data.url)
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: imgData.data.url
          }
          fetch('https://doctors-portal-server-two-lovat.vercel.app/doctors', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(doctor)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              toast.success(`${data.name} is added successfully`)
              navigate('/dashboard/manageDoctors')
            })
        }
      })
  }

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className='w-96 p-7'>
      <h2 className='text-4xl'>Add A Doctor</h2>
      <form onSubmit={handleSubmit(handleAddDoctor)}>

        <div className="form-control w-full">
          <label className="label"><span className="label-text">Name</span></label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && <p className='text-red-500' role="alert">{errors.name?.message}</p>}
        </div>

        <div className="form-control w-full">
          <label className="label"><span className="label-text">Email</span></label>
          <input
            type="email"
            {...register("email", { required: "Email address is required" })}
            className="input input-bordered w-full"
          />
          {errors.email && <p className='text-red-500' role="alert">{errors.email?.message}</p>}
        </div>

        <div className="form-control w-full">
          <label className="label"><span className="label-text">Specialty</span></label>
          <select
            {...register("specialty", { required: "Selection is required" })}
            className="select select-bordered w-full max-w-xs">
            <option>Please Select a specialty</option>
            {
              specialties && specialties.map(specialty => <option
                key={specialty._id}
                value={specialty.name}
              >{specialty.name}</option>
              )
            }
          </select>
        </div>

        <div className="form-control w-full">
          <label className="label"><span className="label-text">Image</span></label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="input input-bordered w-full"
          />
          {errors.image && <p className='text-red-500' role="alert">{errors.image?.message}</p>}
        </div>

        <input className='btn btn-accent w-full mt-4' type="submit" value="Add Doctor" />

      </form>
    </div>
  );
};

export default AddDoctor;