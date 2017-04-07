'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam';
import keydown, { Keys } from 'react-keydown';
import autoBind from 'react-autobind';


export default class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fakeData : [{
        id:1,
        name: "han",
        date: "4/1",
        status: "Ontime"
      },{
        id:2,
        name: "han",
        date: "4/2",
        status: "Ontime"
      },{
        id:3,
        name: "han",
        date: "4/3",
        status: "Ontime"
      },{
        id:4,
        name: "han",
        date: "4/4",
        status: "Ontime"
      },{
        id:5,
        name: "han",
        date: "4/5",
        status: "Ontime"
      }]
    };
    autoBind(this);
  }

  componentDidMount () {

    // make a post request about specific user

  }
  mapFakeData() {

    const data = this.state.fakeData;
    const nameList = data.map(name => {
      return (
        <tr key={name.id}>
          <td>{name.name}</td>
          <td>{name.date}</td>
          <td>{name.status}</td>
        </tr>
      )
    });

    return nameList;

  }

  render() {

    return (
      <div >
        <table className="table table-bordered table-reponsive">

          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {this.mapFakeData()}
          </tbody>

        </table>
      </div>
    )
  }
}