// FeaturedGuestsSection.js

import FeaturedGuestsCard from './FeaturedGuestsCard';

const FeaturedGuestsSection = ({ featuredGuests }) => {
    return (
        <div className="mt-12 px-4 sm:px-8 lg:px-16 xl:px-24">
            <h3
                className="text-2xl sm:text-3xl font-semibold mb-6"
                style={{
                    background:
                        'linear-gradient(-45deg, rgb(247, 110, 31), rgb(251, 216, 96))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Speakers / Guests
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGuests.map((guest, index) => (
                    <FeaturedGuestsCard
                        key={index}
                        image={guest.image}
                        name={guest.name}
                        role={guest.role}
                        title={guest.designation}
                        socialLinks={guest.socialLinks}
                    />
                ))}
            </div>
        </div>
    );
};

export default FeaturedGuestsSection;
