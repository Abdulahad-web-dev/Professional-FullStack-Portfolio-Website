import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Download, Mail, Github, Linkedin, ChevronDown, ArrowRight } from 'lucide-react';
import HeroParticles from './ui/HeroParticles';

const TypewriterText = ({ texts }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const text = texts[currentIndex];
        const timeout = setTimeout(() => {
            if (!deleting) {
                if (charIndex < text.length) {
                    setCurrentText(text.substring(0, charIndex + 1));
                    setCharIndex(c => c + 1);
                } else {
                    setTimeout(() => setDeleting(true), 2000);
                }
            } else {
                if (charIndex > 0) {
                    setCurrentText(text.substring(0, charIndex - 1));
                    setCharIndex(c => c - 1);
                } else {
                    setDeleting(false);
                    setCurrentIndex(i => (i + 1) % texts.length);
                }
            }
        }, deleting ? 50 : 80);
        return () => clearTimeout(timeout);
    }, [charIndex, deleting, currentIndex, texts]);

    return (
        <span>
            {currentText}
            <span className="animate-pulse" style={{ color: '#8B5CF6' }}>|</span>
        </span>
    );
};

const Hero = ({ siteData }) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 600], [0, 180]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    // Mouse-tracking for 3D tilt effect on image
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 });

    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };



    const socials = siteData ? [
        { icon: <Github size={18} />, href: siteData.github_url || 'https://github.com/Abdulahad-web-dev', label: 'GitHub' },
        { icon: <Linkedin size={18} />, href: siteData.linkedin_url || 'https://www.linkedin.com/in/abdulahad-warraich-b74499361?utm_source=share_via&utm_content=profile&utm_medium=member_android', label: 'LinkedIn' },
        { icon: <Mail size={18} />, href: `mailto:${siteData.email || 'abdulahadwarraich.web@gmail.com'}`, label: 'Email' },
    ] : [
        { icon: <Github size={18} />, href: 'https://github.com/Abdulahad-web-dev', label: 'GitHub' },
        { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/abdulahad-warraich-b74499361?utm_source=share_via&utm_content=profile&utm_medium=member_android', label: 'LinkedIn' },
        { icon: <Mail size={18} />, href: 'mailto:abdulahadwarraich.web@gmail.com', label: 'Email' },
    ];

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <HeroParticles />

            {/* Content */}
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">

                    {/* Left - Text */}
                    <motion.div
                        style={{ y: y1, opacity }}
                        className="flex-1 text-center md:text-left max-w-2xl"
                    >
                        {/* Available badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
                            style={{
                                background: 'rgba(139,92,246,0.1)',
                                border: '1px solid rgba(139,92,246,0.3)',
                                color: '#A78BFA',
                            }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#8B5CF6' }} />
                                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#8B5CF6' }} />
                            </span>
                            Available for new projects
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Hi, I&apos;m{' '}
                            <span
                                style={{
                                    background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 60%, #8B5CF6 100%)',
                                    backgroundSize: '200% auto',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    animation: 'shimmer 4s linear infinite',
                                }}
                            >
                                {siteData?.site_name || 'Abdulahad'}
                            </span>
                        </motion.h1>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="text-xl md:text-2xl font-medium mb-4"
                            style={{ color: '#A78BFA' }}
                        >
                            {siteData?.site_title || 'Front-End Web Developer'}
                        </motion.h2>

                        {/* Typewriter */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-base md:text-lg mb-8 h-8 font-mono"
                            style={{ color: '#8B8BAA' }}
                        >
                            <TypewriterText texts={[
                                'Transforming Complex Ideas into Elegant Digital Realities.',
                                'Crafting High-Performance Full-Stack Applications.',
                                'Turning Pixel-Perfect Designs into Scalable Code.',
                                'Architecture Student & Full-Stack Developer.',
                            ]} />
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="text-sm md:text-base leading-relaxed mb-10 max-w-lg"
                            style={{ color: '#6B6B8A' }}
                        >
                            I specialize in building user-friendly, scalable web applications with a keen eye
                            for design excellence and clean code.
                        </motion.p>

                        {/* Buttons (CTAs) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.65 }}
                            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8"
                        >
                            <a href="/resume.pdf" download="Abdulahad_Resume.pdf">
                                <button
                                    className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-sm transition-all duration-300"
                                    style={{
                                        background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
                                        boxShadow: '0 8px 25px rgba(139,92,246,0.4)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.boxShadow = '0 0 40px rgba(139,92,246,0.7), 0 0 80px rgba(6,182,212,0.3)';
                                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(139,92,246,0.4)';
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    }}
                                >
                                    Download Resume
                                    <Download size={18} />
                                </button>
                            </a>
                            <a href="#contact">
                                <button
                                    className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300"
                                    style={{
                                        color: '#A78BFA',
                                        border: '1px solid rgba(139,92,246,0.3)',
                                        background: 'rgba(139,92,246,0.05)',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = 'rgba(139,92,246,0.15)';
                                        e.currentTarget.style.borderColor = '#8B5CF6';
                                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'rgba(139,92,246,0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)';
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    }}
                                >
                                    Get in Touch
                                    <Mail size={18} />
                                </button>
                            </a>
                        </motion.div>

                        {/* Social Links - Properly Visible Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="flex flex-wrap items-center justify-center md:justify-start gap-4"
                        >
                            <p className="text-xs uppercase tracking-widest font-bold w-full md:w-auto mb-2 md:mb-0" style={{ color: '#8B5CF6' }}>
                                Find Me Online 
                            </p>
                            <div className="flex gap-4">
                                {socials.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300"
                                        style={{
                                            background: 'rgba(139,92,246,0.1)',
                                            border: '1px solid rgba(139,92,246,0.3)',
                                            color: '#A78BFA',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = 'rgba(139,92,246,0.2)';
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(139,92,246,0.4)';
                                            e.currentTarget.style.borderColor = '#8B5CF6';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = 'rgba(139,92,246,0.1)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                                            e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)';
                                        }}
                                    >
                                        <span className="text-lg">{social.icon}</span>
                                        <span className="text-sm font-bold uppercase tracking-tight">{social.label}</span>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right - 3D Profile Image */}
                    <motion.div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 80 }}
                        className="flex-1 flex justify-center md:justify-end relative md:-mt-20 lg:-mt-32"
                        style={{ perspective: 1000 }}
                    >
                        <motion.div
                            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                            className="relative w-72 h-72 md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px]"
                        >
                            {/* Outer rotating ring */}
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    border: '2px solid rgba(139,92,246,0.3)',
                                    animation: 'spin-slow 12s linear infinite',
                                }}
                            >
                                {/* Ring dots */}
                                {[0, 90, 180, 270].map((deg) => (
                                    <div
                                        key={deg}
                                        className="absolute w-3 h-3 rounded-full"
                                        style={{
                                            background: '#8B5CF6',
                                            boxShadow: '0 0 10px rgba(139,92,246,0.8)',
                                            top: '50%',
                                            left: '50%',
                                            transform: `rotate(${deg}deg) translateX(${window.innerWidth > 1024 ? '240px' : window.innerWidth > 768 ? '200px' : '144px'}) translate(-50%, -50%)`,
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Inner dashed ring */}
                            <div
                                className="absolute inset-4 rounded-full"
                                style={{
                                    border: '1px dashed rgba(6,182,212,0.3)',
                                    animation: 'spin-slow 20s linear infinite reverse',
                                }}
                            />

                            {/* Image container */}
                            <div
                                className="absolute inset-10 rounded-full overflow-hidden"
                                style={{
                                    boxShadow: '0 0 40px rgba(139,92,246,0.4), 0 0 80px rgba(139,92,246,0.15)',
                                    border: '3px solid rgba(139,92,246,0.3)',
                                }}
                            >
                                <img
                                    src={siteData?.profile_image_url || "/profile.png"}
                                    alt={siteData?.site_name || "Abdulahad"}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(siteData?.site_name || 'Abdulahad')}&background=1A1A28&color=8B5CF6&size=512&bold=true`;
                                    }}
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'linear-gradient(to top, rgba(139,92,246,0.3) 0%, transparent 60%)',
                                    }}
                                />
                            </div>

                            {/* Floating badge - top right */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                className="absolute -top-4 -right-4 px-3 py-2 rounded-full text-xs font-semibold text-white"
                                style={{
                                    background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                                    boxShadow: '0 0 20px rgba(139,92,246,0.5)',
                                    zIndex: 10,
                                }}
                            >
                                ✨ Open to work
                            </motion.div>

                            {/* Floating badge - bottom left */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-4 -left-4 px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-2"
                                style={{
                                    background: 'rgba(10,10,15,0.9)',
                                    border: '1px solid rgba(139,92,246,0.3)',
                                    color: '#A78BFA',
                                    boxShadow: '0 0 20px rgba(139,92,246,0.2)',
                                    zIndex: 10,
                                }}
                            >
                                <span className="text-base">💻</span>
                                Full-Stack Dev
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
                style={{ color: '#8B8BAA' }}
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <ChevronDown size={16} />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
