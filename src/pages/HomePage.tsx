import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage: React.FC = () => {
  return (

    <div>
    <Navbar expand="lg" style={{ backgroundColor: ' lightblue' }}>

      <Navbar.Brand href="#">Product</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#">Home</Nav.Link>
          {/* <Nav.Link href="#">Link</Nav.Link> */}
          <NavDropdown title="Collection" id="basic-nav-dropdown">
            <NavDropdown.Item href="#">Men</NavDropdown.Item>
            <NavDropdown.Item href="#">Women</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
          <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>


    < div className="card" style={{ backgroundColor: 'light' }}>

  <img src="..." className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>
    </div>
  );
};

export default HomePage;
