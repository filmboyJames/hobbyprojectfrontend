/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DoctorDisplay from './DoctorDisplay';
import { Col, Container } from 'react-bootstrap';

function GetAllDoctors() {
  const params = useParams();
  console.log(params);
  const [doctor, setDoctor] = useState([]);
  
  useEffect(()=>{
    const getDoctor = async () => {
      try {
        const grab = await axios.get(`http://localhost:8080/doctor`);
        console.log('RESPONSE: ', grab.data);
        setDoctor(grab.data);
      } catch (err) {
        console.log(err)
      }
    };
    getDoctor();
  }, [params])
  
  console.log(doctor)

  if(doctor.length===0){
    return <p>No Doctors to see!</p>
  } else

  return (
    <Container>
        <div className="row row-cols-3 g-4">
          {
                doctor.map((doctor) => (
                  <Col>
                    <DoctorDisplay
                        number={doctor.number} actor={doctor.actor} startYear={doctor.startYear}
                        endYear={doctor.endYear} companions={doctor.companions} _id={doctor._id} />
                  </Col>

                ))
}
        </div>
      </Container>

  )
}

export default GetAllDoctors;
