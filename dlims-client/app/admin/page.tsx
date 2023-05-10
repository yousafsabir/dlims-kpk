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
    const [authToken, setAuthToken] = useState(
        localStorage.getItem("authToken") || ""
    );
    console.log(authToken);
    
    // ky instance
    const api = ky.create({
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

    // Admin Auth
    useEffect(() => {
        const params = getQueryParams();
        if (!authToken) {
            if (params && params.token) {
                setAuthToken(params.token);
                localStorage.setItem("authToken", params.token);
            } else {
                router.push("/login");
            }
        } else {
            authenticate();
        }
    }, []);

    // authenticate me
    async function authenticate() {
        try {
            const userRes = await api.get(ApiUrls.auth.authenticate);
        } catch (error) {
            setAuthToken("");
            localStorage.removeItem("authToken");
            router.push("/login");
        }
    }

    return (
        <>
            <Licenses kyInstance={api} />;
            <Toaster />
        </>
    );
};

export default AdminPanel;
