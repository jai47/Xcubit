import React, { useEffect, useRef, useState } from 'react';

/*
  SettingsDashboard (macOS-inspired)
  - Single-file React component (Tailwind CSS required in project)
  - Mock/local-only behaviour for demonstration (no backend calls)
  - Exports a default component you can drop into a page

  Features implemented:
  a) Appearance: theme (Light / Dark / Auto), accent color picker
  b) Profile: editable name, profile image upload + live preview, Delete account flow
  c) Privacy & Security: 2FA toggle, active sessions list w/ revoke, last password change
  d) Notifications: email/browser/push toggles
  e) Integrations: connect/disconnect placeholders (Google/GitHub/LinkedIn), API keys manager
  f) Data & Storage: download data (JSON), clear cache (localStorage) button
  g) System: language selector, timezone auto-detect toggle
  h) Support: report issue and contact support modals
*/

const AccentSwatch = ({ color, selected, onClick }) => (
    <button
        onClick={() => onClick(color)}
        aria-label={`Accent ${color}`}
        className={`w-8 h-8 rounded-full border-2 ${
            selected ? 'ring-2 ring-offset-1 ring-white/40' : 'border-white/10'
        }`}
        style={{ backgroundColor: color }}
    />
);

const Toggle = ({ checked, onChange, disabled }) => (
    <label
        className={`relative inline-flex items-center cursor-pointer ${
            disabled ? 'opacity-60' : ''
        }`}
    >
        <input
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
        />
        <div className="w-12 h-6 bg-white/6 rounded-full peer-checked:bg-indigo-500 peer-focus:ring-2 peer-focus:ring-indigo-400 transition-colors duration-200" />
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-6 transition-transform duration-200" />
    </label>
);

