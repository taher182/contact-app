import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Assuming you're using React Router
import Header from './Header';
import ToggleBar from './ToggleBar/ToggleBar';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import Cookies from 'js-cookie'
import userImage from './RegisterForm/user.png'
import { useParams } from 'react-router-dom';
// Assuming you have other necessary components imported as well

const EditContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category_id: '',
    
  });

  const [image, setImage] = useState(userImage); // State for image source
  const [imgFile, setImgFile] = useState(null); // State for image file
  const [id, setId] = useState(Cookies.get('id'))
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Convert file to base64 string
        const base64String = reader.result;
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(''); // Reset image if no file selected
    }
  };

  const ContactFormHandler = async (e) => {
    e.preventDefault();
    try {
      // Set loading state to true
      // You may want to implement setLoading useState to handle this
      // setLoading(true);

      const formData1 = new FormData();

      formData1.append('name', formData.name);
      formData1.append('email', formData.email);
      formData1.append('phone', formData.phone);
      formData1.append('category_id', formData.category_id);

      // Append image file if available
      if (imgFile) {
        formData1.append('image', imgFile);
      }

      // Assuming you have 'id' and 'created_by' available
      formData1.append('user_id', id);
      formData1.append('created_by', formData.created_by);

      // Make API call using axios
      const response = await axios.post('https://8000-taher182-contactapp-jl43wlbwhuz.ws-us106.gitpod.io/contacts/', formData1);
      
      console.log('Creation successful:', response.data);
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        category_id: '',
      });
      setImage(''); // Reset image
      // Handle success (e.g., show success message)
    } catch (error) {
      console.error('Contact creation failure:', error);
      // Handle error (e.g., show error message)
    } finally {
      // Set loading state to false
      // setLoading(false);
    }
  };

  const handleClickImage = () => {
    document.getElementById('fileInput').click();
  };

  // Assuming you have categoryData defined as an array
  // Initialize or get the category data array
  const [categoryData, setCategoryData] = useState([]);

  // Function to fetch categories
  const getCategories = () => {
    axios.get('https://8000-taher182-contactapp-jl43wlbwhuz.ws-us106.gitpod.io/contacts/category')
      .then(response => {
        // Handle successful response here
        console.log('Data:', response.data.data);
        setCategoryData(response.data.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  };

  // Fetch categories on component mount
  const params = useParams();
  useEffect(() => {
    getCategories();
    console.log("use params", params)
    if (params.id) {
      getContactData(params.id);
    }
 
  }, [params.id]); // Empty dependency array ensures it runs only once on mount


  const getContactData = (id) => {
    let url = 'https://8000-taher182-contactapp-jl43wlbwhuz.ws-us106.gitpod.io/contacts/' + id;
    axios.get(url)
      .then(response => {
        let data = response.data.data;
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          category_id: data.category_id,
        });
      })
      .catch(error => {
        console.error('Error fetching contact data:', error);
      });
  };
  return (
    <>
      <ToastContainer />
      {/* Assuming formData.toLogin and formData.setLoading are defined */}
      {formData.toLogin && <Navigate to="/" />}
      {formData.setLoading && <LoadingSpinner />}

      <Header />
      <ToggleBar />

      <div className="container align-items-center">
        <h2 className="text-center">Edit Contact</h2>
        <hr />
        <form onSubmit={ContactFormHandler}>
          <center>
            {/* Image upload */}
            <input type="file" onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} id="fileInput" />
            <div style={{ width: '200px', height: '200px', borderRadius: '50%', cursor: 'pointer', border: '5px solid yellow' }}>
              <img src={image} alt="Preview" style={{ width: '100%', height: 'auto', borderRadius: '50%' }} onClick={handleClickImage} />
            </div>
          </center>

          {/* Name field */}
          <div className="form-group row justify-content-center">
            <div className="col-md-4">
              <label htmlFor="Name">Name<span className="text-danger">*</span></label>
              <input type="text" className="form-control" id="Name" aria-describedby="emailHelp" placeholder="Enter Name" value={formData.name} required name="name" onChange={handleChange} />
            </div>
          </div>

          {/* Email field */}
          <div className="form-group row justify-content-center">
            <div className="col-md-4">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={formData.email} name="email" onChange={handleChange} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your contact's email with anyone else.</small>
            </div>
          </div>

          {/* Phone field */}
          <div className="form-group row justify-content-center">
            <div className="col-md-4">
              <label htmlFor="InputPhone">Phone<span className="text-danger">*</span></label>
              <input type="number" className="form-control" id="InputPhone" aria-describedby="emailHelp" placeholder="Enter phone number" required value={formData.phone} name="phone" onChange={handleChange} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your contact's phone number with anyone else.</small>
            </div>
          </div>

          {/* Category selection */}
          <div className="form-group row justify-content-center">
            <div className="col-md-4">
              <label htmlFor="inputGroupSelect">Category<span className="text-danger">*</span></label>
              <select className="custom-select w-100 rounded p-2" id="inputGroupSelect" style={{ border: '1px solid gray', background: 'none' }} value={formData.category_id} name="category" onChange={handleChange}>
                <option defaultValue>Choose...</option>
                {categoryData.map((category) => (
                  <option key={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit button */}
          <div className="form-group row justify-content-center">
            <div className="col-md-4">
              <button type="submit" className="btn btn-primary w-100 mt-2">Add</button>
            </div>
          </div>
        </form>

        {/* Back button */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <Link to="/home">
                <button className="btn btn-outline-warning w-100 mt-2 mb-2">Back</button>
              </Link>
            </div>
          </div>
        </div>

        <div style={{ height: '150px' }} id="border_div"></div>
      </div>
      <Footer />
    </>
  );
};

export default EditContact;
