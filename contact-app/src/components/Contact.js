import React from 'react';
import userImage from './RegisterForm/user.png';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Contact extends React.Component {
    handleDelete = (contactId)=>{
       if(window.confirm("are you sure you want to delete this contact?"))
       {
        let url = "https://8000-taher182-contactapp-jl43wlbwhuz.ws-us106.gitpod.io/contacts/"+contactId;
        axios.delete(url)
        .then(response =>{
            toast.success('deletion successful')
        })
       }
    }
    render() {
        const { contactList } = this.props; // Use props directly in the render method
       
        return (
            <>
            <ToastContainer />
                <div className='container'>
                    <div className='row'>
                        {contactList.map((contact) => (
                            <div className="col-lg-3 col-md-6" key={contact.id}>
                                <div className="card m-2" style={{ background: "none", border: "1px solid yellow" }}>
                                    <div className="card-body shadow">
                                        <div style={{ float: 'right' }}><input type='checkbox' /></div>
                                        <center>
                                       
                                            <img
                                                src={contact.image === null ? userImage : contact.image}
                                                alt="avatar"
                                                className="rounded-circle img-fluid"
                                                style={{ width: "150px", border: "1px solid yellow" }}
                                            />
                                        </center>
                                        <p><b>Name: </b>{contact.name}</p>
                                        <p><b>Phone: </b>{contact.phone}</p>
                                        <p><b>Email: </b>{contact.email}</p>
                                        <p><b>Category: </b>{contact.category_id}</p>

                                        <div className='m-1' style={{ float: "right" }}>
                                            <button className='btn btn-primary m-1'><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn btn-danger m-1 delete' onClick={() => this.handleDelete(contact.id)}><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }
}
export default Contact; 
