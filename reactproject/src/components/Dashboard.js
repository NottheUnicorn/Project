import React, { useState } from "react"
import { useEffect } from "react";
import { Card, Button, Container, Row, Col,Table, ListGroup, Modal, Alert } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Header from "../utils/Header"
import { API_PATH } from "./API";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const history = useHistory()
  const[productList,setProductList]=useState([]);
  const[message,setMessage]=useState('')
  const[selected,setSelected]=useState(0);
  const getProduct =  async()=>{
    setMessage('');
    await fetch(API_PATH+"list")
    .then(response => response.json())
    .then(data => setProductList(data) );
  }
  const handleDelete = (id)=>{
    setSelected(id);
    setShow(true);
  }
  const handleDeleteSubmit= async()=>{
    await fetch(API_PATH+"delete/"+selected, { method: 'DELETE' })
    .then(() => setMessage('Delete successful'));
    getProduct();
    setShow(false);
  }
  useEffect(()=>{
    getProduct()
  },[]);
  return (
    <>
     <Header />
     <Container >
        <Row fluid>
       
          <Col lg="3" sm="6">
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">Products</ListGroup.Item>
            <ListGroup.Item as="li" onClick={()=>history.push("/add-new")}>Add New Product</ListGroup.Item>
          </ListGroup>
          </Col>
  
          <Col lg="9">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Products</Card.Title>
               
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                {message && <><Alert variant={'primary'}>{message}</Alert></>}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Title</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList && productList.map((elemnt,index)=>(
                          <tr key={index}>
                          <td>{index+1}</td>
                          <td>{elemnt[1]}</td>
                          <td>{elemnt[2]}</td>
                          <td>{elemnt[4]}</td>
                          <td>
                          <Button variant="primary" size="sm" onClick={()=>history.push("/edit/"+elemnt[0])}>
                            Edit
                          </Button>{' '}
                          <Button variant="danger" size="sm" onClick={()=>handleDelete(elemnt[0])}>
                            Delete
                          </Button>

                          </td>
                          </tr>
                    ))}
                   
                    
                  </tbody>
                </Table>
                </div>
              </Card.Body>
              
            </Card>
          </Col>
          
        </Row> <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShow(false)}>
            No
          </Button>
          <Button variant="primary" onClick={()=>handleDeleteSubmit()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
       
      </Container>
    </>
  )
}
