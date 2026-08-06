import { useState } from "react";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

function Register() {
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <form id="register-user" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="text" name="username" placeholder="Enter your username" value={form.username} onChange={handleChange} />
      <input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} />
      <button type="reset">Reset</button>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;