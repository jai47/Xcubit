import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({ data }) => {
    const qrData = JSON.stringify(data);

    return (
        <div className="flex justify-center my-4">
            <QRCodeCanvas
                value={qrData}
                size={144}
                bgColor="#ffffff"
                fgColor="#000000"
                level="Q"
            />
        </div>
    );
};

export default QRCodeGenerator;
