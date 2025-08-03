// 'use client'
// import React, { useEffect, useState } from "react";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import ProductCard from "@/components/ProductCards";
// import { getProducts } from "@/sanity/lib/getProducts";

// const bras = [
//   {
//     id: "1",
//     name: "🩷 Butterfly Lace Comfort Bra – Seamless Beauty & Full Support",
//     price: 1499.00 ,
//     imageUrl: "/images/lace-bra.jpg",
//   },
//   {
//     id: "2",
//     name: "Everyday Comfort Bra",
//     price: 24.99,
//     imageUrl: "/images/comfort-bra.jpg",
//   },
//   {
//     id: "3",
//     name: "Seamless T-Shirt Bra",
//     price: 27.5,
//     imageUrl: "/images/seamless-bra.jpg",
//   },
//   {
//     id: "4",
//     name: "Luxury Silk Bralette",
//     price: 34.99,
//     imageUrl: "/images/silk-bralette.jpg",
//   },
//   {
//     id: "5",
//     name: "Strapless Convertible Bra",
//     price: 32.0,
//     imageUrl: "/images/strapless-bra.jpg",
//   },
//   {
//     id: "6",
//     name: "Sports Bra",
//     price: 21.99,
//     imageUrl: "/images/sports-bra.jpg",
//   },
// ];

// export default function ShopPage() {
//   const [products, setProducts] = useState([]);
//   console.log("productData====? ", products);

//   useEffect(() => {
//     getProducts().then(setProducts);
//   }, []);

//   const handleAddToCart = (product) => {
//     const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const updatedCart = [...existingCart, product];
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     alert(`${product.name} added to cart!`);
//   };

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen bg-white">
//         {/* Hero Section */}
//         <section className="bg-pink-100 py-12 text-center">
//           <h1 className="text-4xl font-bold text-pink-700 mb-2">
//             Explore Our Bra Collection
//           </h1>
//           <p className="text-pink-600 text-md">
//             Comfort, Confidence & Style – Designed for every body.
//           </p>
//         </section>

//         {/* Product Grid */}
//         <section className="py-10 px-4 max-w-7xl mx-auto">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//             Shop All Bras
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             {products.map((product, i) => (
//               <ProductCard
//                 key={i}
//                 id={product.id}
//                 title={product?.title}
//                 price={product?.price}
//                 description={product?.description}
//                 imageUrl={product.images}
//                 // onAddToCart={() => handleAddToCart(product)}
//               />
//             ))}
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// }


'use client'
import Footer from '../../../../components/Footer';
import Navbar from '../../../../components/Navbar';
import ProductShowcase from '../../../../components/ProductShowcase';
import { getProducts } from '../../../../sanity/lib/getProducts';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans 
      bg-white text-black 
      dark:bg-black dark:text-black
      transition-colors duration-300 ease-in-out">

      {/* Navbar */}
      <Navbar className="border-b border-gray-200 dark:border-gray-700 
        bg-white dark:bg-black text-black dark:text-white" />

      {/* Product Showcase */}
      <main className="flex-1 px-4 sm:px-6 py-6">
        <ProductShowcase
          title="Featured Bras"
          products={products}
          className="text-black dark:text-white"
        />
      </main>

      {/* Footer */}
      <Footer className="border-t border-gray-200 dark:border-gray-700 
        bg-white dark:bg-black text-gray-600 dark:text-gray-400" />
    </div>
  )
}

export default Page;
