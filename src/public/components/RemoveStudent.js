import React from 'react';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select'

export default class RemoveStudent extends React.Component {
  render() {
    return (
      <div>
        <h3>Remove Student from Class</h3>
        Class:
        <div>
          <Select
            placeholder="Select Class(es)..."
            value={this.props.selectedClass}
            options={this.props.classOptions ? this.props.classOptions : [{label: 'Error loading data...'}]}
            onChange={selectedClass => this.props.handleClassChange('selectedClassRemoveStudent', selectedClass)}
            simpleValue
          />
        </div><br/>
        Student:
        <div>
          <VirtualizedSelect
            placeholder="Select Student..."
            value={this.props.selectedStudent}
            options={this.props.studentOptions ? this.props.studentOptions : [{label: 'Error loading data...'}]}
            onChange={selectedStudent => this.props.handleStudentChange('selectedStudentRemoveStudent', selectedStudent)}
          />
        </div><br/>
        <button onClick={this.props.handleSubmit}>Remove Student</button>
        {!this.props.studentRemoved ? null : <h5>Removed {this.props.selectedStudent.label.slice(0, this.props.selectedStudent.label.indexOf('-') - 1)} from {this.props.selectedClass}!</h5>}<hr/>
      </div>
    );
  }
};