import React, { useState } from "react"
import { useEffect } from "react"
import { Card, Button, Container, Row, Col,Form, ListGroup, Alert } from "react-bootstrap"
import { useHistory, useParams } from "react-router-dom"
import Header from "../utils/Header"
import { API_PATH } from "./API"

export default function EditProduct() {
    const history = useHistory()
    const defaultData = {name:"",price:"",slug:"",category:"books",image:"",shortdescription:"",content:"",id:0};
    const[formData,setFormData]=useState(defaultData);
    const[message,setMessage]=useState('');
    const{id}=useParams();
    const handleSubmit = async()=>{
      setMessage('');
      //process.env.API_PATH
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };
    fetch(API_PATH+"update/"+formData.id, requestOptions)
        .then(data => {
          if(data.status !== 200){
            setMessage(data.statusText);
          }
          history.push("/dashboard");
        })
        .catch(err=>   setMessage(err));
     
      
    }
    const getProduct =  async(id)=>{
        setMessage('');
        await fetch(API_PATH+"read/"+id)
        .then(response => response.json())
        .then(data => {
            setFormData({name:data[1],price:data[2],slug:data[3],category:data[4],image:data[5],shortdescription:data[6],content:data[7],id:data[0]});

        });
      }
   useEffect(()=>{
    getProduct(id)
   },[]) 
  return (
    <>
     <Header />
     
     <Container >
        <Row fluid="true">
       
          <Col lg="3" sm="6">
          <ListGroup as="ol" numbered="true">
            <ListGroup.Item as="li" onClick={()=>history.push("/dashboard")}>Products</ListGroup.Item>
            <ListGroup.Item as="li" onClick={()=>history.push("/add-new")}>Add New Product</ListGroup.Item>
          </ListGroup>
          </Col>
  
          <Col lg="9">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Update Product</Card.Title>
               
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text"
                        value ={formData.name}
                        onChange={(e)=>setFormData({...formData,name:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Product URL</Form.Label>
                        <Form.Control type="text" 
                           value ={formData.slug}
                           onChange={(e)=>setFormData({...formData,slug:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control type="text"
                           value ={formData.price}
                           onChange={(e)=>setFormData({...formData,price:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea7">
                        <Form.Label>Category</Form.Label>
                        <select className="form-control"
                           value ={formData.category}
                           onChange={(e)=>setFormData({...formData,category:e.target.value})}
                        >
                            <option value="books">Books</option>
                            <option value="drinks">Drinks</option>
                            <option value="marvel">Marvel</option>
                        </select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea4">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text"
                         value ={formData.image}
                         onChange={(e)=>setFormData({...formData,image:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea5">
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control as="textarea" rows={3} 
                         value ={formData.shortdescription}
                         onChange={(e)=>setFormData({...formData,shortdescription:e.target.value})}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea6">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={6} 
                         value ={formData.content}
                         onChange={(e)=>setFormData({...formData,content:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea6">
                    <Button type="button" variant="primary" size="sm" onClick={handleSubmit}>
                   Update Product
                      </Button>{' '}
                      </Form.Group>
                    </Form>
                    {message && <><Alert variant={'danger'}>{message}</Alert></>}
                  
                </div>
              </Card.Body>
              
            </Card>
          </Col>
          
        </Row>
       
      </Container>
    </>
  )
}
