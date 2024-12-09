// components/FiltersSection.jsx
const FiltersSection = () => {
    return (
        <div className="bg-neutral-800 text-white shadow-lg rounded-xl p-6 flex justify-between items-center max-w-4xl mx-auto -mt-12">
            {/* Search Event Input */}
            <div className="flex-1 flex flex-col mr-4">
                <label className="text-sm text-white mb-1">Search Event</label>
                <input
                    type="text"
                    placeholder="Ideathon"
                    className="bg-neutral-800 border-b border-gray-500 text-white px-2 py-1 focus:outline-none focus:border-white"
                />
            </div>

            {/* Place Select */}
            <div className="flex-1 flex flex-col mr-4">
                <label className="text-sm text-white mb-1">Place</label>
                <select className="bg-neutral-800 border-b border-gray-500 text-white px-2 py-1 focus:outline-none focus:border-white">
                    <option>Faridabad</option>
                    <option>Hyderabad</option>
                    <option>Online</option>
                </select>
            </div>

            {/* Time Select */}
            <div className="flex-1 flex flex-col">
                <label className="text-sm text-white mb-1">Time</label>
                <select className="bg-neutral-800 border-b border-gray-500 text-white px-2 py-1 focus:outline-none focus:border-white">
                    <option>Today</option>
                    <option>This Week</option>
                </select>
            </div>
        </div>
    );
};

export default FiltersSection;
