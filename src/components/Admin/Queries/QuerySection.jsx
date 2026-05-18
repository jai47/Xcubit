import Link from 'next/link';
import React from 'react';
import { MdNotificationsOff } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';

const QuerySection = ({ query }) => {
    const handleQueryDelete = async (e, id, name) => {
        e.preventDefault();

        const isConfirmed = confirm(`You are deleting ${name}'s query`);
        if (!isConfirmed) {
            // User clicked "Cancel", so do nothing
            return;
        }

        try {
            const req = await fetch('/api/query/queryDelete/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                }),
            });

            if (!req.ok) {
                alert('Failed to delete user');
            }

            const res = await req.json();
            alert(`Query deleted successfully!`);
            console.log(res);
        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error(error);
        }
    };

    return query ? (
        <div className="table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
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
                                Query
                            </th>
                            <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                Reply
                            </th>
                            <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>

                    {query?.map((query, index) => (
                        <React.Fragment key={index}>
                            <tbody className="group/body divide-y">
                                <tr
                                    data-testid="table-row-element"
                                    className="group/row hover:bg-gray-50 dark:hover:bg-gray-600 bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        {new Date(
                                            query.timestamp
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">{query.name}</td>
                                    <td className="px-6 py-4">{query.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="block max-h-16 w-52 overflow-y-auto break-words">
                                            {query.query}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <form
                                            className="w-full flex items-center gap-3"
                                            onSubmit={(e) => {
                                                const formData = new FormData(
                                                    e.target
                                                );
                                                const inputValue =
                                                    formData.get('reply');
                                                const mailtoLink = `mailto:${
                                                    query.email
                                                }?&subject=With%20reference%20to%20your%20mail&body=${encodeURIComponent(
                                                    inputValue
                                                )}`;
                                                window.location.href =
                                                    mailtoLink;
                                                e.preventDefault(); // Prevents default form submission behavior
                                            }}
                                        >
                                            <input
                                                type="text"
                                                name="reply"
                                                placeholder="Your reply"
                                                className="outline-none p-3 text-white border border-gray-400 bg-gray-600 hover:bg-slate-800 h-8 w-4/5 rounded-full break-words selection:bg-gray-500"
                                                autoComplete="off"
                                                required
                                            />
                                            <button
                                                type="submit"
                                                className="text-white"
                                                aria-label="send"
                                            >
                                                <IoMdSend size={20} />
                                            </button>
                                        </form>
                                    </td>

                                    <td>
                                        <div
                                            className="px-6 py-4 text-red-500 flex gap-4"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleQueryDelete(
                                                    e,
                                                    query._id,
                                                    query.name
                                                );
                                            }}
                                        >
                                            <MdNotificationsOff size={22} />
                                            <span>Delete</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </React.Fragment>
                    ))}
                </table>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-96">
            <h1 className="text-2xl text-gray-500">No queries for now</h1>
        </div>
    );
};

export default QuerySection;
