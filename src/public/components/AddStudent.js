import React from 'react';
import { storeStudentData } from './requests/students';
import Spinner from './Spinner';
import { getClasses, addClasses } from './requests/classes';

export default class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: '',
      studentName: '',
      studentEmail: '',
      selectedClass: '',
      studentPhoto: '',
      className: '',
      success: false,
      classAdded: false,
      spinner: false
    },

    ['handleInputChange',
    'handleStudentSubmit',
    'handleClassSubmit',
    'previewFile',
    'updateClassList'].forEach((method) => {
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
      studentName: this.state.studentName,
      studentEmail: this.state.studentEmail,
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
      this.setState({
        studentPhoto: reader.result
      })
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }


  render() {
    return (
      <div>
        <h3>Add Student</h3>

        {this.state.spinner && <Spinner/>}

        <input name="studentName" type="text" placeholder="Enter Name" onChange={this.handleInputChange}></input>
        <select name='selectedClass' onChange={this.handleInputChange}>
          {this.state.classes && this.state.classes.map((item,index) => {
            return (<option key={index} value={item}>{item}</option>)
          })}
        </select><br/>
        <input name="studentEmail" type="text" placeholder="Enter Email" onChange={this.handleInputChange}></input><br/>
         <form ref='uploadForm' 
          id='uploadForm' 
          action='http://localhost:3000/studentUpload' 
          method='post' 
          encType="multipart/form-data">
          <input type="file" name="sampleFile" onChange={this.previewFile} />
          <img src=""/>
        </form>
        <button onClick={this.handleStudentSubmit}>Upload!</button>
        {!this.state.success ? null : <h6>Image Upload Successful!</h6>}
        <h3>Add Class</h3> 
        <input name="className" type="text" placeholder="Enter Class Name" onChange={this.handleInputChange}></input>
        <button onClick={this.handleClassSubmit}>Add Class!</button>
        {!this.state.classAdded ? null: <h6>Class Added Successfully!</h6>}
      </div>
    );
  }
}
