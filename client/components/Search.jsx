import React, {Component} from 'react'
import { Button, FormControl, FormGroup , Navbar } from 'react-bootstrap'
import store , { connect } from 'react-redux'
import { getSearch } from '../store'

class SearchQ extends Component {
	constructor( props ) {
		super(props)
		this.state = {
			query: ''
		}
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange( evt ) {
		evt.preventDefault()
		console.log(evt.target.value)
	}

	render() {

		return (
			<form onChange={(evt) => this.props.handleSubmit(evt)}>
				<FormGroup>
					<FormControl type="text" placeholder="Search"/>
				</FormGroup>
				{' '}
				<Button type="submit">Submit</Button>
			</form>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSubmit( evt ) {
			dispatch(getSearch(evt.target.value))
		}
	}
}

export default connect(state => state, mapDispatchToProps)(SearchQ)
