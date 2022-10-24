
function FancyBorder(props) {
	return (
		<div className={'FancyBorder FancyBorder-' + props.color}>
			{props.children}
		</div>
	)
}

function WelcomeDialog() {
	return (
		<FancyBorder color="blue">
			<h1 className="Dialog-title">
				Welcome
			</h1>
			<p className="Dialog-message">
				Thank you for visiting our spacecraft!
			</p>
		</FancyBorder>
	)
}

function SplitPane(props) {
	return (
		<div className="SplitPane">
			<div className="SplitPane-left">
				{props.left}
			</div>
			<div className="SplitPane-right">
				{props.right}
			</div>
		</div>
	)
}

function App() {
	return (
		<SplitPane left={<contacts />} right={<Chat />} /> 
	)
}

class App extends React.Component {
	render() {
		return <Toolbar theme="dark"/>;
	}
}

function Toolbar(props) {
	return (
		<div>
			<ThemedButton theme={props.theme} />
		</div>
	)
}

class ThemedButton extends React.Componenet {
	render() {
		return <Button theme={this.props.theme} />;
	}
}

// with context

const ThemeContext = React.createContext('light')

class App extends React.Component {
	render() {
		return (
			<ThemeContext.Provider value="dark">
				<Toolbar/>
			</ThemeContext.Provider>
		)
	}
}