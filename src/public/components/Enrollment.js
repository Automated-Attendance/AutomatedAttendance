import React from 'react';
import { storeStudentData, removeStudentData, getStudentsByClass, changeUserType } from './requests/students';
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
      selectedClassRemoveStudent: null,
      selectedClassRemoveClass: '',
      selectedStudentAddStudent: '',
      selectedStudentRemoveStudent: '',
      selectedStudentToggleStatus: '',
      toggleStatusOptions:[
        {label: 'Student', value: 'Student'},
        {label: 'Admin', value: 'Admin'}
      ],
      selectedToggleStatus:'',
      studentPhoto: '',
      createClassName: '',
      studentAdded: false,
      studentRemoved: false,
      studentStatusToggled: false,
      classAdded: false,
      classRemoved: false,
      spinner: false,
      studentOptions: [],
      studentOptionsByClass: [],
      classOptionsAddStudent: [],
      classOptionsRemoveStudent: [],
      classOptionsRemoveClass: [],
      classOptionsEnrollment: {},
      enrollmentRecords: []
    };

    ['updateClassList',
    'handleInputChange',
    'toggleOff',
    'handleStudentAddSubmit',
    'handleClassAddSubmit',
    'handleStudentRemoveSubmit',
    'handleClassRemoveSubmit',
    'handleToggleStatusSubmit',
    'previewFile',
    'getExistingUserList',
    'getSelectOptions',
    'getStudentsByClass',
    'clearDOMrefs'].forEach(method => {
      this[method] = this[method].bind(this);
    })
  }

  async componentWillMount() {
    await this.updateClassList();
    await this.getExistingUserList();
    await this.getStudentsByClass();
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
  }

  handleInputChange(event) {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  toggleOff(status, ...states) {
    setTimeout(() => {
      if (status) {
        this.setState({ [status]: false })
      }
      this.setState({ [status]: false });
      states.forEach((state) => {
        if (typeof this.state[state] === 'boolean') {
          this.setState({ [state]: false});
        } else if (Array.isArray(this.state[state])) {
          this.setState({ [state]: [] })
        } else {
          this.setState({ [state]: '' })
        }
      });
    }, 5000);
  }

  clearDOMrefs() {
    setTimeout(() => {
      this.refs.imageUpload.src = 'data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==';
      this.refs.imageUpload.height='0px';
      this.refs.preview.value=''
    }, 4950);
  }

  async handleToggleStatusSubmit () {
    if (this.state.selectedStudentToggleStatus && this.state.selectedToggleStatus) {
      let data = {
        selectedToggleStatus: this.state.selectedToggleStatus,
        studentUserName: this.state.selectedStudentToggleStatus
      };
      this.setState({ spinner: true, studentStatusToggled: false });
      this.setState({ studentStatusToggled: await changeUserType(data) });
      this.setState({ spinner: false });
      this.toggleOff('studentStatusToggled','selectedStudentToggleStatus', 'selectedToggleStatus');
    } else {
      alert('Select Student and Status');
    }
  }

  async handleStudentAddSubmit() {
    if (this.state.selectedClassAddStudent && this.state.selectedStudentAddStudent && this.state.studentPhoto) {
      let data = {
        selectedClass: this.state.selectedClassAddStudent,
        studentUserName: this.state.selectedStudentAddStudent.value,
        studentPhoto: this.state.studentPhoto
      };
      this.setState({ spinner: true, studentAdded: false });
      this.setState({ studentAdded: await storeStudentData(data) });
      this.setState({ spinner: false });
      await this.populateTable();
      this.toggleOff('studentAdded', 'selectedStudentAddStudent', 'selectedClassAddStudent', 'studentPhoto');
      this.clearDOMrefs();
   ;
    } else {
      alert('Select Class(es) and Student and Photo!');
    }
  }

  async handleClassAddSubmit() {
    if (this.state.createClassName) {
      let data = { className: this.state.createClassName };
      this.setState({ spinner: true, classAdded: false });
      this.setState({ classAdded: await addClasses(data) });
      this.setState({ spinner: false });
      await this.updateClassList();
      await this.populateTable();
      this.toggleOff('classAdded', 'createClassName');
    } else {
      alert('Enter Class Name!');
    }
  }

  async handleStudentRemoveSubmit() {
    if (this.state.selectedClassRemoveStudent && this.state.selectedStudentRemoveStudent) {
      let data = {
        className: this.state.selectedClassRemoveStudent,
        studentUserName: this.state.selectedStudentRemoveStudent
      };
      this.setState({ spinner: true, studentRemoved: false });
      this.setState({ studentRemoved: await removeStudentData(data) });
      this.setState({ spinner: false });
      await this.populateTable();
      this.toggleOff('studentRemoved', 'selectedStudentRemoveStudent', 'selectedClassRemoveStudent');
    } else {
      alert('Select Class(es) and Student!');
    }
  }

  async handleClassRemoveSubmit() {
    if (this.state.selectedClassRemoveClass) {
      let data = { className: this.state.selectedClassRemoveClass };
      this.setState({ spinner: true, classRemoved: false });
      this.setState({ classRemoved: await removeClasses(data) });
      this.setState({ spinner: false });
      await this.updateClassList();
      await this.populateTable();
      this.toggleOff('classRemoved', 'selectedClassRemoveClass');
    } else {
      alert('Select Class(es)!');
    }
  }

  previewFile() {
    let preview = document.querySelector('.file-preview');
    let [file] = document.querySelector('input[type=file]').files;
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
    this.setState({ studentOptions: users });
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

  async getStudentsByClass() {
    if (this.state.selectedClassRemoveStudent) {
      const students = await getStudentsByClass(this.state.selectedClassRemoveStudent);
      this.setState({ studentOptionsByClass: students });
    } else {
      this.setState({ studentOptionsByClass: this.state.studentOptions});
    }
  }

  render() {
    return (
      <div>
        {this.state.spinner && <Spinner/>}

        <h3>Create Class</h3>
        <input
          name="createClassName"
          type="text"
          placeholder="Enter Class Name"
          value={this.state.createClassName}
          onChange={this.handleInputChange}
        /><br/><br/>
        <button onClick={this.handleClassAddSubmit}>Create Class</button>
        {!this.state.classAdded ? null : <h5>{this.state.createClassName} created!</h5>}<hr/>

        <h3>Add Student to Class</h3>
        Class:
        <div onClick={this.getSelectOptions}>
          <Select 
            multi={true}
            simpleValue
            value={this.state.selectedClassAddStudent}
            placeholder="Select Class(es)..."
            options={this.state.classOptionsAddStudent}
            onChange={(selectedClass) => this.setState({ selectedClassAddStudent: selectedClass })}
          />
        </div><br/>
        Student:
        <div onClick={!this.state.studentOptions.length && this.getExistingUserList}>
          <VirtualizedSelect
            options={this.state.studentOptions ? this.state.studentOptions : [{ label: 'Error loading data..', value: '' }]}
            onChange={(selectedUser) => this.setState({ selectedStudentAddStudent: selectedUser })}
            value={this.state.selectedStudentAddStudent}
            placeholder="Select Student..."
          />
        </div><br/>
        <form ref='uploadForm'
          id='uploadForm' 
          action='/studentUpload' 
          method='post' 
          encType="multipart/form-data">
          Enter Photo:
          <input
            type="file"
            name="sampleFile"
            onChange={this.previewFile}
            ref="preview"
          />
          <img ref="imageUpload" className="file-preview" src=""/>
        </form><br/>
        <button onClick={this.handleStudentAddSubmit}>Add Student</button>
        {!this.state.studentAdded ? null : <h5>{this.state.selectedStudentAddStudent.label.slice(0, this.state.selectedStudentAddStudent.label.indexOf('-') - 1)} added to {this.state.selectedClassAddStudent}!</h5>}<hr/>


        <h3>Delete Class</h3>
        Class:
        <div onClick={this.getSelectOptions}>
          <Select 
            multi={true}
            simpleValue
            value={this.state.selectedClassRemoveClass}
            placeholder="Select Class(es)..."
            options={this.state.classOptionsRemoveClass}
            onChange={(selectedClass) => this.setState({ selectedClassRemoveClass: selectedClass })}
          />
        </div><br/>
        <button onClick={this.handleClassRemoveSubmit}>Delete Class</button>
        {!this.state.classRemoved ? null : <h5>{this.state.selectedClassRemoveClass} deleted!</h5>}<hr/>

        <h3>Remove Student from Class</h3>
        Class:
        <div onClick={this.getSelectOptions}>
          <Select
            simpleValue
            value={this.state.selectedClassRemoveStudent}
            placeholder="Select Class(es)..."
            options={this.state.classOptionsRemoveStudent}
            onChange={async (selectedClass) => {
              await this.setState({ selectedClassRemoveStudent: selectedClass });
              this.getStudentsByClass();
            }}
          />
        </div><br/>
        Student:
        <div onClick={!this.state.studentOptionsByClass.length && this.getExistingUserList}>
          <VirtualizedSelect
            options={this.state.studentOptionsByClass ? this.state.studentOptionsByClass : [{ label: 'Error loading data..', value: '' }]}
            onChange={(selectedUser) => this.setState({ selectedStudentRemoveStudent: selectedUser })}
            value={this.state.selectedStudentRemoveStudent}
            placeholder="Select Student..."
          />
        </div><br/>
        <button onClick={this.handleStudentRemoveSubmit}>Remove Student</button>
        {!this.state.studentRemoved ? null : <h5>{this.state.selectedStudentRemoveStudent.label.slice(0, this.state.selectedStudentRemoveStudent.label.indexOf('-') - 1)} removed from {this.state.selectedClassRemoveStudent}!</h5>}<hr/>

        <h3>Change Access Status</h3>
        Student:
         <div onClick={!this.state.studentOptions.length && this.getExistingUserList}>
          <VirtualizedSelect
            options={this.state.studentOptions ? this.state.studentOptions : [{ label: 'Error loading data..', value: '' }]}
            onChange={(selectedUser) => this.setState({ selectedStudentToggleStatus: selectedUser })}
            value={this.state.selectedStudentToggleStatus}
            placeholder="Select Student..."
          />
        </div><br/>
        Access status:
        <div onClick={!this.state.studentOptions.length && this.getExistingUserList}>
          <VirtualizedSelect
            options={this.state.toggleStatusOptions ? this.state.toggleStatusOptions : [{ label: 'Error loading data..', value: '' }]}
            onChange={(selectedStatus) => this.setState({ selectedToggleStatus: selectedStatus.value })}
            value={this.state.selectedToggleStatus}
            placeholder="Select Status..."
          />
        </div><br/>
        <button onClick={this.handleToggleStatusSubmit}>Change Status</button>
       {!this.state.studentStatusToggled ? null : <h5>{this.state.selectedStudentToggleStatus.label.slice(0, this.state.selectedStudentToggleStatus.label.indexOf('-') - 1)} changed to {this.state.selectedToggleStatus}!</h5>}
        <hr/>


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
