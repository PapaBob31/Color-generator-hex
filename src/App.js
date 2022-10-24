import React from 'react'
import TimeSectionElements from "./time_section.js"
import TimeForm from "./time_form.js"
// import EventCard from "./event_card.js"
// import DayDisplay from "./days_section.js"
// import EntryForm from "./entry_form.js"
// import EmptyCardDisplay from "./empty_card.js"
import DaySection from "./days_section.js"
import './index.css'

class TimeTableBody extends React.Component {
	constructor(props) {
		super(props)
		this.timeList = [
			<div key='11-00-AM' className='time'>11:00 AM</div>,
		  <div key='1-00-PM' className='time'>1:00 PM</div>,
		  <div key='2-30-PM' className='time'>2:30 PM</div>,
		  <div key='4-30-PM' className='time'>4:30 PM</div>,
		  <div key='8-00-PM' className='time'>8:00 PM</div>,
		  <div key='9-00-PM' className='time'>9:00 PM</div>,
		  <div key='11-30-PM' className='time'>11:30 PM</div>
		]
		this.updateTimeList = this.updateTimeList.bind(this)
		this.state = {time_list: this.timeList}
	}

	updateTimeList(key, time) {
		this.timeList.push(<div key={key} className='time'>{time}</div>)
		this.timeList = [...this.timeList]
		this.setState({time_list: this.timeList})
	}

	render() {
		return (
			<>
	    	<h2 style={{margin: "0", display: "inline-block"}}>Timetable</h2>
	    	<TimeForm addTime={this.updateTimeList}/>
	    	<main id="root">
		      <TimeSectionElements list={this.timeList}/>
		   		<DaySection no_of_eventTimes={this.timeList.length}/>
		    </main>
	    </>
		)
	}
}

export default TimeTableBody;
