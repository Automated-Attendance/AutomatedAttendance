import React from 'react';

export default class RejectModal extends React.Component {
  render() {
    return (
      <div>
       <div className="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header navbar-default ">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h3 className="modal-title default word-color-delete-attendnace" id="myModalLabel">Delete Record</h3>
            </div>
            <div className="modal-body">
              <h4>Please select class </h4>
              <h4>This will delete the class and all associated enrollment!</h4>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
};