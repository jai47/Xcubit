import { redirect } from 'next/navigation';

export default async function Page() {
    const year = new Date().getFullYear();
    redirect('/ps/' + year.toString());
}
