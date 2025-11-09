import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login'
import Home from './components/Home'

import ListCustomer from './components/ListCustomer'
import AddCustomer from './components/AddCustomer'
import Plans from './components/Plans'
import Payments from './components/Payments'
function App() {
  

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login />}></Route>
          
          <Route path="/home/*" element={<Home />}>
          {/* <Route index element={<ListCustomer />} /> ✅ Default page */}
              {/* Nested routes inside Home */}
              <Route path="list-customer" element={<ListCustomer/>}></Route>
              <Route path="add-customer" element={<AddCustomer/>}></Route>
              <Route path="plans" element={<Plans/>}></Route>
              <Route path="payments" element={<Payments/>}></Route>
          </Route>

        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
