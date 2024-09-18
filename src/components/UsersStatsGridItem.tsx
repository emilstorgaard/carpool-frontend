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
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:cursor-pointer transition-shadow duration-300 ease-in-out">
            
            <Link href={`/users/${userId}`}>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {userName}
                    </h2>

                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-900 fon">Total Trips</label>
                        <label className="block mb-2 text-sm font-medium text-gray-900">{totalTrips}</label>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-900">Total Distance</label>
                        <label className="block mb-2 text-sm font-medium text-gray-900">{totalDistance}</label>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-900">Total Time</label>
                        <label className="block mb-2 text-sm font-medium text-gray-900">{totalTime}</label>
                    </div>
                </div>
            </Link>

        </div>
    );
};

export default Product;