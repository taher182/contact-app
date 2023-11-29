import React from 'react';
import darkMode from './darkMode.png'
import lightMode from './lightMode.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
class ToggleBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDarkTheme: false,
      imageSrc:"./darkMode.png",
      page:Cookies.get('page')
    };
  }
  imageChange = () => {
    if(this.state.isDarkTheme===false)
    {
      this.setState({imageSrc:darkMode})
    }
    else{
      this.setState({imageSrc:"./darkMode.png"})
    }

    this.imageChange();
  }
  toggleTheme = () => {

    this.setState((prevState) => ({
      isDarkTheme: !prevState.isDarkTheme, 
      
    }));
    const inputElements = document.body.querySelectorAll('input');
    inputElements.forEach((inputElement) => {
      if(this.state.isDarkTheme)
      {
        inputElement.style.color ="black";
      }
      else
      {
        inputElement.style.color ="white";
      }
      
    });
    const body = document.body;
    if (this.state.isDarkTheme) {
        body.style.backgroundColor = 'white';
        body.style.color = 'black';
    } else {
        body.style.backgroundColor = '#15202B';
        body.style.color = 'white';
    }

    // Change border_div background color
    const borderDiv = document.getElementById('border_div');
    if (borderDiv) {
        if (this.state.isDarkTheme) {
            borderDiv.style.backgroundColor = 'white'; // Change to the desired color
        } else {
            borderDiv.style.backgroundColor = '#15202B'; // Change to the desired color
        }
    }
  };

  render() {
    return (
     <div className='w-100 bg-warning  bg-gradient'>
       <div className="toggle-bar container-fluid " >
      
      <div className='row '>
          <div className='row-2 '>


        <>
          <button onClick={this.toggleTheme} className='btn btn-light m-1 mt-2 mb-2' title='Theme' style={{float:"right"}}>
            <img src={this.state.isDarkTheme ? lightMode : darkMode} alt="theme" />
          </button>
        <button onClick={this.toggleTheme} className='btn btn-info m-1 mt-2 mb-2' style={{float:"right"}} title='Theme'>
          <i className="fas fa-info-circle"></i></button>

        </>

          </div>
      </div>
     
      
    </div>
     </div>
    );
  }
}

export default ToggleBar;
