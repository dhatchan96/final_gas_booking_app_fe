// src/components/Payment.jsx
import React from 'react';

const Payment = () => (
  <div className="container mt-5">
    <h2 className="mb-4">Payment</h2>
    <form>
      <div className="mb-3">
        <label className="form-label">Card Number</label>
        <input type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Expiration Date</label>
        <input type="text" className="form-control" placeholder="MM/YY" />
      </div>
      <div className="mb-3">
        <label className="form-label">CVV</label>
        <input type="text" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Pay Now</button>
    </form>
  </div>
);

export default Payment;
