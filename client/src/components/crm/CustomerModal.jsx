import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "user",
};

const CustomerModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingUser,
  loading,
}) => {
  const [formData, setFormData] =
    useState(initialFormData);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name || "",
        email: editingUser.email || "",
        phone: editingUser.phone || "",
        password: "",
        role: editingUser.role || "user",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingUser, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {editingUser
                ? "Edit Customer"
                : "Add Customer"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {editingUser
                ? "Update customer information"
                : "Create a new customer"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Name
            </label>

            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              size="compact"
              placeholder="Enter name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              size="compact"
              placeholder="Enter email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Phone
            </label>

            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              size="compact"
              placeholder="Enter phone number"
            />
          </div>

          {/* Password */}
          {!editingUser && (
            <div>
              <label className="mb-1 block text-sm font-medium">
                Password
              </label>

              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                size="compact"
                placeholder="Enter password"
              />
            </div>
          )}

          {/* Role */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            >
              <option value="user">
                User
              </option>

              <option value="admin">
                Admin
              </option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingUser
                ? "Update Customer"
                : "Add Customer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;