/* eslint-disable no-console */
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DoctorDelete() {  
  const params = useParams();
  console.log(params.actor);

  useEffect(()=>{
    const deleteDoctor = async () => {
      try {
        const grab = await axios.delete(`http://localhost:8080/doctor/actor/${params.actor}`);
        console.log('RESPONSE: ', grab);
      } catch (err) {
        console.log(err)
      }
    };
    deleteDoctor();
  }, [params.actor])

  return <p>Doctor Deleted</p>
}

export default DoctorDelete;