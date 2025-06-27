import { useSession } from "next-auth/react";
import React from "react";
import LogoutButton from "./Logout";
import Link from "next/link";

const Navbar = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        // checking auth
        return <div>Loading...</div>;
    }

    type Role = "admin" | "user" | null;

    const roleFromSession = session?.user?.role;

    const role: Role =
        roleFromSession === "admin" ? "admin" :
            roleFromSession === "user" ? "user" :
                null;
    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 font-bold text-xl tracking-wide">
                        NEXT AUTH
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-6">
                        <Link
                            href="/"
                            className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Home
                        </Link>
                        {(role === "user" || role === "admin") && (
                            <Link
                                href="/dashboard"
                                className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Dashboard
                            </Link>
                        )}
                        {role === "admin" && (
                            <>
                                <Link
                                    href="/admin"
                                    className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Admin Panel
                                </Link>
                                <Link
                                    href="/admin/settings"
                                    className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Settings
                                </Link>
                            </>
                        )}

                        {(role === "user" || role === "admin") && (
                            <Link
                                href="/profile"
                                className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Profile
                            </Link>
                        )}
                            {role && <LogoutButton />}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
