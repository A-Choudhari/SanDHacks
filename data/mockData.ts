export type DietaryFlag = 'Vegan' | 'Vegetarian' | 'Gluten-Free' | 'Halal';

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    calories: number;
    dietaryTags: DietaryFlag[];
    station: string;
    isPopular?: boolean;
}

export interface DiningLocation {
    id: string;
    name: string;
    image: string; // URL
    isOpen: boolean;
    closingTime: string; // e.g. "9:00 PM"
    crowdLevel: 'Low' | 'Moderate' | 'Busy';
    waitTime: number; // in minutes
    menu: MenuItem[];
    stations: string[]; // List of restaurants/stations inside
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

export const MOCK_LOCATIONS: DiningLocation[] = [
    {
        id: '1',
        name: '64 Degrees',
        image: 'https://admin-facilities.ucsd.edu/media/images/photo-gallery/dining/64-degrees/64-degrees-01.jpg',
        isOpen: true,
        closingTime: '9:00 PM',
        crowdLevel: 'Busy',
        waitTime: 25,
        stations: ['Triton Grill', 'Wok This Way', 'Taqueria', 'Garden Bar', 'al Dente', 'UMI'],
        coordinates: { latitude: 32.8749, longitude: -117.2404 },
        menu: [
            {
                id: '101',
                name: 'The Burger',
                description: '1/3 lb Angus beef patty, lettuce, tomato, onion, secret sauce on brioche.',
                price: 8.50,
                calories: 750,
                dietaryTags: [],
                station: 'Burger Lounge',
                isPopular: true,
            },
            {
                id: '102',
                name: 'Veggie Wok',
                description: 'Tofu, seasonal vegetables, teriyaki sauce, jasmine rice.',
                price: 9.00,
                calories: 550,
                dietaryTags: ['Vegan', 'Gluten-Free'],
                station: 'Wok Station',
            },
        ],
    },
    {
        id: '2',
        name: 'Pines',
        image: 'https://admin-facilities.ucsd.edu/media/images/photo-gallery/dining/pines/pines-01.jpg',
        isOpen: true,
        closingTime: '10:00 PM',
        crowdLevel: 'Moderate',
        waitTime: 15,
        stations: ['Huli Huli', 'Pasta Bar', 'Salad Bar', 'Grill', 'Pizza'],
        coordinates: { latitude: 32.8797, longitude: -117.2425 },
        menu: [
            {
                id: '201',
                name: 'Chicken Pesto Pasta',
                description: 'Grilled chicken breast, creamy pesto sauce, penne pasta.',
                price: 10.25,
                calories: 820,
                dietaryTags: [],
                station: 'Pasta Bar',
                isPopular: true,
            },
            {
                id: '202',
                name: 'Caprese Salad',
                description: 'Fresh mozzarella, tomatoes, basil, balsamic glaze.',
                price: 7.50,
                calories: 320,
                dietaryTags: ['Vegetarian', 'Gluten-Free'],
                station: 'Salad Bar',
            },
        ],
    },
    {
        id: '3',
        name: 'Canyon Vista',
        image: 'https://admin-facilities.ucsd.edu/media/images/photo-gallery/dining/canyon-vista/canyon-vista-01.jpg',
        isOpen: true,
        closingTime: '8:00 PM',
        crowdLevel: 'Low',
        waitTime: 0,
        stations: ['Fusion Grill', 'Fresh', 'Three-Sixty', 'Earl\'s Coffee House'],
        coordinates: { latitude: 32.8833, longitude: -117.2335 },
        menu: [
            {
                id: '301',
                name: 'Breakfast Burrito',
                description: 'Scrambled eggs, potatoes, cheese, salsa, flour tortilla.',
                price: 6.75,
                calories: 680,
                dietaryTags: ['Vegetarian'],
                station: 'Morning Grill',
            },
        ],
    },
    {
        id: '4',
        name: 'OceanView',
        image: 'https://admin-facilities.ucsd.edu/media/images/photo-gallery/dining/oceanview/oceanview-01.jpg',
        isOpen: true,
        closingTime: '10:00 PM',
        crowdLevel: 'Low',
        waitTime: 5,
        stations: ['Spice Station', 'Scholars Pizza', 'Slice Pizzeria', 'Counter Culture'],
        coordinates: { latitude: 32.8833, longitude: -117.2420 },
        menu: [
            {
                id: '401',
                name: 'Margherita Pizza',
                description: 'Tomato sauce, fresh mozzarella, basil.',
                price: 9.00,
                calories: 800,
                dietaryTags: ['Vegetarian'],
                station: 'Pizza Oven',
            },
        ]
    },
    {
        id: '5',
        name: 'Cafe Ventanas',
        image: 'https://admin-facilities.ucsd.edu/media/images/photo-gallery/dining/cafe-ventanas/cafe-ventanas-01.jpg',
        isOpen: true,
        closingTime: '9:00 PM',
        crowdLevel: 'Moderate',
        waitTime: 10,
        stations: ['Vibe', 'Journey', 'Soul', 'Hapi', 'Tandoor', 'Kaldi'],
        coordinates: { latitude: 32.8860, longitude: -117.2430 },
        menu: [
            {
                id: '501',
                name: 'Green Curry',
                description: 'Spicy green curry with bamboo shoots and thai basil.',
                price: 9.50,
                calories: 600,
                dietaryTags: ['Gluten-Free'],
                station: 'International',
            },
        ]
    },
    {
        id: '6',
        name: 'Sixth College',
        image: 'https://admin-facilities.ucsd.edu/media/images/photo-gallery/dining/sixth/sixth-01.jpg',
        isOpen: true,
        closingTime: '11:00 PM',
        crowdLevel: 'Busy',
        waitTime: 20,
        stations: ['Wolftown', 'Makai', 'Crave', 'Noodles', 'The Rooftop'],
        coordinates: { latitude: 32.8797, longitude: -117.2340 },
        menu: [
            {
                id: '601',
                name: 'Pork Ramen',
                description: 'Chashu pork, soft boiled egg, nori, green onions, tonkotsu broth.',
                price: 11.00,
                calories: 900,
                dietaryTags: [],
                station: 'Noodles',
            },
        ]
    }
];
