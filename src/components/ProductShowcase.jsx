"use client";
import { useState } from "react";
import ProductCard from "./ProductCart";
import { useCart } from "../context/CartContext";

export default function ProductShowcase({ title, products = [] }) {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  if (!products || products.length === 0) return null;

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setSelectedSize(""); // reset previous selection
  };

  const handleConfirmAdd = () => {
    if (!selectedSize) return alert("Please select a size.");
    addToCart({ ...selectedProduct, selectedSize });
    setSelectedProduct(null); // close modal
  };

  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold 
        text-gray-900 dark:text-gray-100 
        mb-8 text-center">
        {title}
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product, index) => {
          const uniqueKey = product._id || product.id || `product-${index}`;
          return (
            <ProductCard
              key={uniqueKey}
              product={product}
              onAddToCart={() => handleAddToCartClick(product)}
            />
          );
        })}
      </div>

      {/* Size Selection Modal */}
{selectedProduct && (
  <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-center justify-center px-4 transition-colors duration-300">
    <div className="bg-black dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Title */}
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-black mb-4">
        Select Size for <span className="text-pink-700 dark:text-pink-400">{selectedProduct.title}</span>
      </h3>

      {/* Size Buttons */}
      <div className="flex gap-3 flex-wrap mb-6">
        {selectedProduct.sizes?.map((size) => (
          <button
            key={size}
            className={`px-4 py-2 border rounded-full text-sm font-medium transition-all duration-200 ${
              selectedSize === size
                ? "bg-pink-600 text-black border-pink-600"
                : "bg-black text-gray-700 border-gray-300 hover:bg-pink-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            }`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 sm:gap-4">
        <button
          onClick={() => setSelectedProduct(null)}
          className="px-4 py-2 rounded-md border 
            border-gray-300 dark:border-gray-600
            text-gray-600 dark:text-gray-300 
            hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmAdd}
          className="px-6 py-2 rounded-md bg-pink-600 
            text-white font-semibold hover:bg-pink-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
)}
    </section>
  );
}

