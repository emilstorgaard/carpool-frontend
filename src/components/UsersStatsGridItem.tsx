import Link from "next/link";

interface ProductProps {
    userId: string;
    userName: string;
    totalTrips: number;
    totalDistance: number;
    totalTime: string;
}

const Product: React.FC<ProductProps> = ({ userId, userName, totalTrips, totalDistance, totalTime }) => {
    return (
        <Link href={`/users/${userId}`} className="card card-hover block p-5">
            <h3 className="text-base font-semibold text-slate-900 mb-4 truncate">
                {userName}
            </h3>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="stat-label">Trips</span>
                    <span className="text-sm font-semibold text-slate-900">{totalTrips}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="stat-label">Distance</span>
                    <span className="text-sm font-semibold text-slate-900">{totalDistance} km</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="stat-label">Time</span>
                    <span className="text-sm font-semibold text-slate-900">{totalTime}</span>
                </div>
            </div>
        </Link>
    );
};

export default Product;