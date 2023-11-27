import React from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import ToggleBar from './ToggleBar/ToggleBar';
import Footer from './Footer';
import Contact from './Contact';
import AddContact from './AddContact';
class HomePage extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            id: props.id,
            NotificationMessage:Cookies.get('message'),
            NotificationStatus:Cookies.get('notificationStatus')
        }
        Cookies.set('page', 'home')
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
          <div className='container-fluid'>
          <div className='row'>
                <div className='col border'>
                    <button className='btn btn-primary m-1'>Sort</button>
                    <button className='btn btn-primary m-1'>Sort</button>
                    
                </div>
                <div className='col justify-content-end'>
                <button className='btn btn-danger m-1'>Sort</button>
                <button className='btn m-1'>Sort</button>
                </div>
            </div>
          </div>

       <Contact />
       
 

        <Footer />
      </>
        )
    }
}

export default HomePage;