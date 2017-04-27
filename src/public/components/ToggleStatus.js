import React from 'react';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

export default class ToggleStatus extends React.Component {
  render() {
    return (
      <div>
        <h3 className="text-center">Change Admin/Student Status</h3>
        <div className="col-md-6 enrollment-input">
          User:
           <div>
            <VirtualizedSelect
              placeholder="Select Student..."
              value={this.props.selectedUser}
              options={this.props.studentOptions ? this.props.studentOptions : [{label: 'Error loading data...'}]}
              onChange={selectedUser => this.props.handleChange('selectedStudentToggleStatus', selectedUser)}
            />
          </div><br/>
          Status:
          <div>
            <Select
              placeholder="Select Status..."
              value={this.props.selectedStatus}
              options={this.props.statusOptions ? this.props.statusOptions : [{label: 'Error loading data...'}]}
              onChange={selectedStatus => this.props.handleChange('selectedStatus', selectedStatus)}
            />
          </div><br/>
          <button onClick={this.props.handleSubmit}>Change Status</button>
         {!this.props.statusToggled ? null : <h5>Changed {this.props.selectedUser.label.slice(0, this.props.selectedUser.label.indexOf('-') - 1)} to {this.props.selectedStatus.label}!</h5>}
        </div>
      </div>
    );
  }
};