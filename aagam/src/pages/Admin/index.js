import { useRef, useState, useEffect } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

import Admintypes from "../../components/Admintypes";

export default function Admin() {
    const [recieveddata, setrecieveddata] = useState([]);
    const navigate = useNavigate();

    let type_name = useRef();
    let type_image = useRef();
    let type_hands_face = useRef();

    useEffect(() => {
        axios.post('http://localhost:4000/admin')
            .then(response => {
                setrecieveddata(response.data);
                console.log("Response data: ", response.data);
            })
            .catch((error) => {
            });
    }, []);

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
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 5 + '%' }}>
                <Popup trigger=
                    {<button style={{ fontSize: 1.2 + 'em', width: 15 + '%', cursor: 'pointer' }}> Add Cloth Type</button>}
                    modal nested>
                    {
                        close => (
                            <div className='modal'>
                                <div className="formdiv">
                                    <input type="text" ref={type_name} placeholder="Type Name" />
                                </div>
                                <div className="formdiv">
                                    <label>
                                        Type Image:
                                        <input type="file" onChange={(e) => handleImageChange(e, type_image)} />
                                    </label>
                                    <label>
                                        Hands and Face Image:
                                        <input type="file" onChange={(e) => handleImageChange(e, type_hands_face)} />
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
                                            url: 'http://localhost:4000/admin/add_type',
                                            data: {
                                                name: type_name.current.value,
                                                main_image: Array.from(type_image.current),
                                                hands_and_face: Array.from(type_hands_face.current),
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
                <button onClick={() => {
                    navigate("/adminpattern")
                }} style={{ fontSize: 1.2 + 'em', width: 15 + '%', cursor: 'pointer' }}> Patterns</button>
            </div >
            <div style={{ display: 'flex', flexFlow: 'row', width: 100 + '%', flexWrap: 'wrap', gap: 2.5 + '%' }}>
                {recieveddata.map((item, index) => (
                    <Admintypes
                        name={item.name}
                        main_image={item.main_image}
                        subtype_names={item.subtype_names}
                        subtype_images={item.subtype_images}
                    />
                ))}
            </div>
        </>
    )
}