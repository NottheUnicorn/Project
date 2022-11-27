import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import {  Container, Row, Col } from "react-bootstrap"

import Header from "../utils/Header"
import { API_PATH } from "./API"
import ProductItem from "./ProductItem"
import Sidebar from "./Sidebar"

export default function Home() {
  const[productList,setProductList]=useState([]);
  const getProduct =  async()=>{
    await fetch(API_PATH+"list")
    .then(response => response.json())
    .then(data => setProductList(data) );
  }
  useEffect(()=>{
    getProduct()
  },[]);

  return (
    <>
    <Header />
    <Container >
        <Row fluid="true">
      
          <Col lg="3" sm="6">
          <Sidebar/>
          </Col>
  
          <Col lg="9">
            {productList && productList.map((row,index)=>(
                <ProductItem row={row} key={index}/>
            ))}
          
          
          </Col>
          
        </Row>
      
      </Container>
    </>
  )
}
