import "./index.css";

import { MenuItems } from "../MenuItems";

import { useParams, useNavigate } from 'react-router-dom';

export default function Subtypes() {
    const { title } = useParams();
    const navigate = useNavigate();

    const selectedItem = MenuItems.find((item) => item.title === title);

    if (!selectedItem) {
        return <div>Title not found</div>;
    }

    const subtypes = Object.keys(selectedItem)
        .filter((key) => key.startsWith('subtype'))
        .map((key) => selectedItem[key]);

    return (
        <div className="subtype-container">
            {subtypes.map((subtype, index) => (
                <button
                    key={index} className="subtype-box"
                    onClick={() => {
                        navigate(`/customize/${title}/${subtype.name}`, {
                            state: {
                                image1: subtype.source,
                                ogimage: subtype.source,
                            },
                        });
                    }}
                >
                    <img src={subtype.source} alt="menu_sub_item_img" />
                    <div style={{ color: 'black', textDecoration: 'none', fontSize: 1.5+'em' }}>{subtype.name}</div>
                </button>
            ))}
        </div>
    );
}
