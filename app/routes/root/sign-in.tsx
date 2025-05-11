import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";

import { account } from "~/appwrite/client";
import { loginUserWithEmailAndPassword } from "~/appwrite/auth";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (user.$id) return redirect("/");
  } catch (error) {
    console.log("Error fetching user: ", error);
  }
}

const initial_state = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initial_state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginUserWithEmailAndPassword(
      formData.email,
      formData.password
    );
    if (res) {
      setFormData(initial_state);
      navigate("/");
    }
  };

  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center px-6">
        <div className="sign-in-card">
          <header className="header">
            <Link to="/">
              <img
                alt="logo"
                className="size-[30px]"
                src="/assets/icons/logo.svg"
              />
            </Link>
            <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
          </header>

          <article>
            <h2 className="p-28-semibold text-dark-100 text-center">
              Start Your Travel Journey
            </h2>
            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Sign in with Google to manage destinations, itineraries, and user
              activity with ease.
            </p>
          </article>

          <form method="post" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <TextBoxComponent
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full p-2  border border-gray-300 !rounded-[5px]"
            />
            <label htmlFor="email">Password</label>
            <TextBoxComponent
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Enter password"
              className="w-full p-2  border border-gray-300 !rounded-[5px]"
            />

            <ButtonComponent
              type="submit"
              iconCss="e-search-icon"
              className="button-class !h-11 !w-full mt-2"
            >
              <span className="p-18-semibold text-white">Sign in</span>
            </ButtonComponent>
          </form>

          <span className="mt-2">
            Don't have an account?{" "}
            <Link to="/sign-up" className="underline text-blue-500">
              Sign Up
            </Link>
          </span>

          {/* <ButtonComponent
            type="button"
            iconCss="e-search-icon"
            onClick={loginWithGoogle}
            className="button-class !h-11 !w-full mt-2"
          >
            <img
              alt="google"
              className="size-5"
              src="/assets/icons/google.svg"
            />
            <span className="p-18-semibold text-white">
              Sign in with Google
            </span>
          </ButtonComponent> */}
        </div>
      </section>
    </main>
  );
};

export default SignIn;
