import React from "react"
import EmptyCardDisplay from "./empty_card.js"

class EventCard extends React.Component {
	constructor(props) {
		super(props)
		if (this.props.content) {
			this.state = {classname: this.props.submenu_classname, empty_card: false}			
		}else {
			this.state = {classname: this.props.submenu_classname, empty_card: true}
		}
		this.add_new_entry = this.add_new_entry.bind(this)
		this.displayOptions = this.displayOptions.bind(this)
		this.removeCard = this.removeCard.bind(this)
		this.CreateTagElements = this.CreateTagElements.bind(this)
		this.updateCard = this.updateCard.bind(this)
		this.content = this.props.content ? this.props.content : ''
		this.tags = ['programming', 'work']
	}

	static event_tags = {
		personal: {name: 'personal', color: 'orange'},
		reading: {name: 'reading', color: 'yellow'},
		programming: {name: 'programming', color: 'orangered'},
		work: {name: 'work', color: 'lightgreen'},
	}

	CreateTagElements() {
		let tagElements = [];
		this.tags.forEach((tag) => {
			let tag_display = EventCard.event_tags[tag]
			tagElements.push(
				<span style={{backgroundColor: tag_display.color}} key={tag_display.name}>{tag_display.name}</span>
			)
		})
		return tagElements
	}

	add_new_entry(condition) {
		this.setState({add_new_entry: condition})
	}

	displayOptions() {
		if (this.state.classname === 'menu-hidden') {
			this.setState({classname: 'menu-shown'})
			return;
		}
		this.setState({classname: 'menu-hidden'})
	}

	updateCard(new_entry) {
		this.content = new_entry.content
		this.tags = new_entry.tags
		this.setState({empty_card: false})
	}

	removeCard() {
		this.setState({empty_card: true})
	}

	render() {
		if (this.state.empty_card) {
			return (
				<div className='empty-card'>
					<EmptyCardDisplay updateParentCard={this.updateCard} />
				</div>
			)
		}
		return (
			<div className='card'>
				<span className="material-symbols-outlined" onClick={this.displayOptions}>more_vert</span>
				<div className={this.state.classname}>
					<span onClick={this.removeCard}>remove</span>
					<span>edit</span>
					<span>add tags</span>
				</div>
				<p>{this.content}</p>
				<div className="tags-container">
					<this.CreateTagElements/>
				</div>
			</div>
		)
	}
}

export default EventCard;