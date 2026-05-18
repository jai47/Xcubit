import React, { useState } from 'react';
import { MdEditCalendar } from 'react-icons/md';
import { MdEventBusy } from 'react-icons/md';
import EditEventsSection from './EditEventsSection';
import Image from 'next/image';

const EventsSection = ({ events }) => {
    const [edit, setEdit] = useState({ show: false, data: {} });
    console.log(events);

    const handleEdit = (event) => {
        setEdit({ show: true, data: event });
    };
    return (
        <div className="relative w-full">
            {!edit.show && (
                <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
                    <div
                        data-testid="table-element"
                        className="relative overflow-y-auto max-h-[800px] scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
                    >
                        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 shadow-md">
                            <thead className="group/head text-xs uppercase text-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                        Event Date
                                    </th>
                                    <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                        Picture
                                    </th>
                                    <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                        Name
                                    </th>
                                    <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                        Institute
                                    </th>
                                    <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                        Edit
                                    </th>
                                    <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3">
                                        Delete
                                    </th>
                                </tr>
                            </thead>

                            {Object.entries({ ...events }).map(
                                (event, index) => (
                                    <React.Fragment key={index}>
                                        <tbody className="group/body divide-y">
                                            <tr
                                                data-testid="table-row-element"
                                                className="group/row hover:bg-gray-50 dark:hover:bg-gray-600 bg-white dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <td className="px-6 py-4">
                                                    {new Date(
                                                        event?.[1].dateTime
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Image
                                                        src={event?.[1].image}
                                                        width={100}
                                                        height={80}
                                                        alt={event?.[1].name}
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    {event[1]?.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {event?.[1].institute?.name}
                                                </td>
                                                <td
                                                    onClick={() =>
                                                        handleEdit(event?.[1])
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <div className="flex items-center justify-center gap-3">
                                                        <MdEditCalendar
                                                            size={22}
                                                        />
                                                        <span>Edit</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="px-6 py-4 text-red-500 flex gap-3">
                                                        <MdEventBusy
                                                            size={22}
                                                            onClick={() =>
                                                                alert(
                                                                    `Delete user: ${event?.[1].name}`
                                                                )
                                                            }
                                                        />
                                                        <span>Delete</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </React.Fragment>
                                )
                            )}
                        </table>
                    </div>
                </div>
            )}
            {edit.show && (
                <EditEventsSection
                    event={edit.data}
                    back={() => {
                        setEdit({ show: false });
                    }}
                />
            )}
        </div>
    );
};

export default EventsSection;
