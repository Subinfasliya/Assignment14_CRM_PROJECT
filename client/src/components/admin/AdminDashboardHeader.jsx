import UserProfileMenu from "../UserProfileMenu";
import Button from "../ui/Button";

const AdminDashboardHeader = ({ user, onAddCustomer, onLogout }) => {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          CRM Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">Manage your customers</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <UserProfileMenu user={user} />
        <Button size="lg" onClick={onAddCustomer}>
          + Add Customer
        </Button>
        <Button variant="danger" size="lg" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;
