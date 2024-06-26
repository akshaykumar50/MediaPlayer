import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function Header() {
  return (
    <Navbar className="bg-transoarent border border-secondary">
        <Container>
          <Navbar.Brand >
          <FontAwesomeIcon className='text-warning' icon={faVideo} beat size='2xl' />
            <span className='text-warning ms-3 fs-3'>Media Player</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}

export default Header