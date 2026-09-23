const ProfileCard = ({ user }) => {
  const details = [
    { label: "Email", value: user?.email },
    { label: "Phone", value: user?.phone || "Not provided" },
    { label: "Role", value: user?.role },
  ];

  return (
    <section className="w-full max-w-xl rounded-xl bg-white p-6 shadow-md sm:p-8">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
          <p className="text-sm text-gray-500">Account profile</p>
        </div>
      </div>

      <dl className="mt-6 space-y-4">
        {details.map((detail) => (
          <div key={detail.label} className="flex justify-between gap-4 border-b border-gray-100 pb-3">
            <dt className="text-sm font-medium text-gray-500">{detail.label}</dt>
            <dd className="text-right text-sm font-semibold capitalize text-gray-800">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default ProfileCard;
