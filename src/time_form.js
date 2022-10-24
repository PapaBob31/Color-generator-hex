import React from "react"

class TimeForm extends React.Component {
	constructor(props) {
		super(props)
		this.createTimeElementAttr = this.createTimeElementAttr.bind(this)
		this.updateHour = this.updateHour.bind(this)
		this.updateMinute = this.updateMinute.bind(this)
		this.hourInput = ''
		this.minuteInput = ''
	}

	createTimeElementAttr(event) {
		event.preventDefault()
		let key = this.hourInput + '-' + this.minuteInput + '-PM'
		let time = this.hourInput + ':' + this.minuteInput + ' PM'
		this.props.addTime(key, time)
	}

	updateHour(event) {
		this.hourInput = event.target.value
	}

	updateMinute(event) {
		this.minuteInput = event.target.value
	}

	render() {
		return (
			<>
			 	<form id="time-form">
					<label htmlFor="time" style={{display: "block"}}>Add time</label>
			    <input type="number" name="hour-input"
			    min="01" max="12" onChange={this.updateHour}/>
			    <input type="number" name="minute-input"
			    min="00" max="59" onChange={this.updateMinute}/>
			    <button onClick={this.createTimeElementAttr}>Add</button>
			  </form>
	    </>
		)
	}
}


export default TimeForm;