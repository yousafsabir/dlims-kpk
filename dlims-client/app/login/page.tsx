"use client";
import React, { useState } from "react";
import ky from "ky";
import ApiUrls from "@/constants/ApiUrls";
import { Admin } from "@/shared/interfaces/admin";
import { useRouter } from "next/navigation";

function Login() {
    const router = useRouter();
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const login = async () => {
        try {
            const response: any = await ky
                .post(ApiUrls.auth.login, {
                    json: loginForm,
                })
                .json();
            console.log("response",response);
            const user: Admin = response?.user
            localStorage.setItem("authToken", user.token)
            router.push("/admin");
        } catch (error: any) {
            const message = error?.message || "Server Error";
            alert(message);
        }
    };
    const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!loginForm.email || !loginForm.password) {
            return alert("Both Fields required");
        }
        login();
    };
    return (
        <main className="min-h-screen flex justify-center items-center">
            <form
                className="min-w-[400px] flex flex-col items-center space-y-3 p-4 rounded-md bg-gray-600"
                onSubmit={onLogin}
            >
                <h1 className="text-4xl font-bold text-center">Login</h1>
                <fieldset className="form-control w-full flex-1">
                    <label className="label">
                        <span className="label-text">Email :</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered w-full"
                        name="email"
                        onChange={handleForm}
                    />
                </fieldset>
                <fieldset className="form-control w-full flex-1">
                    <label className="label">
                        <span className="label-text">Password :</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                        name="password"
                        onChange={handleForm}
                    />
                </fieldset>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </main>
    );
}

export default Login;
