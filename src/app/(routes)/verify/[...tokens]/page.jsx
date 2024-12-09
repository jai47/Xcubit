import { redirect } from 'next/navigation';

const { updateVerifyUser } = require('@/serverAction/userAction');

export default async function page({ params }) {
    const { tokens } = await params;
    if (tokens?.[0]) {
        await updateVerifyUser(tokens[0]); // Update user verification if token is valid
        redirect('/verify');
    }

    return (
        <>
            <div>hello</div>

            {/* <div>{user?._id?.toString()}</div>
            <div>{user?.name}</div>
            <div>{user?.email}</div>
            <div>{user?.role}</div>
            <div>{user?.forgotPasswordToken}</div>
            <div>{user?.forgotPasswordTokenExpiry?.toString()}</div>
            <div>{user?.verifyToken}</div>
            <div>{user?.verifyTokenExpiry?.toString()}</div>
            <div>{user?.timestamp?.toString()}</div> */}
        </>
    );
}
