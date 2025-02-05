"use client";

import { useEffect, useRef } from "react";

const DynamicGrid = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const gridSize = 18;
        const gridColor = "rgba(65, 61, 61, 0.8)";

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawGrid();
        };

        const drawGrid = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 0.1;

            for (let x = 0; x <= canvas.width; x += gridSize) {
                for (let y = 0; y <= canvas.height; y += gridSize) {
                    ctx.strokeRect(x, y, gridSize, gridSize);
                }
            }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas(); // Initial draw

        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                opacity: "50%",
                zIndex: -100
            }}
        />
    );
};

export default DynamicGrid;
