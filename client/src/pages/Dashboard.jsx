


import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";


import CustomerModal from "../components/crm/CustomerModal";
import Pagination from "../components/crm/Pagination";
import DeleteConfirmModal from "../components/crm/DeleteConfirmModal";
import CustomerTable from "../components/crm/CustomerTable";






const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const [pagination, setPagination] =
    useState({
      currentPage: 1,
      totalPages: 1,
      totalUsers: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });

  const [loading, setLoading] =
    useState(false);

  const [modalLoading, setModalLoading] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [isCustomerModalOpen, setIsCustomerModalOpen] =
    useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [editingUser, setEditingUser] =
    useState(null);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const limit = 10;


  // Fetch users 
  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);

      const response = await getUsers(
        page,
        limit
      );

      setUsers(response.data);

      setPagination(response.pagination);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch customers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  // =========================
  // OPEN ADD MODAL
  // =========================

  const handleAddCustomer = () => {
    setEditingUser(null);

    setIsCustomerModalOpen(true);
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================

  const handleEditCustomer = (user) => {
    setEditingUser(user);

    setIsCustomerModalOpen(true);
  };

  // =========================
  // ADD / UPDATE
  // =========================

  const handleCustomerSubmit = async (
    formData
  ) => {
    try {
      setModalLoading(true);

      if (editingUser) {
        await updateUser(
          editingUser._id,
          formData
        );

        toast.success(
          "Customer updated successfully"
        );
      } else {
        await createUser(formData);

        toast.success(
          "Customer created successfully"
        );
      }

      setIsCustomerModalOpen(false);
      setEditingUser(null);

      await fetchUsers(
        pagination.currentPage
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation failed"
      );
    } finally {
      setModalLoading(false);
    }
  };

  // =========================
  // OPEN DELETE MODAL
  // =========================

  const handleDeleteClick = (user) => {
    setSelectedUser(user);

    setIsDeleteModalOpen(true);
  };

  // =========================
  // DELETE
  // =========================

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    try {
      setDeleteLoading(true);

      await deleteUser(
        selectedUser._id
      );

      toast.success(
        "Customer deleted successfully"
      );

      setIsDeleteModalOpen(false);
      setSelectedUser(null);


      if (
        users.length === 1 &&
        pagination.currentPage > 1
      ) {
        await fetchUsers(
          pagination.currentPage - 1
        );
      } else {
        await fetchUsers(
          pagination.currentPage
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete customer"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // =========================
  // PAGINATION
  // =========================

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            CRM Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your customers
          </p>
        </div>

        <button
          onClick={handleAddCustomer}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Add Customer
        </button>

      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Customers
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {pagination.totalUsers}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Current Page
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {pagination.currentPage}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Pages
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {pagination.totalPages}
          </h2>
        </div>

      </div>

      {/* Table */}
      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-gray-500">
            Loading customers...
          </p>
        </div>
      ) : (
        <CustomerTable
          users={users}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Pagination */}
      {!loading &&
        pagination.totalUsers > 0 && (
          <Pagination
            currentPage={
              pagination.currentPage
            }
            totalPages={
              pagination.totalPages
            }
            hasNextPage={
              pagination.hasNextPage
            }
            hasPreviousPage={
              pagination.hasPreviousPage
            }
            onPageChange={
              handlePageChange
            }
          />
        )}

      {/* Add / Edit Modal */}
      <CustomerModal
        isOpen={isCustomerModalOpen}
        onClose={() => {
          setIsCustomerModalOpen(false);
          setEditingUser(null);
        }}
        onSubmit={
          handleCustomerSubmit
        }
        editingUser={editingUser}
        loading={modalLoading}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        customer={selectedUser}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={
          handleDeleteConfirm
        }
        loading={deleteLoading}
      />

    </div>
  );
};

export default Dashboard;