


import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import "../assets/styles/Plans.css";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getPlans() {
      try {
        const res = await axiosInstance.get("/api/plans");
        console.log(res.data);
        setPlans(res.data);
      } catch (err) {
        console.error("Error fetching plans:", err);
      } finally {
        setLoading(false); // 👈 Stop loading after fetch
      }
    }
    getPlans();
  }, []);

  return (
    <div className="plans-container">
      <h2 className="plans-title">Our Plans</h2>
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading plans...</p>
        </div>
      ) :

        (
          <div className="plans-grid">
            {plans.length > 0 ? (
              plans.map((plan) => (
                <div className="plan-card" key={plan._id}>
                  <h3>{plan.name}</h3>
                  <p className="price">₹{plan.price}</p>
                  <p className="validity">{plan.validity}</p>
                  <p className="description">{plan.description}</p>
                </div>
              ))
            ) : (
              <p className="no-plans">No plans available</p>
            )}
          </div>
        )
      }
    </div>
  );
};

export default Plans;
