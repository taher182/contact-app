import React from 'react';
import 'cropperjs/dist/cropper.css';
import LoginForm from '../LoginForm';
import './user.png'
import userImage from './user.png';
import Header from '../Header';
import ToggleBar from '../ToggleBar/ToggleBar';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginFormState: false,
            RegisterFormState: true,
            image: userImage,
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            password:'',
            profile:''
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
    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    registerFormHandler = (e) =>{
        e.preventDefault();
        console.log(this.state)
        const formData = {
            "first_name":this.state.firstName,
            "last_name":this.state.lastName,
            "email":this.state.email,
            "phone":this.state.phone,
            "password":this.state.password
        }
        axios.post('http://127.0.0.1:8000/users/', formData)
        .then(response => {
            console.log('Registration successful:', response.data);
            // Handle any additional logic after successful registration
        })
        .catch(error => {
            console.error('Error during registration:', error);
            // Handle error states or display an error message to the user
        });
    }
    render() {
        const { image, RegisterFormState, firstName, lastName, email, phone, password, profile } = this.state;
     
       

        if (RegisterFormState) {
            return (
                <>
                 <Header />
                 <ToggleBar />  
       
                <div className='container align-items-center mt-5  register-form' >
                <h2 className="text-center">Registration Form</h2>
                
                <form onSubmit={this.registerFormHandler}>
                    <div className="form-group row justify-content-center">
                        <hr className='mt-2 mb-2'/>
                        <center>
                                    <input type="file" onChange={this.handleImageChange} accept="image/*" style={{ display: "none" }} id="fileInput"  />
                                    <br />
                                    <label htmlFor="fileInput" style={{ cursor: "pointer" }}>Upload Image</label>
                                    <br />
                                    <div style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden' }}>
                                        <img src={image} alt="Preview" style={{ width: '100%', height: 'auto' }} onClick={this.handleClickImage} onChange={this.changeHandler} />
                                    </div>
                                </center>
                        <div className='col-lg-6'>
                        <label htmlFor="firstName">First Name<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" id="firstName" name="firstName" aria-describedby="fnHelp" placeholder="Enter First Name" required value={firstName} onChange={this.changeHandler} />
                        
    
                        </div>
                        <div className='col-lg-6'>
                        <label htmlFor="lastName">Last Name<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" id="lastName" name="lastName" aria-describedby="lnHelp" placeholder="Enter Last Name" required onChange={this.changeHandler} value={lastName}/>
                        
                        </div>
                        <div className='col-lg-6'>
                        <label htmlFor="email">Email<span className='text-danger'>*</span></label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter Email" required onChange={this.changeHandler} value={email}/>
                        
                        </div>
                        <div className='col-lg-6'>
                            
                        <label htmlFor="phone">Phone<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" id="phone" name="phone" aria-describedby="phHelp" placeholder="Enter Phone Number" required onChange={this.changeHandler} value={phone}/>
                        
                        </div>
                        <div className='col-lg-6'>
                        <label htmlFor="password1">Password<span className='text-danger'>*</span></label>
                        <input type="password" className="form-control" id="password1" aria-describedby="psHelp" placeholder="Enter Password" required onChange={this.changeHandler} />
                        
                        </div>
                        <div className='col-lg-6'>
                        <label htmlFor="password2">Repeat Password<span className='text-danger'>*</span></label>
                        <input type="password" className="form-control" id="password2" name="password" aria-describedby="psHelp" placeholder="Enter Password Again" required value={password} onChange={this.changeHandler} />
                        </div>
    
                        <div className='col-lg-6 mt-3 mb-2'>
                        <button type="submit" className="btn btn-warning w-100 mt-2 mb-2" >Register</button>
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
