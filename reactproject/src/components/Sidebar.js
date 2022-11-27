import React from "react"
import { ListGroup } from "react-bootstrap"
import { useHistory } from "react-router-dom"


export default function Sidebar() {
    const history = useHistory()
    
  return (
    <>
        <ListGroup as="ol" numbere="true">
            <ListGroup.Item as="li" onClick={()=>history.push("/category/books")}>Books Collection</ListGroup.Item>
            <ListGroup.Item as="li" onClick={()=>history.push("/category/drinks")}>Drinks Collection</ListGroup.Item>
            <ListGroup.Item as="li" onClick={()=>history.push("/category/marvel")}>Marvel Character</ListGroup.Item>
          </ListGroup>
         
    </>
  )
}
