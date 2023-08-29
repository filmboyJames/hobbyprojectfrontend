/* eslint-disable no-console */
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DoctorDelete() {  
  const params = useParams();
  console.log(params.name);

  useEffect(()=>{
    const deleteDoctor = async () => {
      try {
        const grab = await axios.delete(`http://localhost:8080/doctor/write/actor/${params.name}`);
        console.log('RESPONSE: ', grab);
      } catch (err) {
        console.log(err)
      }
    };
    deleteDoctor();
  }, [params.name])

  return <p>Doctor Deleted</p>
}

export default DoctorDelete;