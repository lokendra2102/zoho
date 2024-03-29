import React from 'react'
import {
    Nav,
    Navbar,
    Container

} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function NavLinks({username}) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className='shadow-none border-0' />
                <Navbar.Collapse id="responsive-navbar-nav" className=''>
                    <Nav className="me-auto ms-auto">
                        <NavLink className='text-uppercase home_nav px-3 nav-link' to="/">HOME</NavLink>
                        <NavLink className='text-uppercase home_nav px-3 nav-link' to="/upcoming">upcoming</NavLink>
                        <NavLink className='text-uppercase home_nav px-3 nav-link' to="/toprated">top rated</NavLink>
                        <NavLink className='text-uppercase home_nav px-3 nav-link' to="/nowplaying">now playing</NavLink>
                        {   username !== "username" &&
                            <NavLink className='text-uppercase home_nav px-3 nav-link' to="/profile">My List</NavLink>
                        }
                        {   username === "admin" &&
                            <NavLink className='text-uppercase home_nav px-3 nav-link' to="/admin">Admin Panel</NavLink>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavLinks