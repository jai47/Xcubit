import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import { TiUserDelete } from 'react-icons/ti';
import { CiSearch } from 'react-icons/ci';
import { RxCross1 } from 'react-icons/rx';

const UsersSection = ({ users }) => {
    const [expandedRows, setExpandedRows] = useState({});
    const [search, setSearch] = useState('');

    // Toggle row expansion
    const toggleRow = (index) => {
        setExpandedRows((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleUserDelete = async (e, id) => {
        e.preventDefault();
        const isConfirmed = confirm(`You are deleting user with id: ${id}`);
        if (!isConfirmed) return;

        try {
            const req = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ request: 'deleteUser', id }),
            });

            if (!req.ok) {
                alert('Failed to delete user');
                return;
            }

            const res = await req.json();
            alert(`User deleted successfully!`);
            console.log(res);
        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error(error);
        }
    };

    const handleRoleChange = async (e, name, id) => {
        e.preventDefault();
        if (e.target.value === '') return;

        const isConfirmed = confirm(
            `You are changing the role of ${name} to ${e.target.value}`
        );
        if (!isConfirmed) return;

        try {
            const req = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    request: 'changeRole',
                    id,
                    role: e.target.value,
                }),
            });

            if (!req.ok) alert('Failed to change role');

            const res = await req.json();
            console.log('Role updated successfully:', res);
        } catch (error) {
            console.error('Error:', error);
            alert(
                'An error occurred while changing the role. Please try again.'
            );
        }
    };

    // Filtered users (memoized for performance)
    const filteredUsers = useMemo(() => {
        if (!search) return users;
        const lower = search.toLowerCase();
        return users.filter((u) =>
            [u.name, u.email, u.role]
                .filter(Boolean)
                .some((field) => field.toLowerCase().includes(lower))
        );
    }, [search, users]);

    return users ? (
        <div className="p-3">
            {/* Search bar */}
            <div className="mb-4 flex justify-center">
                <div className="relative w-full md:w-1/2">
                    <div className="bg-gray-600 text-white px-3 py-2 rounded border border-gray-400 flex items-center gap-10">
                        <input
                            type="text"
                            placeholder="Search by name, email, role"
                            className="outline-none border-none bg-transparent flex-1"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div
                            className="cursor-pointer"
                            onClick={() => setSearch('')}
                        >
                            {search ? (
                                <RxCross1 size={18} />
                            ) : (
                                <CiSearch size={20} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Users table */}
            <div className="table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
                <div className="relative overflow-y-auto max-h-[800px] scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 shadow-md">
                        <thead className="text-xs uppercase text-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                    Date Created
                                </th>
                                <th className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                    Name
                                </th>
                                <th className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                    Email
                                </th>
                                <th className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                    Role
                                </th>
                                <th className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                    Delete
                                </th>
                            </tr>
                        </thead>

                        {filteredUsers?.map((user, index) => (
                            <React.Fragment key={index}>
                                <tbody className="divide-y">
                                    <tr
                                        className="hover:bg-gray-50 dark:hover:bg-gray-600 bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                                        onClick={() => toggleRow(index)}
                                    >
                                        <td className="px-6 py-4">
                                            {new Date(
                                                user.timestamp
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.role === 'admin' ? (
                                                <p className="bg-green-400 w-fit text-gray-900 px-7 py-1 rounded-full">
                                                    Admin
                                                </p>
                                            ) : (
                                                <select
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                    onChange={(e) =>
                                                        handleRoleChange(
                                                            e,
                                                            user.name,
                                                            user._id
                                                        )
                                                    }
                                                    className="outline-none border-none px-3 py-1 bg-gray-400 text-gray-900 rounded-full"
                                                >
                                                    <option value="">
                                                        {user?.role
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            user?.role.slice(1)}
                                                    </option>
                                                    {[
                                                        'admin',
                                                        'user',
                                                        'security',
                                                    ]
                                                        .filter(
                                                            (role) =>
                                                                role !==
                                                                user.role
                                                        )
                                                        .map((role) => (
                                                            <option
                                                                key={role}
                                                                value={role}
                                                            >
                                                                {role
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    role.slice(
                                                                        1
                                                                    )}
                                                            </option>
                                                        ))}
                                                </select>
                                            )}
                                        </td>
                                        <td>
                                            <div
                                                className="px-6 py-4 text-red-500 flex gap-4"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleUserDelete(
                                                        e,
                                                        user._id
                                                    );
                                                }}
                                            >
                                                <TiUserDelete size={22} />
                                                <span>Delete</span>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Expanded Row */}
                                    {expandedRows[index] && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="bg-gray-50 dark:bg-gray-700 px-6 py-4"
                                            >
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex gap-2">
                                                        <span className="font-semibold">
                                                            Address:
                                                        </span>
                                                        {user.address ? (
                                                            <span>
                                                                {`${user.address}, ${user.city}, ${user.stateOrProvince}, ${user.country}, ${user.postalCode}`}
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                Not available
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className="font-semibold">
                                                            Date of Birth:
                                                        </span>
                                                        {user.dateOfBirth ? (
                                                            <span>
                                                                {new Date(
                                                                    user.dateOfBirth
                                                                ).toLocaleDateString()}
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                Not available
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className="font-semibold">
                                                            Phone Number:
                                                        </span>
                                                        {user.phoneNumber || (
                                                            <span>
                                                                Not available
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className="font-semibold">
                                                            Gender:
                                                        </span>
                                                        {user.gender || (
                                                            <span>
                                                                Not available
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className="font-semibold">
                                                            LinkedIn/GitHub:
                                                        </span>
                                                        {user.linkedInOrGithub ? (
                                                            <Link
                                                                href={
                                                                    user.linkedInOrGithub
                                                                }
                                                                target="_blank"
                                                            >
                                                                {
                                                                    user.linkedInOrGithub
                                                                }
                                                            </Link>
                                                        ) : (
                                                            <span>
                                                                Not available
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className="font-semibold">
                                                            Events:
                                                        </span>
                                                        {user.events?.length >
                                                        0 ? (
                                                            user.events.map(
                                                                (event, i) => (
                                                                    <span
                                                                        key={i}
                                                                    >
                                                                        {
                                                                            event.name
                                                                        }
                                                                    </span>
                                                                )
                                                            )
                                                        ) : (
                                                            <span>
                                                                Not available
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </React.Fragment>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-96">
            <h1 className="text-2xl text-gray-500">No users found</h1>
        </div>
    );
};

export default UsersSection;
