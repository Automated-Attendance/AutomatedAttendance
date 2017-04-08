'use strict';

import React from 'react';
import autoBind from 'react-autobind';
import { post, get } from './AxiosRoutes.js';


export default class Student extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fakeData: []
    };
    
    autoBind(this);
  }

  componentDidMount () {
    post('studentInformation', {name: 'Han'})
      .then( (response) => {
        this.setState({fakeData: response.data})
      })
      .catch( (err) => {
        console.log(err);
      });

    // make a post request about specific user
  }
  
  mapFakeData() {
    const data = this.state.fakeData;
    const nameList = data.map( name => {
      return (
        <tr key={name.id}>
          <td>{name.name}</td>
          <td>{name.date}</td>
          <td>{name.status}</td>
      
        </tr>
      );
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
    );
  }
}
