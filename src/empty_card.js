import React from "react"
import EntryForm from "./entry_form.js"

class EmptyCardDisplay extends React.Component {
	constructor(props) {
		super(props)
		this.displayEntryForm = this.displayEntryForm.bind(this)
		this.state = {create_entry: false}
	}

	displayEntryForm(condition){
		this.setState({create_entry: condition})
	}

	render() {
		if (this.state.create_entry) {
			return (
				<>
					<button onClick={() => this.displayEntryForm(false)}>x</button>
					<p>make it short and descriptive</p>
					<EntryForm onTrasferOfData={this.props.updateParentCard}/>
				</>
			)
		}
		return (
			<>
				<button onClick={() => this.displayEntryForm(true)}>+</button>
				<h2>Empty Card</h2>
			</>
		)
	}
}
 
export default EmptyCardDisplay;
