import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plane, LogOut } from "lucide-react";
import { navItems } from "../nav-items";
import { useAuth } from "../lib/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleNavItems = navItems.filter(item => 
    item.title === "发现" || item.title === "我的行程"
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-gray-900">飞探</span>
              <span className="text-xs text-gray-500 ml-1 hidden sm:inline">让每一次出行，都是最优解</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-1">
            {visibleNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  location.pathname === item.to
                    ? "bg-orange-100 text-orange-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
            {user ? (
              <>
                <span className="text-xs text-gray-500 ml-2 hidden sm:inline">
                  {user.email?.split('@')[0]}
                </span>
                <button
                  onClick={async () => { await signOut(); navigate('/'); }}
                  className="flex items-center gap-1 px-3 py-2 rounded-full text-sm text-gray-600 hover:bg-gray-100"
                  title="退出登录"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 text-white ml-2"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
