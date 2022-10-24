import React from "react"
import DayDisplay from "./days_display.js"

function DaySection(props) {
	return (
		<section id='days'>
      <section id="monday">
      	<DayDisplay no_of_cards={props.no_of_eventTimes} label='MONDAY'/>
      </section>
      <section id="tuesday">
      	<DayDisplay no_of_cards={props.no_of_eventTimes} label='TUESDAY'/>
     	</section>
      <section id="wednesday">
      	<DayDisplay no_of_cards={props.no_of_eventTimes} label='WEDNESDAY'/>
      </section>
      <section id="thursday">
      	<DayDisplay no_of_cards={props.no_of_eventTimes} label='THURSDAY'/>
      </section>
      <section id="friday">
      	<DayDisplay no_of_cards={props.no_of_eventTimes} label='FRIDAY'/>
      </section>
    </section>
	)
}

export default DaySection;