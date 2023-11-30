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
      page: Cookies.get('page'),
      userImage: Cookies.get('userImage')
    };
  }

  toggleTheme = () => {
    this.setState((prevState) => ({
      isDarkTheme: !prevState.isDarkTheme
    }));

    // ... your theme toggle logic remains the same
  };

  render() {
    return (
      <div className='w-100 bg-warning bg-gradient'>
        <div className="toggle-bar container-fluid">
          <div className='row'>
            <div className='col-12 d-flex justify-content-end align-items-center'>

              <button onClick={this.toggleTheme} className='btn btn-light m-1 p-1' title='Theme'>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={this.state.isDarkTheme ? lightMode : darkMode} alt="theme" style={{ width: "30px", height: "30px" }} />
                </div>
              </button>

              <button onClick={this.toggleTheme} className='btn btn-info m-1' title='Theme'>
                <i className="fas fa-info-circle"></i>
              </button>

              <button style={{ width: "45px", height: "45px", borderRadius: "50%", border: "none" }} title='Theme'>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={this.state.userImage} alt="user" style={{ width: "45px", height: "45px", borderRadius: "50%" }} />
                </div>
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToggleBar;
