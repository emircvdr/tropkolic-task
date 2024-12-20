"use client";
import { useState } from "react";
import { FaArrowDown, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import logo from "../../../../public/logo.png";

const Register = () => {


    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    return (
        <div className="flex flex-col justify-center items-center w-full h-screen px-4 bg-gray-50">
            <div className="flex gap-2 items-center justify-center mb-4">
                <Image src={logo} width={150} height={150} alt="Logo" />
            </div>
            <div className="w-full max-w-[90%] sm:max-w-[450px] h-auto py-6 px-5 bg-white shadow-md rounded-md">
                <h1 className="text-center text-2xl font-semibold mb-2">Join Us Today!</h1>
                <p className="text-center text-gray-600 mb-6 text-sm">
                    By signing up, you acknowledge that you have read and accepted our {" "}
                    <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a> and {" "}
                    <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>.
                </p>
                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Fullname"
                        value={form.fullname}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[--primary-600] text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <div className="flex items-center justify-center my-6">
                    <div className="w-[70px] sm:w-[100px] h-[1px] bg-gray-300" />
                    <FaArrowDown color="#c4c3c3" className="mx-4" />
                    <div className="w-[70px] sm:w-[100px] h-[1px] bg-gray-300" />
                </div>
                <div className="flex flex-col gap-4 items-center">
                    <button className="flex items-center justify-center gap-2 w-full bg-gray-100 py-2 rounded-md hover:bg-gray-200 transition duration-200">
                        <FcGoogle size={20} />
                        <span className="font-bold">Register with Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 w-full bg-gray-100 py-2 rounded-md hover:bg-gray-200 transition duration-200">
                        <FaGithub size={20} />
                        <span className="font-bold">Register with Github</span>
                    </button>
                    <p className="text-sm text-gray-600">
                        Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
