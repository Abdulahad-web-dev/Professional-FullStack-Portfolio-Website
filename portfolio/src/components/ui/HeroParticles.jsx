import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const HeroParticles = () => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let mounted = true;

        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            if (mounted) {
                setReady(true);
            }
        });

        return () => {
            mounted = false;
        };
    }, []);

    if (!ready) {
        return null;
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 18% 20%, rgba(59,130,246,0.22), transparent 22%), radial-gradient(circle at 82% 24%, rgba(56,189,248,0.18), transparent 24%), linear-gradient(180deg, rgba(2,6,23,0.06), rgba(2,6,23,0.3))',
                }}
            />
            <Particles
                id="hero-particles"
                className="absolute inset-0"
                options={{
                    fullScreen: { enable: false },
                    background: { color: 'transparent' },
                    fpsLimit: 60,
                    detectRetina: true,
                    particles: {
                        number: {
                            value: 68,
                            density: {
                                enable: true,
                                area: 900,
                            },
                        },
                        color: {
                            value: ['#60A5FA', '#38BDF8', '#93C5FD'],
                        },
                        links: {
                            enable: true,
                            distance: 130,
                            color: '#60A5FA',
                            opacity: 0.4,
                            width: 1,
                        },
                        move: {
                            enable: true,
                            speed: 0.8,
                            outModes: {
                                default: 'bounce',
                            },
                        },
                        opacity: {
                            value: { min: 0.35, max: 0.9 },
                        },
                        size: {
                            value: { min: 1.4, max: 3.8 },
                        },
                    },
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: ['grab', 'repulse'],
                            },
                            resize: {
                                enable: true,
                            },
                        },
                        modes: {
                            grab: {
                                distance: 170,
                                links: {
                                    opacity: 0.75,
                                },
                            },
                            repulse: {
                                distance: 110,
                                duration: 0.45,
                                factor: 180,
                                speed: 1.1,
                                maxSpeed: 42,
                                easing: 'ease-out-quad',
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default HeroParticles;
