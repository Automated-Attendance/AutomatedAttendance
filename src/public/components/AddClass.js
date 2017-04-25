import React from 'react';

export default class AddClass extends React.Component {
  render() {
    return (
      <div>
        <h3>Create Class</h3>
        <input
          name="createClassName"
          type="text"
          placeholder="Enter Class Name"
          value={this.props.className}
          onChange={this.props.handleChange}
        /><br/><br/>
        <button onClick={this.props.handleSubmit}>Create Class</button>
        {!this.props.classAdded ? null : <h5>{this.props.className} created!</h5>}
      </div>
    );
  }
};