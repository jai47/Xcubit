import React from 'react';

export default async function Loading() {
    return (
        <div className="fixed w-screen h-screen flex justify-center items-center">
            <div className="w-12 h-12 rounded-full animate-spin border border-dashed border-black border-t-transparent"></div>
        </div>
    );
}
