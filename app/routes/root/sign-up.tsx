import { Link, redirect } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";

import { account } from "~/appwrite/client";
import { createUserWithEmailAndPassword } from "~/appwrite/auth";
import { useState } from "react";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (user.$id) return redirect("/");
  } catch (error) {
    console.log("Error fetching user: ", error);
  }
}

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(
      formData.email,
      formData.password,
      formData.name
    );
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
              Sign up to manage destinations, itineraries, and user activity
              with ease.
            </p>
          </article>

          <form method="post" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <TextBoxComponent
              type="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full p-2  border border-gray-300 !rounded-[5px]"
            />
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
              <span className="p-18-semibold text-white">Sign Up</span>
            </ButtonComponent>
          </form>

          <span className="mt-2">
            Already have an account?{" "}
            <Link to="/sign-in" className="underline text-blue-500">
              Sign In
            </Link>
          </span>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
