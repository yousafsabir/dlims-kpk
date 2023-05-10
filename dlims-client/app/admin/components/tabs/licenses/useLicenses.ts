"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { LicenseI } from "@/shared/interfaces/License.interface";
import { LicenseFormI } from "./License.interface";
import ApiUrls from "@/constants/ApiUrls";
import { Admin } from "@/shared/interfaces/admin";
import { KyInstance } from "ky/distribution/types/ky";
import useStatus from "@/shared/utils/useStatus";
import toast from "react-hot-toast";
import isEmpty from 'is-empty'

const useLicenses = (kyInstance: KyInstance) => {
    //* Status State
    const {
        status,
        setLoading,
        setSuccess,
        setError,
        setMiniLoading,
        resetStatus,
    } = useStatus();
    //*---------------------------------

    //* Add/Edit License Form
    const [editFlag, setEditFlag] = useState<boolean>(false);
    const [licenseForm, setLicenseForm] = useState<LicenseFormI>({
        licenseNo: "",
        name: "",
        fatherName: "",
        category: [],
        cnic: "",
        image: null,
        issueDate: "",
        expiryDate: "",
    });
    console.log(licenseForm);
    const handleLicenseForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        if (name === "image" && files) {
            setLicenseForm((prevState) => ({
                ...prevState,
                image: files[0],
            }));
        } else {
            setLicenseForm((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const handleCategory = (
        add: boolean,
        category: { category: string; place: number }
    ) => {
        let updatedList = licenseForm.category;
        if (add) {
            updatedList = [...updatedList, category];
        } else {
            updatedList = updatedList.filter(
                (item) => item.category !== category.category
            );
        }
        setLicenseForm((prevState) => ({
            ...prevState,
            category: updatedList,
        }));
    };
    //*---------------------------------

    /* Search Parameters */
    const [search, setSearch] = useState({
        cnic: "",
        sort: "descending",
        pagination: {
            page: 1,
            limit: 10,
            total: 0,
            prev: false,
            next: false,
        },
    });
    console.log(search)
    const [searchChange, setSearchChange] = useState<string>("");
    const searchStr = `?${search.cnic ? `cnic=${search.cnic}&` : ""}${
        search.pagination.page ? `page=${search.pagination.page}&` : ""
    }${search.pagination.limit ? `limit=${search.pagination.limit}&` : ""}${
        search.sort ? `sort=${search.sort}&` : ""
    }`;
    const disableApplyFilterBtn = Boolean(searchStr === searchChange);
    const setSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearch((prev) => ({ ...prev, sort: e.target.value }));
    };
    const setCnic = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch((prev) => ({ ...prev, cnic: e.target.value }));
    };
    const resetSearch = () => {
        setSearch({
            cnic: "",
            sort: "descending",
            pagination: {
                page: 1,
                limit: 10,
                total: 0,
                prev: false,
                next: false,
            },
        });
    };
    const applySearch = () => {
        if (disableApplyFilterBtn || status.loading || status.miniLoading)
            return;
        getLicenses();
    };
    const setPagination = (pagination: {
        page: number;
        limit: number;
        total: number;
        prev: boolean;
        next: boolean;
    }) => {
        setSearch((prev) => ({ ...prev, pagination }));
    };
    const [paginationChange, setPaginationChange] = useState<boolean>(false);
    const nextPage = () => {
        setSearch((prev) => ({
            ...prev,
            pagination: { ...prev.pagination, page: prev.pagination.page + 1 },
        }));
        setPaginationChange(true);
    };
    const prevPage = () => {
        setSearch((prev) => ({
            ...prev,
            pagination: { ...prev.pagination, page: prev.pagination.page - 1 },
        }));
        setPaginationChange(true);
    };
    useEffect(() => {
        if (paginationChange) {
            // getOrders();
            setPaginationChange(false);
        }
    }, [paginationChange]);
    /* ---------------- */

    //* Licenses State
    const [licenses, setLicenses] = useState<LicenseI[]>([
        {
            licenseNo: "ZT44782",
            name: "SHEHRYAR",
            fatherName: "MUHAMMAD IQBAL",
            category: [
                { category: "M/CYCLE", place: 1 },
                { category: "CAR", place: 2 },
            ],
            cnic: "3830111664367",
            image: ApiUrls.images + "47eb69d5-c44a-49ba-9b7a-7b2fda9b1272.jpeg",
            issueDate: "03/30/2023",
            expiryDate: "03/30/2023",
        },
        {
            licenseNo: "ZT44799",
            name: "ADIL",
            fatherName: "MUHAMMAD IQBAL",
            category: [
                { category: "M/CYCLE", place: 1 },
                { category: "CAR", place: 2 },
            ],
            cnic: "3830111664367",
            image: ApiUrls.images + "47eb69d5-c44a-49ba-9b7a-7b2fda9b1272.jpeg",
            issueDate: "03/30/2023",
            expiryDate: "03/30/2023",
        },
    ]);

    const onAddLicense = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        addLicense();
    };

    const addLicense = async () => {
        const loadingToast = toast.loading("Adding License");
        try {
            // Form Data
            const form = new FormData();
            Object.entries(licenseForm).forEach(([key, value]) => {
                if (value instanceof Array) {
                    console.log("got the categories");
                    form.append(key, JSON.stringify(value));
                } else {
                    form.append(key, value);
                }
            });
            const res = kyInstance.post(ApiUrls.licenses.create, {
                body: form,
            });
            toast.success("License Added");
        } catch (error) {
            console.log(error);
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    const getLicenses = async (customSearch: string | undefined = undefined) => {
        try {
            setLoading();
            setSearchChange(searchStr);
            const res: any = await kyInstance.get(ApiUrls.licenses.get + `${customSearch ? customSearch : searchStr}`).json();
            if (res.licenses) {
                setLicenses([res.licenses]);
                setSuccess(res.data.message);
                setPagination(res.pagination);
            } else {
                throw new Error("An error Occoured, refresh and try again");
            }
        } catch (error: any) {
            console.log(error);
            const message =
                error?.response?.data?.message ||
                error?.message ||
                error.toString();
            setError(message);
        }
    };

    // const handleDelete = async (id: string) => {
    //     try {
    //         await axios.delete(`http://localhost:8000/users/${id}`);
    //         setUsers(users.filter((user) => user.licenseNo !== id));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const handleEdit = (user: VerificationData) => {
    //     setEditingUser(user);
    //     setNewUser(user);
    // };

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (editingUser) {
    //         axios
    //             .put(
    //                 `http://localhost:8000/users/${editingUser.licenseNo}`,
    //                 newUser
    //             )
    //             .then((response) => {
    //                 console.log(response.data);
    //                 setUsers(
    //                     users.map((user) =>
    //                         user.licenseNo === editingUser.licenseNo
    //                             ? newUser
    //                             : user
    //                     )
    //                 );
    //                 setEditingUser(null);
    //                 setNewUser({
    //                     licenseNo: "",
    //                     name: "",
    //                     fatherName: "",
    //                     licenseCategory: "",
    //                     issueDate: "",
    //                     expireDate: "",
    //                 });
    //                 alert("User updated successfully");
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //                 alert("Failed to update user");
    //             });
    //     } else {
    //         axios
    //             .post("http://localhost:8000/users/", newUser)
    //             .then((response) => {
    //                 console.log(response.data);
    //                 setUsers([...users, newUser]);
    //                 setNewUser({
    //                     licenseNo: "",
    //                     name: "",
    //                     fatherName: "",
    //                     licenseCategory: "",
    //                     issueDate: "",
    //                     expireDate: "",
    //                 });
    //                 alert("User added successfully");
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //                 alert("Failed to add user");
    //             });
    //     }
    // };

    const formFields = [
        {
            label: "License Number",
            name: "licenseNo",
            type: "text",
        },
        { label: "Name", name: "name", type: "text" },
        {
            label: "Father Name",
            name: "fatherName",
            type: "text",
        },
        {
            label: "CNIC",
            name: "cnic",
            type: "text",
        },
        {
            label: "License Category",
            name: "category",
            type: "checkbox",
            content: [
                {
                    name: "M/CYCLE",
                    value: {
                        category: "M/CYCLE",
                        place: 1,
                    },
                },
                {
                    name: "CAR",
                    value: {
                        category: "CAR",
                        place: 2,
                    },
                },
                {
                    name: "LTV",
                    value: {
                        category: "LTV",
                        place: 3,
                    },
                },
                {
                    name: "HTV",
                    value: {
                        category: "HTV",
                        place: 4,
                    },
                },
                {
                    name: "PSV",
                    value: {
                        category: "PSV",
                        place: 5,
                    },
                },
            ],
        },
        {
            label: "Image",
            name: "image",
            type: "file",
        },
        {
            label: "Issue Date",
            name: "issueDate",
            type: "date",
        },
        {
            label: "Expiry Date",
            name: "expiryDate",
            type: "date",
        },
    ];

    return {
        status,
        editFlag,
        setEditFlag,
        licenseForm,
        handleLicenseForm,
        handleCategory,
        licenses,
        formFields,
        onAddLicense,
        // search & search handlers
        search,
        setSort,
        setCnic,
        applySearch,
        disableApplyFilterBtn,
        // Pagination
        prevPage,
        nextPage,
    };
};

export default useLicenses;
