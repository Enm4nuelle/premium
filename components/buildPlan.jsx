"use client";

import DestinosJson from "../data/destinys.json";
import { useEffect, useState } from "react";

export const BuildPlan = (props) => {
    const locations = props.data.dataFromJson ? DestinosJson.locations : props.data.locations;
    const destinys = props.data.dataFromJson ? DestinosJson.destinys : props.data.destinys;

    //variables para controlar destinos y locacion elegidas
    const [locationSelect, setLocationSelect] = useState(null);
    const [destinysChosen, setDestinysChosen] = useState([]); //se refiere a los que cumplen la condicion de la locacion seleccionada
    const [destinysSelect, setDestinysSelect] = useState([]); //se refiere a los que escogio el usuario para cotizar (dandole al checkbox)
    const [messageWhatsapp, setMessageWhatsapp] = useState(props.data.buttonCotization.defaultMessage);

    //funciones para capturar elecciones del usuario
    const handleSelectLocation = (id) => {
        if(locationSelect){
            if(locationSelect.idLocation === id){
                return;
            }
        }
        setLocationSelect(locations.filter((l)=>l.idLocation === id)[0]);
        setDestinysChosen(
            destinys.filter((d) => d.idLocation === id).map((dest)=>{
                let auxDest = dest;
                auxDest.isChosen = false;
                return auxDest;
            })
        );
        setDestinysSelect([]);
    }

    const handleChangeCheckbox = (destChosen) =>{
        destChosen.isChosen = !destChosen.isChosen;
        setDestinysSelect(destinysChosen.filter((d) => d.isChosen));
        console.log(destinysSelect);
    }

    const sumaTotalPlanes = () => {
        let auxSuma = 0;
        for(let i = 0; i < destinysSelect.length; i++){
            auxSuma = auxSuma + parseInt(destinysSelect[i].price);
        }
        return auxSuma;
    }

    useEffect(()=>{
        if(!locationSelect){
            return;
        }
        if(destinysSelect.length === 0){
            setMessageWhatsapp(props.data.buttonCotization.firstPartMessage + locationSelect.name + ".");
        }else{
            let auxMessageWhatsap = props.data.buttonCotization.firstPartMessage;
            if(destinysSelect.length === 1){
                auxMessageWhatsap = auxMessageWhatsap + destinysSelect[0].name + ".";
            }else{
                for(let i = 0; i < destinysSelect.length; i++){
                    if(i === destinysSelect.length - 1){//estamos en el ultimo elemento
                        auxMessageWhatsap = auxMessageWhatsap + " y " + destinysSelect[i].name + ".";
                    }else if(i === destinysSelect.length - 2){//estamos en el penultimo elemento
                        auxMessageWhatsap = auxMessageWhatsap + destinysSelect[i].name + " ";
                    }else{
                        auxMessageWhatsap = auxMessageWhatsap + destinysSelect[i].name + ", ";
                    }
                }
            }
            setMessageWhatsapp(auxMessageWhatsap);
        }
    }, [props, locationSelect, destinysSelect])
    return (
        <section className={"buildPlan " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <div className="buildPlan-header">
                {
                    props.data.isMainH1 ?
                    <h1 className="buildPlan-header-title">{props.data.title}</h1>
                    :
                    <h2 className="buildPlan-header-title">{props.data.title}</h2>
                }
                <div className="buildPlan-header-divider"></div>
                <p className="buildPlan-header-description">{props.data.description}</p>
            </div>
            <ul className="buildPlan-locations">
                {
                    locations.map((loc, index)=>(
                        <li
                            className={"buildPlan-locations-location " + (locationSelect ? locationSelect.idLocation === loc.idLocation ? "buildPlan-locations-location-selected" : "" : "")}
                            key={loc.name + index}
                            onClick={()=>{handleSelectLocation(loc.idLocation)}}
                        >
                            {
                                props.data.isMainH1 ?
                                <h2 className="buildPlan-locations-location-title">{loc.name}</h2>
                                :
                                <h3 className="buildPlan-locations-location-title">{loc.name}</h3>
                            }
                            <p className="buildPlan-locations-location-description">{loc.description}</p>
                            <img
                                className="buildPlan-locations-location-img"
                                alt={loc.altImg ?? loc.name}
                                src={loc.img}
                            />
                        </li>
                    ))
                }
            </ul>
            {
                locationSelect ?
                <div className="buildPlan-destinys">
                    <ul className="buildPlan-destinys-list">
                        {
                            destinysChosen.map((destChosen, index) => (
                                <li className="buildPlan-destinys-list-item" key={"destinysChosen " + destChosen.name + index}>
                                    <img
                                        className="buildPlan-destinys-list-item-img"
                                        alt={destChosen.altImg ?? destChosen.name}
                                        src={destChosen.img}
                                    />
                                    <div className="buildPlan-destinys-list-item-info">
                                        {
                                            props.data.isMainH1 ?
                                            <h3 className="buildPlan-destinys-list-item-info-name">{destChosen.name}</h3>
                                            :
                                            <h4 className="buildPlan-destinys-list-item-info-name">{destChosen.name}</h4>
                                        }
                                        <p className="buildPlan-destinys-list-item-info-duration">{props.data.labelDuration}{destChosen.duration}</p>
                                        <p className="buildPlan-destinys-list-item-info-description">{destChosen.description}</p>
                                        <p className="buildPlan-destinys-list-item-info-price">{destChosen.currencySymbol + destChosen.price}</p>
                                    </div>
                                    <div className="buildPlan-destinys-list-item-checkbox-container">
                                        <input
                                            type="checkbox"
                                            className="buildPlan-destinys-list-item-checkbox-input"
                                            value={destChosen.isChosen}
                                            checked={destChosen.isChosen} 
                                            onChange={()=>{handleChangeCheckbox(destChosen)}}
                                        />
                                        <p className="buildPlan-destinys-list-item-checkbox-label">{props.data.labelCheckbox}</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="buildPlan-destinys-selected">
                        {
                            destinysSelect.map((destSelect, index)=>(
                                <div className="buildPlan-destinys-selected-item" key={"destinysSelect " + destSelect.name + index}>
                                    <img
                                        className="buildPlan-destinys-selected-item-img"
                                        alt={destSelect.altImg ?? destSelect.name}
                                        src={destSelect.img}
                                    />
                                    {
                                        props.data.isMainH1 ?
                                        <h3 className="buildPlan-destinys-selected-item-name">{destSelect.name}</h3>
                                        :
                                        <h4 className="buildPlan-destinys-selected-item-name">{destSelect.name}</h4>
                                    }
                                    <p className="buildPlan-destinys-selected-item-price">
                                        {destSelect.currencySymbol + destSelect.price}
                                        <i
                                            className={"buildPlan-destinys-selected-item-deleteIcon " + props.data.iconDelete}
                                            onClick={()=>{
                                                destSelect.isChosen = false
                                                setDestinysSelect(destinysChosen.filter((d)=> d.isChosen))
                                            }}
                                        ></i>
                                    </p>
                                </div>
                            ))
                        }
                        <div className="buildPlan-destinys-selected-total">
                            {/* Cambiar para manejar precios en dolares soles en el futuro */}
                            <p className="buildPlan-destinys-selected-item-totalPrice">{props.data.labelTotalPrice}{destinys[0].currencySymbol}{sumaTotalPlanes()}</p>
                        </div>
                        <a
                            className="buttonPrimary buildPlan-destinys-selected-button"
                            href={
                                props.data.buttonCotization.hrefDestiny === "whatsapp" ?
                                `https://wa.me/${props.data.buttonCotization.number}?text=${encodeURIComponent(messageWhatsapp)}`
                                :
                                ""
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Contacto Whatsapp"
                        >
                            {props.data.buttonCotization.text}
                            <i className={"buildPlan-destinys-selected-button-icon " + props.data.buttonCotization.icon}></i>
                        </a>
                    </div>
                </div>
                :
                <p className="buildPlan-showDestiny">{props.data.labelNoShowDestiny}</p>
            }
        </section>
    )
}
export default BuildPlan;