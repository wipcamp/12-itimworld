import React, { Component } from 'react'

export default class Modal extends Component {
  state = {
    something: null,
    newUser: []
  }

  componentDidUpdate(prevProps){
    console.log(this.state.newUser)
    if(this.props.newUser !== prevProps.newUser){
      const dataEntries = Object.entries(this.props.newUser)
      // for (const [dataArray, dataFromEntity] of dataEntries) {
      //   // console.log(dataArray + dataFromEntity)
      //   if (dataArray === "parentRelation" || dataArray === "parentTel" || dataArray === "district" || dataArray === "province"){
      //     this.setState((state) => ({
      //       newUser:[
      //         ...state.newUser,
      //         dataArray + dataFromEntity
      //       ]
      //     }))
      //   }
      //   else if(dataArray === "parent" || dataFromEntity === "address"){
      //     this.setState({
      //       something : dataFromEntity
      //     })
      //   }
      //   else{
          this.setState(state => ({
            newUser: dataEntries
          }))
      //   }
      // }
    }
  }
    
  
  render() {
    return (
      <React.Fragment>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" disabled={this.props.disabled}>บันทึก</button>

        <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                {
                  this.state.newUser.map((data, i) =>(
                    <React.Fragment key={i}>
                      <span key={i}>{this.state.newUser}</span><br key={i} />
                    </React.Fragment>
                  ))
                }
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Understood</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
