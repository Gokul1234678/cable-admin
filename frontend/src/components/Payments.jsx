import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import "../assets/styles/Payment.css";

const Payments = () => {
  let [users, setUsers] = useState([])
  let [plans, setplans] = useState([])
  let [formData, setFormData] = useState({
    userId: "",
    planId: "",
    paymentMethod: "",
    paymentDate: new Date().toISOString().split("T")[0],
  })
  const [message, setMessage] = useState("");

  // Fetch users and plans from backend
  useEffect(() => {
    async function fetchData() {
      try {
        let userData = await axiosInstance.get("/api/get-alluser");
        let templans = await axiosInstance.get("/api/plans");
        await setUsers(userData.data)
        await setplans(templans.data)
        // console.log(userData.data);
        // console.log(templans.data);

      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()
  }, [])

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.userId || !formData.planId || !formData.paymentMethod) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }
    try {
      await axiosInstance.post("/api/payments", formData);
      setMessage("✅ Payment recorded successfully!");

      setFormData({
        userId: "",
        planId: "",
        paymentMethod: "",
        paymentDate: new Date().toISOString().split("T")[0],
      })

    }
    catch (error) {
      console.error("Error adding payment:", error);
      setMessage("❌ Error saving payment. Try again.");
    }
  }
  return (
      <>
        <div className="payment-container">
          <h2>Record Payment</h2>
          <form className="payment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>User</label>
              <select className="form-control" value={formData.userId} onChange={handleChange} name="userId" required >
                <option value="">-- Select User --</option>
                {users.map((u) => (
                  <option key={u._id} value={u.userId}>
                    {u.name} ({u.userId})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Plan</label>
              <select name="planId" value={formData.planId} onChange={handleChange} required>
                <option value="">-- Select Plan --</option>
                {plans.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} - ₹{p.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <select onChange={handleChange} value={formData.paymentMethod} name="paymentMethod" required>
                <option value="">---- select payment method ---</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
                <option value="UPI">UPI</option>
              </select>
            </div>

            <div className="form-group">
              <label>Payment Date</label>
              <input
                type="date"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-btn">
              Save Payment
            </button>
            {message && <p className="message">{message}</p>}

          </form>

        </div>


      </>
    )
  
}
export default Payments;