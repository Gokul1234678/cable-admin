import React from 'react'
import "../assets/styles/AddUser.css"
import axiosInstance from "../axiosInstance"

import { useState } from 'react'
const AddCustomer = () => {
  let [formData, setFormData] = useState({
    name: "",
    gender: "",
    mobile: "",
    address: "",
  });
  let [message, setMessage] = useState("");
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  async function handleSubmit(e){
    e.preventDefault();
if (!formData.name || !formData.gender || !formData.mobile || !formData.address) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

    try{
      let res=await axiosInstance.post("/api/create-new-user",formData,)
     setMessage("✅ User added successfully!");
      setFormData({ name: "", gender: "", mobile: "", address: "" });
    }
    catch (error) {
      console.error(error);
      setMessage("❌ Error adding user. Try again.");
    }
  }

  return (
    <div className="add-user-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit} className="user-form">

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter full name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">select option</option>
            <option value="male"> male</option>
            <option value="female">female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Mobile</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter mobile number"
            value={formData.mobile}
            onChange={handleChange}
            required

          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
            required

          ></textarea>
        </div>
          <button type="submit" className="submit-btn">
            Add User
          </button>

 {message && <p className="message">{message}</p>}
 {/* Render this element only if the condition is true. */}
      </form>
    </div>
  )
}

export default AddCustomer;