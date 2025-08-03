"use client";
import { useState } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (error) {
      setStatus("⚠️ Something went wrong.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 space-y-8 transform transition-all hover:shadow-2xl">
          
          {/* Heading */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Contact <span className="text-pink-600 dark:text-pink-400">Us</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have questions, feedback, or need assistance? We’d love to hear from you!
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-black to-gray-900 dark:from-pink-600 dark:to-pink-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200"
            >
              📩 Send Message
            </button>

            {/* Status Message */}
            {status && (
              <p className="text-sm text-center font-medium text-pink-600 dark:text-pink-400 pt-2">
                {status}
              </p>
            )}
          </form>

          {/* Contact Info */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 space-y-1">
            <p>📍 Karachi, Pakistan</p>
            <p>📞 +92 307 0154468</p>
            <p>📧 braflame.shop@gmail.com</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

