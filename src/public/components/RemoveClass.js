import React from 'react';
import Select from 'react-select';

export default class RemoveClass extends React.Component {
  render() {
    return (
      <div>
        <h3>Delete Class</h3>
        Class:
        <div onClick={this.getOptions}>
          <Select 
            placeholder="Select Class(es)..."
            value={this.props.selectedClass}
            options={this.props.classOptions}
            onChange={this.props.handleChange(this.props.selectedClass, event)}
            simpleValue
            multi
          />
        </div><br/>
        <button onClick={this.props.handleSubmit}>Delete Class</button>
        {!this.props.classRemoved ? null : <h5>{this.props.selectedClass} deleted!</h5>}
      </div>
    );
  }
};