import Link from 'next/link';

const DetailsPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-3/4 lg:w-1/2">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">name</h1>

                {/* Event Info */}
                <div className="space-y-6">
                    <div className="flex justify-between">
                        <p className="text-lg font-medium text-gray-700">
                            Total Registrations:
                        </p>
                        <p className="text-lg text-gray-800">100</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="text-lg font-medium text-gray-700">
                            Total Tickets:
                        </p>
                        <p className="text-lg text-gray-800">{1000}</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="text-lg font-medium text-gray-700">
                            Tickets Left:
                        </p>
                        <p className="text-lg text-gray-800">10</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="text-lg font-medium text-gray-700">
                            Organizer Name:
                        </p>
                        <p className="text-lg text-gray-800">jhon</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="text-lg font-medium text-gray-700">
                            Organizer Email:
                        </p>
                        <p className="text-lg text-gray-800">jhon@gmail.com</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="text-lg font-medium text-gray-700">
                            Organizer Phone:
                        </p>
                        <p className="text-lg text-gray-800">0000000000</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="text-lg font-medium text-gray-700">
                            Payment Status:
                        </p>
                        <p className="text-lg text-gray-800">completed</p>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 text-center">
                    <Link href="/admin">
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                            Back to Dashboard
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;
