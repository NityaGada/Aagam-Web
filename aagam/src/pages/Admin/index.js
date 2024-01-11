import { useState, useEffect } from 'react';

import axios from 'axios';

import Admintypes from "../../components/Admintypes";

export default function Admin() {
    const [recieveddata, setrecieveddata] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:4000/admin')
            .then(response => {
                setrecieveddata(response.data);
                console.log("Response data: ", response.data);
            })
            .catch((error) => {
            });
    }, []);
    return <div style={{display: 'flex', flexFlow: 'row', width: 100+'%', flexWrap: 'wrap', gap: 2.5 +'%'}}>
        {recieveddata.map((item, index) => (
            <Admintypes
                name={item.name}
                main_image={item.main_image}
                subtype_names={item.subtype_names}
                subtype_images={item.subtype_images}
            />
        ))}
    </div>
}