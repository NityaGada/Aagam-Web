// import "./index.css";

// import { ThemeItems } from "../MenuItems";

// import { useNavigate, useParams } from 'react-router-dom';

// export default function Theme(props) {
//     const { title} = useParams();
//     const navigate = useNavigate();
//     console.log(props);
//     return (
//         <div className="theme-container">
//             {ThemeItems.map((theme, index) => (
//                 <button
//                     key={index} className="theme-box"
//                     onClick={() => {
//                         navigate(`/customize/${title}/${theme.name}`, {
//                             state: {
//                                 image1: props.img1,
//                                 image2: theme.source,
//                                 ogimage: props.ogimage,
//                                 handsface: props.handsface,
//                             },
//                         });
//                     }}
//                 >
//                     <img src={theme.source} alt="theme_item_img" />
//                     <div style={{ color: 'black', textDecoration: 'none' }}>{theme.name}</div>
//                 </button>
//             ))}
//         </div>
//     );
// };

import "./index.css";

// import { ThemeItems } from "../MenuItems";

// import { useNavigate, useParams } from 'react-router-dom';

export default function Theme(props) {
    // const { title} = useParams();
    // const navigate = useNavigate();
    const patterns = props.items_list;
    return (
        <div className="theme-container">
            {patterns.map((pattern, index) => (
                <button
                    key={index} className="theme-box"
                    onClick={() => {props.on_patterns_select(index)}}
                    // onClick={() => {
                    //     navigate(`/customize/${title}/${pattern.name}`, {
                    //         state: {
                    //             type_name: props.type_name,
                    //             main_image: props.img1,
                    //             pattern_image: `data:image/png;base64,${pattern.pattern_image}`,
                    //             hands_face_image: props.handsface,
                    //             original_main_image: props.ogimage,
                    //         },
                    //     });
                    // }}
                >
                    <img src={`data:image/png;base64,${pattern.pattern_image}`} alt={pattern.name} />
                    <div style={{ color: 'black', textDecoration: 'none' }}>{pattern.name}</div>
                </button>
            ))}
        </div>
    );
};