import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({
  children,
}: LayoutProps) {
  const { logout, user } = useAuth();

  const location = useLocation();

  const menuItems = [
    {
      label: "Connections",
      path: "/connections",
    },
    {
      label: "Broadcast",
      path: "/broadcast",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-white shadow-lg p-4">
          <h1 className="text-2xl font-bold mb-8 text-blue-600">
            Broadcast
          </h1>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`p-3 rounded transition ${
                  location.pathname.includes(
                    item.path
                  )
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 border-t pt-4">
            <p className="text-sm text-gray-500">
              {user?.email}
            </p>

            <button
              onClick={logout}
              className="mt-4 w-full bg-red-500 text-white p-2 rounded"
            >
              Sair
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}