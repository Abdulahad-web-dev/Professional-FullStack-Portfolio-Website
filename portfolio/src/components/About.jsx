import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useSupabaseQuery } from '../hooks/useSupabaseQuery';

const AnimatedCounter = ({ value, duration = 2, delay = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const timeoutId = setTimeout(() => {
                const controls = animate(0, value, {
                    duration,
                    ease: "easeOut",
                    onUpdate(val) { setCount(Math.floor(val)); }
                });
                return () => controls.stop();
            }, delay * 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [value, duration, isInView, delay]);

    return <span ref={ref}>{count}</span>;
};

const About = () => {
    const { data: settingsData } = useSupabaseQuery('settings', {
        eq: { column: 'id', value: 1 }
    });

    const siteData = settingsData?.[0] || null;

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            {/* Section divider */}
            <div className="section-divider mb-0" />

            {/* Background floating decor */}
            <div className="absolute top-0 right-0 w-64 h-64 -z-10 opacity-20 pointer-events-none">
                <div className="w-full h-full rounded-full blur-[80px]" style={{ background: 'rgba(139,92,246,0.1)' }} />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#8B5CF6' }}>
                        The Story Behind The Code
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Who Am I?
                    </h2>
                    <div className="mx-auto w-20 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)' }} />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left - Image & Identity Accent */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
                        className="relative"
                    >
                        <div
                            className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto group shadow-2xl"
                            style={{
                                border: '1px solid rgba(139,92,246,0.15)',
                                background: 'rgba(18,18,26,1)',
                            }}
                        >
                            <img
                                src={siteData?.profile_image_url || "/profile.png"}
                                alt={siteData?.site_name || "Abdulahad Warraich"}
                                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 hover:scale-105"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800';
                                }}
                            />
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, rgba(139,92,246,0.05) 40%, transparent 100%)'
                                }}
                            />
                        </div>

                        {/* Floating Experience Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="absolute -bottom-6 -right-2 md:right-10 bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl z-20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-white leading-none">3+</div>
                                <div className="text-[10px] leading-tight uppercase font-medium tracking-wider text-[#8B8BAA]">
                                    Years of Dedicated<br />Digital Crafting
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right - Text Identity */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                                Building <span style={{ color: '#8B5CF6' }}>Modern</span>, Scalable <br />
                                <span className="text-white/40 italic font-light">& Digital Solutions</span>
                            </h3>

                            <div className="space-y-6 text-sm md:text-base leading-relaxed" style={{ color: '#8B8BAA' }}>
                                <p>
                                    I'm <span className="text-white font-medium">Abdulahad Warraich</span>, a Full Stack Developer and Computer Science student with a deep-rooted passion for creating intuitive, high-performance web experiences.
                                </p>
                                
                                {/* Step 5 - Proof Stats Row */}
                                <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5 my-8">
                                    <div className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                            <AnimatedCounter value={15} />+
                                        </div>
                                        <div className="text-[10px] uppercase tracking-widest font-bold text-[#8B5CF6]">Projects</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                            <AnimatedCounter value={12} />+
                                        </div>
                                        <div className="text-[10px] uppercase tracking-widest font-bold text-[#06B6D4]">Tech Stack</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                            <AnimatedCounter value={500} />+
                                        </div>
                                        <div className="text-[10px] uppercase tracking-widest font-bold text-[#F59E0B]">Commits</div>
                                    </div>
                                </div>

                                <p>
                                    My approach is centered around **clean architecture** and **user-centric design**. I specialize in bridging the gap between sophisticated backends and pixel-perfect frontends, ensuring every application I build is both powerful and premium in feel.
                                </p>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10 italic">
                                    "I don't just write code; I design scalable digital ecosystems that solve real-world problems while looking stunning."
                                </div>
                                <p>
                                    Beyond the terminal, I'm fascinated by <span className="text-white">3D web technologies</span>, <span className="text-white">minimalist UI/UX</span>, and the future of **AI-driven development**. I'm constantly learning new ways to push the boundaries of what's possible on the web.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
