import Navbar from '@/src/components/layout/NavbarHome';
import ProblemTable from '@/src/components/ps/ProblemStatement';
import { problemStatementGET } from '@/src/serverAction/problemStatementAction';

export default async function Page({ params }) {
    const { year } = await params;

    // Fetch problem statements using server action
    const response = await problemStatementGET();
    let problems = [];
    if (response.success) {
        problems = response.data.filter(
            (p) => new Date(p.createdAt).getFullYear() === Number(year)
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-neutral-950 p-6 pt-36">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white/70 to-gray-100/50">
                        Problem Statements -{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300">
                            {year}
                        </span>
                    </h1>

                    {/* Client-side interactive table */}
                    <ProblemTable initialProblems={problems} />
                </div>
            </div>
        </>
    );
}
