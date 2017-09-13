import React from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import history from './../history'

export default function navbarInstance() {

	return (
		<Navbar inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="/home">Developer Accessories</a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavItem eventKey={1} href="#">Search Bar in Development</NavItem>
				</Nav>
				<Nav pullRight>
					<NavItem eventKey={1} onClick={() => {history.push('/admin')}}>Admin View</NavItem>
					<NavDropdown eventKey={2} title="Options" id="basic-nav-dropdown">
						<MenuItem eventKey={3.1}>Settings</MenuItem>
						<MenuItem eventKey={3.2}>Orders</MenuItem>
						<MenuItem eventKey={3.3}>Reviews</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey={3.3}>Logout</MenuItem>
					</NavDropdown>
					<NavItem eventKey={3} href="#">Login</NavItem>
					<NavItem eventKey={4} href="#">Sign-Up</NavItem>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}
