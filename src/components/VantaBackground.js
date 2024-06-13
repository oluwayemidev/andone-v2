// VantaClouds.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

const VantaClouds = () => {
    const vantaRef = useRef(null);

    useEffect(() => {
        const vantaEffect = CLOUDS({
            el: vantaRef.current,
            THREE: THREE,
            skyColor: 0x87ceeb,
            cloudColor: 0xffffff,
            cloudShadowColor: 0x000000,
            sunColor: 0xffd700,
            sunGlareColor: 0xffa500,
            sunlightColor: 0xffd700,
            speed: 1.00
        });

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    return <div ref={vantaRef} style={{ width: '100%', height: '100vh' }} />;
};

export default VantaClouds;
