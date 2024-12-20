import { Calendar, MapPin, MoveRight } from "lucide-react";
import Image from "next/image";

export default function Cards({
    name,
    description,
    tag,
    image,
    price,
    location,
    date,
}: {
    name: string;
    description: string;
    tag: string;
    image: string;
    price: string;
    location: string;
    date: string;
}) {
    return (
        <div className="w-[300px] h-[440px] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <div className="relative">
                <Image
                    src={image}
                    alt={name}
                    width={300}
                    height={200}
                    className="w-full h-[200px] object-cover"
                    loader={({ src }) => src} loading="lazy"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
                    <p className="text-white text-sm font-light">{price}</p>
                    <h2 className="text-white text-lg font-semibold">{name}</h2>
                </div>
                <div className="absolute top-0 right-0 flex items-center justify-center p-2">
                    <p className="bg-[--primary-400] text-white rounded-lg text-sm px-4 py-1">
                        {tag}
                    </p>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <p className="text-gray-700 text-[13px] flex gap-2 items-center"><MapPin className="w-[13px] h-[13px]" />{location}</p>
                <p className="text-gray-700 text-sm flex gap-2 items-center"><Calendar className="w-[10px] h-[10px]" />{date}</p>
            </div>

            <div className="p-4 flex-1">
                <h2 className="font-bold">Description</h2>
                <p className="text-gray-700 text-sm">{description}</p>
            </div>
            <div className="p-4 flex items-center justify-end">
                <MoveRight className="w-5 h-5 p-1 rounded-full text-black hover:bg-gray-200 hover:text-white transition-all" />
            </div>
        </div>
    );
}
