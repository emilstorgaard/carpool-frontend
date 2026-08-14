import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="page-container py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
                <span>&copy; {new Date().getFullYear()} Carpool. All rights reserved.</span>
                <span>
                    Built by <Link className="font-medium text-slate-700 hover:text-primary-600" href="/">Emil Storgaard Andersen</Link>
                </span>
            </div>
        </footer>
    );
}