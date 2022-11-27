import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import Header from "../utils/Header";
const Profile = ()=>{
    const [show, setShow] = useState(true);

    return (
        <>
       <Header/>
       <Container>
        <Row>
            <Col lg="12">
               <Form>
               <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    
                </Form>
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. 
        </p>
      </Alert>
            </Col>
        </Row>

       </Container>
        </>
    )
}
export default Profile;