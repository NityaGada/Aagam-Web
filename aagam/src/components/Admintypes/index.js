import "./index.css";

import { useRef, useState } from "react";

import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

export default function Admintypes(props) {
    const [selectedTypeIndex, setSelectedTypeIndex] = useState(-1);
    const navigate = useNavigate();

    let type_name = useRef();
    let subtype_name = useRef();
    let subtype_image = useRef();
    let subtype_hands_face = useRef();

    const handleTypeClick = (index) => {
        setSelectedTypeIndex(index);
    };

    let typelist = props.subtype_names;
    let imagelist = props.subtype_images;

    const handleImageChange = (e, imageRef) => {
        const file = e.target.files[0];
    
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(',')[1];
                const binaryData = Uint8Array.from(atob(base64Data), (char) => char.charCodeAt(0));
                imageRef.current = binaryData;
                console.log(binaryData);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="adminbox">
            <div style={{ display: 'flex', flexFlow: 'row' }}>
                <div className="type">
                    <button
                        onClick={() => handleTypeClick(-1)}
                        className={'selected'}
                    >
                        {props.name}
                    </button>
                    {typelist.map((subtype, index) => (
                        <button
                            key={index}
                            onClick={() => handleTypeClick(index)}
                            className={selectedTypeIndex === index ? 'selected' : ''}
                        >
                            {subtype}
                        </button>
                    ))}
                </div>
                <div className="typeimage">
                    <img
                        src={`data:image;base64,${selectedTypeIndex === -1 ? props.main_image : imagelist[selectedTypeIndex]}`}
                        alt='type_image'
                    />
                </div>
            </div>
            <div className="options" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.5em' }}>
                <Popup trigger=
                    {<button>Add</button>}
                    modal nested>
                    {
                        close => (
                            <div className='modal'>
                                <div className="formdiv">
                                    <input type="text" ref={type_name} placeholder="Type Name" value={props.name} readOnly />
                                    <input type="text" ref={subtype_name} placeholder="Subtype Name" />
                                </div>
                                <div className="formdiv">
                                    <label>
                                        Subtype Image:
                                        <input type="file" onChange={(e) => handleImageChange(e, subtype_image)} />
                                    </label>
                                    <label>
                                        Hands and Face Image:
                                        <input type="file" onChange={(e) => handleImageChange(e, subtype_hands_face)} />
                                    </label>
                                </div>
                                <div className="modalbuttons">
                                    <button onClick=
                                        {() => close()}>
                                        Close
                                    </button>
                                    <input type="submit" onClick={() => {
                                        axios({
                                            method: 'post',
                                            url: 'http://localhost:4000/admin/add',
                                            data: {
                                                name: props.name,
                                                subtype_name: subtype_name.current.value,
                                                subtypes_image: subtype_image.current.value,
                                                hands_and_face: subtype_hands_face.current.value,
                                            }
                                        })
                                            .then(response => {
                                                navigate("/admin");
                                            })
                                            .catch((error) => {
                                                alert("Error: " + error.response.data.message);
                                            })
                                    }} name="add" value="Add" />
                                </div>
                            </div>
                        )
                    }
                </Popup>
                {/* <button>Edit</button> */}
                <input type="submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/admin/delete',
                        data: {
                            index: selectedTypeIndex,
                            name: props.name
                        }
                    })
                        .then(response => {
                            window.location.reload();
                        })
                        .catch((error) => {
                            alert("Error: " + error.response.data.message);
                        })
                }} name="delete" value="Delete" />
            </div>
        </div>
    )
}