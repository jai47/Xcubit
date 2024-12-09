import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import {
    getUserFromDB,
    getUserEmailPassword,
    userGoogleAction,
} from '@/serverAction/userAction';

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
                let user = null;

                // logic to verify if the user exists
                user = await getUserEmailPassword(
                    credentials.email,
                    credentials.password
                );

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error('Invalid credentials.');
                }

                // return user object with their profile data
                return user;
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
                            role: userExist.role,
                            name: userExist.name,
                            email: userExist.email,
                            image: userExist.image,
                        };
                    } else {
                        const newUser = await userGoogleAction(email, name);
                        return {
                            id: newUser._id,
                            role: newUser.role,
                            name: newUser.name,
                            email: newUser.email,
                            image: newUser.image,
                        };
                    }
                } catch (error) {
                    console.error('Failed to save user:', error);
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                // User is available during sign-in
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token;
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    screte: process.env.AUTH_SECRET,
});
