'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createTeam, joinTeam } from '@/src/serverAction/teamAction';
import { updateUserProfile } from '@/src/serverAction/userAction';
import { redirect } from 'next/navigation';
import Navbar from '@/src/components/layout/NavbarHome';
import Button from '@/src/components/Button';
import {
    FaChevronDown,
    FaChevronUp,
    FaCheckCircle,
    FaQuestionCircle,
    FaTimes,
} from 'react-icons/fa';
import { gsap } from 'gsap';

/**
 * Modern RegisterForm (styled with Tailwind + GSAP)
 * - Left: glassy registration form with accordions
 * - Right: event summary card with banner, countdown, circular progress
 *
 * Note: expects `event`, `user`, `team`, `InviteCode` props (same as your previous).
 */

export default function RegisterForm({ event, user, team, InviteCode }) {
    // ----- local state -----
    const [teamCode, setTeamCode] = useState('');
    const [activeSection, setActiveSection] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [teamName, setTeamName] = useState(
        `${(user?.name || 'Participant').split(' ')[0]}'s Team`
    );
    const [teamCreated, setTeamCreated] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profileSaved, setProfileSaved] = useState(false);

    // form data
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phoneNumber: user?.phoneNumber || '',
        dateOfBirth: user?.dateOfBirth
            ? new Date(user.dateOfBirth).toISOString().slice(0, 10)
            : '',
        gender: user?.gender || '',
        city: user?.city || '',
        stateOrProvince: user?.stateOrProvince || '',
        country: user?.country || '',
        postalCode: user?.postalCode || '',
        linkedInOrGithub: user?.linkedInOrGithub || '',
    });

    const sections = [
        {
            id: 'about',
            title: 'About You',
            fields: ['name', 'phoneNumber', 'dateOfBirth', 'gender'],
        },
        {
            id: 'socials',
            title: 'Links',
            fields: [
                'linkedInOrGithub',
                'city',
                'stateOrProvince',
                'country',
                'postalCode',
            ],
        },
        {
            id: 'team',
            title: 'Join / Create Team',
            fields: [],
        },
    ];

    const aboutRef = useRef(null);
    const linksRef = useRef(null);
    const teamRef = useRef(null);
    const refs = [aboutRef, linksRef, teamRef];

    // user already in team?
    const userAlreadyInTeam = user?.teams?.some(
        (t) => t.event?.toString() === event._id?.toString()
    );

    // accordion animation with GSAP
    useEffect(() => {
        refs.forEach((r, idx) => {
            if (!r.current) return;
            if (activeSection === idx) {
                gsap.to(r.current, {
                    height: 'auto',
                    duration: 0.45,
                    opacity: 1,
                    ease: 'power2.out',
                });
            } else {
                gsap.to(r.current, {
                    height: 0,
                    duration: 0.35,
                    opacity: 0,
                    ease: 'power2.inOut',
                });
            }
        });
    }, [activeSection]);

    // handlers
    const toggleSection = (i) =>
        setActiveSection(activeSection === i ? null : i);
    const handleChange = (e) =>
        setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

    // validation & save
    const handleSaveProfile = async () => {
        setLoading(true);

        // client-side validation (kept similar to your original)
        const errors = [];
        if (!formData.name?.trim()) errors.push('Name is required.');
        if (!formData.dateOfBirth) errors.push('Date of birth is required.');
        // simple gender check
        if (!['Male', 'Female', 'Others', 'Other'].includes(formData.gender))
            errors.push('Please select a valid gender.');

        // phone & postal validation (optional)
        if (
            formData.phoneNumber &&
            !/^\+?[0-9]{7,15}$/.test(formData.phoneNumber)
        )
            errors.push('Enter a valid phone number.');
        if (
            formData.postalCode &&
            !/^[A-Za-z0-9\s-]{3,10}$/.test(formData.postalCode)
        )
            errors.push('Enter a valid postal code.');

        if (errors.length) {
            setLoading(false);
            alert(errors.join('\n'));
            return;
        }

        const res = await updateUserProfile(user._id, formData);
        setLoading(false);
        if (res.success) {
            setProfileSaved(true);
            alert('Profile saved successfully.');
        } else {
            alert(res.message || 'Failed to save profile.');
        }
    };

    // create / join team handlers
    const handleCreateTeam = async () => {
        if (userAlreadyInTeam) return alert('You are already in a team');
        if (!teamName.trim()) return alert('Enter a team name');
        setLoading(true);
        const res = await createTeam({
            eventId: event._id,
            leaderId: user._id,
            name: teamName,
        });
        setLoading(false);
        if (res.success) {
            setTeamCreated(res.team);
            alert('Team created!');
        } else alert(res.message || 'Failed to create team');
    };

    const handleJoinTeam = async () => {
        if (userAlreadyInTeam) return alert('You are already in a team.');
        const codeToUse = InviteCode || teamCode;
        if (!codeToUse) return alert('Please enter a team code.');
        const res = await joinTeam({ teamCode: codeToUse, userId: user._id });
        if (res.success) {
            alert('Joined team successfully!');
            redirect(`/dashboard?section=My+Teams`);
        } else alert(res.message || 'Failed to join team');
    };

    // completion progress
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter((f) => f).length;
    const completionPercent = Math.floor((filledFields / totalFields) * 100);

    // countdown (update every second)
    const [countdown, setCountdown] = useState('');
    useEffect(() => {
        if (!event?.dateTime) return;
        const updateTimer = () => {
            const now = new Date();
            const end = new Date(event.dateTime);
            const diff = end - now;
            if (diff <= 0) {
                setCountdown('Event started');
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / (1000 * 60)) % 60);
            setCountdown(`${days}d ${hours}h ${mins}m`);
        };
        updateTimer();
        const t = setInterval(updateTimer, 60 * 1000); // every minute
        return () => clearInterval(t);
    }, [event?.dateTime]);

    // circular progress dash calculation
    const CIRCLE_RADIUS = 46;
    const CIRCLE_CIRC = 2 * Math.PI * CIRCLE_RADIUS;
    const dashOffset = Math.round(
        CIRCLE_CIRC - (completionPercent / 100) * CIRCLE_CIRC
    );

    const shareLink =
        teamCreated || userAlreadyInTeam
            ? `${
                  typeof window !== 'undefined' ? window.location.origin : ''
              }/register?team=${
                  (teamCreated?._id || team?.data || team?._id) ?? ''
              }`
            : '';

    // layout classes
    const leftPanelClasses =
        'flex-1 bg-neutral-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-8 max-w-xl';
    const rightPanelClasses =
        'w-2/5 min-w-[320px] bg-neutral-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-6 flex flex-col gap-6';

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-neutral-950 text-white py-10 px-6 lg:px-16 flex justify-center items-center">
                <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start">
                    {/* LEFT: Form */}
                    <div className={leftPanelClasses}>
                        <h1 className="text-3xl font-extrabold leading-tight">
                            Register for{' '}
                            <span className="text-emerald-400">
                                {event?.name?.split(' - ')[0] || 'Event'}
                            </span>
                        </h1>
                        <p className="mt-2 text-sm text-gray-400 max-w-prose">
                            Join the event — fill your details to secure your
                            spot. Save the profile before creating or joining a
                            team.
                        </p>

                        <div className="mt-6 space-y-5">
                            {/* Accordion list */}
                            {sections.map((section, idx) => {
                                const isActive = activeSection === idx;
                                const isComplete =
                                    section.fields.length === 0
                                        ? userAlreadyInTeam || !!teamCreated
                                        : section.fields.every(
                                              (f) => !!formData[f]
                                          );

                                return (
                                    <div
                                        key={section.id}
                                        className={`rounded-lg border border-gray-800 overflow-hidden ${
                                            isActive
                                                ? 'ring-1 ring-emerald-400/20'
                                                : ''
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleSection(idx)}
                                            className="w-full flex items-center justify-between px-4 py-3 bg-neutral-900 hover:bg-neutral-800"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                        isComplete
                                                            ? 'bg-emerald-400 text-neutral-950'
                                                            : 'bg-gray-700 text-gray-300'
                                                    }`}
                                                >
                                                    {isComplete ? (
                                                        <FaCheckCircle />
                                                    ) : (
                                                        <FaQuestionCircle />
                                                    )}
                                                </div>
                                                <span className="font-medium">
                                                    {section.title}
                                                </span>
                                            </div>

                                            <div className="text-gray-400">
                                                {isActive ? (
                                                    <FaChevronUp />
                                                ) : (
                                                    <FaChevronDown />
                                                )}
                                            </div>
                                        </button>

                                        <div
                                            ref={refs[idx]}
                                            className="px-4 overflow-hidden"
                                            style={{ height: 0, opacity: 0 }}
                                        >
                                            {/* ABOUT */}
                                            {section.id === 'about' && (
                                                <div className="py-4 space-y-3">
                                                    <input
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Full name"
                                                        className="w-full rounded-md px-4 py-3 bg-neutral-800 border border-gray-700 text-white placeholder-gray-400"
                                                    />
                                                    <input
                                                        name="phoneNumber"
                                                        value={
                                                            formData.phoneNumber
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Phone number"
                                                        className="w-full rounded-md px-4 py-3 bg-neutral-800 border border-gray-700 text-white placeholder-gray-400"
                                                    />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <input
                                                            name="dateOfBirth"
                                                            value={
                                                                formData.dateOfBirth
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            type="date"
                                                            className="rounded-md px-4 py-3 bg-neutral-800 border border-gray-700 text-white placeholder-gray-400"
                                                        />
                                                        <select
                                                            name="gender"
                                                            value={
                                                                formData.gender
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="rounded-md px-4 py-3 bg-neutral-800 border border-gray-700 text-white"
                                                        >
                                                            <option value="">
                                                                Select gender
                                                            </option>
                                                            <option value="Male">
                                                                Male
                                                            </option>
                                                            <option value="Female">
                                                                Female
                                                            </option>
                                                            <option value="Others">
                                                                Others
                                                            </option>
                                                        </select>
                                                    </div>

                                                    <div className="flex justify-end">
                                                        <Button
                                                            text={
                                                                loading
                                                                    ? 'Saving...'
                                                                    : 'Save'
                                                            }
                                                            onClick={
                                                                handleSaveProfile
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* LINKS */}
                                            {section.id === 'socials' && (
                                                <div className="py-4 space-y-3">
                                                    <input
                                                        name="linkedInOrGithub"
                                                        value={
                                                            formData.linkedInOrGithub
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="LinkedIn or GitHub URL"
                                                        className="w-full rounded-md px-4 py-3 bg-neutral-800 border border-gray-700 text-white placeholder-gray-400"
                                                    />
                                                    <input
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleChange}
                                                        placeholder="City"
                                                        className="w-full rounded-md px-4 py-3 bg-neutral-800 border border-gray-700 text-white placeholder-gray-400"
                                                    />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <input
                                                            name="stateOrProvince"
                                                            value={
                                                                formData.stateOrProvince
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder="State / Province"
                                                            className="rounded-md px-4 py-3 bg-neutral-800 border border-gray-700 text-white placeholder-gray-400"
                                                        />
                                                        <input
                                                            name="country"
                                                            value={
                                                                formData.country
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder="Country"
                                                            className="rounded-md px-4 py-3 bg-neutral-800 border border-gray-700 text-white placeholder-gray-400"
                                                        />
                                                    </div>
                                                    <input
                                                        name="postalCode"
                                                        value={
                                                            formData.postalCode
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Postal code"
                                                        className="w-full rounded-md px-4 py-3 bg-neutral-800 border border-gray-700 text-white placeholder-gray-400"
                                                    />
                                                    <div className="flex justify-end">
                                                        <Button
                                                            text={
                                                                loading
                                                                    ? 'Saving...'
                                                                    : 'Save'
                                                            }
                                                            onClick={
                                                                handleSaveProfile
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* TEAM */}
                                            {section.id === 'team' && (
                                                <div className="py-4 space-y-3 text-center">
                                                    {/* If not completed or not saved, show hint */}
                                                    {(completionPercent < 100 ||
                                                        !profileSaved) && (
                                                        <div className="p-4 bg-gray-800 rounded-md text-sm text-amber-300">
                                                            ⚠️ Please complete &
                                                            save all sections
                                                            before creating or
                                                            joining a team.
                                                            (Form{' '}
                                                            {completionPercent}
                                                            %)
                                                        </div>
                                                    )}

                                                    {/* When ready */}
                                                    {completionPercent ===
                                                        100 &&
                                                        profileSaved && (
                                                            <div className="space-y-3">
                                                                {team?.success ||
                                                                teamCreated ? (
                                                                    <>
                                                                        <p className="text-green-400 font-semibold">
                                                                            ✅
                                                                            You
                                                                            are
                                                                            already
                                                                            part
                                                                            of a
                                                                            team!
                                                                        </p>
                                                                        <p className="text-sm text-gray-400">
                                                                            Share
                                                                            this
                                                                            link
                                                                            for
                                                                            teammates
                                                                            to
                                                                            join:
                                                                        </p>
                                                                        <div className="flex gap-2 justify-center">
                                                                            <input
                                                                                readOnly
                                                                                value={
                                                                                    shareLink
                                                                                }
                                                                                className="w-full max-w-md rounded-md px-3 py-2 bg-neutral-800 border border-gray-700"
                                                                            />
                                                                            <button
                                                                                onClick={() =>
                                                                                    navigator.clipboard.writeText(
                                                                                        shareLink
                                                                                    )
                                                                                }
                                                                                className="px-3 py-2 bg-emerald-500 rounded-md"
                                                                            >
                                                                                Copy
                                                                            </button>
                                                                        </div>
                                                                        <div>
                                                                            <Button
                                                                                text="Go to Dashboard"
                                                                                onClick={() =>
                                                                                    redirect(
                                                                                        '/dashboard?section=My+Teams'
                                                                                    )
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {!InviteCode && (
                                                                            <Button
                                                                                text="Create Team"
                                                                                onClick={() =>
                                                                                    setModalOpen(
                                                                                        true
                                                                                    )
                                                                                }
                                                                            />
                                                                        )}
                                                                        <div className="flex gap-2 mt-3 justify-center">
                                                                            <input
                                                                                value={
                                                                                    InviteCode ||
                                                                                    teamCode
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setTeamCode(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                placeholder="Enter team code"
                                                                                className="flex-1 rounded-md px-3 py-2 bg-neutral-800 border border-gray-700"
                                                                            />
                                                                            <Button
                                                                                text="Join"
                                                                                onClick={
                                                                                    handleJoinTeam
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <p className="mt-6 text-xs text-gray-500">
                            By registering you agree to the event terms. Make
                            sure your details are accurate.
                        </p>
                    </div>

                    {/* RIGHT: Event summary */}
                    <aside className={rightPanelClasses}>
                        <div className="rounded-xl overflow-hidden h-36 bg-black/20">
                            {event?.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={event.image}
                                    alt={event.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-r from-purple-700 to-indigo-700" />
                            )}
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">{event.name}</h2>
                            <p className="text-sm text-gray-400 mt-2">
                                {event.shortDescription}
                            </p>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-4 items-center">
                            <div>
                                <div className="text-xs text-gray-400">
                                    Date
                                </div>
                                <div className="font-medium text-green-300 mt-1">
                                    {event?.dateTime
                                        ? new Date(
                                              event.dateTime
                                          ).toLocaleString()
                                        : 'TBD'}
                                </div>
                                <div className="text-xs text-gray-400 mt-2">
                                    Location
                                </div>
                                <div className="font-medium text-gray-200 mt-1">
                                    {event.location || 'Online'}
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-2">
                                {/* circular progress */}
                                <div className="flex flex-col items-center justify-center relative w-[90px] h-[90px]">
                                    <svg
                                        width="90"
                                        height="90"
                                        viewBox="0 0 100 100"
                                        className="transform -rotate-90"
                                    >
                                        <defs>
                                            <linearGradient id="g1">
                                                <stop
                                                    offset="0%"
                                                    stopColor="#10b981"
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#34d399"
                                                />
                                            </linearGradient>
                                        </defs>
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r={CIRCLE_RADIUS}
                                            stroke="#111827"
                                            strokeWidth="8"
                                            fill="none"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r={CIRCLE_RADIUS}
                                            stroke="url(#g1)"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            fill="none"
                                            strokeDasharray={CIRCLE_CIRC}
                                            strokeDashoffset={dashOffset}
                                        />
                                    </svg>

                                    {/* centered % text */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-emerald-400">
                                        {completionPercent}%
                                    </div>
                                </div>

                                <div className="text-xs w-3/5 text-center">
                                    Profile complete percentage
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 border-t border-gray-800 pt-4">
                            <div className="text-sm text-gray-400">
                                Registration Closes In
                            </div>
                            <div className="text-lg font-semibold text-emerald-300 mt-1">
                                {countdown || '—'}
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-500">
                            Created:{' '}
                            <span className="text-gray-400">
                                {new Date(event.createdAt).toLocaleDateString()}
                            </span>
                            <br />
                            Updated:{' '}
                            <span className="text-gray-400">
                                {new Date(event.updatedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Modal: create team */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-neutral-900 rounded-2xl p-6 w-full max-w-md border border-gray-800">
                        <button
                            className="absolute top-6 right-6 text-gray-400"
                            onClick={() => setModalOpen(false)}
                        >
                            <FaTimes />
                        </button>

                        {!teamCreated && !userAlreadyInTeam ? (
                            <>
                                <h3 className="text-2xl font-bold text-gray-300 mb-2">
                                    Create Team
                                </h3>
                                <p className="text-sm text-gray-400 mb-4">
                                    Create a team and invite members using the
                                    share link.
                                </p>

                                <input
                                    value={teamName}
                                    onChange={(e) =>
                                        setTeamName(e.target.value)
                                    }
                                    className="w-full rounded-md px-4 py-3 bg-neutral-800 border border-gray-700 text-gray-300 mb-4"
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        className="px-4 py-2 rounded-full bg-gray-700 text-gray-300"
                                        onClick={() => setModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <Button
                                        text={
                                            loading ? 'Creating...' : 'Create'
                                        }
                                        onClick={handleCreateTeam}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-2xl text-green-400 font-bold">
                                    Team Created!
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Share this link with your teammates:
                                </p>
                                <div className="flex gap-2 mt-3">
                                    <input
                                        readOnly
                                        value={shareLink}
                                        className="flex-1 rounded-md px-3 py-2 bg-neutral-800 border border-gray-700"
                                    />
                                    <button
                                        className="px-3 py-2 rounded-md bg-emerald-500"
                                        onClick={() =>
                                            navigator.clipboard.writeText(
                                                shareLink
                                            )
                                        }
                                    >
                                        Copy
                                    </button>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <Button
                                        text="Go to Dashboard"
                                        onClick={() =>
                                            redirect(
                                                '/dashboard?section=My+Teams'
                                            )
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
