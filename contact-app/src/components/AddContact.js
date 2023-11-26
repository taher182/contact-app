import React from 'react'
import userImage from './RegisterForm/user.png'
import Header from './Header';
import ToggleBar from './ToggleBar/ToggleBar';
import Footer from './Footer';
import {Link} from 'react-router-dom'
class AddContact extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            image:userImage,

        }
    }


    handleImageChange = (e) => {
        const file = e.target.files[0];
        this.setState({ imgf: file });
        this.setState({ fname: file.name });
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // Convert file to base64 string
                const base64String = reader.result;
                this.setState({ image: base64String });
            };
            reader.readAsDataURL(file);
        } else {
            this.setState({ image: userImage });
        }
    };
    handleClickImage = () => {
        // Trigger click on the file input when clicking on the image
        document.getElementById('fileInput').click();
    };
    

          changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value, passwordError:false})
    }
    render()
    {
        const {image} = this.state
    return(
        <>
        <Header />
        <ToggleBar />
        <div className='container align-items-center mt-5'>
        <h2 className="text-center">Add Contact</h2>
        <form>
        <center>
        <hr style={{width:"420px"}}/>
          <input type="file" onChange={this.handleImageChange} accept="image/*" style={{ display: "none" }} id="fileInput"  />
                                   
             <div style={{ width: '200px', height: '200px', borderRadius: '50%', cursor:"pointer" }}>
                 <img src={image} alt="Preview" style={{ width: '100%', height: 'auto',borderRadius:"50%", border:"5px solid yellow" }} onClick={this.handleClickImage} onChange={this.changeHandler} />
                         </div>
                    </center>
        <div className="form-group row justify-content-center">
            <div className='col-md-4 '>
            <label for="Name">Name<span className='text-danger'>*</span></label>
            <input type="text" className="form-control" id="Name" aria-describedby="emailHelp" placeholder="Enter Name" required />
            
            </div>
        </div>
        <div className="form-group row justify-content-center">
            <div className='col-md-4'>
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your contact's email with anyone else.</small>
            </div>
        </div>
        <div className="form-group row justify-content-center">
            <div className='col-md-4'>
            <label for="InputPhone">Phone<span className='text-danger'>*</span></label>
            <input type="text" className="form-control" id="InputPhone" aria-describedby="emailHelp" placeholder="Enter phone number" required />
            <small id="emailHelp" className="form-text text-muted">We'll never share your contact's phone number with anyone else.</small>
            </div>
        </div>
        <div className='form-group row justify-content-center'>
            <div className='col-md-4'>
            <label for="inputGroupSelect">Category<span className='text-danger'>*</span></label>
            <select className="custom-select w-100 rounded  p-2" id="inputGroupSelect" required style={{border:"1px solid gray", background:"none"}}>
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
            </div>
        </div>
        
        <div className="form-group row justify-content-center">
            <div className="col-md-4">
            <button type="submit" className="btn btn-primary w-100 mt-2">Add</button>
            <hr style={{width:"420px"}}/>
            </div>
        </div>
    </form>
    <div className="container" >
                        <div className='row justify-content-center'>
                            <div className='col-lg-4'>
                           <Link to="/home"> <button className="btn btn-outline-warning w-100 mt-2 mb-2" >Back</button></Link>
                            {/* onClick={this.LoginFormSateFunction} */}
                            

                            </div>
                        </div>
                    </div>

        </div>
        <div style={{height:"150px"}} id="border_div"></div>
        <Footer />
        </>
    )
}
}

export default AddContact;