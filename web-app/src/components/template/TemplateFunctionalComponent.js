import React from 'react'


const TemplateFunctionalComponent = (props) => {
    return (
        <div>
            <h4 className="grey-text">All Props:</h4>
            <p className="grey-text">{props.props}</p> {/*  How to use a variable in JSX */}
        </div>
    );
};

export default TemplateFunctionalComponent