const Modal = ({ open, onClose, children, title }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-neutral-900/95 border border-white/10 rounded-2xl p-6 w-full max-w-xl shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-300 hover:text-white"
                    aria-label="Close modal"
                >
                    ✕
                </button>
                {title && (
                    <h3 className="text-lg font-semibold mb-4">{title}</h3>
                )}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default function SettingsDashboard({ initialProfile = null }) {
    // ---------- Appearance
    const [theme, setTheme] = useState('auto'); // auto | light | dark
    const [accent, setAccent] = useState('#5b21b6'); // default indigo/purple

    // ---------- Profile
    const [profile, setProfile] = useState(
        initialProfile || {
            name: 'Jai',
            email: 'jai@example.com',
            avatar: null, // dataURL
            verified: true,
            lastPasswordChange: '2025-09-12',
        }
    );
    const [editingName, setEditingName] = useState(false);
    const fileInputRef = useRef(null);

    // ---------- Privacy & Security
    const [twoFA, setTwoFA] = useState(false);
    const [sessions, setSessions] = useState([
        {
            id: 's1',
            device: 'MacBook Pro',
            location: 'India - Home',
            lastSeen: '2025-10-09',
            current: true,
        },
        {
            id: 's2',
            device: 'iPhone 14',
            location: 'India - Mobile',
            lastSeen: '2025-10-01',
            current: false,
        },
    ]);

    // ---------- Notifications
    const [notifications, setNotifications] = useState({
        email: true,
        browser: false,
        push: false,
    });

    // ---------- Integrations
    const [integrations, setIntegrations] = useState({
        google: false,
        github: false,
        linkedin: false,
    });
    const [apiKeys, setApiKeys] = useState([
        {
            id: 'key1',
            name: 'Default Key',
            key: 'abcd-1234-efgh',
            createdAt: '2025-01-01',
        },
    ]);

    // ---------- System
    const [language, setLanguage] = useState('en');
    const [tzAuto, setTzAuto] = useState(true);
    const [timezone, setTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    );

    // ---------- Modals and UI state
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openSupportModal, setOpenSupportModal] = useState(false);
    const [openContactModal, setOpenContactModal] = useState(false);
    const [ticketMsg, setTicketMsg] = useState('');

    // ---------- small utility messages
    const [toast, setToast] = useState(null);
    useEffect(() => {
        if (toast) {
            const t = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(t);
        }
    }, [toast]);

    useEffect(() => {
        // apply theme to document root
        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
        } else if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            // auto -> match system
            const prefersDark =
                window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', prefersDark);
        }
    }, [theme]);

    useEffect(() => {
        // apply accent color as CSS variable
        document.documentElement.style.setProperty('--accent', accent);
    }, [accent]);

    // ---------- profile picture handling
    const handleAvatarChange = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            setProfile((p) => ({ ...p, avatar: e.target.result }));
            setToast('Profile image updated');
        };
        reader.readAsDataURL(file);
    };

    // ---------- account delete
    const handleDeleteAccount = () => {
        // for demo: just reset profile and close modal
        setProfile(null);
        setOpenDeleteModal(false);
        setToast('Account deleted (demo-mode)');
    };

    // ---------- sessions
    const revokeSession = (id) => {
        if (!confirm('Revoke this session?')) return;
        setSessions((s) => s.filter((i) => i.id !== id));
        setToast('Session revoked');
    };

    // ---------- api keys
    const createApiKey = () => {
        const id = `key${Math.random().toString(36).slice(2, 8)}`;
        const newKey = {
            id,
            name: 'New Key',
            key: Math.random().toString(36).slice(2, 10),
            createdAt: new Date().toISOString().slice(0, 10),
        };
        setApiKeys((k) => [newKey, ...k]);
        setToast('API key created');
    };
    const deleteApiKey = (id) => {
        if (!confirm('Delete this API key?')) return;
        setApiKeys((k) => k.filter((x) => x.id !== id));
        setToast('API key deleted');
    };

    // ---------- data & storage
    const downloadData = () => {
        const payload = {
            profile,
            sessions,
            notifications,
            integrations,
            apiKeys,
            createdAt: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `xcubit-data-${new Date()
            .toISOString()
            .slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        setToast('Your data is downloading');
    };
    const clearCache = () => {
        if (!confirm('Clear local cache (localStorage)?')) return;
        localStorage.clear();
        setToast('Local cache cleared');
    };

    // ---------- integrations connect/disconnect (mock)
    const toggleIntegration = (name) => {
        setIntegrations((i) => ({ ...i, [name]: !i[name] }));
        setToast(
            `${name} ${
                integrations[name] ? 'disconnected' : 'connected'
            } (demo)`
        );
    };

    // ---------- Support submit
    const submitTicket = () => {
        if (!ticketMsg.trim()) return setToast('Please enter a message');
        setOpenSupportModal(false);
        setTicketMsg('');
        setToast('Support ticket submitted (demo)');
    };

    // ---------- timezone auto-detect toggle
    useEffect(() => {
        if (tzAuto) {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            setTimezone(tz);
        }
    }, [tzAuto]);

    // ---------- small helper renderers
    const Section = ({ title, children }) => (
        <section className="mt-6 border-t border-white/6 pt-6">
            <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">
                {title}
            </h4>
            <div className="space-y-4">{children}</div>
        </section>
    );

    return (
        <div className="p-6 sm:p-10 w-full rounded-xl mx-auto bg-neutral-900/60 backdrop-blur-md shadow-2xl border border-white/6 text-white">
            <div className="flex items-center justify-between flex-wrap gap-5">
                <div>
                    <h2 className="text-2xl font-semibold">Settings</h2>
                    <p className="text-sm text-gray-400">
                        Manage your account, privacy and preferences.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs text-gray-400">Accent</span>
                        <div className="flex gap-2 items-center">
                            {[
                                '#5b21b6',
                                '#2563eb',
                                '#b91c1c',
                                '#0ea5a4',
                                '#7c3aed',
                            ].map((c) => (
                                <AccentSwatch
                                    key={c}
                                    color={c}
                                    selected={accent === c}
                                    onClick={setAccent}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* -------- Appearance -------- */}
            <Section title="Appearance">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/6">
                    <div>
                        <div className="text-base font-medium">Theme</div>
                        <div className="text-sm text-gray-400">
                            Light / Dark / Auto (match system)
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="bg-transparent border border-white/10 px-3 py-2 rounded-md"
                        >
                            <option value="auto">Auto (system)</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                </div>
            </Section>

            {/* -------- Profile -------- */}
            <Section title="Profile">
                <div className="p-4 rounded-xl bg-white/3 border border-white/6 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
                        {profile?.avatar ? (
                            <img
                                src={profile.avatar}
                                alt="avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-gray-400">No avatar</div>
                        )}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            {editingName ? (
                                <input
                                    value={profile?.name || ''}
                                    onChange={(e) =>
                                        setProfile((p) => ({
                                            ...p,
                                            name: e.target.value,
                                        }))
                                    }
                                    className="bg-transparent border border-white/10 px-3 py-2 rounded-md w-full"
                                />
                            ) : (
                                <h3 className="text-lg font-medium">
                                    {profile?.name || 'No user'}
                                </h3>
                            )}

                            <button
                                onClick={() => setEditingName((s) => !s)}
                                className="text-sm px-3 py-1 bg-white/5 rounded-md"
                            >
                                {editingName ? 'Save' : 'Edit'}
                            </button>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                            {profile?.email}
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                    handleAvatarChange(e.target.files?.[0])
                                }
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-2 bg-white/5 rounded-md text-sm"
                            >
                                Upload Photo
                            </button>
                            <button
                                onClick={() => {
                                    setProfile((p) => ({ ...p, avatar: null }));
                                    setToast('Avatar removed');
                                }}
                                className="px-3 py-2 bg-white/5 rounded-md text-sm"
                            >
                                Remove
                            </button>
                            <button
                                onClick={() => setOpenDeleteModal(true)}
                                className="ml-auto text-red-400 border border-red-500 px-3 py-2 rounded-md"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </Section>

            {/* -------- Privacy & Security -------- */}
            <Section title="Privacy & Security">
                <div className="p-4 rounded-xl bg-white/3 border border-white/6 flex items-center justify-between">
                    <div>
                        <div className="text-base font-medium">
                            Two-Factor Authentication
                        </div>
                        <div className="text-sm text-gray-400">
                            Add an extra layer of security to your account.
                        </div>
                    </div>
                    <Toggle
                        checked={twoFA}
                        onChange={(v) => {
                            setTwoFA(v);
                            setToast(
                                v ? '2FA enabled (demo)' : '2FA disabled (demo)'
                            );
                        }}
                    />
                </div>

                <div className="p-4 rounded-xl bg-white/3 border border-white/6">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <div className="text-base font-medium">
                                Active Sessions
                            </div>
                            <div className="text-sm text-gray-400">
                                Manage devices that are signed in to your
                                account.
                            </div>
                        </div>
                        <div className="text-sm text-gray-400">
                            {sessions.length} active
                        </div>
                    </div>

                    <ul className="space-y-3">
                        {sessions.map((s) => (
                            <li
                                key={s.id}
                                className="flex items-center justify-between bg-neutral-800/30 p-3 rounded-md"
                            >
                                <div>
                                    <div className="font-medium">
                                        {s.device}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {s.location} • Last seen {s.lastSeen}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {s.current ? (
                                        <span className="text-xs text-green-400">
                                            This device
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => revokeSession(s.id)}
                                            className="text-sm px-3 py-1 bg-white/5 rounded-md"
                                        >
                                            Revoke
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="text-sm text-gray-400 mt-3">
                        Last password change:{' '}
                        <span className="text-white ml-2">
                            {profile?.lastPasswordChange}
                        </span>
                    </div>
                </div>
            </Section>

            {/* -------- Notifications -------- */}
            <Section title="Notifications">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Object.entries(notifications).map(([k, v]) => (
                        <div
                            key={k}
                            className="p-4 rounded-xl bg-white/3 border border-white/6 flex items-center justify-between"
                        >
                            <div>
                                <div className="font-medium capitalize">
                                    {k}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {k === 'email'
                                        ? 'Email notifications for updates.'
                                        : k === 'browser'
                                        ? 'Desktop/browser notifications.'
                                        : 'Mobile push notifications.'}
                                </div>
                            </div>
                            <Toggle
                                checked={v}
                                onChange={(val) =>
                                    setNotifications((n) => ({
                                        ...n,
                                        [k]: val,
                                    }))
                                }
                            />
                        </div>
                    ))}
                </div>
            </Section>

            {/* -------- Integrations & API Keys -------- */}
            <Section title="Integrations">
                <div className="p-4 rounded-xl bg-white/3 border border-white/6">
                    <div className="flex items-center gap-3 flex-wrap">
                        {['google', 'github', 'linkedin'].map((name) => (
                            <div
                                key={name}
                                className="flex-1 p-3 bg-neutral-900/30 rounded-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium capitalize">
                                            {name}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {integrations[name]
                                                ? 'Connected'
                                                : 'Not connected'}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleIntegration(name)}
                                        className="px-3 py-1 rounded-md bg-white/5"
                                    >
                                        {integrations[name]
                                            ? 'Disconnect'
                                            : 'Connect'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">API Keys</div>
                            <div className="text-sm text-gray-400">
                                Manage your programmatic access
                            </div>
                        </div>
                        <div className="space-y-2">
                            {apiKeys.map((k) => (
                                <div
                                    key={k.id}
                                    className="flex items-center justify-between bg-neutral-800/30 p-3 rounded-md"
                                >
                                    <div>
                                        <div className="font-medium">
                                            {k.name}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {k.key} • created {k.createdAt}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                navigator.clipboard.writeText(
                                                    k.key
                                                ) && setToast('Key copied')
                                            }
                                            className="px-3 py-1 bg-white/5 rounded-md text-sm"
                                        >
                                            Copy
                                        </button>
                                        <button
                                            onClick={() => deleteApiKey(k.id)}
                                            className="px-3 py-1 bg-red-600/20 rounded-md text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={createApiKey}
                                className="px-4 py-2 rounded-md bg-white/5"
                            >
                                Create API Key
                            </button>
                        </div>
                    </div>
                </div>
            </Section>

            {/* -------- Data & Storage -------- */}
            <Section title="Data & Storage">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/3 border border-white/6 flex flex-col">
                        <div className="font-medium">Download my data</div>
                        <div className="text-sm text-gray-400 mb-4">
                            Get a JSON export of your account data.
                        </div>
                        <div className="mt-auto">
                            <button
                                onClick={downloadData}
                                className="px-4 py-2 rounded-md bg-white/5"
                            >
                                Download JSON
                            </button>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/3 border border-white/6 flex flex-col">
                        <div className="font-medium">Clear local cache</div>
                        <div className="text-sm text-gray-400 mb-4">
                            Clears localStorage and cached client data.
                        </div>
                        <div className="mt-auto">
                            <button
                                onClick={clearCache}
                                className="px-4 py-2 rounded-md bg-white/5"
                            >
                                Clear Cache
                            </button>
                        </div>
                    </div>
                </div>
            </Section>

            {/* -------- System -------- */}
            <Section title="System">
                <div className="p-4 rounded-xl bg-white/3 border border-white/6 flex items-center justify-between">
                    <div>
                        <div className="font-medium">Language</div>
                        <div className="text-sm text-gray-400">
                            Choose your preferred language
                        </div>
                    </div>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-transparent border border-white/10 px-3 py-2 rounded-md"
                    >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="es">Español</option>
                    </select>
                </div>

                <div className="p-4 rounded-xl bg-white/3 border border-white/6 flex items-center justify-between mt-3">
                    <div>
                        <div className="font-medium">Timezone</div>
                        <div className="text-sm text-gray-400">
                            {timezone} {tzAuto ? '(auto)' : ''}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Toggle
                            checked={tzAuto}
                            onChange={(v) => setTzAuto(v)}
                        />
                        {!tzAuto && (
                            <input
                                value={timezone}
                                onChange={(e) => setTimezone(e.target.value)}
                                className="bg-transparent border border-white/10 px-3 py-2 rounded-md"
                            />
                        )}
                    </div>
                </div>
            </Section>

            {/* -------- Support -------- */}
            <Section title="Support">
                <div className="p-4 rounded-xl bg-white/3 border border-white/6 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Report an issue</div>
                            <div className="text-sm text-gray-400">
                                Tell us about bugs, feedback or problems.
                            </div>
                        </div>
                        <button
                            onClick={() => setOpenSupportModal(true)}
                            className="px-3 py-1 rounded-md bg-white/5"
                        >
                            Report
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Contact Support</div>
                            <div className="text-sm text-gray-400">
                                Start a conversation with our support team.
                            </div>
                        </div>
                        <button
                            onClick={() => setOpenContactModal(true)}
                            className="px-3 py-1 rounded-md bg-white/5"
                        >
                            Contact
                        </button>
                    </div>
                </div>
            </Section>

            {/* -------- Footer actions -------- */}
            <div className="mt-6 flex items-center justify-end gap-3">
                <button
                    onClick={() => setToast('Settings saved (demo)')}
                    className="px-4 py-2 rounded-full bg-white/5"
                >
                    Save
                </button>
                <button
                    onClick={() => {
                        setProfile(initialProfile || profile);
                        setToast('Reverted changes (demo)');
                    }}
                    className="px-4 py-2 rounded-full border border-white/6"
                >
                    Revert
                </button>
            </div>

            {/* -------- Modals -------- */}
            <Modal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                title="Delete account?"
            >
                <p className="text-sm text-gray-300 mb-4">
                    This will permanently remove your account and data (demo).
                    This action cannot be undone here.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setOpenDeleteModal(false)}
                        className="px-4 py-2 rounded-md bg-white/5"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 rounded-md bg-red-600"
                    >
                        Delete account
                    </button>
                </div>
            </Modal>

            <Modal
                open={openSupportModal}
                onClose={() => setOpenSupportModal(false)}
                title="Report an issue"
            >
                <textarea
                    value={ticketMsg}
                    onChange={(e) => setTicketMsg(e.target.value)}
                    rows={6}
                    className="w-full bg-transparent border border-white/10 p-3 rounded-md"
                    placeholder="Describe the issue..."
                />
                <div className="flex justify-end gap-3 mt-3">
                    <button
                        onClick={() => setOpenSupportModal(false)}
                        className="px-4 py-2 rounded-md bg-white/5"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={submitTicket}
                        className="px-4 py-2 rounded-md bg-indigo-600"
                    >
                        Submit
                    </button>
                </div>
            </Modal>

            <Modal
                open={openContactModal}
                onClose={() => setOpenContactModal(false)}
                title="Contact Support"
            >
                <div className="text-sm text-gray-300 mb-3">
                    Send us a message and we will respond via email.
                </div>
                <input
                    className="w-full bg-transparent border border-white/10 p-2 rounded-md mb-3"
                    placeholder="Subject"
                />
                <textarea
                    rows={5}
                    className="w-full bg-transparent border border-white/10 p-3 rounded-md mb-3"
                    placeholder="Message"
                />
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setOpenContactModal(false)}
                        className="px-4 py-2 rounded-md bg-white/5"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            setOpenContactModal(false);
                            setToast('Message sent (demo)');
                        }}
                        className="px-4 py-2 rounded-md bg-indigo-600"
                    >
                        Send
                    </button>
                </div>
            </Modal>

            {/* toast */}
            {toast && (
                <div
                    style={{ boxShadow: '0 6px 30px rgba(0,0,0,0.5)' }}
                    className="fixed bottom-8 right-8 bg-neutral-900/95 border border-white/6 text-white px-4 py-2 rounded-md"
                >
                    {toast}
                </div>
            )}
        </div>
    );
}
