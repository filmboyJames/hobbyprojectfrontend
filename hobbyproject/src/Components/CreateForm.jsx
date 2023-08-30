import {
    Form, Button, InputGroup
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const CreateForm = () => {
    const [number, setNumber] = useState("");
    const [actor, setActor] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [newDoctor, setNewDoctor] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(number,actor,startYear,endYear);
        const trial = {
            "number": number,
            "actor": actor,
            "startYear": startYear,
            "endYear": endYear
        }
        try {
            const grab = await axios.post(`http://localhost:8080/doctor`, trial);
            console.log('RESPONSE: ', grab.data);
            setNewDoctor(grab.data);
            console.log('New Doctor is',newDoctor);
        } catch (err) {
            console.log(err)
        }
            navigate(`/created/${actor}`);
    };



return (
    <>
        <p>Create a Doctor, please fill in all fields</p>
        <p></p>
        <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
                <Form.Label className="formLabel">Doctor Number</Form.Label>
                <Form.Control required placeholder="e.g. 1st" value={number} onChange={e => { setNumber(e.target.value) }} />
                <Form.Text className="text-muted" >
                </Form.Text>
                <Button type="submit" >Submit</Button>
            </InputGroup>

            <InputGroup className="mb-3" >
                <Form.Label className="formLabel">Actor </Form.Label>
                <Form.Control required placeholder="Enter actor's name" value={actor} onChange={e => { setActor(e.target.value) }} />
                <Form.Text className="text-muted">
                </Form.Text>
                <Button type="submit" >Submit</Button>
            </InputGroup>

            <InputGroup className="mb-3" >
                <Form.Label className="formLabel">Start Year </Form.Label>
                <Form.Control required type="number" placeholder="Enter start year" value={startYear} onChange={e => { setStartYear(e.target.value) }} />
                <Form.Text className="text-muted">
                </Form.Text>
                <Button type="submit" >Submit</Button>
            </InputGroup>

            <InputGroup className="mb-3" >
                <Form.Label className="formLabel">End Year </Form.Label>
                <Form.Control required type="number" placeholder="Enter end
                    year" value={endYear} onChange={e => { setEndYear(e.target.value) }} />
                <Form.Text className="text-muted">
                </Form.Text>
                <Button type="submit" >Submit</Button>
            </InputGroup>


        </Form>
    </>
)
}

export default CreateForm;