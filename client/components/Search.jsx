import React, {Component} from 'react'
import { Button, FormControl, FormGroup , Navbar } from 'react-bootstrap'
import store , { connect } from 'react-redux'
import { getProducts, searchProduct , getSearch} from '../store'

class SearchQ extends Component {
	render() {
		return (
			<form onChange={(evt) => this.props.handleChange(evt)}>
				<FormGroup>
					<FormControl type="text" placeholder="Filter Product Results"/>
				</FormGroup>
			</form>
		)
	}
}




const mapDispatchToProps = (dispatch) => {
	return {
		handleChange( evt ) {
			evt.preventDefault()
			dispatch(getSearch(evt.target.value))
		}
	}
}
export default connect(state => state, mapDispatchToProps)(SearchQ)

