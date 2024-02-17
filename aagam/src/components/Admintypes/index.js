import "./index.css";

import { useRef, useState } from "react";

import axios from "axios";
import Popup from 'reactjs-popup';

export default function Admintypes(props) {
    const [selectedTypeIndex, setSelectedTypeIndex] = useState(-1);

    const type_name = useRef();
    const subtype_name = useRef();
    const subtype_image = useRef();
    const subtype_hands_face = useRef();

    const handleTypeClick = (index) => {
        setSelectedTypeIndex(index);
    };

    const typelist = props.subtype_names;
    const imagelist = props.subtype_images;

    const handleImageChange = (e, imageRef) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const arrayBuffer = reader.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                imageRef.current = uint8Array;
            };
            reader.readAsArrayBuffer(file);
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
                        src={`data:image/png;base64,${selectedTypeIndex === -1 ? props.main_image : imagelist[selectedTypeIndex]}`}
                        alt='type_image'
                    />
                </div>
            </div>
            <div className="options" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.5em', marginTop: '1em', marginRight: '1em' }}>
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
                                        Hands, Face Image:
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
                                            url: 'http://localhost:4000/admin/add_subtype',
                                            data: {
                                                name: props.name,
                                                subtype_name: subtype_name.current.value,
                                                subtypes_image: Array.from(subtype_image.current),
                                                hands_and_face: Array.from(subtype_hands_face.current),
                                            }
                                        })
                                            .then(response => {
                                                if (response.status === 200) {
                                                    window.location.reload();
                                                }
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
                <Popup trigger=
                    {<button>Edit</button>}
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
                                            url: 'http://localhost:4000/admin/edit_subtype',
                                            data: {
                                                name: props.name,
                                                index: selectedTypeIndex,
                                                type_list: typelist,
                                                subtype_name: subtype_name.current.value,
                                                subtypes_image: Array.from(subtype_image.current),
                                                hands_and_face: Array.from(subtype_hands_face.current),
                                            }
                                        })
                                            .then(response => {
                                                if (response.status === 200) {
                                                    window.location.reload();
                                                }
                                            })
                                            .catch((error) => {
                                                alert("Error: " + error.response.data.message);
                                            })
                                    }} name="edit" value="Edit" />
                                </div>
                            </div>
                        )
                    }
                </Popup>
                <input type="submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/admin/delete_design',
                        data: {
                            name: props.name,
                            index: selectedTypeIndex,
                            type_list: typelist
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