import React from 'react';
import autoBind from 'react-autobind';
import { post, get } from './AxiosRoutes';
import { Link } from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ['HRSF72', 'HRSF73', 'HRSF75', 'HRSF76'],
      students: {
        'HRSF72': ['Duy', 'Jason', 'Andrew', 'Han'],
        'HRSF73': ['Sam', 'Aly', 'James', 'Kay'],
        'HRSF75': ['Kevin', 'John', 'Greg', 'Mario'],
        'HRSF76': ['Alice', 'Jenny', 'Andy', 'Terry']
      },
      selectedClass: '',
      attendance: []
    };
    autoBind(this);
  }
  
  componentWillMount() {
    this.state.selectedClass = this.state.classes[0];
  }

  componentDidMount() {
    post('search', {queryType: 'allAttendance'})
      .then((response) => {
        console.log(response.data);
        this.setState({attendance: response.data});
      })
      .catch(function(error) {
        console.log('Error fetching attendance.', error);
      });
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
        
        <BootstrapTable data={this.state.attendance} height='250' scrollTop={'Top'} striped hover condensed>
          <TableHeaderColumn dataField='class_name' isKey filter={{type: 'TextFilter'}} dataSort={true}>Class</TableHeaderColumn>
          <TableHeaderColumn dataField='user_name' filter={{type: 'TextFilter'}} dataSort={true}>Student</TableHeaderColumn>
          <TableHeaderColumn dataField='date' filter={{type: 'TextFilter'}} dataSort={true}>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='status' filter={{type: 'TextFilter'}} dataSort={true}>Status</TableHeaderColumn>
        </BootstrapTable>

        <Link to="/AddStudent">Add Student</Link>
      </div>
    );
  }
}
