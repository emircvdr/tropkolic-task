"use client"
import { Globe, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Logo from "../../../public/tripkolicLogo.png"





export default function Navbar() {

    return (
        <div className="w-full h-[60px] bg-slate-50 flex items-center justify-between p-2">
            <div className="flex flex-row gap-1 items-center">
                <p className="text-xs text-black">Travaller&apos;s local market</p>

            </div>
            <Image src={Logo} alt="logo" width={20} height={20} />
            <div className="flex gap-4">
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-black" />
                    <Heart className="w-4 h-4 text-black" />
                    <ShoppingCart className="w-4 h-4 text-black" />
                </div>
                <div className="w-[30px] h-[30px] rounded-full bg-black"></div>
            </div>
        </div>
    );
}