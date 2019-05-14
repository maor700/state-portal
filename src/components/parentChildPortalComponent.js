import React, { Component } from "react";

function* stateGenFun(val) {
	yield val;
}

export class Parent extends Component {

	childPortal = stateGenFun({})

	sendNumber = (ev) => {
		this.childPortal = stateGenFun({ counter: Math.floor(Math.random() * 10) });
		this.forceUpdate();
	}
	render() {
		return (
			<div>
				<div onClick={this.sendNumber}>parent btn</div>
				<Child parentPortal={this.childPortal} />
			</div>
		)
	}
}

class Child extends Component {
	state = {
		counter: 0
	}

	static getDerivedStateFromProps(nextProps, nextState) {
		const portalMessage = nextProps.parentPortal.next();
		const { done, value } = portalMessage;
		if (!done && value) {
			return { ...nextState, ...value };
		} else return null;
	}


	render() {
		return (
			<React.Fragment>
				<div onClick={(ev) => { this.setState({ ...this.state, counter: this.state.counter + 1 }) }}>Add</div>
				<div className="result">{this.state.counter}</div>
			</React.Fragment>

		);
	}
}
