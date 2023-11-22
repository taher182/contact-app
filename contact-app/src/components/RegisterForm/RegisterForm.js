import React from 'react';
import 'cropperjs/dist/cropper.css';
import LoginForm from '../LoginForm';
import './user.png'
import userImage from './user.png';
import Header from '../Header';
import ToggleBar from '../ToggleBar/ToggleBar';
import Footer from '../Footer';
import { Link } from 'react-router-dom'; 
class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginFormState: false,
            RegisterFormState: true,
            image: userImage,
        };
    }

  

    handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.setState({ image: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            this.setState({ image: userImage }); // Reset to default image if no file selected
        }
    };

    handleClickImage = () => {
        // Trigger click on the file input when clicking on the image
        document.getElementById('fileInput').click();
    };

    render() {
        const { image, RegisterFormState } = this.state;
     
       

        if (RegisterFormState) {
            return (
                <>
                 <Header />
                 <ToggleBar />  
       
                <div className='container align-items-center mt-5  register-form' >
                <h2 className="text-center">Registration Form</h2>
                
                <form>
                    <div className="form-group row justify-content-center">
                        <hr className='mt-2 mb-2'/>
                        <center>
                                    <input type="file" onChange={this.handleImageChange} accept="image/*" style={{ display: "none" }} id="fileInput" />
                                    <br />
                                    <label htmlFor="fileInput" style={{ cursor: "pointer" }}>Upload Image</label>
                                    <br />
                                    <div style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden' }}>
                                        <img src={image} alt="Preview" style={{ width: '100%', height: 'auto' }} onClick={this.handleClickImage} />
                                    </div>
                                </center>
                        <div className='col-lg-6'>
                        <label htmlFor="firstName">First Name<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" id="firstName" aria-describedby="fnHelp" placeholder="Enter First Name" required />
                        
    
                        </div>
                        <div className='col-lg-6'>
                        <label htmlFor="lastName">Last Name<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" id="lastName" aria-describedby="lnHelp" placeholder="Enter Last Name" required />
                        
                        </div>
                        <div className='col-lg-6'>
                        <label htmlFor="email">Email<span className='text-danger'>*</span></label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" required />
                        
                        </div>
                        <div className='col-lg-6'>
                            
                        <label htmlFor="phone">Phone<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" id="phone" aria-describedby="phHelp" placeholder="Enter Phone Number" required />
                        
                        </div>
                        <div className='col-lg-6'>
                        <label htmlFor="password1">Password<span className='text-danger'>*</span></label>
                        <input type="password" className="form-control" id="password1" aria-describedby="psHelp" placeholder="Enter Password" required />
                        
                        </div>
                        <div className='col-lg-6'>
                        <label htmlFor="password2">Repeat Password<span className='text-danger'>*</span></label>
                        <input type="password" className="form-control" id="password2" aria-describedby="psHelp" placeholder="Enter Password Again" required />
                        </div>
    
                        <div className='col-lg-6 mt-3 mb-2'>
                        <button type="submit" className="btn btn-warning w-100 mt-2 mb-2">Register</button>
                        </div>
                        
                        <hr />
                    </div>
                    </form>
              
                    <div className="container" >
                        <div className='row justify-content-center'>
                            <div className='col-lg-6'>
                           <Link to="/login"> <button className="btn btn-outline-warning w-100 mt-2 mb-2" >Back</button></Link>
                            {/* onClick={this.LoginFormSateFunction} */}
                   

                            </div>
                        </div>
                    </div>
               
                    </div>
                    <div style={{height:"150px"}} id="border_div"></div>
                    <Footer />
                </>
            );
        } else {
            return (
                <LoginForm />
            );
        }
    }
}

export default RegisterForm;
