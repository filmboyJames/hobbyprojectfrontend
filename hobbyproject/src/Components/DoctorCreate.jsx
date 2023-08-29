/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DoctorDisplay from './DoctorDisplay';

function DoctorCreate({number, name, companions, startYear, endYear}) {
  const params = useParams();
  console.log(params);
  const [newDoctor, setNewDoctor] = useState([]);
  
  useEffect(()=>{
    const createDoctor = async () => {
      try {
        const trial = {
          "number": number,
          "companions": companions,
          "name": name,
          "startYear": startYear,
          "endYear": endYear
      }
        const grab = await axios.post(`http://localhost:8080/doctor/write`,trial);
        console.log('RESPONSE: ', grab.data);
        setNewDoctor(grab.data);
      } catch (err) {
        console.log(err)
      }
    };
    createDoctor();
  },[number,name,companions,startYear,endYear])
  
  console.log(newDoctor)

  return <DoctorDisplay number={newDoctor.number} name={newDoctor.name} startYear={newDoctor.startYear} endYear={newDoctor.endYear} companions={newDoctor.companions}/>;
}

export default DoctorCreate;
