"use client";
import { useEffect, useState } from "react";
import api from "@/api/api";

interface ShopData {
  name: string;
  mobile: string;
  owner: string;
}

export default function ShopPage() {
  const [shopData, setShopData] = useState<ShopData | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname; 
    const shopName = hostname.split(".")[0];

    api.get(`/shop/${shopName}`)
      .then(res => setShopData(res.data))
      .catch(() => setShopData(null));
  }, []);

  if (!shopData) return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Loading or shop not found...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-4">This Is {shopData.name} Shop</h1>
    </div>
  );
}
