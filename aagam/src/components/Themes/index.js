import "./index.css";

import { ThemeItems } from "../MenuItems";

import { useNavigate, useParams } from 'react-router-dom';

export default function Theme(props) {
    const { title, subtype } = useParams();
    const navigate = useNavigate();
    console.log(props);
    return (
        <div className="theme-container">
            {ThemeItems.map((theme, index) => (
                <button
                    key={index} className="subtype-box"
                    onClick={() => {
                        navigate(`/customize/${title}${subtype ? `/${subtype}` : ''}/${theme.name}`, {
                            state: {
                                image1: props.img1,
                                image2: theme.source,
                                ogimage: props.ogimg,
                                handsface: props.handsface,
                            },
                        });
                    }}
                >
                    <img src={theme.source} alt="theme_item_img" />
                    <div style={{ color: 'black', textDecoration: 'none' }}>{theme.name}</div>
                </button>
            ))}
        </div>
    );
};