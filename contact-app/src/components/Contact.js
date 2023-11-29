import React from 'react';
import userImage from './RegisterForm/user.png';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSort, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate } from 'react-router-dom';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            categoryNames: {},
            selectedIDs: [],
            delete: true,
            deleteButtonDisabled: true
        }
    }
    getCategory = (category_id) => {
        let url = 'https://8000-taher182-contactapp-jl43wlbwhuz.ws-us106.gitpod.io/contacts/category/' + category_id;
        axios(url)
            .then(response => {
                const categoryNames = { ...this.state.categoryNames };
                categoryNames[category_id] = response.data.data.name;
                this.setState({ categoryNames });
            })
            .catch(error => {
                console.error('Error fetching category:', error);
            });
    }

    handleDelete = (contactId) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            let url = "https://8000-taher182-contactapp-jl43wlbwhuz.ws-us106.gitpod.io/contacts/" + contactId;
            axios.delete(url)
                .then(response => {
                    const updatedContactList = this.state.contacts.filter(contact => contact.id !== contactId);
                    this.setState({ contacts: updatedContactList });
                    toast.success('Deletion successful');
                })
                .catch(error => {
                    toast.error('Deletion failed');
                    console.error('Error deleting contact:', error);
                });
        }
    }

    componentDidMount() {
      
        // Fetch category names for each contact
        this.state.contacts.forEach(contact => {
            this.getCategory(contact.category_id);
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.contactList !== this.props.contactList) {
            this.setState({ contacts: this.props.contactList });

            // Fetch category names for each contact in the updated list
            this.props.contactList.forEach(contact => {
                if (!this.state.categoryNames[contact.category_id]) {
                    this.getCategory(contact.category_id);
                }
            });
        }
    }
    handleCheckboxChange = (id) => {
        this.setState(prevState => {
            const selectedIDs = [...prevState.selectedIDs];
            const index = selectedIDs.indexOf(id);

            if (index === -1) {
                selectedIDs.push(id);
            } else {
                selectedIDs.splice(index, 1);
            }

            const deleteButtonDisabled = selectedIDs.length < 2;

            return { selectedIDs, deleteButtonDisabled };
        }, () => {
            // Update the deleteButtonDisabled state after setting the selectedIDs
            this.setState({ deleteButtonDisabled: this.state.selectedIDs.length < 2 });
        });
    };


    render() {

        console.log("this is contacts", this.state.contacts);
        return (
            <>
                <ToastContainer />
                <div className='container-fluid mt-2'>
                    <div className='row'>
                        <div className='col '>
                            <button className='btn btn-primary m-1'> <FontAwesomeIcon icon={faSort} /></button>
                            <button className='btn btn-warning m-1' disabled={this.state.delete || this.state.deleteButtonDisabled}> <FontAwesomeIcon icon={faDownload} /></button>

                        </div>
                        <div className='col justify-content-end' >
                            <button className='btn btn-danger m-1' style={{ float: "right" }} disabled={this.state.delete || this.state.deleteButtonDisabled}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <Link to='/contact'> <button className='btn btn-success m-1 ' style={{ float: "right" }}><FontAwesomeIcon icon={faPlus} /></button></Link>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='container-fluid '>
                    <div className='row'>
                        {this.state.contacts.map((contact) => (
                            <div className="col-lg-3 col-md-6" key={contact.id} >
                                <div className="card m-2" style={{ border: "1px solid yellow", background: "none" }}>
                                    <div className="card-body shadow">
                                        <div style={{ float: 'right' }}>
                                            <input type='checkbox' onChange={() => this.handleCheckboxChange(contact.id)}
                                                checked={this.state.selectedIDs.includes(contact.id)} />
                                        </div>
                                        <center>
                                            <div style={{
                                                width: "150px",
                                                height: "150px",
                                                border: "2px solid yellow",
                                                backgroundImage: `url(${contact.image || userImage})`,
                                                borderRadius: "50%",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                overflow: "hidden"
                                            }}>
                                                {/* Show a fallback image if contact.image is null */}
                                                {contact.image === null && (
                                                    <img
                                                        src={userImage}
                                                        alt="avatar"
                                                        className="rounded-circle img-fluid"
                                                        style={{ width: "100%", height: "auto", visibility: "hidden" }}
                                                    />
                                                )}
                                            </div>
                                        </center>
                                        <hr />
                                        <p><b>Name: </b>{contact.name}</p>
                                        <p><b>Phone: </b>{contact.phone}</p>
                                        <p><b>Email: </b>{contact.email}</p>
                                        <p><b>Category: </b>{this.state.categoryNames[contact.category_id]}</p>
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
