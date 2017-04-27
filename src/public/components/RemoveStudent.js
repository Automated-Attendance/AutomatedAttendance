import React from 'react';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

export default class RemoveStudent extends React.Component {
  render() {
    /* istanbul ignore next */
    return (
      <div>
        <h3 className="text-center">Remove Student from Class</h3>
        <div className="col-md-6 enrollment-input">
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
          <button className="btn btn-danger handleSubmitRemoveStudent" onClick={this.props.handleSubmit}>
            <span className="glyphicon glyphicon-edit"/> Remove Student
          </button>
          {!this.props.studentRemoved ? null : <h5>Removed {this.props.selectedStudent.label.slice(0, this.props.selectedStudent.label.indexOf('-') - 1)} from {this.props.selectedClass}!</h5>}
        </div>
      </div>
    );
  }
};