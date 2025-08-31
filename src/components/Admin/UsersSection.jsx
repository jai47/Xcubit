import Link from 'next/link';
import React, { useState } from 'react';
import { TiUserDelete } from 'react-icons/ti';
import Button from '../Button';

const UsersSection = ({ users }) => {
    const [expandedRows, setExpandedRows] = useState({});

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
        if (!isConfirmed) {
            // User clicked "Cancel", so do nothing
            return;
        }

        try {
            const req = await fetch('/api/admin-route/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    request: 'deleteUser',
                    id: id,
                }),
            });

            if (!req.ok) {
                alert('Failed to delete user');
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

        // Abort if no value is selected
        if (e.target.value === '') return;

        // Display confirmation prompt
        const isConfirmed = confirm(
            `You are changing the role of ${name} to ${e.target.value}`
        );
        if (!isConfirmed) {
            // Abort if the user clicks "Cancel"
            return;
        }

        try {
            // Send the request to the server
            const req = await fetch('/api/admin-route/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    request: 'changeRole',
                    id: id,
                    role: e.target.value,
                }),
            });

            if (!req.ok) {
                alert('Failed to change role');
            }

            const res = await req.json();
            console.log('Role updated successfully:', res);
        } catch (error) {
            console.error('Error:', error);
            alert(
                'An error occurred while changing the role. Please try again.'
            );
        }
    };

    return users ? (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <div
                data-testid="table-element"
                className="relative overflow-y-auto max-h-[800px] scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
            >
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 shadow-md">
                    <thead className="group/head text-xs uppercase text-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                Date Created
                            </th>
                            <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                Name
                            </th>
                            <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                Email
                            </th>
                            <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                Role
                            </th>
                            <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>

                    {users?.map((user, index) => (
                        <React.Fragment key={index}>
                            <tbody className="group/body divide-y">
                                <tr
                                    data-testid="table-row-element"
                                    className="group/row hover:bg-gray-50 dark:hover:bg-gray-600 bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                                    onClick={() => toggleRow(index)}
                                >
                                    <td className="px-6 py-4">
                                        {new Date(
                                            user.timestamp
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
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
                                                <option
                                                    value=""
                                                    className="text-gray-400"
                                                >
                                                    {user?.role
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        user?.role.slice(1)}
                                                </option>
                                                {['admin', 'user', 'security']
                                                    .filter(
                                                        (role) =>
                                                            role !== user.role
                                                    ) // Exclude the current role
                                                    .map((role) => (
                                                        <option
                                                            key={role}
                                                            value={role}
                                                        >
                                                            {role
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                role.slice(1)}
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
                                                handleUserDelete(e, user._id);
                                            }}
                                        >
                                            <TiUserDelete size={22} />
                                            <span>Delete</span>
                                        </div>
                                    </td>
                                </tr>
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
                                                    {user.events?.length > 0 ? (
                                                        user.events.map(
                                                            (event, i) => (
                                                                <span key={i}>
                                                                    {event.name}
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
    ) : (
        <div className="flex items-center justify-center h-96">
            <h1 className="text-2xl text-gray-500">No users found</h1>
        </div>
    );
};

export default UsersSection;
