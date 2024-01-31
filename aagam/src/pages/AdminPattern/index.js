import "./index.css";

import { useRef, useState, useEffect } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Popup from 'reactjs-popup';

export default function AdminPage() {
    const [recieveddata, setrecieveddata] = useState([]);
    const navigate = useNavigate();

    let name = useRef();
    let pattern_image = useRef();
    let length = useRef();

    useEffect(() => {
        axios.post('http://localhost:4000/adminpattern/')
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
                    {<button style={{ fontSize: 1.2 + 'em', width: 15 + '%', cursor: 'pointer' }}> Add Pattern </button>}
                    modal nested>
                    {
                        close => (
                            <div className='modal'>
                                <div className="patternformdiv">
                                    <input type="text" ref={name} placeholder="Pattern Name" />
                                </div>
                                <div className="patternformdiv">
                                    <label>
                                        Pattern Image:
                                        <input type="file" onChange={(e) => handleImageChange(e, pattern_image)} />
                                    </label>
                                </div>
                                <div className="patternformdiv">
                                    <input type="text" ref={length} placeholder="Pattern Length" />
                                </div>
                                <div className="modalbuttons">
                                    <button onClick=
                                        {() => close()}>
                                        Close
                                    </button>
                                    <input type="submit" onClick={() => {
                                        axios({
                                            method: 'post',
                                            url: 'http://localhost:4000/adminpattern/add',
                                            data: {
                                                name: name.current.value,
                                                pattern_image: Array.from(pattern_image.current),
                                                length: length.current.value
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
                    navigate("/admin")
                }} style={{ fontSize: 1.2 + 'em', width: 15 + '%', cursor: 'pointer' }}> Cloth Types </button>
            </div >
            <div style={{ display: 'flex', flexFlow: 'row', width: 100 + '%', flexWrap: 'wrap', gap: 2.5 + '%' }}>
                {recieveddata.map((item, index) => (
                    <div className="adminpatternbox">
                        <div className="patternimage">
                            <img src={`data:image/png;base64,${item.pattern_image}`} alt='type_image' />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div>{item.name}</div>
                            <div>Length: {item.length}</div>
                        </div>
                        <div className="patternoptions" style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5em' }}>
                            <Popup trigger=
                                {<button>Expand</button>}
                                modal nested>
                                {
                                    close => (
                                        <div className='expandedmodal'>
                                            <div className="expandedmodalbuttons">
                                                <button onClick=
                                                    {() => close()}>
                                                    X
                                                </button>
                                            </div>
                                            <div className="expandedimage">
                                                <img src={`data:image/png;base64,${item.pattern_image}`} alt='type_image' />
                                            </div>
                                        </div>
                                    )
                                }
                            </Popup>
                            <input type="submit" onClick={() => {
                                axios({
                                    method: 'post',
                                    url: 'http://localhost:4000/adminpattern/delete',
                                    data: {
                                        name: item.name,
                                        length: item.length
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
                ))}
            </div>
        </>
    )
}
