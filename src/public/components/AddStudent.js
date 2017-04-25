import React from 'react';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select'

export default class AddStudent extends React.Component {
  render() {
    return (
      <div>
        <h3>Add Student to Class</h3>
        Class:
        <div>
          <Select 
            placeholder="Select Class(es)..."
            value={this.props.selectedClass}
            options={this.props.classOptions}
            onChange={event => this.props.handleChange('selectedClassAddStudent', event)}
            simpleValue
            multi
          />
        </div><br/>
        Student:
        <div>
          <VirtualizedSelect
            placeholder="Select Student..."
            value={this.props.selectedStudent}
            options={this.props.studentOptions ? this.props.studentOptions : [{label: 'Error loading data..', value: ''}]}
            onChange={event => this.props.handleChange('selectedStudentAddStudent', event)}
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
        <button onClick={this.props.handleSubmit}>Add Student</button>
        {!this.props.studentAdded ? null : <h5>Added {this.props.selectedStudent.label.slice(0, this.props.selectedStudent.label.indexOf('-') - 1)} to {this.props.selectedClass.split(',').join(', ')}!</h5>}
      </div>
    );
  }
};