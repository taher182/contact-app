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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            password1:'',
            password2:'',
            profile:'',
            redirect:'',
            passwordError:false,
            emailError:false
        };
    }

  

    handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("this is file",file)
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
    handleUploadImage = async () => {
        const { image } = this.state;
      
        const formData = new FormData();
        formData.append('image', image); // Use 'image' directly from the state
      
        try {
          const response = await axios.post('YOUR_IMAGE_UPLOAD_API_ENDPOINT', formData, {
            // Add headers if necessary, like authorization token, content type, etc.
          });
      
          console.log('Image uploaded successfully!', response.data);
          // Perform actions after successful upload
        } catch (error) {
          console.error('Error occurred while uploading:', error);
          // Handle error scenario
        }
      };
      
    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value, passwordError:false, emailError:false})
    }
    
    registerFormHandler = (e) =>{
        e.preventDefault();
        console.log(this.state)
        const { firstName, lastName, email, phone, password1, password2, image } = this.state;

  const formData = new FormData();
  formData.append('first_name', firstName);
  formData.append('last_name', lastName);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('password1', password1);
  formData.append('password2', password2);

  if (image && image !== userImage) {
    // If an image is selected (and not the default userImage), include it in the formData
    formData.append('image', image);
  }
        axios.post('https://effective-yodel-6qgwgvw9596cxrgj-8001.app.github.dev/users/', formData)
        .then(response => {
            console.log('Registration successful:', response.data);
            console.log("status", response.status)
    
            toast.success('Registration Successful');
            
        })
        .catch(error => {
            console.error('Error during registration:', error);
            toast.error("Registration unsuccessful");
            console.log("this is error",error.response)
            const pswdError = error?.response?.data?.password;
            const mailError = error?.response?.data?.email;
            if(pswdError)
            {
                this.setState({passwordError:true})
            }
            if(mailError)
            {
                this.setState({emailError:true})
            }
            // Handle error states or display an error message to the user
        });
    }
    render() {
        const { image, RegisterFormState, firstName, lastName, email, phone, password1, password2 } = this.state;
     
       

        if (RegisterFormState) {
            return (
                <>
                 <Header />
                 <ToggleBar />  
                 <ToastContainer />
                <div className='container align-items-center mt-5  register-form' >
                <h2 className="text-center">Registration Form</h2>
          
                <form onSubmit={this.registerFormHandler}>
                    <div className="form-group row justify-content-center">
                    <hr className='mt-2 mb-2'/>
                        <center>
                                    <input type="file" onChange={this.handleImageChange} accept="image/*" style={{ display: "none" }} id="fileInput"  />
                                   
                                    <div style={{ width: '200px', height: '200px', borderRadius: '50%',marginBottom:"45px", cursor:"pointer" }}>
                                        <img src={image} alt="Preview" style={{ width: '100%', height: 'auto' }} onClick={this.handleClickImage} onChange={this.changeHandler} />
                                        <button className='btn btn-warning' onClick={this.handleUploadImage}>Upload</button>
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
                        {this.state.emailError && <small className='text-danger'>Email already exists</small>}
                        </div>
                        <div className='col-lg-6'>
                            
                        <label htmlFor="phone">Phone<span className='text-danger'>*</span></label>
                        <input type="number" className="form-control" id="phone" name="phone" aria-describedby="phHelp" placeholder="Enter Phone Number" required onChange={this.changeHandler} value={phone} />
                        
                        </div>
                        <div className='col-lg-6'>
                        <label htmlFor="password1">Password<span className='text-danger'>*</span></label>
                        <input type="password" className="form-control" id="password1" aria-describedby="psHelp" name="password1" placeholder="Enter Password" required value={password1} onChange={this.changeHandler} />
                        
                        </div>
                        <div className='col-lg-6'>
                        <label htmlFor="password2">Repeat Password<span className='text-danger'>*</span></label>
                        <input type="password" className="form-control" id="password2" name="password2" aria-describedby="psHelp" placeholder="Enter Password Again" required value={password2} onChange={this.changeHandler} />
                        {this.state.passwordError && <small className='text-danger'>Password dosen't match</small>}
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