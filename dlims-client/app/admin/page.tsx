"use client"
import axios from "axios";
import { useState } from "react";


  const verificationDataDummy = [
    {
      licenseNo: "1111122222223",
      name: "Raza",
      fatherName: "Ahmed",
      licenseCategory: "Bike",
      issueDate: "03/30/2023",
      expireDate: "03/30/2027",
    },
    {
      licenseNo: "1111122222223",
      name: "Raza",
      fatherName: "Ahmed",
      licenseCategory: "Bike",
      issueDate: "03/30/2023",
      expireDate: "03/30/2027",
    },
  ];


  interface VerificationData {
    licenseNo: string;
    name: string;
    fatherName: string;
    licenseCategory: string;
    issueDate: string;
    expireDate: string;
  }
  

const formFields = [
    {
      label: "License Number",
      name: "licenseNumber",
      type: "text",
    },
    { label: "Name", name: "name", type: "text" },
    {
      label: "Father Name",
      name: "fatherName",
      type: "text",
    },
    {
      label: "License Category",
      name: "licenseCategory",
      type: "text",
    },
    {
      label: "Issue Date",
      name: "issueDate",
      type: "text",
    },
    {
      label: "Expire Date",
      name: "expireDate",
      type: "text",
    },
  ];


  const AdminPanel = () => {
    const [users, setUsers] = useState<VerificationData[]>([]);
    const [newUser, setNewUser] = useState<VerificationData>({
      licenseNo: "",
      name: "",
      fatherName: "",
      licenseCategory: "",
      issueDate: "",
      expireDate: "",
    });
    const [editingUser, setEditingUser] = useState<VerificationData | null>(null);
  
    const handleDelete = async (id: string) => {
      try {
        await axios.delete(`http://localhost:8000/users/${id}`);
        setUsers(users.filter((user) => user.licenseNo !== id));
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setNewUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleEdit = (user: VerificationData) => {
      setEditingUser(user);
      setNewUser(user);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (editingUser) {
        axios
          .put(`http://localhost:8000/users/${editingUser.licenseNo}`, newUser)
          .then((response) => {
            console.log(response.data);
            setUsers(
              users.map((user) =>
                user.licenseNo === editingUser.licenseNo ? newUser : user
              )
            );
            setEditingUser(null);
            setNewUser({
              licenseNo: "",
              name: "",
              fatherName: "",
              licenseCategory: "",
              issueDate: "",
              expireDate: "",
            });
            alert("User updated successfully");
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to update user");
          });
      } else {
        axios
          .post("http://localhost:8000/users/", newUser)
          .then((response) => {
            console.log(response.data);
            setUsers([...users, newUser]);
            setNewUser({
              licenseNo: "",
              name: "",
              fatherName: "",
              licenseCategory: "",
              issueDate: "",
              expireDate: "",
            });
            alert("User added successfully");
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to add user");
          });
      }
    };
  
    return (
        <div className="flex flex-col items-center mt-8">
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto"
          >
            {formFields.map((field) => (
              <div className="mb-4" key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block font-medium mb-2"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={newUser[field.name as keyof typeof newUser]}
                  onChange={handleInputChange}
                  className="border-gray-400 border-solid border py-2 px-4 w-full rounded-md"
                  required
                />
              </div>
            ))}
            <button type="submit" className="bg-blue-600">Add User</button>
          </form>
          
          <h2 className="text-2xl font-bold">Users</h2>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  License Number
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Father Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  License Category
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Issue Date
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Expire Date
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {verificationDataDummy.map((user, id) => (
                <tr key={id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.licenseNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.fatherName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.licenseCategory}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.issueDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.expireDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
                      onClick={() =>
                        handleDelete(user.licenseNo)
                      }
                    >
                      Delete
                    </button>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    
    export default AdminPanel
    