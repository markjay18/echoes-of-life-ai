import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { auth, db } from "../services/api/firebase";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      email: "",
      password: "",
      confirmPassword: "",
    };

    let isValid = true;

    if (!form.username.trim()) {
      newErrors.username = "Username is required.";
      isValid = false;
      setLoading(false);
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
      setLoading(false);
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/;

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
      setLoading(false);
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
      isValid = false;
      setLoading(false);
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required.";
      isValid = false;
      setLoading(false);
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Password do not match.";
      isValid = false;
      setLoading(false);
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        // Create Firebase Authentication account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password,
        );

        const user = userCredential.user;

        const usernameQuery = query(
          collection(db, "users"),
          where("username", "==", form.username.trim().toLowerCase()),
        );

        const usernameSnapshot = await getDocs(usernameQuery);

        if (!usernameSnapshot.empty) {
          alert("Username is already taken.");
          setLoading(false);
          return;
        }

        // Store additional user information in Firestore
        await setDoc(doc(db, "users", user.uid), {
          username: form.username,
          email: form.email,
          uid: user.uid,
          createdAt: serverTimestamp(),
        });

        alert("Registration Successful. Let's Login.");
        navigate("/login");
        setLoading(false);

        console.log("Firebase user:", user);
      } catch (error: any) {
        console.error(error);
        console.error("Firebase Error:", error);
        console.error("Firebase Error Code:", error.code);
        console.error("Firebase Error message:", error.message);

        alert(`${error.code}: ${error.message}`);

        setLoading(false);
      }
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
              Username *
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
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`border  border-gray-500 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-500"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mb-4 -mt-4">{errors.email}</p>
            )}

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password *
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

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`border border-gray-500 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-500"}`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mb-4 -mt-4">
                {errors.confirmPassword}
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
                  Processing...
                </span>
              ) : (
                <span className="inline-block">Register</span>
              )}
            </button>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <span className="inline-block ml-10 text-gray-500">
                  Already have an account?
                </span>
                <button
                  onClick={() => navigate("/login")}
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
                  <span className="inline-block ml-1">Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
