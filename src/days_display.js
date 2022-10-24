import React from "react"
import EventCard from "./event_card.js"

function DayDisplay(props) {
	let cardList = []
	for (let i=0,n=props.no_of_cards; i<n; i++) {
		cardList.push(<EventCard submenu_classname="menu-hidden" key={`card-${i.toString()}`}/>)
	}
	cardList = [...cardList]
	return (
		<>
			<h2 className='name-label'>{props.label}</h2>
			{cardList}
		</>
	)
}

export default DayDisplay;
