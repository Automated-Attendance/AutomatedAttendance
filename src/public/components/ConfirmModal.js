import React from 'react';

export default class ConfirmModal extends React.Component {
  render() {
    return (
       <div className="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header navbar-default ">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h3 className="modal-title default word-color-delete-attendnace" id="myModalLabel">Delete Record</h3>
            </div>
            <div className="modal-body">
              <h4>Are you sure? </h4>
              <h4>This will delete the class and all associated enrollment!</h4>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
              <button type="button" className="btn btn-success"data-dismiss="modal" onClick={ ()=>{
                this.props.handleSubmit();
              }}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};