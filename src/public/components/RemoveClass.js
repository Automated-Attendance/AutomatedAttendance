import React from 'react';
import Select from 'react-select';

export default class RemoveClass extends React.Component {
  render() {
    return (
      <div>
        <h3>Delete Class</h3>
        Class:
        <div>
          <Select 
            placeholder="Select Class(es)..."
            value={this.props.selectedClass}
            options={this.props.classOptions ? this.props.classOptions : [{label: 'Error loading data...'}]}
            onChange={selectedClass => this.props.handleChange('selectedClassRemoveClass', selectedClass)}
            simpleValue
            multi
          />
        </div><br/>
        <button onClick={this.props.handleSubmit}>Delete Class</button>
        {!this.props.classRemoved ? null : <h5>Deleted {this.props.selectedClass.split(',').join(', ')}!</h5>}
      </div>
    );
  }
};