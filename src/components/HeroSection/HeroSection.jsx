// components/HeroSection.jsx
const HeroSection = () => {
    return (
        <section
            className="h-[90vh] text-white text-left bg-cover bg-center "
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D')",
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <div
                className="min-w-full h-full "
                style={{
                    backgroundImage:
                        'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0.2),  rgba(0, 0, 0, 0.6))',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <div className="max-w-5xl mx-auto h-full flex flex-col justify-center">
                    <h1 className="text-7xl font-medium mb-10">Ideathon</h1>
                    <p className="text-lg mb-5">
                        Short description about the ideathon goes here
                    </p>
                    <p className="mb-2">location goes here</p>
                    <p>24 Dec | 07:00 am</p>
                    <button className="w-fit mt-6 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-full transition duration-300 shadow-lg">
                        Get Ticket
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
