const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());// parse JSON

// 1️⃣ Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(" MongoDB Connection Error:", err.message));

// app.get("/", (req, res) => {
//   res.send("Cable Admin Backend Running Successfully!");
// });


// 2️⃣ Define Mongoose Plan model(table)
const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  validity: { type: String },       // optional
  description: { type: String },    // optional
});

let plan = mongoose.model("plans", planSchema);

// 3️⃣ GET API to fetch all plans
app.get("/api/plans", async (req, res) => {
  // console.log("called");

  try {
    const plans = await plan.find(); // fetch all plans from DB
    res.json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: "Server error" });
  }
})




// Schema for User
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
// Create model
let userModel = mongoose.model("customer", userSchema);

// Generate custom userId (like CUST001, CUST002, etc.)
async function generateUserId() {
  const lastUser = await userModel.findOne().sort({ _id: -1 });
  if (!lastUser) return "CUST001";
  const lastId = lastUser.userId;
  const lastNum = parseInt(lastId.replace("CUST", ""));
  const newNum = lastNum + 1;
  return "CUST" + String(newNum).padStart(3, "0");
}

// create new user api
app.post("/api/create-new-user", async (req, res) => {
  try {
    const { name, gender, mobile, address } = req.body;
    if (!name || !gender || !mobile || !address) {
      res.status(400).json({ message: "all field are required" })
    }
    const userId = await generateUserId();
    let newUser = new userModel({
      userId,
      name,
      gender,
      mobile,
      address,
    });
    await newUser.save()
    res.status(201).json({ message: "User created successfully", user: newUser })
  }
  catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
})

// api to all user
app.get("/api/get-alluser", async (req, res) => {
  try {
    let users = await userModel.find();
    res.json(users)
    // If you don’t specify a status code, Express automatically sends 200 OK by default.
        // it’s actually the same as:
      // res.status(200).json(users);
  }
  catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: "Server error" });
  }
})



// Payment Schema
let paymentSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  planId: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: String,
    required: true,
  },
})

// Create Payment Model
let paymentModel = mongoose.model("payment", paymentSchema)

// ✅ POST API — Record Payment
app.post("/api/payments", async (req, res) => {
  try {
    let { userId, planId, paymentMethod, paymentDate } = req.body;

    // Validate all fields
    if (!userId || !planId || !paymentMethod || !paymentDate) {
      return res.status(400).json({ message: "⚠️ All fields are required" });
    }
    // Create new payment
    let newPaymentRecord = new paymentModel({
      userId,
      planId,
      paymentMethod,
      paymentDate,
    })
    await newPaymentRecord.save()
    res.status(201).json({
      message: "✅ Payment recorded successfully!",
      payment: newPaymentRecord,
    });
  } catch (error) {
    console.error("Error recording payment:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
})

// 5️⃣ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
