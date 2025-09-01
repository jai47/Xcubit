import {
    FaRobot,
    FaHeartbeat,
    FaLeaf,
    FaGamepad,
    FaGraduationCap,
    FaLightbulb,
    FaCoins,
    FaBrain,
} from 'react-icons/fa';
import { GlowCard } from '../GlowCards';

const tracks = [
    {
        title: 'Artificial Intelligence',
        description:
            'Build intelligent solutions using machine learning, deep learning, and AI frameworks',
        icon: <FaBrain className="text-white/70 text-2xl" />,
    },
    {
        title: 'Robotics & IoT',
        description:
            'Create connected devices and robotic systems that interact with the physical world',
        icon: <FaRobot className="text-white/70 text-2xl" />,
    },
    {
        title: 'Fintech',
        description:
            'Revolutionize financial services with blockchain, DeFi, and digital payment solutions',
        icon: <FaCoins className="text-white/70 text-2xl" />,
    },
    {
        title: 'HealthTech',
        description:
            'Develop innovative healthcare solutions using digital health technologies',
        icon: <FaHeartbeat className="text-white/70 text-2xl" />,
    },
    {
        title: 'Sustainability',
        description:
            'Build eco-friendly solutions for environmental challenges and green technology',
        icon: <FaLeaf className="text-white/70 text-2xl" />,
    },
    {
        title: 'Gaming & AR/VR',
        description:
            'Create immersive experiences with augmented reality, virtual reality, and gaming',
        icon: <FaGamepad className="text-white/70 text-2xl" />,
    },
    {
        title: 'EdTech',
        description:
            'Transform education with innovative learning platforms and educational tools',
        icon: <FaGraduationCap className="text-white/70 text-2xl" />,
    },
    {
        title: 'Open Innovation',
        description:
            'Think outside the box and create groundbreaking solutions in any domain',
        icon: <FaLightbulb className="text-white/70 text-2xl" />,
    },
];

export default function CompetitionTracks() {
    return (
        <section className="px-6 text-center bg-neutral-950 pb-20">
            <h2 className="text-2xl md:text-5xl mb-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white/70 to-gray-100/50">
                Competition{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300">
                    Tracks
                </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                Choose your battlefield and showcase your skills in these
                cutting-edge technology domains
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {tracks.map((track, idx) => (
                    <GlowCard key={idx}>
                        <div className="rounded-xl p-6 flex flex-col items-start">
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 mb-4">
                                {track.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white/70 mb-2">
                                {track.title}
                            </h3>
                            <p className="text-gray-400 text-sm text-left">
                                {track.description}
                            </p>
                        </div>
                    </GlowCard>
                ))}
            </div>
        </section>
    );
}
