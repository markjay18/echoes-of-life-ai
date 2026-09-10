import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../services/api/firebase";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // Remove error while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const newErrors = {
      username: "",
      password: "",
    };

    let isValid = true;

    if (!form.username.trim()) {
      newErrors.username = "Username is required.";
      isValid = false;
      setLoading(false);
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
      setLoading(false);
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        // Find user by username
        const q = query(
          collection(db, "users"),
          where("username", "==", form.username.trim().toLowerCase()),
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          alert("Username not found.");
          return;
        }

        // Get the email associated with the username
        const userData = snapshot.docs[0].data();

        // Login using Firebase Auth
        await signInWithEmailAndPassword(auth, userData.email, form.password);

        navigate("/dashboard");
        setLoading(false);
      } catch (error: any) {
        console.error(error);

        if (
          error.code === "auth/invalid-credential" ||
          error.code === "auth/wrong-password"
        ) {
          alert("Invalid username or password.");
        } else {
          alert(`${error.code}: ${error.message}`);
        }
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log("Google user:", user);

      alert(`Welcome, ${user.displayName}!`);

      navigate("/dashboard");
      setLoading(false);
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        return;
      }

      if (error.code === "auth/account-exists-with-different-credential") {
        alert("An account already exists with this email.");
        return;
      }

      alert(`${error.code}: ${error.message}`);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log("Facebook user:", user);

      alert(`Welcome, ${user.displayName}!`);

      // Example:
      // router.push("/dashboard");
    } catch (error: any) {
      console.error("Facebook Sign-In Error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        return;
      }

      if (error.code === "auth/account-exists-with-different-credential") {
        alert("An account already exists using another login method.");
        return;
      }

      alert(`${error.code}: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#B8D8E8] flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="flex justify-center p-6">
          <img
            src="/echoes-of-life.png"
            alt="Echoes of Life"
            className="w-23 h-23"
          />
        </div>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className={`border  border-gray-500 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full ${errors.username ? "border-red-500 focus:ring-red-500" : "border-gray-500"}`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mb-4 -mt-4">
                {errors.username}
              </p>
            )}
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`border border-gray-500 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-500"}`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mb-4 -mt-4">
                {errors.password}
              </p>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="transition duration-200 bg-[#C75C6F] hover:bg-[#B94F63] focus:bg-[#B94F63] focus:shadow-sm focus:ring-4 focus:bg-[#B94F63] focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                <span className="inline-block">Login</span>
              )}
            </button>
          </div>
          <div className="p-5">
            <div className="text-center mb-3">
              <span className="text-sm inline-block text-gray-500">
                Login with
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={handleFacebookSignIn}
                className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block cursor-pointer"
              >
                Facebook
              </button>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block cursor-pointer"
              >
                Google
              </button>
            </div>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <span className="inline-block ml-10 text-gray-500">
                  Don't have an account?
                </span>
                <button
                  onClick={() => navigate("/register")}
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-top"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Sign up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
