"use client";
import { useState } from "react";
import styles from "./page.module.css"; // Import the CSS module

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    setLoading(false);
    if (response.ok) {
      alert("Signup successful! You can now log in.");
    } else {
      alert(`Error: ${data.error}`);
    }
  }

  return (
    <div className={styles.page}>

    <div className={styles.formContainer}>
      <h1
      className={styles.h1}
      >Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className={styles.inputField}
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className={styles.inputField}
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className={styles.p}>
        Already have an account? <a href="/api/auth/signin" className={styles.a}>Sign In</a>
      </p>
    </div>
    </div>
  );
}
