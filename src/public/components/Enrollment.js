import React from 'react';
import { storeStudentData, removeStudentData } from './requests/students';
import Spinner from './Spinner';
import { getClasses, addClasses, removeClasses, getEnrollment } from './requests/classes';
import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import { getAllUsers } from './requests/users';
import Select from 'react-select';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import tableHelpers from './helpers/tableHelpers.js'

export default class Enrollment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: '',
      selectedClassAddStudent: '',
      selectedClassRemoveStudent: '',
      selectedClassRemoveClass: '',
      selectedStudentAddStudent: '',
      selectedStudentRemoveStudent: '',
      studentPhoto: '',
      className: '',
      studentAdded: false,
      studentRemoved: false,
      classAdded: false,
      classRemoved: false,
      spinner: false,
      studentOptionsAddStudent: [],
      studentOptionsRemoveStudent: [],
      classOptionsAddStudent: [],
      classOptionsRemoveStudent: [],
      classOptionsRemoveClass: [],
      classOptionsEnrollment: {},
      enrollmentRecords: []
    },

    ['handleInputChange',
    'handleStudentAddSubmit',
    'handleClassAddSubmit',
    'previewFile',
    'updateClassList',
    'getExistingUserList','toggleOff'].forEach((method) => {
      this[method] = this[method].bind(this);
    })
  }

  async componentWillMount() {
    await this.updateClassList();
    await this.populateTable();
  }

  async populateTable() {
    const enrollmentRecords = await getEnrollment();
    if (enrollmentRecords) {
      enrollmentRecords.enrollment.forEach((item) => {
        if (!this.state.classOptionsEnrollment[item.class]) {
          let thisClass = this.state.classOptionsEnrollment;
          thisClass[item.class] = item.class;
          this.setState({
            classOptionsEnrollment: thisClass
          });
        }
      });
      this.setState({enrollmentRecords: enrollmentRecords.enrollment});
    }
  }

  async updateClassList() {
    const classes = await getClasses();
    this.setState(classes);
    this.setState({
      selectedClassAddStudent: this.state.classes[0],
      selectedClassRemoveStudent: this.state.classes[0],
      selectedClassRemoveClass: this.state.classes[0]
    });
  }

  handleInputChange(event) {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  toggleOff(status) {
    setTimeout(() => {
      this.setState({ [status]: false })
    },2000);
  }


  async handleStudentAddSubmit(event) {
    let data = {
      studentUserName: this.state.selectedStudentAddStudent.value,
      selectedClass: this.state.selectedClassAddStudent,
      studentPhoto: this.state.studentPhoto
    };
    this.setState({ spinner: true, studentAdded: false });
    this.setState({ studentAdded: await storeStudentData(data) });
    this.setState({ spinner: false });
    await this.populateTable();
    this.toggleOff('studentAdded');

  }

  async handleClassAddSubmit(event) {
    let data = { className: this.state.className };
    this.setState({ spinner: true, classAdded: false });
    this.setState({ classAdded: await addClasses(data) });
    this.setState({ spinner: false });
    await this.updateClassList();
    await this.populateTable();
    this.toggleOff('classAdded');
  }

  async handleStudentRemoveSubmit(event) {
    let data = {
      studentUserName: this.state.selectedStudentRemoveStudent,
      className: this.state.selectedClassRemoveStudent,
    };
    this.setState({ spinner: true, studentRemoved: false });
    this.setState({ studentRemoved: await removeStudentData(data) });
    this.setState({ spinner: false });
    await this.populateTable();
    this.toggleOff('studentRemoved');
  }

  async handleClassRemoveSubmit(event) {
    let data = { className: this.state.selectedClassRemoveClass };
    this.setState({ spinner: true, classRemoved: false });
    this.setState({ classRemoved: await removeClasses(data) });
    this.setState({ spinner: false });
    await this.updateClassList();
    await this.populateTable();
    this.toggleOff('classRemoved');
  }

  previewFile() {
    let preview = document.querySelector('img');
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();

    reader.addEventListener("load", () => {
      preview.src = reader.result;
      preview.height = '200';
      this.setState({ studentPhoto: reader.result });
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  async getExistingUserList() {
    const users = await getAllUsers();
    this.setState({
      studentOptionsAddStudent: users,
      studentOptionsRemoveStudent: users
    });
  }

  async getSelectOptions() {
    const classList = await getClasses();
    const classes = classList.classes.map((classname) => {
      return { label: classname, value: classname };
    });
    this.setState({
      classOptionsAddStudent: classes,
      classOptionsRemoveStudent: classes,
      classOptionsRemoveClass: classes
    });
  }

  async updateClassList() {
    const classes = await getClasses();
    this.setState(classes);
  }

  render() {
    return (
      <div>
        {this.state.spinner && <Spinner/>}

        <h3>Create Class</h3>
        <input name="className" type="text" placeholder="Enter Class Name" onChange={this.handleInputChange}></input><br/><br/>
        <button onClick={this.handleClassAddSubmit}>Create Class</button>
        {!this.state.classAdded ? null : <h6>Class Added Successfully!</h6>}<hr/>

        <h3>Add Student to Class</h3>
        Class:
        <div onClick={!this.state.classOptionsAddStudent.length && this.getSelectOptions.bind(this)}>
          <Select 
            multi={true}
            simpleValue
            value={this.state.selectedClassAddStudent}
            placeholder="Select your classes"
            options={this.state.classOptionsAddStudent}
            onChange={(selectedClass) => this.setState({ selectedClassAddStudent: selectedClass })}
          />
        </div><br/>
        Student:
        <div onClick={!this.state.studentOptionsAddStudent.length && this.getExistingUserList}>
          <VirtualizedSelect
            options={this.state.studentOptionsAddStudent ? this.state.studentOptionsAddStudent : [{ label: 'Error loading data..', value: '' }]}
            onChange={(selectedUser) => this.setState({ selectedStudentAddStudent: selectedUser })}
            value={this.state.selectedStudentAddStudent}
          />
        </div><br/>
        <form ref='uploadForm'
          id='uploadForm' 
          action='/studentUpload' 
          method='post' 
          encType="multipart/form-data">
          Enter Photo:<input type="file" name="sampleFile" onChange={this.previewFile} />
          <img src=""/>
        </form><br/>
        <button onClick={this.handleStudentAddSubmit}>Add Student</button>
        {!this.state.studentAdded ? null : <h6>Student Added Successfully!</h6>}<hr/>


        <h3>Delete Class</h3>
        Class:
        <div onClick={!this.state.classOptionsRemoveClass.length && this.getSelectOptions.bind(this)}>
          <Select 
            multi={true}
            simpleValue
            value={this.state.selectedClassRemoveClass}
            placeholder="Select your classes"
            options={this.state.classOptionsRemoveClass}
            onChange={(selectedClass) => this.setState({ selectedClassRemoveClass: selectedClass })}
          />
        </div><br/>
        <button onClick={this.handleClassRemoveSubmit.bind(this)}>Delete Class</button>
        {!this.state.classRemoved ? null : <h6>Class Deleted Successfully!</h6>}<hr/>

        <h3>Remove Student from Class</h3>
        Class:
        <div onClick={!this.state.classOptionsRemoveStudent.length && this.getSelectOptions.bind(this)}>
          <Select 
            multi={true}
            simpleValue
            value={this.state.selectedClassRemoveStudent}
            placeholder="Select your classes"
            options={this.state.classOptionsRemoveStudent}
            onChange={(selectedClass) => this.setState({ selectedClassRemoveStudent: selectedClass })}
          />
        </div><br/>
        Student:
        <div onClick={!this.state.studentOptionsRemoveStudent.length && this.getExistingUserList}>
          <VirtualizedSelect
            options={this.state.studentOptionsRemoveStudent ? this.state.studentOptionsRemoveStudent : [{ label: 'Error loading data..', value: '' }]}
            onChange={(selectedUser) => this.setState({ selectedStudentRemoveStudent: selectedUser })}
            value={this.state.selectedStudentRemoveStudent}
          />
        </div>
        <form ref='uploadForm'
          id='uploadForm'
          action='/studentUpload'
          method='post'
          encType="multipart/form-data">
        </form><br/>
        <button onClick={this.handleStudentRemoveSubmit.bind(this)}>Remove Student</button>
        {!this.state.studentRemoved ? null : <h6>Student Removed Successfully!</h6>}<hr/>

        <h3>Student Enrollments</h3>
        <BootstrapTable
          data = {this.state.enrollmentRecords}
          csvFileName = {'ClassEnrollment.csv'}
          maxHeight = '750px'
          scrollTop = {'Top'}
          multiColumnSort = {2}
          striped
          hover
          condensed
          exportCSV
        >
          <TableHeaderColumn
            isKey
            dataField = 'class'
            width = '50%'
            dataSort
            filterFormatted
            filter = {{
              type: 'SelectFilter',
              options: this.state.classOptionsEnrollment
            }}
          >
            Class
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField = 'student'
            width = '50%'
            dataSort
            sortFunc = {tableHelpers.nameSort}
            filterFormatted
            filter = {{
              type: 'TextFilter'
            }}
          >
            Student
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
