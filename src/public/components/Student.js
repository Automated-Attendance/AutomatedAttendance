'use strict';

import React from 'react';
import { post, get } from './AxiosRoutes.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';



export default class Student extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount () {
    try {
      const { data } = await post('studentInformation', {email: this.props.email})
      this.setState({data: data});
    } catch (err) {
      console.warn(err);
    }
  }
  

  render() {
    return (
      <div>
        <BootstrapTable data={this.state.data} height='250px' scrollTop={'Top'} striped hover condensed>
          <TableHeaderColumn dataField='class_name' isKey filter={{type: 'TextFilter'}} dataSort={true}>Class</TableHeaderColumn>
          <TableHeaderColumn dataField='date' filter={{type: 'TextFilter'}} dataSort={true}>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='status' filter={{type: 'TextFilter'}} dataSort={true}>Status</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
