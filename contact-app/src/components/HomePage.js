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

       <Header />
        <ToggleBar />

         
       <Contact contactList={this.state.contactList} />
       
 
       <div style={{height:"150px"}} id="border_div"></div>
        <Footer />
      </>
        )
    }
}

export default HomePage;