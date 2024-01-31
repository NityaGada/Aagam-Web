// import "./index.css";

// import axios from 'axios';

// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// export default function Subtypes() {
//     const { title } = useParams();
//     const navigate = useNavigate();
//     const [recieveddata, setrecieveddata] = useState([]); 
//     const [mainTitle, subtypename] = title.split('+');
//     useEffect(() => {
//         axios.get('http://localhost:4000/customizer', { params: { title: mainTitle } })
//             .then(response => {
//                 setrecieveddata(response.data);
//                 console.log("Response data: ", response.data);
//             })
//             .catch((error) => {
//             });
//     }, [mainTitle]);

//     return (
//         <div className="subtype-container">
//             {recieveddata.map((subtype, index) => (
//                 <button
//                     key={index} className="subtype-box"
//                     onClick={() => {
//                         const path = mainTitle !== subtype.name
//                             ? `${mainTitle}+${subtype.name}`
//                             : mainTitle;
                    
//                         navigate(`/customize/${path}`, {
//                             state: {
//                                 image1: `data:image/png;base64,${subtype.image}`,
//                                 ogimage: `data:image/png;base64,${subtype.image}`,
//                             },
//                         });
//                     }}
//                 >
//                     <img src={`data:image/png;base64,${subtype.image}`} alt={subtype.name} />
//                     <div style={{ color: 'black', textDecoration: 'none', fontSize: 1.5+'em' }}>{subtype.name}</div>
//                 </button>
//             ))}
//         </div>
//     );
// }

import "./index.css";

// import axios from 'axios';

// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

export default function Subtypes(props) {
    const subtypes = props.items_list;
    console.log(subtypes);
    // const { title } = useParams();
    // const navigate = useNavigate();
    // const [recieveddata, setrecieveddata] = useState([]); 
    // const [mainTitle, subtypename] = title.split('+');
    // const subtypes = props.items_list;
    // useEffect(() => {
    //     axios.get('http://localhost:4000/customizer', { params: { title: mainTitle } })
    //         .then(response => {
    //             setrecieveddata(response.data);
    //             console.log("Response data: ", response.data);
    //         })
    //         .catch((error) => {
    //         });
    // }, [mainTitle]);

    return (
        <div className="subtype-container">
            {subtypes.map((subtype, index) => (
                <button
                    key={index} className="subtype-box"
                    onClick={() => {props.on_subtypes_select(index)}}
                    // onClick={() => {
                    //     const path = mainTitle !== subtype.subtype_name
                    //         ? `${mainTitle}+${subtype.subtype_name}`
                    //         : mainTitle;
                    //     console.log("Subtypes", mainTitle);
                    //     navigate(`/customize/${path}`, {
                    //         state: {
                    //             main_type_name: mainTitle,
                    //             main_image: `data:image/png;base64,${subtype.subtype_image}`,
                    //             pattern_image: "",
                    //             hands_face_image: `data:image/png;base64,${subtype.subtype_handsandface_image}`,
                    //             original_main_image: `data:image/png;base64,${subtype.subtype_image}`,
                    //         },
                    //     });
                    // }}
                >
                    <img src={`data:image/png;base64,${subtype.subtype_image}`} alt={subtype.subtype_name} />
                    <div style={{ color: 'black', textDecoration: 'none', fontSize: 1.5+'em' }}>{subtype.subtype_name}</div>
                </button>
            ))}
        </div>
    );
}
