/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DoctorDisplay from './DoctorDisplay';

function DoctorGet() {
  const params = useParams();
  console.log(params.actor);
  const [doctor, setDoctor] = useState([]);
  
  useEffect(()=>{
    const getDoctor = async () => {
      try {
        const grab = await axios.get(`http://localhost:8080/doctor/actor/${params.actor}`);
        console.log('RESPONSE: ', grab.data);
        setDoctor(grab.data);
      } catch (err) {
        console.log(err)
      }
    };
    getDoctor();
  })
  
  console.log(doctor)

  return <DoctorDisplay number={doctor.number} actor={doctor.actor} startYear={doctor.startYear} endYear={doctor.endYear} companions={doctor.companions} _id={doctor._id}/>;
}

export default DoctorGet;
