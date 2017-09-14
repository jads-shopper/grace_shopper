import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch, Redirect} from 'react-router-dom'
import {Grid} from 'react-bootstrap'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome} from './components'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Admin from './components/Admin.jsx'
import AdminAddUser from './components/AdminAddUser.jsx'
import AdminAddCategory from './components/AdminAddCategory.jsx'
import AdminAddProduct from './components/AdminAddProduct.jsx'
import SingleCategory from './components/SingleCategory.jsx'
import store, {getMe, fetchProducts, fetchCategories} from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount () {
		this.props.loadInitialData()
	}

	render () {
		const {isLoggedIn} = this.props

		return (
			<Router history={history}>
				<div>
					<Navbar />
					<Switch>
						<Route exact path="/home" component={Home} />
						<Route exact path="/admin" component={Admin} />
						<Route exact path="/admin/newUser" component={AdminAddUser} />
						<Route exact path="/admin/newCategory" component={AdminAddCategory} />
						<Route exact path="/admin/newProduct" component={AdminAddProduct} />
						<Route path="/category/:id" component={SingleCategory} />
						<Redirect to="/home" />
					</Switch>
				</div>
			</Router>
		)
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
		// Otherwise, state.user will be an empty object, and state.user.id will be falsey
		isLoggedIn: !!state.user.id
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadInitialData () {
			dispatch(getMe())
			dispatch(fetchProducts())
			dispatch(fetchCategories())
		}
	}
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
	loadInitialData: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
}
