"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    semester: string;
    section: string;
    rollNumber: string;
}

export default function Register() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        semester: "",
        section: "",
        rollNumber: "",
    });

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setSuccessMessage("Registration successful! Please login.");
                setTimeout(() => {
                    router.push("/login");
                }, 2000); // Redirect after 2 seconds
            } else {
                // Handle backend validation errors or other error messages
                setErrorMessage(data.message || "An error occurred during registration.");
            }
        } catch (error) {
            // Handle network or other errors
            console.error("Error during registration:", error);
            setErrorMessage("There was an issue connecting to the server. Please try again later.");
        }
    };
    

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="UOS Event Management"
                        src="/logo.png"
                        className="mx-auto h-24 w-auto rounded-full border-1"
                    />
                    {/* <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    /> */}
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Register to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg sm:shadow sm:rounded-lg sm:px-10 sm:py-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    First name
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="last_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="semester"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Current Semester
                                </label>
                                <select
                                    name="semester"
                                    id="semester"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                >
                                    <option value="">Select your semester</option>
                                    <option value="1st">1st</option>
                                    <option value="2nd">2nd</option>
                                    <option value="3rd">3rd</option>
                                    <option value="4th">4th</option>
                                    <option value="5th">5th</option>
                                    <option value="6th">6th</option>
                                    <option value="7th">7th</option>
                                    <option value="8th">8th</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="section"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Section
                                </label>
                                <select
                                    name="section"
                                    id="section"
                                    value={formData.section}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                >
                                    <option value="">Select your section</option>
                                    <option value="reg">Regular</option>
                                    <option value="ss1">SS1</option>
                                    <option value="ss2">SS2</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="rollNumber"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Complete Roll number
                            </label>
                            <input
                                type="text"
                                id="rollNumber"
                                name="rollNumber"
                                value={formData.rollNumber}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="Enter Your Complete Roll number"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="john.doe@company.com"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                minLength={8}
                                maxLength={20}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="•••••••••"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="confirm_password"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Confirm password
                            </label>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                minLength={8}
                                maxLength={20}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="•••••••••"
                                required
                            />
                        </div>
                        
                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 mt-2 text-center"
                        >
                            Register
                        </button>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already a member?{" "}
                        <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
