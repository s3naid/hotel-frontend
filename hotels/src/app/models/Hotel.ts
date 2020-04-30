export interface FavoriteHotel {
    id: number;
    hotel: Hotel;
}

export interface Hotel {
    id: number;
    name: string;
    address: string;
    geolocation: string;
    description: string;
    overall_rating: number;
    hotel_reviews: [];

}
