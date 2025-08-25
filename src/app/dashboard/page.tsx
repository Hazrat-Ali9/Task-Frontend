"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";

export default function Dashboard() {
  const router = useRouter();
  const [shops, setShops] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard", { withCredentials: true })
        .then((res) => {setShops(res.data.shops || []);
        setUsername(res.data.username || "");
        setIsLoading(false);
      })
      .catch(() => {
        router.push("/");
      });
  }, [router]);


  const handleShopClick = (shop: string) => {
    window.open(`http://${shop}.localhost:3000/${shop}`, "_blank");
  };


  const handleLogout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
      setShowModal(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-6">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12 pt-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Welcome, {username}!
          </h1>
          <p className="text-gray-400 mt-2">Manage your shops and settings</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="relative overflow-hidden group bg-gray-800 hover:bg-red-900/20 px-5 py-2.5 rounded-lg text-white shadow-lg transition-all duration-300 border border-red-800/30"
        >
          <span className="relative z-10 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-semibold">Your Shops</h2>
            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm">
              {shops.length} {shops.length === 1 ? 'Shop' : 'Shops'}
            </span>
          </div>

          {shops.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700/50 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">No shops yet</h3>
              <p className="text-gray-400 max-w-md mx-auto">Get started by creating your first shop to manage products and orders.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {shops.map((shop, idx) => (
                <div 
                  key={idx} 
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg group cursor-pointer"
                  onClick={() => handleShopClick(shop)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="bg-green-400/10 text-green-400 text-xs px-2 py-1 rounded-full">Active</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors duration-300">{shop}</h3>
                  <p className="text-gray-400 text-sm">Click to open shop</p>
                  <div className="mt-4 pt-4 border-t border-gray-700/30 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Last accessed: Today</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Confirm Logout</h2>
            <p className="text-gray-400 text-center mb-6">Are you sure you want to log out from your account?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600/70 px-4 py-3 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-3 rounded-lg text-white shadow-lg transition-all duration-200 flex items-center justify-center"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800/30 text-center">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Shop Dashboard • v1.0</p>
      </footer>
    </div>
  );
}