import Link from 'next/link';

export function Footer() {
    return (
        <footer className="flex flex-col items-center bg-neutral-200 text-white fixed bottom-0 w-full">
            <div className="w-full bg-gray-100 p-4 text-center text-neutral-700">
                © 2024 -
                <Link className="text-neutral-800 hover:underline" href="/">www.carpool.dk</Link> -
                Emil Storgaard Andersen
            </div>
        </footer>
    );
}