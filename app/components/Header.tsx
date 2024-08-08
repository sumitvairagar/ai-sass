import Link from "next/link";

interface HeaderProps {
  user: any;
  onLogout: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export default function Header({
  user,
  onLogout,
  onLoginClick,
  onSignupClick,
}: HeaderProps) {
  return (
    <header className="bg-white shadow-md w-full fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-green-600">
              Plant Identifier
            </span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600"
            >
              Contact
            </Link>
            {user ? (
              <button
                onClick={onLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                >
                  Login
                </button>
                <button
                  onClick={onSignupClick}
                  className="bg-green-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
                >
                  Sign Up
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
