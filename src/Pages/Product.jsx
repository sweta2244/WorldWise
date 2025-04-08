import React from "react";
import Dog from "/product.jpg";
import NavBar from "../Components/NavBar";
export default function Product() {
  return (
    <>
      <NavBar/>
      <div className="product-section">
        <img src={Dog} alt="image" width="400px"/>
        <div className="product-description">
          <h1>About WorldWide.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            doloribus libero sunt expedita ratione iusto, magni, id sapiente sequi
            officiis et.
          </p>
        </div>
      </div>
    </>
  );
}
