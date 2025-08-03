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
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-lg">
            {/* Modal Title */}
            <h3 className="text-lg sm:text-xl font-bold 
              text-gray-900 dark:text-gray-100 mb-4">
              Select Size for {selectedProduct.title}
            </h3>

            {/* Sizes */}
            <div className="flex gap-3 flex-wrap mb-6">
              {selectedProduct.sizes?.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
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

            {/* Modal Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 rounded-md border 
                  text-gray-700 dark:text-gray-300 
                  border-gray-300 dark:border-gray-600 
                  hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAdd}
                className="px-6 py-2 rounded-md bg-pink-600 
                  text-white font-semibold hover:bg-pink-700"
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
