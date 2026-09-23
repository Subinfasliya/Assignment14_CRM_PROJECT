import StatusPage from "../components/common/StatusPage";

const Unauthorized = () => (
  <StatusPage
    code="403"
    title="Access denied"
    message="You do not have permission to access this page."
  />
);

export default Unauthorized;