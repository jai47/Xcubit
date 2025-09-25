'use server';
import { signIn, signOut } from '@/src/auth';
import { redirect } from 'next/navigation';

export async function loginCred(formData) {
    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
            callbackUrl: '/',
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
    redirect('/dashboard');
}

export async function loginGoogle() {
    try {
        const response = await signIn('google', { redirectTo: '/' });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function signinWithGoogle() {
    try {
        const response = await signIn('google', { redirectTo: '/' });
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
