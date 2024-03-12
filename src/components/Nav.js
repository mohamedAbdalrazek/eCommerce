import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";

function Nav(props) {
    
    return (
        <div className="navbar sticky-top">
            <div className="container">
                <div className="nav--cart" onClick={props.toggleCart}>
                    <span className="cart--icon">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </span>
                    <div className="cart--count">{props.cartLength}</div>
                </div>
                <form action="" className="nav--form">
                    <button className="form--submit">
                        <span >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>
                    </button>
                    <input
                        // onChange={props.handleChange}
                        type="text"
                        placeholder="Search..."
                        className="form--input"
                    />
                </form>
                <div className="nav--logo">
                    {/* <img src="images/logo.png" alt="Hand Made" /> */}
                    <a href="#">Artifex</a>
                    <div className="nav--social">
                        <span className="icon">    
                            <FontAwesomeIcon icon={faFacebook} />
                        </span>
                        <span className="icon">
                            <FontAwesomeIcon icon={faInstagram} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Nav;
