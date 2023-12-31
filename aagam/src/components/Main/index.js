import React, { useEffect, useRef } from 'react';

import "./index.css";

export default function Main(props) {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");

            const img1 = new Image();
            const img2 = new Image();
            const img3 = new Image();

            let cnt = 3;

            const go = () => {
                // If img2 is provided, follow the existing logic
                // create a pattern
                ctx.fillStyle = ctx.createPattern(img2, "repeat");

                // fill canvas with pattern
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // use blending mode multiply
                ctx.globalCompositeOperation = "multiply";

                // draw model image (shirt) on top
                ctx.drawImage(img1, 0, 0, img1.width * 0.5, img1.height * 0.5);

                // change composition mode
                ctx.globalCompositeOperation = "destination-in";

                // draw to cut out model image (shirt)
                ctx.drawImage(img1, 0, 0, img1.width * 0.5, img1.height * 0.5);

                // Reset composition mode to default
                ctx.globalCompositeOperation = "source-over";

                // draw the new image on top
                ctx.drawImage(img3, 3, 2, img3.width * 0.5, img3.height * 0.5); // Adjust position and size as needed
            };

            img1.onload = img2.onload = img3.onload = function () {
                if (!--cnt) go();
            };

            img1.src = props.img1; // Shirt
            img2.src = props.img2; // Pattern
            img3.src = props.handsface; // New image
        }
    }, [props.img1, props.img2, props.handsface]);

    return (
        <>
            {props.img2 ? (
                <canvas
                    ref={canvasRef}
                    width={500}
                    height={500}
                    alt="Nawabi"
                />
            ) : (
                <img src={props.ogimg} alt="OgImage" style={{width: 500+'px', height: 500+'px', objectFit: 'contain'}}/>
            )}
        </>
    );
}
