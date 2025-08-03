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
    setSelectedSize("");
  };

  const handleConfirmAdd = () => {
    if (!selectedSize) return alert("Please select a size.");
    addToCart({ ...selectedProduct, selectedSize });
    setSelectedProduct(null);
  };

  return (
    <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          {/* Scrollable Modal for Mobile */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
            {/* Modal Title */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
              Select Size for {selectedProduct.title}
            </h3>

            {/* Size Options */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {selectedProduct.sizes?.map((size) => (
                <button
                  key={size}
                  className={`px-5 py-2 border rounded-full text-sm sm:text-base font-medium transition-colors ${
                    selectedSize === size
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-pink-100 dark:hover:bg-pink-700"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 rounded-md border text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAdd}
                className="px-6 py-2 rounded-md bg-pink-600 text-white font-semibold hover:bg-pink-700 w-full sm:w-auto"
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
