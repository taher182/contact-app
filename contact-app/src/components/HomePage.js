import React from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import ToggleBar from './ToggleBar/ToggleBar';
import Footer from './Footer';
import Contact from './Contact';
import AddContact from './AddContact';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSort, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate } from 'react-router-dom';
class HomePage extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            id: props.id,
            NotificationMessage:Cookies.get('message'),
            NotificationStatus:Cookies.get('notificationStatus'),
            contactList:[]
        }
        Cookies.set('page', 'home')
    }
    getContacts = () =>{
     let url = 'https://8000-taher182-contactapp-jl43wlbwhuz.ws-us106.gitpod.io/contacts/getcontactbyuserid/' + Cookies.get('id')
      axios.get(url)
      .then(response =>
        {

          this.setState({contactList:response.data.data})
          console.log("contacts", response.data.data)
        })
        .catch(error =>{
          console.log("error", error)
        })
    }
    componentDidMount(){
      this.getContacts();
    }
    render(){
        return(
        <>
    
        {this.state.NotificationStatus && (
          <>
            <ToastContainer />
          </>
        )}
       <div style={{position:"fixed"}} className='w-100 m-0 p-0'>
       <Header />
        <ToggleBar />
       </div>
       <div style={{height:"120px"}} id="border_div"></div>
          <div className='container mt-2'>
          <div className='row'>
                <div className='col '>
                    <button className='btn btn-primary m-1'> <FontAwesomeIcon icon={faSort} /></button>
                    <button className='btn btn-warning m-1'> <FontAwesomeIcon icon={faDownload} /></button>
                    
                </div>
                <div className='col justify-content-end' >
                <button className='btn btn-danger m-1' style={{float:"right"}}><FontAwesomeIcon icon={faTrash} /></button>
               <Link to='/contact'> <button className='btn btn-success m-1 ' style={{float:"right"}}><FontAwesomeIcon icon={faPlus} /></button></Link>
                </div>
            </div>
          </div>
          <hr />
       <Contact contactList={this.state.contactList} />
       
 
       <div style={{height:"150px"}} id="border_div"></div>
        <Footer />
      </>
        )
    }
}

export default HomePage;