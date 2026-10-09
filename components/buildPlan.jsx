"use client";

import ScrollAnimation from "./scrollAnimation";
import DestinosJson from "../data/destinys.json";
import { useEffect, useState } from "react";

export const BuildPlan = (props) => {
    const locations = props.data.dataFromJson ? DestinosJson.locations : props.data.locations;
    const destinys = props.data.dataFromJson ? DestinosJson.destinys : props.data.destinys;

    //variables para controlar destinos y locacion elegidas
    const [locationSelect, setLocationSelect] = useState(null);
    const [destinysChosen, setDestinysChosen] = useState([]); //se refiere a los que cumplen la condicion de la locacion seleccionada
    const [destinysSelect, setDestinysSelect] = useState([]); //se refiere a los que escogio el usuario para cotizar (dandole al checkbox)

    //funciones para capturar elecciones del usuario
    const handleSelectLocation = (id) => {
        setLocationSelect(locations.filter((l)=>l.idLocation === id)[0]);
        setDestinysChosen(
            destinys.filter((d) => d.idLocation === id).map((dest)=>{
                let auxDest = dest;
                auxDest.isChosen = false;
                return auxDest;
            })
        );
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
                        <li className="buildPlan-locations-location" key={loc.name + index} onClick={()=>{handleSelectLocation(loc.idLocation)}}>
                            <img
                                className="buildPlan-locations-location-img"
                                alt={loc.altImg ?? loc.name}
                                src={loc.img}
                            />
                            {
                                props.data.isMainH1 ?
                                <h2 className="buildPlan-locations-location-title">{loc.name}</h2>
                                :
                                <h3 className="buildPlan-locations-location-title">{loc.name}</h3>
                            }
                            <p className="buildPlan-locations-location-description"></p>
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
                                    </div>
                                    <div className="buildPlan-destinys-list-item-checkbox-container">
                                        <input
                                            type="checkbox"
                                            className="buildPlan-destinys-list-item-checkbox-input"
                                            value={destChosen.isChosen}
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
                                    <p className="buildPlan-destinys-selected-item-price">{destSelect.currencySymbol + destSelect.price}</p>
                                </div>
                            ))
                        }
                        <div className="buildPlan-destinys-selected-total">
                            {/* Cambiar para manejar precios en dolares soles en el futuro */}
                            <p className="buildPlan-destinys-selected-item-totalPrice">{props.data.labelTotalPrice}{destinys[0].currencySymbol}{sumaTotalPlanes()}</p>
                        </div>
                    </div>
                </div>
                :
                <p className="buildPlan-showDestiny">{props.data.labelNoShowDestiny}</p>
            }
        </section>
    )
}
export default BuildPlan;