'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email?.trim().toLowerCase();

      toast.success('Login successful!');

      if (userEmail === 'admin1122@gmail.com') {
        router.push('/admin');
      } else {
        router.push('/products');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-black dark:via-neutral-900 dark:to-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md backdrop-blur-lg bg-white/70 dark:bg-neutral-900/70 border border-gray-300 dark:border-white/10 shadow-2xl rounded-3xl p-8 space-y-6"
        >
          {/* Heading */}
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white tracking-wide">
            Welcome Back
          </h1>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to continue to <span className="font-semibold dark:text-white">BraFlame</span>
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
              <input
                type="email"
                required
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:bg-neutral-800 dark:text-white dark:placeholder-gray-500 dark:border-white/10 dark:focus:ring-neutral-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                required
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:bg-neutral-800 dark:text-white dark:placeholder-gray-500 dark:border-white/10 dark:focus:ring-neutral-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {/* Adaptive Black Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed dark:bg-gray-800 dark:text-gray-300'
                  : 'bg-black hover:bg-pink-800 text-white dark:bg-black dark:hover:bg-neutral-800'
              } py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02]`}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          {/* Footer Links */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{' '}
            <Link href="/register" className="font-medium text-black hover:underline dark:text-white">
              Sign Up
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

