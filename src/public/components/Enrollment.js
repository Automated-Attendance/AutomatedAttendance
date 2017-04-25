import React from 'react';
import { storeStudentData, removeStudentData, getStudentsByClass, changeUserType } from '../requests/students';
import Spinner from './Spinner';
import { getClasses, addClasses, removeClasses, getEnrollment } from '../requests/classes';
import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import { getAllUsers } from '../requests/users';
import Select from 'react-select';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import tableHelpers from '../helpers/tableHelpers.js';
import AddClass from './AddClass';
import RemoveClass from './RemoveClass';
import AddStudent from './AddStudent';
import RemoveStudent from './RemoveStudent';
import ToggleStatus from './ToggleStatus';

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
        {label: 'Student', value: 'student'},
        {label: 'Admin', value: 'admin'}
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
      enrollmentRecords: [],
      imageSource: '',
      imageValue: '',
      imageHeight: ''
    };

    ['updateClassList',
    'handleInputChange',
    'handleSelectChange',
    'handleSelectChangeRemoveStudent',
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
    await this.getSelectOptions();
    await this.getExistingUserList();
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

  handleSelectChange(state, selection) {
    this.setState({ [state]: selection });
  }

  async handleSelectChangeRemoveStudent(state, selection) {
    await this.setState({ [state]: selection });
    this.getStudentsByClass();
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
      this.setState({
        imageSource: 'data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
        imageHeight: '0px',
        imageValue: ''
      });
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

  async handleClassAddSubmit() {
    if (this.state.createClassName) {
      let data = {className: this.state.createClassName};
      this.setState({spinner: true, classAdded: false});
      this.setState({classAdded: await addClasses(data)});
      this.setState({spinner: false});
      await this.updateClassList();
      await this.populateTable();
      this.toggleOff('classAdded', 'createClassName');
    } else {
      alert('Enter Class Name!');
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
    } else {
      alert('Select Class(es) and Student and Photo!');
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

        <AddClass
          classAdded={this.state.classAdded}
          className={this.state.createClassName}
          handleChange={this.handleInputChange}
          handleSubmit={this.handleClassAddSubmit}
        />
        <hr/>
        <AddStudent
          studentAdded={this.state.studentAdded}
          selectedClass={this.state.selectedClassAddStudent}
          selectedStudent={this.state.selectedStudentAddStudent}
          classOptions={this.state.classOptionsAddStudent}
          studentOptions={this.state.studentOptions}
          imageSource={this.state.imageSource}
          imageValue={this.state.imageValue}
          imageHeight={this.state.imageHeight}
          preview={this.previewFile}
          handleChange={this.handleSelectChange}
          handleSubmit={this.handleStudentAddSubmit}
        />
        <hr/>
        <RemoveClass
          classRemoved={this.state.classRemoved}
          selectedClass={this.state.selectedClassRemoveClass}
          classOptions={this.state.classOptionsRemoveClass}
          handleChange={this.handleSelectChange}
          handleSubmit={this.handleClassRemoveSubmit}
        />
        <hr/>
        <RemoveStudent
          studentRemoved={this.state.studentRemoved}
          selectedClass={this.state.selectedClassRemoveStudent}
          selectedStudent={this.state.selectedStudentRemoveStudent}
          classOptions={this.state.classOptionsRemoveStudent}
          studentOptions={this.state.studentOptionsByClass}
          handleClassChange={this.handleSelectChangeRemoveStudent}
          handleStudentChange={this.handleSelectChange}
          handleSubmit={this.handleStudentRemoveSubmit}
        />
        <hr/>
        <ToggleStatus
          statusToggled={this.state.studentStatusToggled}
          selectedUser={this.state.selectedStudentToggleStatus}
          selectedStatus={this.state.selectedToggleStatus}
          studentOptions={this.state.studentOptions}
          statusOptions={this.state.toggleStatusOptions}
          handleChange={this.handleSelectChange}
          handleSubmit={this.handleToggleStatusSubmit}
        />
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
