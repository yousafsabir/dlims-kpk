"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getQueryParams from "@/shared/utils/getQueryParams";
import ky from "ky";
import ApiUrls from "@/constants/ApiUrls";
import Licenses from "./components/tabs/licenses/Licenses";
import { Toaster } from "react-hot-toast";

const AdminPanel = () => {
    const router = useRouter();
    const [authToken, setAuthToken] = useState("");
    console.log(authToken);

    // ky instance
    const api = ky.create({
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

    // Admin Auth
    useEffect(() => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem("authToken");
            if(!token) {
                return router.push("/admin")
            }
            authenticate(token)
        }
    }, []);

    // authenticate me
    async function authenticate(token: string) {
        try {
            const userRes = await api.get(ApiUrls.auth.authenticate, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            setAuthToken("");
            localStorage.removeItem("authToken");
            router.push("/login");
        }
    }

    return (
        <>
            <Licenses />;
            <Toaster />
        </>
    );
};

export default AdminPanel;
