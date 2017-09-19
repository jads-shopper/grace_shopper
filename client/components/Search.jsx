/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/

import React from 'react'
import { connect } from 'react-redux'
import { getProducts, getSearch, searchProduct } from '../store'
import Autosuggest from 'react-autosuggest'
import {Link} from 'react-router-dom'

const mapStateToProps = function ( state ) {
	return {
		products  : state.products,
		categories: state.categories,
		search    : state.searchProduct
	}
}

class SearchQ extends React.Component {
	constructor() {
		super();
		this.state = {
			value      : '',
			suggestions: [],
			categories : [],
		};
		this.getSuggestions = this.getSuggestions.bind(this)
		this.renderSuggestion = this.renderSuggestion.bind(this)
		this.renderSectionTitle = this.renderSuggestion.bind(this)
	}

	onChange = ( event, { newValue } ) => {
		event.preventDefault()
		this.props.handleChange(newValue)
	}

	getSuggestions = value => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		let catArr = []
		this.props.categories.map(( cat, idx ) => {
			let tempProd = this.props.products.filter(prod => {
				if (prod.categories[0].name.includes(cat)) {
					return prod.categories[0].name.includes(cat)
				}
			})

			catArr.push({
				title   : cat.name,
				products: cat.products.filter(p => p.name.includes(inputValue)),
			})
		})
		this.setState({ categories: catArr })
		return catArr
	}

	renderSuggestion = suggestion => {
		console.log(suggestion)
		return (suggestion.title
				?
				<Link to={`/category/1`}><h4>{suggestion.title}</h4> </Link>
			: <Link to={`/products/${suggestion.id}`}><span> <img className="searchImg" src={suggestion.imageUrl}/> {suggestion.name}</span>     |   ${suggestion.price}</Link>
		)
	}

	getSuggestionValue = suggestion => suggestion.name

	onSuggestionsFetchRequested = ( { value } ) => {
		this.setState({
			suggestions: this.getSuggestions(value)
		})
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	}

	renderSectionTitle = ( section ) => {
		return (<h1>{section.title}</h1>)
	}

	getSectionSuggestions = ( section ) => {
		return section.products
	}

	render() {
		const { value, suggestions } = this.state;

		const inputProps = {
			placeholder: 'Search...',
			value      : this.props.search.query,
			onChange   : this.onChange
		};

		return (
			<Autosuggest
				multiSection={true}
				suggestions={suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={this.getSuggestionValue}
				renderSuggestion={this.renderSuggestion}
				inputProps={inputProps}
				renderSectionTitle={this.renderSectionTitle}
				getSectionSuggestions={this.getSectionSuggestions}
			/>
		)
	}
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		handleChange( evt ) {
			dispatch(getSearch(evt))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchQ)

