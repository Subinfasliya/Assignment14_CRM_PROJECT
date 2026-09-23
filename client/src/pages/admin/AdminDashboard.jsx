


import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";


import CustomerModal from "../../components/crm/CustomerModal";
import Pagination from "../../components/crm/Pagination";
import DeleteConfirmModal from "../../components/crm/DeleteConfirmModal";
import CustomerTable from "../../components/crm/CustomerTable";
import ConfirmAlert from "../../components/ConfirmAlert";
import AdminDashboardHeader from "../../components/admin/AdminDashboardHeader";
import DashboardStats from "../../components/admin/DashboardStats";
import DashboardSkeleton from "../../components/admin/DashboardSkeleton";






const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
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

  const [isLogoutAlertOpen, setIsLogoutAlertOpen] =
    useState(false);

  const [logoutLoading, setLogoutLoading] =
    useState(false);

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


  // OPEN ADD MODAL

  const handleAddCustomer = () => {
    setEditingUser(null);

    setIsCustomerModalOpen(true);
  };

  
  // OPEN EDIT MODAL
  
  const handleEditCustomer = (user) => {
    setEditingUser(user);

    setIsCustomerModalOpen(true);
  };

  
  // ADD / UPDATE

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

 
  // OPEN DELETE MODAL
 
  const handleDeleteClick = (user) => {
    setSelectedUser(user);

    setIsDeleteModalOpen(true);
  };

 
  // DELETE
 
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

 
  // PAGINATION
 
  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handleLogout = async () => {
    setLogoutLoading(true);

    try {
      await logout();
      toast.success("You have been logged out successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Logout failed. You have been signed out locally."
      );
    } finally {
      setIsLogoutAlertOpen(false);
      setLogoutLoading(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      <AdminDashboardHeader
        user={user}
        onAddCustomer={handleAddCustomer}
        onLogout={() => setIsLogoutAlertOpen(true)}
      />

      {loading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <DashboardStats pagination={pagination} />
          <CustomerTable
            users={users}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteClick}
          />
          {pagination.totalUsers > 0 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
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

      <ConfirmAlert
        open={isLogoutAlertOpen}
        title="Log out?"
        message="Are you sure you want to log out of your admin account?"
        confirmLabel="Yes, log out"
        cancelLabel="Stay signed in"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutAlertOpen(false)}
        loading={logoutLoading}
      />

    </div>
  );
};

export default AdminDashboard;