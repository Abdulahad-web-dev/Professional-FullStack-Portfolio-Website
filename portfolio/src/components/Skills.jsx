import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

// Dynamic import using useSupabaseQuery hook
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

const SkillBar = ({ name, level, index, color = "#8B5CF6" }) => (
    <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium" style={{ color: '#C4C4E0' }}>{name}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{
                color,
                background: `${color}15`,
                border: `1px solid ${color}30`,
            }}>
                {level}%
            </span>
        </div>
        <div className="h-1.5 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, delay: 0.15 * index, ease: "easeOut" }}
                className="h-full rounded-full relative overflow-hidden"
                style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
            >
                <div className="absolute right-0 top-0 bottom-0 w-8" style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))',
                    filter: 'blur(3px)',
                }} />
            </motion.div>
        </div>
    </div>
);

const Skills = () => {
    const { data: skillsData, loading } = useSupabaseQuery('skills', {
        order: { column: 'order', ascending: true }
    });

    const { data: settingsData } = useSupabaseQuery('settings', {
        eq: { column: 'id', value: 1 }
    });

    const siteData = settingsData?.[0] || null;

    // Core technologies for the moving marquee
    const marqueeSkills = [
        { name: 'React', color: '#61DAFB' },
        { name: 'Node.js', color: '#339933' },
        { name: 'Tailwind', color: '#06B6D4' },
        { name: 'MongoDB', color: '#47A248' },
        { name: 'Supabase', color: '#3ECF8E' },
        { name: 'Three.js', color: '#FFFFFF' },
        { name: 'Framer Motion', color: '#E11D48' },
        { name: 'JavaScript', color: '#F7DF1E' },
        { name: 'Express', color: '#828282' },
        { name: 'Vite', color: '#646CFF' },
        { name: 'Git', color: '#F05032' },
        { name: 'TypeScript', color: '#3178C6' }
    ];

    const stats = [
        { label: 'High-Impact Projects', value: 15, suffix: '+' },
        { label: 'Modern Technologies', value: 12, suffix: '+' },
        { label: 'Open Source Repos', value: 25, suffix: '+' },
        { label: 'Professional Learning', value: 3, suffix: 'y+' },
    ];

    const coreSkills = [
        { name: 'Web Development', level: 90 },
        { name: 'UI/UX Design', level: 85 },
        { name: 'Backend Systems', level: 80 },
        { name: 'State Management', level: 85 },
    ];

    // Double the array for seamless infinity loop
    const displayMarquee = [...marqueeSkills, ...marqueeSkills];

    // Group skills by category...
    const categoriesMap = {
        'Frontend': { title: 'Frontend Architecture', icon: '🎨', color: '#8B5CF6', skills: [] },
        'Backend': { title: 'Core Backend & API', icon: '⚙️', color: '#06B6D4', skills: [] },
        'Tools': { title: 'Tools & Ecosystem', icon: '🛠️', color: '#F59E0B', skills: [] },
    };

    if (skillsData) {
        skillsData.forEach(skill => {
            const cat = skill.category === 'Frontend' ? 'Frontend'
                : (skill.category === 'Backend' || skill.category === 'Database') ? 'Backend'
                    : 'Tools';
            if (categoriesMap[cat]) {
                categoriesMap[cat].skills.push({ name: skill.name, level: skill.level });
            }
        });
    }

    const groupedCategories = Object.values(categoriesMap).filter(c => c.skills.length > 0);

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(139,92,246,0.1)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(6,182,212,0.1)' }} />
            </div>

            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#8B5CF6' }}>
                        Technical Proof & Capabilities
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Technical <span style={{ color: '#8B5CF6' }}>Skills</span>
                    </h2>
                    <div className="mt-4 mx-auto w-16 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)' }} />
                </motion.div>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="w-8 h-8 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* New Core Proficiency Section Moved From About (As Requested) */}
                        <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
                            {/* Left Side: Visual/Context Image */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className="relative rounded-3xl overflow-hidden shadow-2xl"
                                style={{ border: '1px solid rgba(139,92,246,0.1)' }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
                                    alt="Expertise"
                                    className="w-full aspect-[16/9] object-cover brightness-50"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <h3 className="text-2xl font-bold text-white mb-2 underline decoration-[#8B5CF6] underline-offset-4">Core Proficiency</h3>
                                    <p className="text-[#8B8BAA] text-sm">
                                        Measuring technical depth across critical architecture and engineering disciplines.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Right Side: Primary Bars & Stats Grid */}
                            <div className="space-y-10">
                                {/* Core Bars Column */}
                                <div>
                                    {coreSkills.map((skill, idx) => (
                                        <SkillBar key={skill.name} name={skill.name} level={skill.level} index={idx} color="#8B5CF6" />
                                    ))}
                                </div>

                                {/* Stats Grid (The red-arrowed details) */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {stats.map((stat, i) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1, duration: 0.4 }}
                                            className="p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md text-center"
                                        >
                                            <div
                                                className="text-xl md:text-2xl font-bold"
                                                style={{
                                                    background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                }}
                                            >
                                                <AnimatedCounter value={stat.value} delay={i * 0.1} />
                                                {stat.suffix}
                                            </div>
                                            <div className="text-[10px] uppercase tracking-widest font-bold mt-1 text-[#6B6B8A]">
                                                {stat.label.split(' ')[0]} <br /> {stat.label.split(' ').slice(1).join(' ')}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Detailed Categories Below */}
                        <div className="grid md:grid-cols-3 gap-6 mb-20">
                            {groupedCategories.map((cat, catIdx) => (
                                <motion.div
                                    key={cat.title}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: catIdx * 0.15 }}
                                    whileHover={{ y: -5 }}
                                    className="p-6 rounded-2xl relative overflow-hidden"
                                    style={{
                                        background: 'rgba(18,18,26,0.6)',
                                        border: `1px solid ${cat.color}20`,
                                        boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
                                        backdropFilter: 'blur(10px)',
                                    }}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-black/20"
                                            style={{ background: `linear-gradient(135deg, ${cat.color}30, ${cat.color}10)`, border: `1px solid ${cat.color}40` }}
                                        >
                                            {cat.icon}
                                        </div>
                                        <h3 className="text-sm font-bold text-white tracking-wide uppercase">{cat.title}</h3>
                                    </div>

                                    {cat.skills.map((skill, idx) => (
                                        <SkillBar
                                            key={skill.name}
                                            name={skill.name}
                                            level={skill.level}
                                            index={idx}
                                            color={cat.color}
                                        />
                                    ))}
                                </motion.div>
                            ))}
                        </div>

                        {/* Infinite Moving Line (Marquee) */}
                        <div className="relative py-10">
                            <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden opacity-50">
                                <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }} />
                            </div>

                            <div className="overflow-hidden whitespace-nowrap mask-fade-sides relative">
                                <motion.div
                                    className="flex items-center gap-8 md:gap-16 group w-max"
                                    animate={{ x: ["0%", "-50%"] }} 
                                    transition={{
                                        x: {
                                            repeat: Infinity,
                                            repeatType: "loop",
                                            duration: 40,
                                            ease: "linear",
                                        }
                                    }}
                                >
                                    {displayMarquee.map((tech, i) => (
                                        <div
                                            key={`${tech.name}-${i}`}
                                            className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                                        >
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color, boxShadow: `0 0 10px ${tech.color}` }} />
                                            <span className="text-white/60 font-medium tracking-wide group-hover:text-white/80 transition-colors uppercase text-sm">
                                                {tech.name}
                                            </span>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <style jsx>{`
                .mask-fade-sides {
                    mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
                }
            `}</style>
        </section>
    );
};


export default Skills;
