import React from 'react';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

export default class AddStudent extends React.Component {
  render() {
    /* istanbul ignore next */
    return (
      <div>
        <h3 className="text-center">Add Student to Class</h3>
        <div className="col-md-6 enrollment-input">
          Class:
          <div>
            <Select 
              placeholder="Select Class(es)..."
              value={this.props.selectedClass}
              options={this.props.classOptions ? this.props.classOptions : [{label: 'Error loading data...'}]}
              onChange={selectedClass => this.props.handleChange('selectedClassAddStudent', selectedClass)}
              simpleValue
              multi
            />
          </div><br/>
          Student:
          <div>
            <VirtualizedSelect
              placeholder="Select Student..."
              value={this.props.selectedStudent}
              options={this.props.studentOptions ? this.props.studentOptions : [{label: 'Error loading data...'}]}
              onChange={selectedStudent => this.props.handleChange('selectedStudentAddStudent', selectedStudent)}
            />
          </div><br/>
          <form
            ref='uploadForm'
            id='uploadForm' 
            action='/studentUpload' 
            method='post' 
            encType="multipart/form-data">
            Photo:
            <input
              ref="preview"
              type="file"
              name="sampleFile"
              value={this.props.imageValue}
              onChange={this.props.preview}
            />
            <img
              ref="imageUpload"
              className="file-preview"
              src={this.props.imageSource}
              height={this.props.imageHeight}
            />
          </form><br/>
          <button className="btn btn-primary handleSubmitAddStudent" onClick={this.props.handleSubmit}>
            <span className="glyphicon glyphicon-edit"/> Add Student
          </button>
          {!this.props.studentAdded ? null : <h5>Added {this.props.selectedStudent.label.slice(0, this.props.selectedStudent.label.indexOf('-') - 1)} to {this.props.selectedClass.split(',').join(', ')}!</h5>}
        </div>
      </div>
    );
  }
};