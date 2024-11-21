"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import NavbarPage from "../navigation/NavbarPage";

const StatusContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const uniqueCode = searchParams.get("uniqueCode");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uniqueCode) {
      setError("Kode unik tidak ditemukan. Silakan coba lagi.");
      setTimeout(() => {
        router.push("/status");
      }, 3000);
    }
  }, [uniqueCode, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-purple-600">
          Status Permohonan
        </h1>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            <p className="text-gray-700 mb-4 text-center">
              Permohonan Anda berhasil dikirim!
            </p>
            {uniqueCode && (
              <div className="text-lg text-green-600 font-bold text-center">
                Kode Unik Anda: {uniqueCode}
              </div>
            )}
            <p className="text-gray-700 mt-6 text-center">
              Gunakan kode unik di atas untuk mengecek status permohonan Anda.{" "}
              <Link
                href={`/components/FormStatus?uniqueCode=${uniqueCode}`}
                passHref
              >
                <span className="text-blue-500 hover:underline cursor-pointer">
                  Klik di sini
                </span>
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const StatusPage = () => (
  <>
    <NavbarPage />
    <Suspense fallback={<div>Loading...</div>}>
      <StatusContent />
    </Suspense>
  </>
);

export default StatusPage;
