import React from 'react';

class FormComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleFormTextChange = this.handleFormTextChange.bind(this);
    }

    handleFormTextChange(event) {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState)
    }


}

export default FormComponent;