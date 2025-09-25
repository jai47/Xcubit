import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import {
    getUserFromDB,
    getUserEmailPassword,
    userGoogleAction,
} from '@/src/serverAction/userAction';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const user = await getUserEmailPassword(
                    credentials.email,
                    credentials.password
                );

                if (!user) throw new Error('Invalid credentials.');

                return {
                    id: user._id,
                    role: user.role, // ✅ ensure role is returned
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    verified: user.verified,
                };
            },
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            async profile(profile) {
                const email = profile.email;
                const name = profile.name;

                try {
                    // Save the user to MongoDB
                    const userExist = await getUserFromDB(email);
                    if (userExist) {
                        return {
                            id: userExist._id,
                            role: userExist.role || 'user',
                            name: userExist.name,
                            email: userExist.email,
                            image: userExist.image,
                        };
                    } else {
                        const newUser = await userGoogleAction(email, name);
                        return {
                            id: newUser._id,
                            role: newUser.role || 'user',
                            name: newUser.name,
                            email: newUser.email,
                            image: newUser.image,
                        };
                    }
                } catch (error) {
                    console.error('Failed to save user:', error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id?.toString();
                token.role = user.role || 'user'; // ✅ fallback
                token.verified = user.verified ?? false;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.id = token.id;
                session.role = token.role || 'user'; // ✅ fallback
                session.verified = token.verified ?? false;
            }
            return session;
        },
        // signIn: async (user, account) => {
        //     if (account.provider === 'google' && user) {
        //         user.role = 'user';
        //     }
        //     return true;
        // },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.AUTH_SECRET,
});
