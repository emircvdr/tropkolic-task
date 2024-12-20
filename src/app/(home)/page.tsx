/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { getData } from "@/api/api";
import { SlidersHorizontal, X } from "lucide-react";

interface Tour {
    id: string;
    title: string;
    description: string;
    galleries: string[];
    tag: string;
}

export default function Home() {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [groupSize, setGroupSize] = useState<number>(0);
    const [price, setPrice] = useState<number>(12000);
    const [selectedFilters, setSelectedFilters] = useState<any>({
        location: "",
        theme: [] as string[],
        activity: [] as string[],
        vehicle: [] as string[],
        features: [] as string[],
    });
    const [selectedCategory, setSelectedCategory] = useState<string>("TOURS");
    const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
    const [appliedFilters, setAppliedFilters] = useState<boolean>(false);
    const categories: any[] = [
        { name: "TOURS", value: "TOURS" },
        { name: "TICKETS", value: "TICKETS" },
        { name: "RENT", value: "RENT" },
        { name: "TRANSFER", value: "TRANSFER" },
    ];

    const filters: any = {
        theme: [
            { name: "Island Tour", value: "Island Tour" },
            { name: "Land Tour", value: "Land Tour" },
            { name: "Safari", value: "Safari" },
        ],
        activity: [
            { name: "Swimming", value: "swimming" },
            { name: "Running", value: "running" },
            { name: "Elephant Core", value: "elephantCore" },
        ],
        vehicle: [
            { name: "Yacht", value: "Yacht" },
            { name: "Speedboat", value: "Speedboat" },
            { name: "Catamaran", value: "Catamaran" },
            { name: "Safari", value: "Safari" },
            { name: "Speedcatamaran", value: "Speedcatamaran" },
        ],
        features: [
            { name: "Transfer", value: "transfer" },
            { name: "Halal Food", value: "halalFood" },
            { name: "Vegetarian Food", value: "vegetarianFood" },
        ],
    };

    const handleFilterSelect = (filterCategory: string, value: string) => {
        setSelectedFilters((prevState: any) => {
            const updatedCategory = prevState[filterCategory];
            if (updatedCategory.includes(value)) {
                return {
                    ...prevState,
                    [filterCategory]: updatedCategory.filter((item: string) => item !== value)
                };
            } else {
                return {
                    ...prevState,
                    [filterCategory]: [...updatedCategory, value]
                };
            }
        });
    };

    const handleSearch = () => {
        setAppliedFilters(true);
        setIsPopupOpen(false);
    };

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        setIsCategoryOpen(false);
    };

    const [data, setData] = useState<Tour[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getData();
            setData(response);
        };
        fetchData();
    }, []);

    const openpopup = () => {
        setIsPopupOpen(true);
    };

    const filteredData = data.filter((tour: any) => {
        if (selectedCategory === "TOURS" && appliedFilters) {
            const isLocationMatch = tour.activityLocation.address.toLowerCase().includes(selectedFilters.location.toLowerCase());
            const isThemeMatch = selectedFilters.theme.length === 0 || selectedFilters.theme.some((theme: string) => tour.tourCategory.name.includes(theme));
            const isVehicleMatch = selectedFilters.vehicle.length === 0 || selectedFilters.vehicle.some((vehicle: string) => tour.vehicle.name.includes(vehicle));
            return isLocationMatch && isThemeMatch && isVehicleMatch;
        }
        return true;
    });

    const resetFilters = () => {
        setSelectedFilters({
            location: "",
            theme: [],
            activity: [],
            vehicle: [],
            features: [],
        });
        setAppliedFilters(false);
        setPrice(12000);
        setGroupSize(0);
        setIsPopupOpen(false);
    };

    return (
        <div className="flex flex-col gap-2 items-center justify-center p-2 relative">
            <button className="bg-[#f5f5f5] text-black px-4 py-2 rounded-lg absolute left-0 top-0 z-10" onClick={openpopup}><SlidersHorizontal className="w-4 h-4 text-black cursor-pointer" /></button>
            {
                filteredData.map((tour: any) => (
                    <Cards key={tour.id}
                        name={tour.title}
                        description={tour.description}
                        image={tour.galleries[2].url}
                        tag={tour.productCategory.toUpperCase()}
                        price={`From $${tour?.price.adultPrice}`}
                        location={tour.activityLocation.address}
                        date={`${tour.routes[0].startDate} - ${tour.routes[0].endDate}`} />
                ))
            }
            {
                isPopupOpen &&
                (<div className="fixed overflow-auto z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-start justify-center p-4">
                    <div className="w-full max-w-[400px] bg-white rounded-lg shadow-lg p-6 mt-16">
                        <div className="flex justify-between items-center mb-4 w-full">
                            <button
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                className="bg-[--primary-400] text-white p-1 rounded-md"
                            >
                                {
                                    categories.find((category: any) => category.value === selectedCategory)?.name
                                }
                            </button>
                            {isCategoryOpen && (
                                <div className="absolute bg-white p-4 rounded-lg shadow-md mt-2">
                                    {categories.map((category: any) => (
                                        <button
                                            key={category.value}
                                            onClick={() => handleCategoryClick(category.value)}
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <h2 className="text-xl text-center underline">Filter</h2>
                            <button onClick={() => setIsPopupOpen(false)} className="border p-1 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-5">
                            {selectedCategory === "TOURS" && (
                                <>
                                    <div>
                                        <label htmlFor="search" className="block text-sm text-gray-700 mb-2">
                                            Location
                                        </label>
                                        <input
                                            id="search"
                                            type="text"
                                            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Search Location"
                                            value={selectedFilters.location}
                                            onChange={(e) => setSelectedFilters({ ...selectedFilters, location: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="search" className="block text-sm text-gray-700 mb-2">
                                            Theme
                                        </label>
                                        {filters.theme.map((theme: any, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => handleFilterSelect("theme", theme.value)}
                                                className={`bg-transparent border text-gray-800 px-2 py-1 rounded-md mr-2 mb-2 ${selectedFilters.theme.includes(theme.value) ? 'bg-[#e07516]' : ''}`}
                                            >
                                                {theme.name}
                                            </button>
                                        ))}
                                    </div>
                                    <div>
                                        <label htmlFor="search" className="block text-sm text-gray-700 mb-2">
                                            Activity
                                        </label>
                                        {filters.activity.map((activity: any, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => handleFilterSelect("activity", activity.value)}
                                                className={`bg-transparent border text-gray-800 px-2 py-1 rounded-md mr-2 mb-2 ${selectedFilters.activity.includes(activity.value) ? 'bg-[#e07516]' : ''}`}
                                            >
                                                {activity.name}
                                            </button>
                                        ))}
                                    </div>
                                    <div>
                                        <label htmlFor="slider" className="block text-sm text-gray-700 mb-2">
                                            Price: {price}
                                        </label>
                                        <input
                                            id="slider"
                                            type="range"
                                            min="0"
                                            max="100000"
                                            value={price}
                                            onChange={(e) => setPrice(Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="slider" className="block text-sm text-gray-700 mb-2">
                                            Group Size: {groupSize}
                                        </label>
                                        <input
                                            id="slider"
                                            type="range"
                                            min="0"
                                            max="30"
                                            value={groupSize}
                                            onChange={(e) => setGroupSize(Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="search" className="block text-sm text-gray-700 mb-2">
                                            Vehicle
                                        </label>
                                        {filters.vehicle.map((vehicle: any, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => handleFilterSelect("vehicle", vehicle.value)}
                                                className={`bg-transparent border text-gray-800 px-2 py-1 rounded-md mr-2 mb-2 ${selectedFilters.vehicle.includes(vehicle.value) ? 'bg-[#e07516]' : ''}`}
                                            >
                                                {vehicle.name}
                                            </button>
                                        ))}
                                    </div>
                                    <div>
                                        <label htmlFor="search" className="block text-sm text-gray-700 mb-2">
                                            Features
                                        </label>
                                        {filters.features.map((feature: any, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => handleFilterSelect("features", feature.value)}
                                                className={`bg-transparent border text-gray-800 px-2 py-1 rounded-md mr-2 mb-2 ${selectedFilters.features.includes(feature.value) ? 'bg-[#e07516]' : ''}`}
                                            >
                                                {feature.name}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between gap-4 mt-4">
                                        <button onClick={resetFilters} className="w-full bg-[--primary-400] text-white py-2 rounded-lg hover:bg-[--primary-600] transition">
                                            Reset
                                        </button>
                                        <button
                                            onClick={handleSearch}
                                            className="w-full bg-[--primary-400] text-white py-2 rounded-lg hover:bg-[--primary-600] transition"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
}
