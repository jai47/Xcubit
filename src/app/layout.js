import localFont from 'next/font/local';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/src/auth';
import Script from 'next/script';
import { NationalEventProvider } from '../context/National/NationalEventContext';
import { nationalEventAdminGETLATEST } from '../serverAction/nationalAction';

export const metadata = {
    title: 'Xcubit: Revolutionizing Ticketing and Event Management',
    description:
        'Xcubit is a platform that provides easy ticket registration for events and activities happening around the world. Whether it’s a conference, concert, seminar, or any other event, Xcubit makes it simple for organizers and attendees to connect through seamless ticketing solutions.',
};

export default async function RootLayout({ children }) {
    const session = await auth();
    const { data: latestEvent } = await nationalEventAdminGETLATEST();
    return (
        <html lang="en">
            <head>
                {/* GTM Script */}
                <Script id="gtm-script" strategy="afterInteractive">
                    {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MDNW3ZJS');
          `}
                </Script>
            </head>
            <body className="antialiased">
                {/* GTM NoScript (for users without JS) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-MDNW3ZJS"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>

                <SessionProvider session={session}>
                    <NationalEventProvider initialEvent={latestEvent}>
                        {children}
                    </NationalEventProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
