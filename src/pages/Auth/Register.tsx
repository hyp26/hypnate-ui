import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../api/client";
import Input from "../../components/input";
import Button from "../../components/button";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await client.post("/api/auth/register", form);
      toast.success("Account created!");
      navigate("/login");
    } catch {
      toast.error("Failed to register");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleRegister}
        className="w-96 bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
