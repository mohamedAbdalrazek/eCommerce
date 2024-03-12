import { React, useState } from "react";
import ExtendedCard from "./ExtendedCard";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";

function Main(props) {
    const [data, setData] = useState(props.data);
    const [showExtended, setShowExtended] = useState(false);
    const [currentId, setCurrentId] = useState();
    const [currentItem, setCurrentItem] = useState([]);
    function toggleExtended(id) {
        if (id) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    setCurrentItem(data[i]);
                    break;
                }
            }
            setCurrentId(id);
        }
        setShowExtended((prevShowExtended) => !prevShowExtended);
    }
    
    const dataCard = data.map((card) => {
        return (
            <div
                className={`card col-sm-6 col-md-4 col-lg-3 ${!card.itemsNumber?"unavailable":undefined}`}
                onClick={card.itemsNumber? () => toggleExtended(card.id):undefined}
            >
                {!card.itemsNumber?<span className="card--unavailable">Out of stock</span>:undefined}
                <div className="card--image-container">
                    <img
                        src={require(`../cardImages/${card.name}.png`)}
                        alt=""
                        className="card--photo"
                    />
                </div>
                <div className="card--info">
                    <div className="card--header">
                    <h1 className="card--title">{card.title}</h1>
                        {
                        
                        <div className="card--price">
                            <span> {card.price} </span>
                            <span className="price--tag">EGP</span>
                        </div>}
                        
                    </div>
                    <p className="card--description">{card.minDesc}</p>
                    {/* <button className="card--add" onClick={()=>props.addItem(card.id)}>اضف الي عربة التسوق</button> */}
                </div>
            </div>
        );
    });
    return (
        <div className="container main">
            <div className="row ">{dataCard}</div>
            {showExtended && (
                <ExtendedCard
                    toggleExtended={toggleExtended}
                    currentItem={currentItem}
                    id={currentId}
                    addItem={props.addItem}
                    toggleCart = {props.toggleCart}
                    cartLength = {props.cartLength}
                />
            )}
        </div>
    );
}
export default Main;
