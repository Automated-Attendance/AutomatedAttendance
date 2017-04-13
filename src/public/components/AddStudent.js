import React from 'react';
import { storeStudentData } from './requests/students';
import Spinner from './Spinner';
import { getClasses, addClasses } from './requests/classes';
import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import { getAllUsers } from './requests/users';

export default class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: '',
      selectedClass: '',
      studentPhoto: '',
      className: '',
      success: false,
      classAdded: false,
      spinner: false,
      selectedUser: null,
      options: []
    },

    ['handleInputChange',
    'handleStudentSubmit',
    'handleClassSubmit',
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
    this.setState({ selectedClass: this.state.classes[0] });
  }

  handleInputChange(event) {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  async handleStudentSubmit(event) {
    let data = {
      studentUserName: this.state.selectedUser.value,
      selectedClass: this.state.selectedClass,
      studentPhoto: this.state.studentPhoto
    }
    this.setState({ spinner: true, success: false });
    this.setState({ success: await storeStudentData(data) });
    this.setState({ spinner: false });
  }

  async handleClassSubmit(event) {
    let data = { className: this.state.className };
    this.setState({ spinner: true, classAdded: false });
    await addClasses(data);
    this.setState({ spinner: false, classAdded: true });
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
        <h3>Add Student</h3>

        {this.state.spinner && <Spinner/>}

        Class: <select name='selectedClass' onChange={this.handleInputChange}>
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
        <button onClick={this.handleStudentSubmit}>Add Student</button>
        {!this.state.success ? null : <h6>Student Added Successfully!</h6>}
        <h3>Add Class</h3> 
        <input name="className" type="text" placeholder="Enter Class Name" onChange={this.handleInputChange}></input><br/>
        <button onClick={this.handleClassSubmit}>Add Class</button>
        {!this.state.classAdded ? null : <h6>Class Added Successfully!</h6>}
      </div>
    );
  }
}



        // <input name="studentName" type="text" placeholder="Enter Name" onChange={this.handleInputChange}></input><br/>
        // <input name="studentEmail" type="text" placeholder="Enter Email" onChange={this.handleInputChange}></input><br/>