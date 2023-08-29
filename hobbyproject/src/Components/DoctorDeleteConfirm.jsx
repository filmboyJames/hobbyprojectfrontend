/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DoctorDisplay from './DoctorDisplay';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DoctorDeleteConfirm() {
  const params = useParams();
  console.log(params.actor);
  const [doctor, setDoctor] = useState([]);

  const navigate = useNavigate();
  
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
  }, [params.actor])
  
  console.log(doctor)

  return (
  <>
      <h1>Are you sure you want to delete this Doctor?</h1>
      <br></br>
      <Button variant="danger" type="button" onClick={()=> navigate(`/deleted/${params.actor}`)}>CONFIRM</Button>
      <br></br>
      <DoctorDisplay number={doctor.number} actor={doctor.actor} startYear={doctor.startYear} endYear={doctor.endYear} />
      </>
  )
}

export default DoctorDeleteConfirm;
