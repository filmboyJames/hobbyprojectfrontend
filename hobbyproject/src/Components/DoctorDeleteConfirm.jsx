/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DoctorDisplay from './DoctorDisplay';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DoctorDeleteConfirm() {
  const params = useParams();
  console.log(params.name);
  const [doctor, setDoctor] = useState([]);

  const navigate = useNavigate();
  
  useEffect(()=>{
    const getDoctor = async () => {
      try {
        const grab = await axios.get(`http://localhost:8080/doctor/actor/${params.name}`);
        console.log('RESPONSE: ', grab.data[0]);
        setDoctor(grab.data[0]);
      } catch (err) {
        console.log(err)
      }
    };
    getDoctor();
  }, [params.name])
  
  console.log(doctor)

  return (
  <>
      <h1>Are you sure you want to delete this Doctor?</h1>
      <br></br>
      <Button variant="danger" type="button" onClick={()=> navigate(`/deleted/${params.name}`)}>CONFIRM</Button>
      <br></br>
      <DoctorDisplay number={doctor.number} actor={doctor.name} startYear={doctor.startYear} endYear={doctor.endYear} companions={doctor.companions} />
      </>
  )
}

export default DoctorDeleteConfirm;
