import React from "react"

class EntryForm extends React.Component {
	constructor(props) {
		super(props)
		this.scaleValue = 0
		this.state = {dropdown_style: {transform: `scaleY(${this.scaleValue.toString()})`}}
		this.updateDropDownDisplay = this.updateDropDownDisplay.bind(this)
		this.updateEntry = this.updateEntry.bind(this)
		this.add_tag = this.add_tag.bind(this)
		this.transferEntryToCard = this.transferEntryToCard.bind(this)
		this.entry = {content: '', tags: []}
	}

	add_tag(event) {
		if (this.entry.tags.length < 2) {
			this.entry.tags.push(event.target.value)
		}else {
			alert("You can't have more than 2")
		}
	}

	updateDropDownDisplay() {
		if (this.scaleValue === 0) {
			this.scaleValue = 1
		}else {this.scaleValue = 0}
		this.setState({dropdown_style: {transform: `scaleY(${this.scaleValue.toString()})`}})
	}

	transferEntryToCard() {
		this.props.onTrasferOfData(this.entry)
	}

	updateEntry(event){
		this.entry.content = event.target.value
	}

	render() {
		return (
			<form>
				<textarea onChange={this.updateEntry} placeholder="not more than 100 characters" maxLength="20"></textarea>
				<div id="tags" onClick={this.updateDropDownDisplay}>
					<div id="current-value">
						Tags
						<span className="material-icons-outlined">arrow_drop_down</span>
					</div>
					<div id="options" style={this.state.dropdown_style}>
						<option onClick={this.add_tag} value="personal">personal</option>
						<option onClick={this.add_tag} value="reading">reading</option>
						<option onClick={this.add_tag} value="programming">programming</option>
						<option onClick={this.add_tag} value="work">work</option>
					</div>
				</div>
				<a href="#" onClick={this.transferEntryToCard}>Add</a>
			</form>
		)
	}
}

export default EntryForm;
