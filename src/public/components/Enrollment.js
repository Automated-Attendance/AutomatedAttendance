import React from 'react';
import Spinner from './Spinner';
import { getAllUsers } from '../actions/UserActions';
import {storeStudentData, removeStudentData, getStudentsByClass, changeUserType} from '../requests/students';
import {getClasses, addClasses, removeClasses, getEnrollment} from '../requests/classes';
import AddClass from './AddClass';
import AddStudent from './AddStudent';
import RemoveClass from './RemoveClass';
import RemoveStudent from './RemoveStudent';
import ToggleStatus from './ToggleStatus';
import EnrollmentTable from './tables/EnrollmentTable';
import { connect } from 'react-redux';

class Enrollment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClassAddStudent: '',
      selectedClassRemoveStudent: null,
      selectedClassRemoveClass: '',
      selectedStudentAddStudent: '',
      selectedStudentRemoveStudent: '',
      selectedStudentToggleStatus: '',
      selectedStatus:'',
      createClassName: '',
      studentPhoto: '',
      classAdded: false,
      classRemoved: false,
      studentAdded: false,
      studentRemoved: false,
      statusToggled: false,
      spinner: false,
      popUpMessage: true,
      classOptions: [],
      classOptionsEnrollment: {},
      studentOptions: [],
      studentOptionsByClass: [],
      statusOptions:[
        {label: 'Student', value: 'student'},
        {label: 'Admin', value: 'admin'}
      ],
      enrollmentRecords: [],
      imageSource: '',
      imageValue: '',
      imageHeight: ''
    };

    ['populateTable',
    'getClassOptions',
    'getStudentsByClass',
    'handleInputChange',
    'handleChangeSelect',
    'handleChangeSelectRemoveStudent',
    'handleSubmitAddClass',
    'handleSubmitAddStudent',
    'handleSubmitRemoveClass',
    'handleSubmitRemoveStudent',
    'handleSubmitToggleStatus',
    'previewFile',
    'toggleOff',
    'clearDOMRefs'].forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  async componentWillMount() {
    await this.getClassOptions();
    this.props.getAllUsers();
    await this.populateTable();
  }

  async populateTable() {
    const enrollmentRecords = await getEnrollment();
    /* istanbul ignore else */
    if (enrollmentRecords) {
      enrollmentRecords.enrollment.forEach(item => {
        /* istanbul ignore else */
        if (!this.state.classOptionsEnrollment[item.class]) {
          const thisClass = this.state.classOptionsEnrollment;
          thisClass[item.class] = item.class;
          this.setState({classOptionsEnrollment: thisClass});
        }
      });
      this.setState({enrollmentRecords: enrollmentRecords.enrollment});
    }
  }

  async getClassOptions() {
    const classList = await getClasses();
    const classes = classList.classes.map(classname => {
      return {label: classname, value: classname};
    });
    this.setState({classOptions: classes});
  }

  async getStudentsByClass() {
    if (this.state.selectedClassRemoveStudent) {
      const students = await getStudentsByClass(this.state.selectedClassRemoveStudent);
      this.setState({studentOptionsByClass: students});
    } else {
      this.setState({studentOptionsByClass: this.props.studentOptions});
    }
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleChangeSelect(state, selection) {
    this.setState({[state]: selection});
  }

  async handleChangeSelectRemoveStudent(state, selection) {
    await this.setState({[state]: selection});
    this.getStudentsByClass();
  }

  async handleSubmitAddClass() {
    if (this.state.createClassName) {
      let data = {className: this.state.createClassName};
      this.setState({spinner: true, classAdded: false});
      this.setState({classAdded: await addClasses(data)});
      this.setState({spinner: false});
      await this.getClassOptions();
      this.toggleOff('classAdded', 'createClassName');
    } else {
      alert('Enter Class Name!');
    }
  }

  async handleSubmitAddStudent() {
    if (this.state.selectedClassAddStudent && this.state.selectedStudentAddStudent && this.state.studentPhoto) {
      let data = {
        selectedClass: this.state.selectedClassAddStudent,
        studentUserName: this.state.selectedStudentAddStudent.value,
        studentPhoto: this.state.studentPhoto
      };
      this.setState({spinner: true, studentAdded: false});
      this.setState({studentAdded: await storeStudentData(data)});
      this.setState({spinner: false});
      await this.populateTable();
      await this.getClassOptions();
      this.toggleOff('studentAdded', 'selectedStudentAddStudent', 'selectedClassAddStudent', 'studentPhoto');
      this.clearDOMRefs();
    } else {
      alert('Select Class(es) and Student and Photo!');
    }
  }

  async handleSubmitRemoveClass() {
    if (this.state.selectedClassRemoveClass) {
      let data = {className: this.state.selectedClassRemoveClass};
      this.setState({spinner: true, classRemoved: false});
      this.setState({classRemoved: await removeClasses(data)});
      this.setState({spinner: false});
      await this.populateTable();
      await this.getClassOptions();
      this.toggleOff('classRemoved', 'selectedClassRemoveClass');
    } else {
      alert('Select Class(es)');
    }
  }

  async handleSubmitRemoveStudent() {
    if (this.state.selectedClassRemoveStudent && this.state.selectedStudentRemoveStudent) {
      let data = {
        className: this.state.selectedClassRemoveStudent,
        studentUserName: this.state.selectedStudentRemoveStudent
      };
      this.setState({spinner: true, studentRemoved: false});
      this.setState({studentRemoved: await removeStudentData(data)});
      this.setState({spinner: false});
      await this.populateTable();
      await this.getClassOptions();
      this.toggleOff('studentRemoved', 'selectedStudentRemoveStudent', 'selectedClassRemoveStudent');
    } else {
      alert('Select Class(es) and Student!');
    }
  }

  async handleSubmitToggleStatus () {
    if (this.state.selectedStudentToggleStatus && this.state.selectedStatus) {
      let data = {
        selectedStatus: this.state.selectedStatus,
        studentUserName: this.state.selectedStudentToggleStatus
      };
      this.setState({spinner: true, statusToggled: false});
      this.setState({statusToggled: await changeUserType(data)});
      this.setState({spinner: false});
      this.toggleOff('statusToggled','selectedStudentToggleStatus', 'selectedStatus');
    } else {
      alert('Select Student and Status');
    }
  }

  previewFile() {
    let preview = document.querySelector('.file-preview');
    let [file] = document.querySelector('input[type=file]').files;
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      preview.src = reader.result;
      preview.height = '200';
      this.setState({studentPhoto: reader.result});
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  toggleOff(status, ...states) {
    setTimeout(() => {
      /* istanbul ignore else */
      if (status) {
        this.setState({[status]: false});
      }
      this.setState({[status]: false});
      states.forEach(state => {
        if (typeof this.state[state] === 'boolean') {
          this.setState({[state]: false});
        } else if (Array.isArray(this.state[state])) {
          this.setState({[state]: []});
        } else {
          this.setState({[state]: ''});
        }
      });
    }, 5000);
  }

  clearDOMRefs() {
    setTimeout(() => {
      this.setState({
        imageSource: 'data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
        imageHeight: '0px',
      });
      this.refs.addStudent.refs.preview.value = '';
    }, 4950);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-offset-2 col-md-8 card">
            <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Create Class</a></li>
              <li role="presentation"> <a href="#removeclass" aria-controls="removeclass" role="tab" data-toggle="tab">Remove Class</a></li>
              <li role="presentation"> <a href="#addstudent" aria-controls="addstudent" role="tab" data-toggle="tab">Add Student</a></li>
              <li role="presentation"> <a href="#removestudent" aria-controls="removestudent" role="tab" data-toggle="tab">Remove Student</a></li>
              <li role="presentation"> <a href="#togglestatus" aria-controls="togglestatus" role="tab" data-toggle="tab">Change Status</a></li>
            </ul> 
            {this.state.spinner && <Spinner/>}
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active enrollment-form" id="home">
                <AddClass
                  classAdded={this.state.classAdded}
                  createClassName={this.state.createClassName}
                  handleChange={this.handleInputChange}
                  handleSubmit={this.handleSubmitAddClass}
                />
              </div>
              <div role="tabpanel" className="tab-pane enrollment-form" id="addstudent">
                <AddStudent
                  ref="addStudent"
                  studentAdded={this.state.studentAdded}
                  selectedClass={this.state.selectedClassAddStudent}
                  selectedStudent={this.state.selectedStudentAddStudent}
                  classOptions={this.state.classOptions}
                  studentOptions={this.props.studentOptions}
                  imageSource={this.state.imageSource}
                  imageValue={this.state.imageValue}
                  imageHeight={this.state.imageHeight}
                  preview={this.previewFile}
                  handleChange={this.handleChangeSelect}
                  handleSubmit={this.handleSubmitAddStudent}
                />
              </div>
              <div role="tabpanel" className="tab-pane enrollment-form" id="removeclass">
                <RemoveClass
                  classRemoved={this.state.classRemoved}
                  selectedClass={this.state.selectedClassRemoveClass}
                  classOptions={this.state.classOptions}
                  handleChange={this.handleChangeSelect}
                  handleSubmit={this.handleSubmitRemoveClass}
                />
              </div>
              <div role="tabpanel" className="tab-pane enrollment-form" id="removestudent">
                <RemoveStudent
                  studentRemoved={this.state.studentRemoved}
                  selectedClass={this.state.selectedClassRemoveStudent}
                  selectedStudent={this.state.selectedStudentRemoveStudent}
                  classOptions={this.state.classOptions}
                  studentOptions={this.state.studentOptionsByClass}
                  handleClassChange={this.handleChangeSelectRemoveStudent}
                  handleStudentChange={this.handleChangeSelect}
                  handleSubmit={this.handleSubmitRemoveStudent}
                />
              </div>
              <div role="tabpanel" className="tab-pane enrollment-form" id="togglestatus">
                <ToggleStatus
                  statusToggled={this.state.statusToggled}
                  selectedUser={this.state.selectedStudentToggleStatus}
                  selectedStatus={this.state.selectedStatus}
                  studentOptions={this.props.studentOptions}
                  statusOptions={this.state.statusOptions}
                  handleChange={this.handleChangeSelect}
                  handleSubmit={this.handleSubmitToggleStatus}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-offset-2 col-md-8">
          <EnrollmentTable
            classOptions={this.state.classOptionsEnrollment}
            enrollments={this.state.enrollmentRecords}
          />
        </div>      
      </div>
    );
  }
};

function mapStateToProps({ userStatus }) {
  return {
    studentOptions: userStatus.studentOptions
  };
}

export default connect(mapStateToProps, { getAllUsers })(Enrollment)