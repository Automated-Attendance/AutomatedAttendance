import React from 'react';
import autoBind from 'react-autobind';

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ['HRSF72','HRSF73','HRSF75','HRSF76'],
      students: {
        'HRSF72': ['Duy', 'Jason', 'Andrew','Han'],
        'HRSF73': ['Sam', 'Aly' , 'James','Kay'],
        'HRSF75': ['Kevin', 'John', 'Greg','Mario'],
        'HRSF76': ['Alice', 'Jenny', 'Andy','Terry']
      },
      selectedClass: ''
    }
    autoBind(this);
  }

  componentWillMount() {
    this.state.selectedClass = this.state.classes[0]
  }

  handleClassChange(chosenClass) {
    this.setState({
      selectedClass: chosenClass
    })
    console.log(chosenClass);
    console.log("I'm being clicked!");
  }


  render() {
    return (
      <div>
        <h3>Classes</h3>
        <ul>
          {this.state.classes.map((classes,index) => {
            return (<li key={index} onClick={()=> {this.handleClassChange(classes)}}>{classes}</li>)
          })}
        </ul>
        <h3>{this.state.selectedClass} students</h3>
        <ul>
          {this.state.students[this.state.selectedClass].map((student,index) => {
            return (<li key={index}>{student}</li>)
          })}
        </ul>
      </div>
    );
  }
}
