'use server';
import { signIn, signOut } from '@/app/auth';

export async function loginCred(formData) {
    try {
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: true,
            callbackUrl: '/dashboard',
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function loginGoogle() {
    try {
        const response = await signIn('google', { redirectTo: '/dashboard' });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function signinWithGoogle() {
    try {
        const response = await signIn('google');
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function logout() {
    try {
        const response = await signOut({ redirectTo: '/' });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
