import Link from "next/link";

export default function NotFound() {
    return (
        <div className="page-container-narrow py-16">
            <div className="panel text-center">
                <p className="text-sm font-semibold text-primary-600 mb-2">404</p>
                <h1 className="text-xl font-bold text-slate-900 mb-2">Page not found</h1>
                <p className="text-sm text-slate-500 mb-6">
                    The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                </p>
                <Link href="/" className="btn-primary">Back to Dashboard</Link>
            </div>
        </div>
    );
}
