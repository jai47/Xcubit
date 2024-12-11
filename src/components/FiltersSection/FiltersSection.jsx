// components/FiltersSection.jsx
const FiltersSection = () => {
    return (
        <div className="bg-neutral-800 text-white shadow-lg rounded-xl p-6 flex flex-wrap justify-between items-center max-w-6xl mx-auto -mt-12">
            {/* Search Event Input */}
            <div className="flex-1 sm:flex-auto sm:mr-4 mb-4 sm:mb-0">
                <label className="text-sm text-white mb-2 block">
                    Search Event
                </label>
                <input
                    type="text"
                    placeholder="Ideathon"
                    className="bg-neutral-800 border-b border-gray-500 text-white px-4 py-2 focus:outline-none focus:border-white w-full"
                />
            </div>

            {/* Place Select */}
            <div className="flex-1 sm:flex-auto sm:mr-4 mb-4 sm:mb-0">
                <label className="text-sm text-white mb-2 block">Place</label>
                <select className="bg-neutral-800 border-b border-gray-500 text-white px-4 py-2 focus:outline-none focus:border-white w-full">
                    <option>Faridabad</option>
                    <option>Hyderabad</option>
                    <option>Online</option>
                </select>
            </div>

            {/* Time Select */}
            <div className="flex-1 sm:flex-auto mb-4 sm:mb-0">
                <label className="text-sm text-white mb-2 block">Time</label>
                <select className="bg-neutral-800 border-b border-gray-500 text-white px-4 py-2 focus:outline-none focus:border-white w-full">
                    <option>Today</option>
                    <option>This Week</option>
                </select>
            </div>
        </div>
    );
};

export default FiltersSection;
