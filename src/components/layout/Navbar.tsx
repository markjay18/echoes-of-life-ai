import { useEffect, useState, useRef } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../services/api/firebase";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("User");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUsername("User");
        return;
      }

      try {
        const q = query(
          collection(db, "users"),
          where("email", "==", user.email),
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();
          setUsername(userData.username || "User");
        }
      } catch (error) {
        console.error("Failed to fetch username:", error);
        setUsername("User");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const logout = async () => {
      try {
        await signOut(auth);
        setIsOpen(false);
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("Automatic logout error:", error);
      }
    };

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(logout, 10 * 60 * 1000);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timeoutId);

      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [auth, navigate]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-20 z-50 bg-gradient-to-r from-[#8F3F50] via-[#C75C6F] to-[#8F3F50] text-white px-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div
        className="w-14 h-14 bg-white rounded-lg overflow-hidden
              shadow-md
             flex items-center justify-center border border-white/30 "
      >
        <img
          src="/echoes-of-life.png"
          alt="Echoes of Life"
          className="w-12 h-12 object-contain"
        />
      </div>
      <p className="text-white font-semibold text-lg whitespace-nowrap">
        ECHOES OF LIFE AI
      </p>

      {/* Menu */}
      <div ref={dropdownRef} className="relative">
        <button
          id="dropdownDefaultButton"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-11 h-11 inline-flex items-center justify-center
                 text-white bg-transparent
                 border border-white/30 rounded-lg
                 hover:bg-white/20
                 focus:ring-2 focus:ring-white/50
                 transition cursor-pointer"
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            id="dropdown"
            className="absolute right-0 top-14 z-50
                   w-52 bg-[#C75C6F]
                   border border-white/20
                   rounded-xl shadow-xl overflow-hidden"
          >
            <ul className="p-2 text-sm font-medium">
              {/* Username */}
              <li>
                <div className="flex items-center w-full p-3 gap-3 text-white rounded-lg">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"
                    />
                  </svg>

                  <span className="truncate">Hey, {username}</span>
                </div>
              </li>

              {/* Sign out */}
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center w-full p-3 gap-3
                         text-white text-left
                         cursor-pointer rounded-lg
                         hover:bg-white/20
                         transition"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12H3m0 0 4-4m-4 4 4 4m5-9V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2"
                    />
                  </svg>

                  <span>Sign out</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
