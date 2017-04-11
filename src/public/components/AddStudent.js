import React from 'react';
import { storeStudentData } from './requests/students';

export default class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ['HRSF72','HRSF73','HRSF75','HRSF76'],
      studentName: '',
      studentEmail: '',
      selectedClass: '',
      studentPhoto: '',
      success: false
    },

    ['handleInputChange', 'handleStudentSubmit','previewFile'].forEach((method) => {
      this[method] = this[method].bind(this);
    })
  }

  componentWillMount() {
    this.setState({
      selectedClass: this.state.classes[0]
    })
  }

  handleInputChange(event) {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value
    })
  }

  async handleStudentSubmit(event) {
    let data = {
      studentName: this.state.studentName,
      studentEmail: this.state.studentEmail,
      selectedClass: this.state.selectedClass,
      studentPhoto: this.state.studentPhoto
    }

    this.setState({ success: await storeStudentData(data) });
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
        <input name="studentName" type="text" placeholder="Enter Name" onChange={this.handleInputChange}></input>
        <select name='selectedClass' onChange={this.handleInputChange}>
          {this.state.classes.map((item,index)=> {
            return (<option key={index} value={item}>{item}</option>)
          })}
        </select><br/>
        <input name="studentEmail" type="text" placeholder="Enter Email" onChange={this.handleInputChange}></input><br/>
         <form ref='uploadForm' 
          id='uploadForm' 
          action='http://localhost:3000/studentUpload' 
          method='post' 
          encType="multipart/form-data">
          <input type="file" name="sampleFile" onChange={this.previewFile}/>
          <img src=""/>
        </form>
        <button onClick={this.handleStudentSubmit}>Upload!</button>
        {!this.state.success ? null : <h6>Image Upload Successful!</h6>}
        <h3>Add Class</h3>  
      </div>
    );
  }
}
