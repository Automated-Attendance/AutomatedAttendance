import React from 'react';

export default class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ['HRSF72','HRSF73','HRSF75','HRSF76']
    }
  }

  render() {
    return (
      <div>
        <h3>Add Student</h3>
        <input name="studentName" type="text" placeholder="Enter Name"></input>
        <select>
          {this.state.classes.map((item,index)=> {
            return (<option key={index} value={item}>{item}</option>)
          })}
        </select><br/>
        <input name="studentEmail" type="text" placeholder="Enter Email"></input><br/>
         <form ref='uploadForm' 
          id='uploadForm' 
          action='http://localhost:3000/studentUpload' 
          method='post' 
          encType="multipart/form-data">
          <input type="file" name="sampleFile" />
          <input type='submit' value='Upload!' />
        </form>     
      </div>
    );
  }
}
