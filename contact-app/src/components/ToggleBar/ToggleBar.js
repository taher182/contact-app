import React from 'react';
import darkMode from './darkMode.png'
import lightMode from './lightMode.png'
class ToggleBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDarkTheme: false,
      imageSrc:"./darkMode.png"
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
      <div className="toggle-bar container-fluid bg-warning bg-opacity-50 bg-gradient" >
        <div className='row justify-content-end'>
            <div className='col-2 '>
            <button onClick={this.toggleTheme} className='btn btn-light mt-2 mb-2 ' style={{float:"right"}} title='Theme'>
          <img src={this.state.isDarkTheme?lightMode: darkMode} alt="theme" />
        </button>
            </div>
        </div>
        
      </div>
    );
  }
}

export default ToggleBar;
