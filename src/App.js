import React, {useState, useRef} from "react"
import "./index.css"

function dec_to_hex(dec_param, hex) {
	// Maps a decimal in the range 10 to 15 to it's hex format
  const mapping = {10: "a", 11: "b", 12: "c", 13: "d", 14: "e", 15: "f"}

	const dec = Math.round(dec_param)
	let remainder = dec % 16
	let quotient = Math.floor(dec/16)
	let hex_code = hex ? hex : ""

	// concatenates the hex equivalent of remainders greater than 9
	// or the string equivalent if otherwise to the hex string variable
	hex_code = (remainder > 9 ? mapping[remainder] : remainder.toString()) + hex_code

	if (quotient !== 0) {
		return dec_to_hex(quotient, hex_code)
	}

	// decimals converted to hex must be two characters long so 'f' becomes '0f'
	return hex_code.length === 2 ? hex_code : "0" + hex_code
}

// Accepts an array of rgb color code i.e [rr, gg, bb] as it's only argument,
// converts it to an hexadecimal color code and returns it
function rgb_to_hex(rgb_list) {
	let css_hex = "#"
	for (let i=0; i<3; i++) {
		css_hex += dec_to_hex(rgb_list[i])
	}
	return css_hex
}


// Converts an hexadecimal color code to an array of rgb color code i.e [rr, gg, bb] and returns it 0c0c
function hex_to_rgb(hex_color) {
	// Maps an hexadecimal in the range a to f to it's decimal format
	const mapping = {"a": 10, "b": 11, "c": 12, "d": 13, "e": 14, "f": 15}

	const rgb_arr = []
	for (let i=1; i<7; i+=2) { // Each hex digit is composed of two characters
		let number1 = mapping[hex_color[i]] ? Number(mapping[hex_color[i]]) : Number(hex_color[i]);
		let number2 = mapping[hex_color[i+1]] ? Number(mapping[hex_color[i+1]]) : Number(hex_color[i+1]);
		rgb_arr.push(number1*16 + number2);
	}
	return rgb_arr
}

function get_index(list, item) {
	for (let i=0; i<3; i++) {
		if (list[i] === item) {
			return i
		}
	}
}

// Creates and returns a list of jsx elements that shows lighter and darker variations of a color 
function generatedColors(color_variant, increments, d_index, color) {
	let text_color; let hex_color; let variationsList = [];

	for (let n=0; n<21; n++) {
		hex_color = rgb_to_hex(color_variant)
		text_color = n<9 ? "white" : "black" // light text on dark colors and vice versa
		if (hex_color.toLowerCase() === color) {
			variationsList.unshift(<div style={{backgroundColor: hex_color, color: text_color}} key={hex_color}>{hex_color} &#10004;</div>)
		}else {
			variationsList.unshift(<div style={{backgroundColor: hex_color, color: text_color}} key={hex_color}>{hex_color}</div>)
		}

		if (n === 20) break;

		for (let i=0; i<3; i++) {
			color_variant[i] += increments[i] // Create a color component's color variation
			if (color_variant[i] === 254.5) { // Edge case. occurs only when increment[d_index] = 12.25
			// It causes the color component to be rounded to 255 at second to the last element instead of last element
				color_variant[i] = 254
			}
			if (color_variant[i] > 255) { // The last increment result will almost always be greater than 255
				color_variant[i] = 255
			}
			if (n === 9 && increments[d_index] === 25.5) { // The dominant color component reaches 255 under this conditions
				if (i !== d_index) {
					// Their increments change cos they are relative to the dominant color component that can't increase again
					increments[i] = (255 - color_variant[i])/10 
				}
			}
		}
	}
	return variationsList
}

// Generates lighter and darker variations of a color
function ColorVariations({color}) {
	if (!color) {return null;}
	let rgb_color_list = hex_to_rgb(color) // Makes the color components easier to perform calculations on
	let sorted_copy = ([...rgb_color_list]).sort((a, b) => (a-b))  // sorts rgb_color_list in ascending order
	let dominant_color = sorted_copy[2]
	let d_index = get_index(rgb_color_list, dominant_color)

	// At each of it's indexes is the increment used to generate variations of 
	// a color component at that same index in rgb_color_list
	let increments = Array(3); 
	let color_variant = Array(3)

	if ((dominant_color - sorted_copy[0]) < 15) {
		increments[d_index] = 12.75; // increment for the dominant color -> 5% of 255
	}else {
		increments[d_index] = 25.5; // increment for the dominant color -> 10% of 255
	}
	// Finds how much larger the dominant color is than the percentage increment
	// and uses it as the darkest variation of the dominant color
	color_variant[d_index] = dominant_color % increments[d_index]

	for (let i=0; i<3; i++) { // Generates increments for other non dominant color components
		if (i === d_index) {continue}
		if (dominant_color === 0) { // Prevents division by zero 
			increments[i] = increments[d_index]
			color_variant[i] = color_variant[d_index] // darkest variation of the color component
		}else {
			// Other color components increments are relative to the dominant color component's increment
			increments[i] = (rgb_color_list[i] / dominant_color)*increments[d_index]
			color_variant[i] = color_variant[d_index] * (rgb_color_list[i] / dominant_color) // darkest variation of the color component
		}
	}
	return generatedColors(color_variant, increments, d_index, color);
}


function Info() {
	const [info_visibility, setVisibility] = useState("hidden")
	let info_ref = useRef(null)

	function show_info(e) {
		if (info_visibility === "hidden") {
			e.stopPropagation();
			setVisibility("shown");
			document.addEventListener("click", hide_info); 
		}
	}

	function hide_info(e) {
		if (e.target !== info_ref.current) {
			document.removeEventListener("click", hide_info);
			setVisibility("hidden");
		}
	}

	return (
		<div className="info-container">
			<img src="icons/info.svg" alt="info-icon" onClick={show_info}/>
			<span className={info_visibility} ref={info_ref}>
				This app generates and displays 20 different colors of similar hues to the 
  			color provided as input for the app. It also displays the color provided as input.
  		</span>
		</div>
	)
}


export default function ColorSelection() {
	const [color, setColor] = useState("")
	let color_input = useRef(null)
	let input_ref = useRef(null)
	let regex = /^(#{1}[0-9a-zA-Z]{6})$/

	function handleFormSubmit(e) {
		e.preventDefault();
		if (regex.test(input_ref.current.value)) {
			color_input.current.value = input_ref.current.value.toLowerCase()
			setColor(input_ref.current.value.toLowerCase());
		}else {alert("Invaid Input! Input must be in hex color code format.")}
	}

	function setTextInput(e) {
		input_ref.current.value = color_input.current.value;
	}

	return (
		<>
			<header>
				<h3>Color Generator</h3>
				<form onSubmit={handleFormSubmit}>
					<input type="color" ref={color_input} onChange={setTextInput} name="color"/>
					<input type="text" ref={input_ref} maxLength="7" placeholder="hex color code"/>
					<button type="submit" style={{border: `3px solid ${color}`}}>Submit</button>
				</form>
				<Info/>
			</header>
			<section id="color-section">
				<ColorVariations color={color}/>
			</section>
		</>
	)
}
