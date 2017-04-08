import React from 'react';
import autoBind from 'react-autobind';
import { post, get } from './AxiosRoutes';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ['HRSF72','HRSF73','HRSF75','HRSF76'],
      students: {
        'HRSF72': ['Duy','Jason','Andrew','Han'],
        'HRSF73': ['Sam','Aly','James','Kay'],
        'HRSF75': ['Kevin','John','Greg','Mario'],
        'HRSF76': ['Alice','Jenny','Andy','Terry']
      },
      selectedClass: '',
      searchClass: '',
      searchStudent: '',
      searchDate: '',
      results: []
    };
    autoBind(this);
  }
  
  componentWillMount() {
    this.state.selectedClass = this.state.classes[0];
  }

  handleClassListChange(chosenClass) {
    this.setState({selectedClass: chosenClass});
  }

  handleClassChange(event) {
    this.setState({searchClass: event.target.value});
  }

  handleStudentChange(event) {
    this.setState({searchStudent: event.target.value});
  }

  handleDateChange(event) {
    this.setState({searchDate: event.target.value});
  }

  handleSubmit(event) {
    var current = this;
    get('search')
      .then(function(response) {
        console.log(response);
        current.setState({results: response.data});
      });
    event.preventDefault();
  }


  render() {
    return (
      <div>
        <h3>Classes</h3>
        <ul>
          {this.state.classes.map((classes, index) => {
            return (<li key={index} onClick={()=> { this.handleClassListChange(classes); }}>{classes}</li>);
          })}
        </ul>
        <h3>{this.state.selectedClass} students</h3>
        <ul>
          {this.state.students[this.state.selectedClass].map((student,index) => {
            return (<li key={index}>{student}</li>);
          })}
        </ul>
        <h3>Search</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Class:
            <input type="text" value={this.state.searchClass} onChange={this.handleClassChange}/>
          </label>
          <br></br>
          <label>
            Student:
            <input type="text" value={this.state.searchStudent} onChange={this.handleStudentChange}/>
          </label>
          <br></br>
          <label>
            Date:
            <input type="text" value={this.state.searchDate} onChange={this.handleDateChange}/>
          </label>
          <br></br>
          <input type="submit" value="Search"/>
        </form>
        {this.state.results.map((result, index) => (<li key={index}>{result}</li>))}
        <Link to="/AddStudent">Add Student</Link>
      </div>
    );
  }
}
