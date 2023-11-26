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
 <div className="container">
  <div className="row">
    <div className="col-lg-4 mt-2 mb-2">
      <div className="p-2 border rounded shadow">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
          alt="Profile"
          style={{ height: "120px", width: "120px", borderRadius: "50%" }}
          className="img-fluid rounded-circle"
        />
      </div>
    </div>
  </div>
</div>

</>
        )
    }
}

export default Contact;