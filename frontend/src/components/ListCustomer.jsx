import React, { useEffect, useState } from 'react';
import "../assets/styles/listCustomer.css";
import axiosInstance from "../axiosInstance";

const ListCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axiosInstance.get("/api/get-alluser");
        setCustomers(res.data);
      } catch (err) {
        console.log("Error fetching customers:", err);
      } finally {
        setLoading(false); // 👈 Stop loading after fetch
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="view-customers-container">
      <h2>All Customers</h2>

      {/* 👇 Show loader while fetching data */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading customers...</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="customers-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Mobile</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.userId}</td>
                    <td>{user.name}</td>
                    <td>{user.gender}</td>
                    <td>{user.mobile}</td>
                    <td>{user.address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListCustomer;
