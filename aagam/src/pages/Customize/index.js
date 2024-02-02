// import { useLocation } from "react-router-dom";

// import Main from "../../components/Main";
// import Subtypes from "../../components/Subtypes";
// import Theme from "../../components/Themes";

// export default function Customize() {
//     const { state } = useLocation();

//     var image1 = state.image1;
//     var image2 = state.image2;
//     var ogimage = state.ogimage;
//     var bodypart = state.handsface;
//     console.log("Main called:-", image1, image2, ogimage, bodypart);
//     return <>
//         <div style={{ width: '100%', display: 'flex', marginTop: 1 + 'em' }}>
//             <div style={{ flex: 4 }}>
//                 <Main img1={image1} img2={image2} ogimage={ogimage} handsface={bodypart} />
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 1 + 'em' }}>
//                 <Subtypes />
//             </div>
//         </div>
//         <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '1em 0' }}>
//             <Theme img1={image1} img2={image2} ogimage={ogimage} handsface={bodypart} />
//         </div>
//     </>
// }

import { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { useParams, useSearchParams } from "react-router-dom";

import Main from "../../components/Main";
import Subtypes from "../../components/Subtypes";
import Theme from "../../components/Themes";

export default function Customize() {
    // console.log("Customizer called");
    const { type_name } = useParams();
    const [search_params] = useSearchParams();
    const sub_type_name = search_params.get('sub_type_name');
    const pattern = search_params.get('pattern');
    // const [main_type_name, sub_type_name] = type_name.split('+');
    // console.log(main_type_name);
    console.log(type_name, pattern);

    const reqiured_data = useRef(null);

    // const [selected_subtype_idx, set_selected_subtype_idx] = useState(-1);
    // const [selected_pattern_idx, set_selected_pattern_idx] = useState(-1);
    const [ready, set_ready] = useState(false);

    // function handle_subtypes_select(idx) {
    //     set_selected_subtype_idx(idx);
    // }

    // function handle_patterns_select(idx) {
    //     set_selected_pattern_idx(idx);
    // }

    useEffect(() => {
        console.log("useEffect called");
        axios({
            method: 'post',
            url: 'http://localhost:4000/customizer',
            data: {
                mainTypeName: type_name,
            }
        })
        .then(response => {
            reqiured_data.current = response.data;
            set_ready(true);
            console.log("Response data: ", reqiured_data.current);
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
    });
    // console.log("--->", recieveddata);
    // const main_image = recieveddata.main_image;
    // // const pattern_image = state.pattern_image;
    // const hands_face_image = recieveddata.handsandface_image;
    // const original_main_image = recieveddata.main_image;
    // console.log(recieveddata.subtypes);
    // if (recieveddata.length === 0) {
    //     return false
    // }



    if (!ready) {
        return <h1>Loading</h1>
    }

    // const main_image = selected_subtype_idx === -1 ? reqiured_data.current.main_image : reqiured_data.current.subtypes[selected_subtype_idx].subtype_image;
    // const handsandface_image = selected_subtype_idx === -1 ? reqiured_data.current.handsandface_image : reqiured_data.current.subtypes[selected_subtype_idx].subtype_handsandface_image;
    // const pattern_image = selected_pattern_idx === -1 ? '' : reqiured_data.current.patterns[selected_pattern_idx].pattern_image;
    const main_image = !sub_type_name ? reqiured_data.current.main_image : reqiured_data.current.subtypes.find(s => s.subtype_name === sub_type_name).subtype_image;
    const handsandface_image = !sub_type_name ? reqiured_data.current.handsandface_image : reqiured_data.current.subtypes.find(s => s.subtype_name === sub_type_name).subtype_handsandface_image;
    const pattern_image = !pattern ? '' : reqiured_data.current.patterns.find(p => p.name === pattern).pattern_image;
    
    return <>
        {/* <img src = {`data:image/png;base64,${main_image}`} />
        <img src = {`data:image/png;base64,${handsandface_image}`} />
        <img src = {`data:image/png;base64,${pattern_image}`} /> */}
        <div style={{ width: '100%', display: 'flex', marginTop: 1 + 'em' }}>
            <div style={{ flex: 4 }}>
                <Main img1={main_image} img2={pattern_image} ogimage={main_image} handsface={handsandface_image} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 1 + 'em' }}>
                <Subtypes items_list = {reqiured_data.current.subtypes} />
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '1em 0' }}>
            <Theme items_list = {reqiured_data.current.patterns} />
        </div>
    </>
}