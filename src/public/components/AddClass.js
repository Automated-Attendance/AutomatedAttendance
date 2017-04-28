import React from 'react';

export default class AddClass extends React.Component {
  render() {
    return (
      <div className="col-md-6 enrollment-input">
        <h3 className="text-center">Create Class</h3>
        Class:
        <input
          className="form-control"
          name="createClassName"
          type="email"
          placeholder="Enter Class Name"
          value={this.props.createClassName}
          onChange={this.props.handleChange}
        /><br/>
        <button className="btn btn-primary" onClick={this.props.handleSubmit}>
        <span className="glyphicon glyphicon-edit"/>
        Create Class</button>
        {!this.props.classAdded ? null : <h5>Created {this.props.createClassName}!</h5>}
      </div>
    );
  }
};