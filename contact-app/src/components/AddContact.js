import React from 'react'
import userImage from './RegisterForm/user.png'
import Header from './Header';
import ToggleBar from './ToggleBar/ToggleBar';
import Footer from './Footer';
import {Link} from 'react-router-dom'
import axios from 'axios'
class AddContact extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            image:userImage,
            categoryData:[],
            formData: {
                name: '',
                email: '',
                phone: '',
                category: '',
                path:''
              }
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
          formData: {
            ...prevState.formData,
            [name]: value
          }
        }));
      };
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
    getCategories = () =>{
       

        axios.get('https://8000-taher182-contactapp-jl43wlbwhuz.ws-us106.gitpod.io/contacts/category')
        .then(response => {
          // Handle successful response here
          console.log('Data:', response.data.data);
          this.setState({categoryData:response.data.data});
        })
        .catch(error => {
          // Handle error
          console.error('Error fetching data:', error);
        });
    }
    componentDidMount() {
        // Fetch categories when the component mounts
        this.getCategories();
      }
    render()
    {
        const {image, categoryData} = this.state

    return(
        <>
       
        <Header />
        <ToggleBar />
       
        <div className='container align-items-center' >
        <h2 className="text-center">Add Contact</h2>
        <form>
        <center>
        <div className='row justify-content-center'>
            <div className='col-md-4 '>
            <hr />
            </div>
        </div>
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
            <select className="custom-select w-100 rounded  p-2" id="inputGroupSelect" required style={{ border: "1px solid gray", background: "none" }}>
                  <option selected>Choose...</option>
                  {categoryData.map((category) => (
                    <option key={category.id}>{category.name}</option>
                  ))}
                </select>
            </div>
        </div>
        
        <div className="form-group row justify-content-center">
            <div className="col-md-4">
            <button type="submit" className="btn btn-primary w-100 mt-2">Add</button>
            <hr />
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
        
        <div style={{height:"150px"}} id="border_div"></div>
        </div>
        <Footer />
        </>

    )
}
}

export default AddContact;