'use client';

import React from 'react';
import { IKImage } from 'imagekitio-next';

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const Image = (props) => {
    return (
        <IKImage
            urlEndpoint={urlEndpoint}
            lqip={{ active: true, quality: 5, blur: 10 }}
            {...props}
            alt={props.alt || 'XCUBIT'}
        />
    );
};

export default Image;
