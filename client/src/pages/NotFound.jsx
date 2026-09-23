import StatusPage from "../components/common/StatusPage";

const NotFound = () => (
  <StatusPage
    code="404"
    title="Page not found"
    message="The page you are looking for does not exist."
  />
);

export default NotFound;
