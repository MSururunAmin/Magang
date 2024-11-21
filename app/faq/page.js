"use client";
import { useState } from "react";
import NavbarPage from "../navigation/NavbarPage";

const FAQPage = () => {
  const faqs = [
    {
      question: "Apa itu status permohonan?",
      answer:
        "Status permohonan adalah informasi terkini mengenai kondisi permohonan yang telah Anda kirimkan.",
    },
    {
      question: "Bagaimana cara mengecek status permohonan?",
      answer:
        "Anda dapat mengecek status permohonan melalui halaman cek status dengan memasukkan unique code Anda.",
    },
    {
      question: "Berapa lama proses permohonan?",
      answer:
        "Proses permohonan biasanya memakan waktu antara 3 hingga 5 hari kerja, tergantung pada jenis permohonan.",
    },
    {
      question: "Apa yang harus dilakukan jika permohonan saya ditolak?",
      answer:
        "Jika permohonan Anda ditolak, Anda akan menerima email yang menjelaskan alasan penolakan dan langkah selanjutnya.",
    },
    {
      question: "Apakah saya bisa mengubah permohonan setelah dikirim?",
      answer:
        "Setelah permohonan dikirim, Anda tidak dapat mengubahnya. Namun, Anda dapat mengajukan permohonan baru.",
    },
  ];

  // Buat state untuk melacak FAQ mana yang terbuka
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <NavbarPage />
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
            Frequently Asked Questions (FAQ)
          </h1>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b pb-2">
              <h2
                className="text-lg font-semibold text-purple-800 cursor-pointer transition-colors duration-200 hover:text-purple-600"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
              </h2>
              {openIndex === index && (
                <p className="text-gray-700 mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
          <div className="text-center mt-6">
           
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
