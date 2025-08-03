
"use client";

import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useCart } from "../../../context/CartContext";
import { toast } from "react-hot-toast";
import { client } from "../../../sanity/lib/client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { FaCashRegister } from "react-icons/fa";

export default function CheckoutPage() {
  const { cartItems, setCartItems } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deliveryFee] = useState(125);

  // Group items by ID
  const groupedItems = cartItems.reduce((acc, item) => {
    const found = acc.find((i) => i._id === item._id);
    if (found) found.quantity += 1;
    else acc.push({ ...item, quantity: 1 });
    return acc;
  }, []);

  // Calculate subtotal
  const subtotal = groupedItems.reduce(
    (acc, item) =>
      acc +
      (item.discountedPrice
        ? item.discountedPrice
        : parseFloat(item.price || 0)) * item.quantity,
    0
  );

  const total = (subtotal + deliveryFee).toFixed(0);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const order = {
      _type: "order",
      _id: uuidv4(),
      ...formData,
      paymentMethod,
      total: Number(total),
      createdAt: new Date().toISOString(),
      items: groupedItems.map((item) => ({
        _key: uuidv4(),
        productId: item._id,
        title: item.title,
        price: item.discountedPrice || Number(item.price),
        quantity: item.quantity,
        imageUrl: item?.images?.[0]?.asset?.url || "",
      })),
    };

    try {
      await client.create(order);
      toast.success("🎉 Order placed successfully!");
      setCartItems([]);
      router.push("/order-success");
    } catch (error) {
      console.error("Order Error:", error);
      toast.error("❌ Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-950 min-h-screen py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {/* Billing Info */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-pink-100 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                📝 Billing Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {["fullName", "email", "phone", "city"].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    required
                    onChange={handleChange}
                    placeholder={field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    className="bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600 p-4 rounded-lg focus:ring-2 focus:ring-pink-400 transition"
                  />
                ))}
              </div>
              <input
                type="text"
                name="address"
                required
                onChange={handleChange}
                placeholder="Street Address"
                className="mt-4 w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600 p-4 rounded-lg focus:ring-2 focus:ring-pink-400 transition"
              />
              <input
                type="text"
                name="zip"
                required
                onChange={handleChange}
                placeholder="Postal Code"
                className="mt-4 w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600 p-4 rounded-lg focus:ring-2 focus:ring-pink-400 transition"
              />
            </div>

            {/* Payment Options */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-pink-100 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                💳 Payment Method
              </h2>
              <div className="space-y-4">
                {[{ label: "Cash on Delivery", value: "cod", icon: <FaCashRegister /> }].map(
                  (method) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg transition border ${
                        paymentMethod === method.value
                          ? "border-pink-500 bg-pink-50 dark:bg-pink-900/30"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() => setPaymentMethod(method.value)}
                        className="accent-pink-500"
                      />
                      <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium">
                        {method.icon} {method.label}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-4 rounded-xl shadow-lg transition border 
                  ${loading ? "opacity-70 cursor-not-allowed" : ""}
                  bg-white text-black hover:bg-gray-100 border-gray-300
                  dark:bg-black dark:text-white dark:hover:bg-gray-900 dark:border-gray-700
                `}
              >
                {loading ? "⏳ Placing Order..." : "✅ Place Order Now"}
              </button>
            </div>
          </form>

          {/* Right: Order Summary */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-pink-100 dark:border-gray-700 h-fit sticky top-20">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              🛍️ Order Summary
            </h2>
            <ul className="space-y-4">
              {groupedItems.map((item) => (
                <li key={item._id} className="text-gray-700 dark:text-gray-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>
                      {item.discountedPrice ? (
                        <>
                          <span className="line-through text-gray-400 mr-1">
                            {(item.price * item.quantity).toFixed(0)} PKR
                          </span>
                          <span className="text-pink-600 font-semibold">
                            {(item.discountedPrice * item.quantity).toFixed(0)} PKR
                          </span>
                        </>
                      ) : (
                        `${(item.price * item.quantity).toFixed(0)} PKR`
                      )}
                    </span>
                  </div>
                  {item.discountedPrice && (
                    <p className="text-xs text-green-600 dark:text-green-400">
                      You saved {(item.price - item.discountedPrice) * item.quantity} PKR
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            <div className="flex justify-between text-gray-700 dark:text-gray-200 font-medium">
              <span>Delivery</span>
              <span>{deliveryFee} PKR</span>
            </div>
            <div className="flex justify-between mt-2 text-xl font-bold text-pink-600 dark:text-pink-400">
              <span>Total</span>
              <span>{total} PKR</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
