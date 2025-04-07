import React from "react";
import City from "/pricing.jpg";
export default function Pricing() {
  return (
    <div className="pricing-section">
      <div className="pricing-description">
        <h1>Simple pricing.</h1>
        <h1>Just $9/month.</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
          labore mollitia iusto. Recusandae quos provident, laboriosam fugit
          voluptatem iste.
        </p>
      </div>
      <img src={City} alt="image" width="400px" height="400px"/>
    </div>
  );
}
