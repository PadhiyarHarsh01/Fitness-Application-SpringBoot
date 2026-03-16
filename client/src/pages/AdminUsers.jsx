import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  changeUserRole,
  disableUser,
  deleteUser,
} from "../api/adminApi";
import { getUserRole } from "../utils/auth";
import { toast } from "react-toastify";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const role = getUserRole();
  const isSuperAdmin = role === "SUPER_ADMIN";

  const fetchUsers = async () => {
    try {
      const usersRes = await getAllUsers();
      setUsers(usersRes.data);
    } catch (error) {
      toast.error("Users fetch error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      await changeUserRole(id, newRole);
      toast.success("User role updated successfully");
      fetchUsers();
    } catch (error) {
      if(error.response?.status === 403) {
        toast.error("You do not have permission to change this user's role.");
      } else {
        toast.error("Failed to update user role");
      }
    }
  };

  const handleDisable = async (id) => {
    await disableUser(id);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      if(error.response?.status === 403) {
        toast.error("You do not have permission to delete this user.");
      } else {
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <div className="space-y-6 ml-65">
      <div>
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="text-slate-500">
          Control user roles and permissions
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>

                <td className="p-4">
                  <select
                    disabled={!isSuperAdmin}
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                  </select>
                </td>

                <td className="p-4">
                  {user.enabled ? (
                    <span className="text-green-600 font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Disabled
                    </span>
                  )}
                </td>

                <td className="p-4 space-x-2">
                  <button
                    onClick={() => handleDisable(user.id)}
                    className="text-yellow-600 text-sm"
                  >
                    Disable
                  </button>

                  <button
                    disabled={!isSuperAdmin}
                    onClick={() => handleDelete(user.id)}
                    className={`text-sm ${
                      isSuperAdmin ? "text-red-600" : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;