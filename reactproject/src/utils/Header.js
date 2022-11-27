import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"
function Header() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
  
    async function handleLogout() {
      setError("")
  
      try {
        await logout()
        history.push("/login")
      } catch {
        setError("Failed to log out")
      }
    }
  const handleMenu = (path) =>{
    history.push(path);
    return;
  }
  return (
    <>
    <main className='mb20'>
    
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>Wish List</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>handleMenu("/")}>Home</Nav.Link>
            <Nav.Link onClick={()=>handleMenu("/dashboard")}>Dashboard</Nav.Link>
            {currentUser ?
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            :
            <Nav.Link onClick={()=>history.push("/login")}>Login</Nav.Link>
            }
          </Nav>
        </Container>
      </Navbar>
     {error && error}
     </main> 
    </>
  );
}

export default Header;