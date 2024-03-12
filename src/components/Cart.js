import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Cart(props) {
  console.log(props);

  const totalPrice = props.cartItems.totalPrice;
  const itemCount = props.cartItems.itemCount;
  const cartItems = props.cartItems.cartData;
  const toggleCart = props.toggleCart;
  const [showForm, setShowForm] = useState(false);
  const [showAddress, setShowAddress] = useState(true);
  const [showNameError, setShowNameError] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showDeliveryError, setShowDeliveryError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    homeDelivery: true,
    address: "",
    metro: "",
  });

  function handleChange(event) {
    const { name, value, type } = event.target;
    setFormData((prevFormData) => {
      let generalValue;
      if (type === "radio") {
        generalValue = name === "address" ? true : false;
      } else {
        generalValue = value;
      }
      return {
        ...prevFormData,
        [name]: generalValue,
      };
    });
  }

  let price = showAddress ? 50 : 25;

  function handleSubmit(event) {
    event.preventDefault();
    setShowConfirmation(true);
    props.clearCart();
  }
  const header = (
    <div className="cart--header">
      <p className="header--item-count">{itemCount} Item(s)</p>
      <h1 className="header--title">Shopping Cart</h1>
    </div>
  );

  const cartItem = cartItems.map((item) => {
    return (
      <div className="row cart--item" key={item.name}>
        <p
          className="item--delete"
          onClick={() => props.deleteItem(item.id, item)}
        >
          X
        </p>
        <div className="col-10 item--info">
          <div className="item--price">
            <span> {item.price} </span>
            <span className="price--tag">$</span>
          </div>
          <div className="extended--count">
            <button className="count" onClick={() => props.adjust(item, 1)}>
              +
            </button>
            <p className="count--number">{item.count}</p>
            <button className="count" onClick={() => props.adjust(item, -1)}>
              -
            </button>
          </div>
          <div>
            <h3 className="item--title">{item.title}</h3>
            <p className="item--description"> {item.minDesc}</p>
          </div>
        </div>
        <div className="col-2 item--image-container">
          <img
            src={require(`../cardImages/${item.name}.png`)}
            alt=""
            className="item--image"
          />
        </div>
      </div>
    );
  });

  const footer = (
    <div className="cart--footer ">
      <button
        className="cart--button "
        onClick={()=>setShowForm(itemCount > 0)}
      >
        Proceed to Checkout
      </button>
      <div className="cart--price">
        <span> {totalPrice} </span>
        <span className="price--tag">$</span>
      </div>
      <h3 className="cart--second-header">Total ({itemCount} Items)</h3>
    </div>
  );

  const customerForm = (
    <form className="customer" onSubmit={handleSubmit}>
      <div className="previous" onClick={()=>setShowForm(false)}>
        <p>Back to Shopping Cart</p>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      <div className="customer--name">
        <label htmlFor="name">Name</label>
        {showNameError && (
          <p className="customer--form-error">Please enter your name</p>
        )}
        <input
          type="text"
          placeholder="Name"
          name="name"
          id="name"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </div>
      <div className="customer--phone">
        <label htmlFor="phone">Phone Number</label>
        {showPhoneError && (
          <p className="customer--form-error">
            Please enter a valid phone number
          </p>
        )}
        <input
          type="number"
          placeholder="Phone Number"
        //   pattern="[0-9]{10}"
          name="phone"
          id="phone"
          onChange={handleChange}
          value={formData.phone}
          required
        />
      </div>
      <div className="customer--email">
        <label htmlFor="email">Email</label>
        {showEmailError && (
          <p className="customer--form-error">Please enter a valid email</p>
        )}
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          required
        />
      </div>
      <p className="customer--note">
        Delivery is available for Cairo and Giza only!
      </p>
      <div className="customer--option">
        <label htmlFor="home" className="radio--label">
          Home Delivery
        </label>
        <input
          type="radio"
          id="home"
          value="home"
          defaultChecked
          name="homeDelivery"
          checked={formData.homeDlivery}
          onChange={handleChange}
          required
          onClick={() => {
            setShowAddress(true);
          }}
        />
        <label htmlFor="metro" className="radio--label">
          Delivery to Metro Station
        </label>
        <input
          type="radio"
          id="metro"
          name="homeDelivery"
          checked={formData.homeDlivery}
          onChange={handleChange}
          value="metro"
          onClick={() => {
            setShowAddress(false);
          }}
        />
      </div>
      {showAddress ? (
        <div className="customer--address">
          <label htmlFor="address">Address in detail</label>

          <textarea
            name="address"
            id="address"
            placeholder="Address in detail"
            onChange={handleChange}
            value={formData.address}
          />
        </div>
      ) : (
        <div className="customer--metro">
          <label htmlFor="station">Nearest Metro Station</label>

          <input
            type="text"
            placeholder="Nearest Metro Station"
            name="metro"
            id="station"
            onChange={handleChange}
            value={formData.metro}
            required
          />
        </div>
      )}
      {showDeliveryError && (
        <p className="customer--form-error">
          Please enter the address correctly
        </p>
      )}
      <div className="customer--conclusion">
        <p>Price: ${totalPrice}</p>
        <p>
          {showAddress ? " Home Delivery" : "To the nearest metro station"}{" "}
          Shipping Fee: ${price}
        </p>
        <p>Total Price: ${totalPrice + price}</p>
      </div>
      <button className="customer--send">Submit Order</button>
    </form>
  );

  const confirmation = (
    <div>
      <p className="confirmation--text">
        Your order has been successfully submitted. We will contact you within
        24 hours to confirm the order.
      </p>
      <button className="continue-shopping" onClick={()=>window.location.reload()}>
        Continue Shopping
      </button>
    </div>
  );

  return (
    <div className="cart">
      <div className="cart--overlay" onClick={toggleCart}></div>
      <div className="container">
        {!showConfirmation ? (
          <p className="cart--close" onClick={toggleCart}>
            X
          </p>
        ) : undefined}
        {!showForm ? (
          <div>
            {header}
            {cartItem}
            {footer}
          </div>
        ) : !showConfirmation ? (
          <div>{customerForm}</div>
        ) : (
          <div className="confirmation">{confirmation}</div>
        )}
      </div>
    </div>
  );
}

export default Cart;
