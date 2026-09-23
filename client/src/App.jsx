import { RouterProvider } from "react-router";
import router from "./routes/appRouter";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      {/* Wrap with Global Providers here if needed (e.g., AuthProvider,
      ThemeProvider) */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
