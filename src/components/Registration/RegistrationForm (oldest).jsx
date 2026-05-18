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

export default function RegisterForm({ event, user, team, InviteCode }) {
    const [teamCode, setTeamCode] = useState('');
    const [activeSection, setActiveSection] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [teamName, setTeamName] = useState(
        `${user.name.split(' ')[0]}'s Team`
    );
    const [teamCreated, setTeamCreated] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profileSaved, setProfileSaved] = useState(false);

    const aboutRef = useRef(null);
    const linksRef = useRef(null);
    const teamRef = useRef(null);

    const sections = [
        {
            id: 'about',
            title: 'About You',
            ref: aboutRef,
            fields: ['name', 'phoneNumber', 'dateOfBirth', 'gender'],
        },
        {
            id: 'socials',
            title: 'Links',
            ref: linksRef,
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
            title: 'Join/Create Team',
            ref: teamRef,
            fields: [],
        },
    ];

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

    const userAlreadyInTeam = user?.teams?.some(
        (team) => team.event?.toString() === event._id.toString()
    );

    useEffect(() => {
        sections.forEach((section, index) => {
            if (activeSection === index) {
                gsap.to(section.ref.current, {
                    height: 'auto',
                    duration: 0.5,
                    opacity: 1,
                });
            } else {
                gsap.to(section.ref.current, {
                    height: 0,
                    duration: 0.5,
                    opacity: 0,
                });
            }
        });
    }, [activeSection]);

    const toggleSection = (index) =>
        setActiveSection(activeSection === index ? null : index);

    const handleChange = (e) =>
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const isSectionComplete = (section) => {
        if (section.fields.length === 0)
            return userAlreadyInTeam || teamCreated;
        return section.fields.every((field) => formData[field]);
    };

    const handleSaveProfile = async () => {
        setLoading(true);

        // === VALIDATION START ===
        const errors = [];

        // 1. Validate name
        if (!formData.name.trim()) {
            errors.push('Name is required.');
        } else if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
            errors.push('Name can only contain letters and spaces.');
        }

        // 2. Validate gender
        const validGenders = ['Male', 'Female', 'Others'];
        if (!validGenders.includes(formData.gender)) {
            errors.push(
                'Please select a valid gender (Male, Female, or Others).'
            );
        }

        // 3. Validate date of birth (no future date & age >= 15)
        if (!formData.dateOfBirth) {
            errors.push('Date of birth is required.');
        } else {
            const dob = new Date(formData.dateOfBirth);
            const today = new Date();
            if (dob > today) {
                errors.push('Date of birth cannot be in the future.');
            } else {
                const age = today.getFullYear() - dob.getFullYear();
                const hasHadBirthday =
                    today.getMonth() > dob.getMonth() ||
                    (today.getMonth() === dob.getMonth() &&
                        today.getDate() >= dob.getDate());
                const realAge = hasHadBirthday ? age : age - 1;

                if (realAge < 15) {
                    errors.push('Age must be at least 15 years old.');
                }
            }
        }

        // 4. Validate phone number (optional: digits only, 7–15 chars)
        if (
            formData.phoneNumber &&
            !/^\+?[0-9]{7,15}$/.test(formData.phoneNumber)
        ) {
            errors.push('Please enter a valid phone number.');
        }

        // 5. Validate postal code (optional: alphanumeric, 3–10 chars)
        if (
            formData.postalCode &&
            !/^[A-Za-z0-9\s-]{3,10}$/.test(formData.postalCode)
        ) {
            errors.push('Please enter a valid postal code.');
        }

        // 6. Validate LinkedIn or GitHub URL (optional)
        if (
            formData.linkedInOrGithub &&
            !/^https?:\/\/(www\.)?(linkedin\.com|github\.com)\/[A-Za-z0-9-_/?=&.]+$/.test(
                formData.linkedInOrGithub
            )
        ) {
            errors.push('Please enter a valid LinkedIn or GitHub URL.');
        }

        // If there are errors, stop and alert the user
        if (errors.length > 0) {
            setLoading(false);
            alert(errors.join('\n'));
            return;
        }

        // === VALIDATION END ===

        const res = await updateUserProfile(user._id, formData);
        setLoading(false);
        if (res.success) {
            setProfileSaved(true);
            alert('Profile information saved successfully!');
        } else {
            alert(res.message);
        }
    };

    const handleJoinTeam = async () => {
        if (userAlreadyInTeam) return alert('You are already in a team!');

        const codeToUse = InviteCode || teamCode;

        if (!codeToUse) return alert('Please enter a team code.');

        const res = await joinTeam({ teamCode: codeToUse, userId: user._id });

        if (res.success) {
            alert('Joined team successfully!');

            // Send email with team details
            await fetch('/api/mail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user?.email,
                    type: 'joined-team',
                    message: {
                        name: user?.name || 'Participant',
                        teamName: res.data.name,
                        teamLink: `${process.env.NEXT_PUBLIC_BASE_URL}/register?team=${res.data._id}`,
                        ticket: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?section=My+Tickets&ticket=${res.data._id}`,
                        eventName: res.data.event?.name || 'Event',
                        eventDate: new Date(
                            res.data.event?.dateTime
                        ).toLocaleString(),
                        eventLocation: res.data.event?.location || 'Location',
                    },
                    subject: `You have joined ${res.data.name}!`,
                }),
            });

            redirect(`/dashboard?section=My+Teams`);
        } else {
            alert(res.message || 'Failed to join team');
        }
    };

    const handleCreateTeam = async () => {
        if (userAlreadyInTeam) return alert('You are already in a team!');
        if (!teamName.trim()) return alert('Please enter a team name');
        setLoading(true);
        const res = await createTeam({
            eventId: event._id,
            leaderId: user._id,
            name: teamName,
        });
        setLoading(false);
        if (res.success) {
            setTeamCreated(res.team);
            const sendEmailRes = await fetch('/api/mail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user?.email,
                    type: 'new-team',
                    message: {
                        name: user?.name,
                        teamName: teamName,
                        teamLink: `${process.env.NEXT_PUBLIC_BASE_URL}/register?team=${res.team._id}`,
                        ticket: `${
                            process.env.NEXT_PUBLIC_BASE_URL
                        }/dashboard?section=My+Tickets&ticket=${res.team._id.toString()}`,
                    },
                    subject: 'Congratulations! Your Team Has Been Created',
                }),
            });
        } else alert(res.message || 'Failed to create team');
    };

    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter((f) => f).length;
    const completionPercent = Math.floor((filledFields / totalFields) * 100);

    const shareLink =
        teamCreated || userAlreadyInTeam
            ? `${window.location.origin}/register?team=${
                  teamCreated?._id ||
                  user.teams.find(
                      (t) => t.event?.toString() === event._id.toString()
                  )?._id
              }`
            : '';

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white flex">
                {/* Left Side */}
                <div className="w-3/5 flex justify-center items-center p-6">
                    <div className="w-full max-w-lg space-y-4">
                        <h2 className="text-3xl font-bold mb-6 text-center">
                            Register for {event.name}
                        </h2>
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="border border-gray-700 rounded-lg overflow-hidden shadow-lg"
                            >
                                <button
                                    type="button"
                                    className="flex justify-between items-center w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 font-medium"
                                    onClick={() => toggleSection(index)}
                                >
                                    <div className="flex items-center gap-2">
                                        {section.id === 'team' ? (
                                            team?.success || teamCreated ? (
                                                <FaCheckCircle className="text-green-400" />
                                            ) : (
                                                <FaQuestionCircle className="text-gray-400" />
                                            )
                                        ) : isSectionComplete(section) ? (
                                            <FaCheckCircle className="text-green-400" />
                                        ) : (
                                            <FaQuestionCircle className="text-gray-400" />
                                        )}
                                        <span>{section.title}</span>
                                    </div>
                                    {activeSection === index ? (
                                        <FaChevronUp />
                                    ) : (
                                        <FaChevronDown />
                                    )}
                                </button>

                                <div
                                    ref={section.ref}
                                    className="overflow-hidden px-4"
                                    style={{ height: 0, opacity: 0 }}
                                >
                                    {index === 0 && (
                                        <div className="space-y-2 py-3">
                                            {[
                                                'name',
                                                'phoneNumber',
                                                'dateOfBirth',
                                            ].map((field, i) => (
                                                <input
                                                    key={i}
                                                    type={
                                                        field === 'dateOfBirth'
                                                            ? 'date'
                                                            : 'text'
                                                    }
                                                    name={field}
                                                    placeholder={field
                                                        .replace(
                                                            /([A-Z])/g,
                                                            ' $1'
                                                        )
                                                        .replace(/^./, (s) =>
                                                            s.toUpperCase()
                                                        )}
                                                    value={formData[field]}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white"
                                                />
                                            ))}
                                            <select
                                                value={formData?.gender}
                                                onChange={(e) => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        gender: e.target.value,
                                                    }));
                                                }}
                                                className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white"
                                            >
                                                <option value="">Select</option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                                <option value="Female">
                                                    Female
                                                </option>
                                                <option value="Male">
                                                    Male
                                                </option>
                                            </select>
                                            <Button
                                                text={
                                                    loading
                                                        ? 'Saving...'
                                                        : 'Save'
                                                }
                                                onClick={handleSaveProfile}
                                            />
                                        </div>
                                    )}
                                    {index === 1 && (
                                        <div className="space-y-2 py-3">
                                            {[
                                                'linkedInOrGithub',
                                                'city',
                                                'stateOrProvince',
                                                'country',
                                                'postalCode',
                                            ].map((field, i) => (
                                                <input
                                                    key={i}
                                                    type="text"
                                                    name={field}
                                                    placeholder={field
                                                        .replace(
                                                            /([A-Z])/g,
                                                            ' $1'
                                                        )
                                                        .replace(/^./, (s) =>
                                                            s.toUpperCase()
                                                        )}
                                                    value={formData[field]}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white"
                                                />
                                            ))}
                                            <Button
                                                text={
                                                    loading
                                                        ? 'Saving...'
                                                        : 'Save'
                                                }
                                                onClick={handleSaveProfile}
                                            />
                                        </div>
                                    )}
                                    {index === 2 && (
                                        <div className="space-y-3 py-3 text-center">
                                            {team?.success || teamCreated ? (
                                                <>
                                                    <p className="text-green-400 font-semibold">
                                                        ✅ You are already part
                                                        of a team!
                                                    </p>

                                                    <p className="text-sm text-gray-400 mt-1">
                                                        Share this link with
                                                        your teammates to let
                                                        them join:
                                                    </p>

                                                    <div className="flex items-center gap-2 justify-center mt-3">
                                                        <input
                                                            type="text"
                                                            readOnly
                                                            value={`${
                                                                window.location
                                                                    .origin
                                                            }/register?team=${
                                                                teamCreated?._id ||
                                                                team?.data
                                                            }`}
                                                            className="flex-grow border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white max-w-md"
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                navigator.clipboard.writeText(
                                                                    `${
                                                                        window
                                                                            .location
                                                                            .origin
                                                                    }/register?team=${
                                                                        teamCreated?._id ||
                                                                        team?.data
                                                                    }`
                                                                )
                                                            }
                                                            className="bg-green-500 px-3 py-2 rounded-lg hover:bg-green-600"
                                                        >
                                                            Copy
                                                        </button>
                                                    </div>
                                                    <p className="text-xs">
                                                        If copy not working
                                                        share team code instead{' '}
                                                        <span>
                                                            {teamCreated?._id ||
                                                                team?.data}
                                                        </span>
                                                    </p>

                                                    <div className="mt-4">
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
                                                            text="Create New Team"
                                                            onClick={() =>
                                                                setModalOpen(
                                                                    true
                                                                )
                                                            }
                                                        />
                                                    )}
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Team Code"
                                                            value={
                                                                InviteCode ||
                                                                teamCode
                                                            }
                                                            onChange={(e) =>
                                                                setTeamCode(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            disabled={
                                                                InviteCode
                                                            }
                                                            className="flex-grow border border-gray-600 rounded-lg px-4 py-2 bg-gray-800 text-white"
                                                        />
                                                        <Button
                                                            text="Join Team"
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
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-2/5 p-6 border-l border-gray-700 flex flex-col justify-center items-center text-center space-y-6">
                    <div className="text-6xl font-bold text-green-400">
                        {completionPercent}%
                    </div>
                    <div className="text-xl">Form Completed</div>
                    <div className="space-y-2 text-left">
                        <img src={event.image} alt="" />
                        <h3 className="text-2xl font-bold">{event.name}</h3>
                        <p>{event.shortDescription}</p>
                        <p className="mt-2">
                            <strong>Date:</strong>{' '}
                            {new Date(event.dateTime).toLocaleString()}
                        </p>
                        <p>
                            <strong>Location:</strong> {event.location}
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-gray-900 text-white w-full max-w-md p-6 rounded-2xl relative shadow-lg">
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                            onClick={() => setModalOpen(false)}
                        >
                            <FaTimes />
                        </button>

                        {!teamCreated && !userAlreadyInTeam ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">
                                    Create Your Team
                                </h2>
                                <input
                                    type="text"
                                    value={teamName}
                                    onChange={(e) =>
                                        setTeamName(e.target.value)
                                    }
                                    className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white mb-4"
                                    placeholder="Team Name"
                                />
                                <Button
                                    text={loading ? 'Creating...' : 'Create'}
                                    onClick={handleCreateTeam}
                                />
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold mb-4 text-green-400 text-center">
                                    Team Created!
                                </h2>
                                <p className="mb-2 text-center font-medium">
                                    Share this link with your teammates:
                                </p>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        readOnly
                                        value={shareLink}
                                        className="flex-grow border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white"
                                    />
                                    <button
                                        onClick={() =>
                                            navigator.clipboard.writeText(
                                                shareLink
                                            )
                                        }
                                        className="bg-green-500 px-3 py-2 rounded-lg hover:bg-green-600"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <div className="mt-4 text-center">
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
