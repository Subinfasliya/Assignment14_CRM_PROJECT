

const AuthLoading = ({message}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600 mx-auto" />

        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default AuthLoading;
