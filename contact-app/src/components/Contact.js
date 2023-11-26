import React from 'react'

class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
          <>
    
          <div className='container'>
            <div className='row'>

      <div class="col-lg-3" >
        <div class="card m-2" style={{background:"none", border:"1px solid yellow"}}>
          <div class="card-body shadow">
            <div style={{float:'right'}}><input type='checkbox' /></div>
            <center>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              class="rounded-circle img-fluid" style={{width: "150px", border:"1px solid yellow"}} />
            </center>
            <p><b>Name: </b></p>
            <p><b>Phone: </b></p>
            <p><b>Email: </b></p>
            <p><b>Category: </b></p>

            <div className='m-1' style={{float:"right"}}>
              <button className='btn btn-primary m-1'><i className="fas fa-pencil-alt"></i></button>
              <button className='btn btn-danger m-1'><i className="fas fa-trash-alt"></i></button>
            </div>
           
          </div>
        </div>


            </div>
      
          </div>
          </div>
   
          </>
        )
    }
}

export default Contact;