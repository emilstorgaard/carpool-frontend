export interface User {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Trip {
    id: string;
    userId: string;
    distance: number;
    isCarpool: boolean;
    startDate: string;
    stopDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserStats {
    totalTrips: number;
    totalDistance: number;
    totalTime: string;
}

export interface TotalStats {
    totalUsers: number;
    totalTrips: number;
    totalDistance: number;
    totalTime: string;
}

export interface UserTripStats {
    userId: string;
    userName: string;
    totalTrips: number;
    totalDistance: number;
    totalTime: string;
}
