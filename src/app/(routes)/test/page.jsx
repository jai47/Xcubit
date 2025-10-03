import { nationalEventAdminGETLATEST } from '@/src/serverAction/nationalAction';

export default async function LatestEventCard() {
    const { success, data } = await nationalEventAdminGETLATEST();

    if (!success) return <p>No latest event found.</p>;

    return (
        <div className="p-4 rounded-lg shadow bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-bold">{data.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">
                Session: {data.session}
            </p>
            <p className="text-gray-500">
                Date: {data.date ? new Date(data.date).toDateString() : 'TBA'}
            </p>
        </div>
    );
}
