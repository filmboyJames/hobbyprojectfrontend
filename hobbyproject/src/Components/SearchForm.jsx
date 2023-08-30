import {
    Form, Button
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const DoctorForm = () => {
    const params = useParams();
    const [number, setNumber] = useState("1st");
    const [actor, setActor] = useState("William Hartnell");
    const [doctors, setDoctors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getDoctor = async () => {
            try {
                const grab = await axios.get(`http://localhost:8080/doctor`);
                console.log('RESPONSE: ', grab.data);
                setDoctors(grab.data);
            } catch (err) {
                console.log(err)
            }
        };
        getDoctor();
    }, [params.name])

    function numberClick(e, {number}) {
        e.preventDefault();
        let doctorName="";
        console.log(number +" type " + typeof number)
        for(const element of doctors) {
            console.log(element.number.toString() + " type in for "+ typeof element.number)
            if (element.number.toString() === number.toString()) {
                doctorName = element.actor
                console.log(doctorName)
                break
            }
        }
        navigate(`/details/${doctorName}`)
    }

    return (
        <>
            <Form onSubmit={() => navigate(`/details/${actor}`)}>
                <Form.Group className="mb-3"  >
                    <Form.Label className="formLabel">Doctor Number</Form.Label>
                    <Form.Select value={number} onChange={e => { setNumber(e.target.value) }}>
                        {doctors.map((doctor) => {
                            return <option value={doctor.number}>{doctor.number}</option>
                        })}
                    </Form.Select>
                    <Form.Text className="text-muted">
                        This will let you see a Doctor
                    </Form.Text>
                    <Button class="margin-left" type="button" onClick={e => numberClick(e,{number})} >Submit</Button>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label className="formLabel">Actor</Form.Label>
                    <Form.Select value={actor} onChange={e => { setActor(e.target.value) }}>
                        {doctors.map((doctor) => {
                            return <option value={doctor.actor}>{doctor.actor} </option>
                        })}
                    </Form.Select>
                    <Form.Text className="text-muted">
                        Select Actor
                    </Form.Text>
                    <Button type="submit" class="margin-left" >Submit</Button>
                </Form.Group>
            </Form>
        </>
    )
}

export default DoctorForm;