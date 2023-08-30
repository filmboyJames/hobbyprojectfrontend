import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button, Row, Col, Container, Card
} from 'react-bootstrap';
import {
  BrowserRouter as Router, Link, Routes, Route,
} from 'react-router-dom';
import './App.css';
import SearchForm from './Components/SearchForm'
import EditForm from './Components/EditForm'
import Home from './Components/Home'
import DoctorGet from './Components/DoctorGet'
import TryAgain from './Components/TryAgain'
import CreateForm from './Components/CreateForm'
import GetAllDoctors from './Components/GetAllDoctors'
import DoctorDeleteConfirm from './Components/DoctorDeleteConfirm'
import DoctorDelete from './Components/DoctorDelete'
// import DoctorCreate from './Components/DoctorCreate'
// import DoctorUpdate from './Components/DoctorUpdate'
// import DoctorDisplay from './Components/DoctorDisplay'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Card>
            <Card.Img variant="top" height="200" src="https://upload.wikimedia.org/wikipedia/commons/1/18/Doctor-who-logo-removebg.png" alt="Doctor Who Logo 2023" />
          </Card>
          <br />
          <br />
          <Container>
            <Row>
              <Col><Link to="/">
                <Button>Home</Button>
              </Link></Col>
              <Col><Link to="/getall">
                <Button>See All Doctors</Button>
              </Link></Col>
              <Col><Link to="/search">
                <Button>Search</Button>
              </Link></Col>
              <Col><Link to="/create">
                <Button>Create</Button>
              </Link></Col>
            </Row>
            <br></br>
            <br></br>
          </Container>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/search" element={<SearchForm />} />
            <Route path="/getall" element={<GetAllDoctors />} />
            <Route path="/details/:actor" element={<DoctorGet actor="actor" />} />
            <Route path="/details/none" element={<TryAgain />} />
            <Route path="/edit/:current" element={<EditForm current="current" />} />
            <Route path="/create" element={<CreateForm />} />
            <Route path="/created/:actor" element={<DoctorGet />} />
            <Route path="/delete/:actor" element={<DoctorDeleteConfirm />} />
            <Route path="/deleted/:actor" element={<DoctorDelete actor="actor"/>} />
            <Route path="/error" element={<TryAgain/>}/>
          </Routes>
        </Router>
      </header>
    </div >
  );
}

export default App;
