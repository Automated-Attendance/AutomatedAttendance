import React from 'react';
import { storeStudentData, removeStudentData } from './requests/students';
import Spinner from './Spinner';
import { getClasses, addClasses, removeClasses } from './requests/classes';
import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import { getAllUsers } from './requests/users';

export default class Enrollment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: '',
      selectedClassAddStudent: '',
      selectedClassRemoveStudent: '',
      selectedClassRemoveClass: '',
      studentPhoto: '',
      className: '',
      studentAdded: false,
      studentRemoved: false,
      classAdded: false,
      classRemoved: false,
      spinner: false,
      selectedUser: null,
      options: []
    },

    ['handleInputChange',
    'handleStudentAddSubmit',
    'handleClassAddSubmit',
    'previewFile',
    'updateClassList',
    'getExistingUserList'].forEach((method) => {
      this[method] = this[method].bind(this);
    })
  }

  async componentWillMount() {
    await this.updateClassList();
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

  async handleStudentAddSubmit(event) {
    let data = {
      studentUserName: this.state.selectedUser.value,
      selectedClass: this.state.selectedClassAddStudent,
      studentPhoto: this.state.studentPhoto
    };
    this.setState({ spinner: true, studentAdded: false });
    this.setState({ studentAdded: await storeStudentData(data) });
    this.setState({ spinner: false });
  }

  async handleClassAddSubmit(event) {
    let data = { className: this.state.className };
    this.setState({ spinner: true, classAdded: false });
    await addClasses(data);
    this.setState({ spinner: false, classAdded: true });
    await this.updateClassList();
  }

  async handleStudentRemoveSubmit(event) {
    let data = {
      studentUserName: this.state.selectedUser.value,
      className: this.state.selectedClassRemoveStudent,
    };
    this.setState({ spinner: true, studentRemoved: false });
    this.setState({ studentRemoved: await removeStudentData(data) });
    this.setState({ spinner: false });
  }

  async handleClassRemoveSubmit(event) {
    console.log('removing class');
    console.log(this);
    let data = { className: this.state.selectedClassRemoveClass };
    this.setState({ spinner: true, classRemoved: false });
    await removeClasses(data);
    this.setState({ spinner: false, classRemoved: true });
    await this.updateClassList();
  }

  previewFile() {
    let preview = document.querySelector('img');
    let file    = document.querySelector('input[type=file]').files[0];
    let reader  = new FileReader();

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
    this.setState({ options: users });
  }

  render() {
    return (
      <div>
        {this.state.spinner && <Spinner/>}

        <h3>Create Class</h3>
        <input name="className" type="text" placeholder="Enter Class Name" onChange={this.handleInputChange}></input><br/>
        <button onClick={this.handleClassAddSubmit}>Create Class</button>
        {!this.state.classAdded ? null : <h6>Class Added Successfully!</h6>}

        <h3>Add Student to Class</h3>
        Class: <select name='selectedClassAddStudent' onChange={this.handleInputChange}>
          {this.state.classes && this.state.classes.map((item,index) => {
            return (<option key={index} value={item}>{item}</option>)
          })}
        </select><br/>
        <div onClick={!this.state.options.length && this.getExistingUserList}>
          <VirtualizedSelect
            options={this.state.options ? this.state.options : [{ label: 'Error loading data..', value: '' }]}
            onChange={(selectedUser) => this.setState({ selectedUser })}
            value={this.state.selectedUser}
          />
        </div>
        <form ref='uploadForm'
          id='uploadForm' 
          action='/studentUpload' 
          method='post' 
          encType="multipart/form-data">
          Enter Photo:<input type="file" name="sampleFile" onChange={this.previewFile} />
          <img src=""/>
        </form>
        <button onClick={this.handleStudentAddSubmit}>Add Student</button>
        {!this.state.studentAdded ? null : <h6>Student Added Successfully!</h6>}

        <h3>Delete Class</h3>
        Class: <select name='selectedClassRemoveClass' onChange={this.handleInputChange}>
          {this.state.classes && this.state.classes.map((item,index) => {
            return (<option key={index} value={item}>{item}</option>)
          })}
        </select><br/>
        <button onClick={this.handleClassRemoveSubmit.bind(this)}>Delete Class</button>
        {!this.state.classRemoved ? null : <h6>Class Deleted Successfully!</h6>}

        <h3>Remove Student from Class</h3>
        Class: <select name='selectedClassRemoveStudent' onChange={this.handleInputChange}>
          {this.state.classes && this.state.classes.map((item,index) => {
            return (<option key={index} value={item}>{item}</option>)
          })}
        </select><br/>
        <div onClick={!this.state.options.length && this.getExistingUserList}>
          <VirtualizedSelect
            options={this.state.options ? this.state.options : [{ label: 'Error loading data..', value: '' }]}
            onChange={(selectedUser) => this.setState({ selectedUser })}
            value={this.state.selectedUser}
          />
        </div>
        <form ref='uploadForm'
          id='uploadForm'
          action='/studentUpload'
          method='post'
          encType="multipart/form-data">
        </form>
        <button onClick={this.handleStudentRemoveSubmit.bind(this)}>Remove Student</button>
        {!this.state.studentRemoved ? null : <h6>Student Removed Successfully!</h6>}
      </div>
    );
  }
}



        // <input name="studentName" type="text" placeholder="Enter Name" onChange={this.handleInputChange}></input><br/>
        // <input name="studentEmail" type="text" placeholder="Enter Email" onChange={this.handleInputChange}></input><br/>