import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X } from 'lucide-react';
import { useSupabaseQuery } from '../hooks/useSupabaseQuery';

const DEFAULT_COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#3B82F6'];

/* ─── Project Card ─────────────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: index * 0.12 }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className="group rounded-2xl overflow-hidden flex flex-col"
        style={{
            background: 'rgba(18,18,26,0.9)',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
        }}
    >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
            {project.image ? (
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            ) : (
                <div
                    className="w-full h-full flex items-center justify-center text-4xl"
                    style={{ background: `linear-gradient(135deg, ${project.color || '#8B5CF6'}20, rgba(10,10,15,0.9))` }}
                >
                    📁
                </div>
            )}
            <div className="absolute inset-0" style={{
                background: `linear-gradient(to top, rgba(10,10,15,0.9) 0%, ${project.color || '#8B5CF6'}20 50%, transparent 100%)`,
            }} />
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                {project.tags?.map((tag, i) => (
                    <span key={tag + i} className="px-2 py-0.5 rounded-full text-xs font-medium" style={{
                        background: 'rgba(10,10,15,0.8)',
                        border: `1px solid ${project.color || '#8B5CF6'}40`,
                        color: project.color || '#8B5CF6',
                        backdropFilter: 'blur(8px)',
                    }}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: project.color }} />
                <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h3>
            </div>
            
            <p className="text-sm leading-relaxed mb-6 flex-1 italic" style={{ color: '#8B8BAA' }}>{project.description}</p>
            
            {/* Tech Labels (Step 5 - Technologies) */}
            <div className="flex flex-wrap gap-2 mb-6">
                {(project.technologies || project.tags)?.map((tag, i) => (
                    <span key={tag + i} className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        color: '#6B6B8A',
                    }}>
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-3 mt-auto">
                {/* Step 5 - GitHub Links */}
                <a href={project.github || '#'} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#A78BFA' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.1)'; e.currentTarget.style.borderColor = '#8B5CF6'; e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#A78BFA'; }}
                >
                    <div className="flex items-center gap-2">
                        <Github size={14} /> Source Code
                    </div>
                </a>
                <a href={project.demo || '#'} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', boxShadow: '0 4px 15px rgba(139,92,246,0.2)' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(139,92,246,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 15px rgba(139,92,246,0.2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                    <div className="flex items-center gap-2">
                        <ExternalLink size={14} /> View Live
                    </div>
                </a>
            </div>
        </div>
    </motion.div>
);

/* ─── Project Modal ────────────────────────────────────────────────── */
const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 mt-16 md:mt-0">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl z-10"
                style={{
                    background: 'rgba(18,18,26,0.95)',
                    border: `1px solid ${project.color}30`,
                    boxShadow: `0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)`,
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/80 transition-colors backdrop-blur-md border border-white/10"
                >
                    <X size={18} />
                </button>

                <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black/50">
                    {project.image_url ? (
                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl"
                            style={{ background: `linear-gradient(135deg, ${project.color || '#8B5CF6'}20, rgba(10,10,15,0.9))` }}>
                            📁
                        </div>
                    )}
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(18,18,26,1) 0%, transparent 100%)` }} />
                </div>

                <div className="p-6 sm:p-10 -mt-20 relative z-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags?.map((tag, i) => (
                            <span key={tag + i} className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md" style={{
                                background: `${project.color || '#8B5CF6'}15`, border: `1px solid ${project.color || '#8B5CF6'}30`, color: project.color || '#8B5CF6'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">{project.title}</h2>
                    <p className="text-lg text-[#8B8BAA] mb-8 leading-relaxed">{project.description}</p>

                    {project.content && (
                        <div className="mb-8 prose prose-invert max-w-none text-[#C4C4E0] whitespace-pre-wrap leading-relaxed border-l-2 pl-4" style={{ borderColor: `${project.color || '#8B5CF6'}50` }}>
                            {project.content}
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
                                style={{ background: 'rgba(255,255,255,0.05)', color: '#F0F0FF', border: '1px solid rgba(255,255,255,0.1)' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                            >
                                <Github size={20} /> View Source Code
                            </a>
                        )}
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all shadow-lg hover:shadow-xl"
                                style={{ background: `linear-gradient(135deg, ${project.color || '#8B5CF6'}, ${project.color || '#8B5CF6'}99)` }}
                            >
                                <ExternalLink size={20} /> Live Application
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

/* ─── Projects Section ──────────────────────────────────────────────── */
const Projects = () => {
    const { data: dbProjects, loading, error } = useSupabaseQuery('projects', {
        order: { column: 'created_at', ascending: false }
    });

    const [selectedProject, setSelectedProject] = useState(null);

    // Fallback data
    const fallbackProjects = [
        {
            id: '1', title: 'Loading Projects...',
            description: 'Please wait while we fetch projects from the database.',
            tags: ['React', 'Supabase'], color: '#8B5CF6'
        }
    ];

    const projectsToShow = dbProjects?.length > 0 ? dbProjects : fallbackProjects;

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full pointer-events-none -z-10"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)', filter: 'blur(40px)' }} />
            <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full pointer-events-none -z-10"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05), transparent 70%)', filter: 'blur(40px)' }} />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* Section header */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
                    <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#8B5CF6' }}>
                        My Recent Work
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Recent Projects
                    </h2>
                    <p className="mt-4 text-sm" style={{ color: '#8B8BAA' }}>
                        A selection of my recent work showcasing my skills and expertise
                    </p>
                    <div className="mt-4 mx-auto w-16 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)' }} />
                </motion.div>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20" style={{ color: '#6B6B8A' }}>
                        <div className="w-8 h-8 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p style={{ fontSize: 14 }}>Loading projects…</p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="text-center py-12">
                        <div style={{
                            display: 'inline-block',
                            background: 'rgba(239,68,68,0.08)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            borderRadius: 12, padding: '16px 28px',
                            color: '#F87171', fontSize: 14,
                        }}>
                            ⚠️ Could not load projects — {error.message || 'An unknown error occurred.'}
                        </div>
                    </div>
                )}

                {/* Grid */}
                {!loading && !error && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {projectsToShow.map((project, index) => (
                            <div key={project.id || index} onClick={() => setSelectedProject(project)} className="cursor-pointer">
                                <ProjectCard
                                    project={project}
                                    index={index}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Project Modal details only (no forms here anymore) */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
