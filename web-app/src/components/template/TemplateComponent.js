import React, { Component } from 'react'
import TemplateFunctionalComponent from "./TemplateFunctionalComponent";

class TemplateComponent extends Component {

    // This is the state, use this to add dummy data
    state = {
        example: 'This is some example data saved in state',
        event: 'not clicked'
    }

    // This is an example of an arrow function
    handleChange = (e) => {
        console.log(e)
        this.setState({
            event: 'clicked'
        })
    }

    // This is where all the rendering happens for the visuals
    render() {
        const variableExample = this.state.example;

        // Todo: Christian could you restrict access to admin's only?
        return (
            // Can Only ever be one top level html tag in return, notice how everything is inside this <div>
            <div>
                <h1>Example Title</h1>
                {/* This is a functional component*/}
                <TemplateFunctionalComponent props={variableExample}/> {/* This is how to pass in data to a component, similar to passing in parameters to a function */}
                <div className="btn" onClick={this.handleChange}> Click Me! </div> {/* This is how to call a function with an action */}
                <div> The event is: {this.state.event}</div>
            </div>
        )
    }
}

export default TemplateComponent
