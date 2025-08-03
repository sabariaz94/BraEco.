// ✅ Correct lucide-react imports
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

// ✅ Custom icons for Reddit, Threads, TikTok
function RedditIcon({ className }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 512 512"
    >
      <path d="M440.7 203.5c-15.5 0-29.3 6.3-39.4 16.3-36.5-25.7-86.3-42-141.3-43.9l28.5-132.4 92.2 19.6c0 25.8 20.9 46.7 46.7 46.7s46.7-20.9 46.7-46.7S452.4 16.4 426.6 16.4c-17.8 0-33.3 10.3-41 25.3l-105-22.3c-5.5-1.2-10.9 2.4-12.1 7.9l-32 148.7c-55 .9-105.2 18.2-141.9 44.1-10.2-10.3-24.1-16.7-39.8-16.7C24.6 203.5 0 228 0 257.5s24.6 54 54.2 54c15.2 0 29-6.1 39.1-15.9 36.8 26.2 87.2 43.2 142.8 44.3l-25.5 115.8-81.6-17.4c-2.9-17.6-18.2-31-36.5-31-20.5 0-37.1 16.6-37.1 37.1S71.9 480 92.4 480c15.3 0 28.4-9.2 34.2-22.3l95.6 20.4c5.4 1.2 10.9-2.4 12.1-7.9l28.5-129.8c55.3-1.2 105.3-18.4 141.8-44.6 10.2 10.1 24.1 16.3 39.3 16.3 29.6 0 54.2-24.5 54.2-54s-24.6-54.1-54.2-54.1z" />
    </svg>
  );
}

function ThreadsIcon({ className }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0C5.372 0 0 5.372 0 12c0 5.3 3.438 9.8 8.207 11.385l.172-.98c.236-1.346.374-2.578.37-3.59-1.46-.548-2.39-1.84-2.39-3.28 0-1.945 1.578-3.523 3.523-3.523s3.523 1.578 3.523 3.523c0 1.55-1.002 2.85-2.398 3.34.008.822.11 1.857.298 2.98 4.772-1.586 8.205-6.086 8.205-11.386C24 5.372 18.628 0 12 0z" />
    </svg>
  );
}

function TikTokIcon({ className }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 48 48"
    >
      <path d="M41,15.17a12.12,12.12,0,0,1-7.07-2.27V29.73a10.85,10.85,0,1,1-9-10.68v5.84a5.16,5.16,0,1,0,3.6,4.94V4h5.39a6.74,6.74,0,0,0,.1,1.18,7.07,7.07,0,0,0,3.11,4.59,7,7,0,0,0,3.84,1.16Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-pink-50 via-white to-pink-50 border-t mt-10 text-gray-600 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Branding & Social */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-center md:text-left">
            {/* Branding - choose one style */}
            <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              BraFlame Lingerie Studio®
            </p>
            <p className="text-sm text-gray-500">
              Igniting creativity, protecting our brand.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-5">
            {[
              { Icon: FacebookIcon, href: "https://www.facebook.com/share/1ZaLTfbptf/" },
              { Icon: InstagramIcon, href: "https://www.instagram.com/braflame.shop?igsh=YzBmNTMxZmN6eGNt" },
              { Icon: RedditIcon, href: "https://www.reddit.com/u/braflameshop/s/410sdbYOUM" },
              { Icon: ThreadsIcon, href: "https://www.threads.com/@braflame.shop" },
              { Icon: TikTokIcon, href: "https://www.tiktok.com/@bra.flame?_t=ZS-8yY1sswijvG&_r=1" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white shadow-md hover:shadow-pink-200 transition-all duration-300 hover:scale-110"
              >
                <Icon className="w-5 h-5 text-gray-500 hover:text-pink-600 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t my-6" />
        <div className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} BraFlame Lingerie Studio®. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
