import {
    Form, Button, InputGroup, Container, Row, Col
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {useEffect, useState} from 'react';
import DoctorDisplay from "./DoctorDisplay";

const EditForm = ({ current }) => {
    const params = useParams();
    console.log(params.current);
    let [number, setNumber] = useState("");
    let [actor, setActor] = useState("");
    let [startYear, setStartYear] = useState("");
    let [endYear, setEndYear] = useState("");
    let [currentDoctor, setCurrentDoctor] = useState([])
    let [newDoctor, setNewDoctor] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("When pressed" + number.type, actor, startYear, endYear);
        if(number===""){
            number =currentDoctor.number
        }
        console.log("After if" + number, actor, startYear, endYear);
        const trial = {
            "number": number,
            "actor": actor,
            "startYear": startYear,
            "endYear": endYear
        }

        try {
            const grab = await axios.patch(`http://localhost:8080/doctor/actor/${params.current}`, trial);
            console.log('RESPONSE: ', grab.data);
            setNewDoctor(grab.data);
            console.log('New Doctor is', newDoctor);
        } catch (err) {
            console.log(err)
            navigate(`/error`);
        }
        navigate(`/created/${actor}`);
    };

    useEffect(()=>{
        const getCurrentDoctor = async () => {
            try {
                const grab = await axios.get(`http://localhost:8080/doctor/actor/${params.current}`);
                console.log('RESPONSE: ', grab.data);
                setCurrentDoctor(grab.data);
                console.log("Current Doctor is "+ currentDoctor.actor);
            } catch (err) {
                console.log(err)
            }
        };
        getCurrentDoctor();
    },[params, currentDoctor.actor])
    return (
        <>
            <Container className="d-flex vh-100">
                <Row className="m-auto align-self-center">
                <Col >
                    <DoctorDisplay actor={currentDoctor.actor} number={currentDoctor.number} startYear={currentDoctor.startYear} endYear={currentDoctor.endYear} _id={currentDoctor._id}/>
                </Col>
                    <Col>
            <p>Edit this Doctor, please fill in all fields</p>
            <p></p>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3" >
                    <Form.Label className="formLabel">Doctor Number</Form.Label>
                    <Form.Control required placeholder="e.g. 1st" value={number} onChange={e => { setNumber(e.target.value) }} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <Button type="submit" >Submit</Button>
                </InputGroup>

                <InputGroup className="mb-3" >
                    <Form.Label className="formLabel">Actor</Form.Label>
                    <Form.Control required placeholder="Enter actor's name" value={actor} onChange={e => { setActor(e.target.value) }} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <Button type="submit" >Submit</Button>
                </InputGroup>

                <InputGroup className="mb-3" >
                    <Form.Label className="formLabel">Start Year</Form.Label>
                    <Form.Control required type="number" placeholder="Enter start year" value={startYear} onChange={e => { setStartYear(e.target.value) }} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <Button type="submit" >Submit</Button>
                </InputGroup>

                <InputGroup className="mb-3" >
                    <Form.Label className="formLabel">End Year</Form.Label>
                    <Form.Control required type="number" placeholder="Enter end
                    year" value={endYear} onChange={e => { setEndYear(e.target.value) }} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <Button type="submit" >Submit</Button>
                </InputGroup>


            </Form>
                    </Col>
                </Row>
                </Container>
        </>
    )
}

export default EditForm;