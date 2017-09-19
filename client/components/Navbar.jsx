import React from 'react'
import {IndexLinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Label} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import history from './../history'
import {setModal, removeModal, getMe, logout} from '../store'
import {connect} from 'react-redux'
import SearchQ from './Search.jsx'

function navbarInstance(props) {

	const {handleLogin, cart} = props

	const getCartData = () => {
		var quantity = 0
		var totalPrice = 0
		for (var key in cart) {
			if (cart.hasOwnProperty(key)) {
				var product = cart[key]
				quantity += product.quantity
				totalPrice = product.quantity * product.price
			}
		}

		return {quantity, totalPrice: totalPrice.toFixed(2)}
	}

	const cartData = getCartData()
	return (
		<Navbar inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<NavLink to="/home">Developer Accessories</NavLink>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<SearchQ />
				</Nav>
				<Nav pullRight>
					<NavItem eventKey={1} onClick={() => {history.push('/admin')}}>Admin View</NavItem>
					<NavDropdown eventKey={2} title="Options" id="basic-nav-dropdown">
						<MenuItem eventKey={3.1}>Settings</MenuItem>
						{props.user.id ?
							<IndexLinkContainer to ="/orders">
								<MenuItem eventKey={3.2}>Orders</MenuItem>
							</IndexLinkContainer>
							: ''}
						<MenuItem eventKey={3.3}>Reviews</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey={3.3}>Logout</MenuItem>
					</NavDropdown>
					{props.user.id ?
						<NavItem eventKey={3} onClick={() => {props.handleLogOut()}} href="#">Logout</NavItem>
						: <NavItem eventKey={3} onClick={() => handleLogin('SIGN_IN')} href="#">Login</NavItem>}
					<NavItem eventKey={4} onClick={() => handleLogin('SIGN_UP')} href="#">Sign-Up</NavItem>
					{/*// TODO: Increase size of shopping cart*/}
					<NavItem onClick={() => handleLogin('CART')}><Label className="black-label"><i className="fa fa-shopping-cart"></i> {cartData.quantity} ITEMS - ${cartData.totalPrice}</Label></NavItem>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}
//container
const mapStateToProps = (state) => {
	return {
		modals: state.modals,
		user: state.user,
		cart: state.cart
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleLogin (modalType) {
			dispatch(setModal(modalType))
		},
		checkAuth(){
			dispatch(getMe())
		},
		handleLogOut(){
			dispatch(logout())
		},
		handleCartModal(modalType) {
			dispatch(setModal(modalType))
		}
	}
}

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(navbarInstance)

export default NavBarContainer
