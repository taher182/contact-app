import React from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import ToggleBar from './ToggleBar/ToggleBar';
import Footer from './Footer';
import Contact from './Contact';
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
        {/* <h1>{Cookies.get('id')}</h1> */}
        <Contact />

        <Footer />
      </>
        )
    }
}

export default HomePage;