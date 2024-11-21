import Image from "next/image";

const LogoSection = () => {
  return (
    <div className="flex justify-center mb-4 -ml-16">
      {" "}
      {/* Tambahkan ml-4 */}
      <div className="flex gap-2 bg-white rounded-lg p-2 sm:p-6 md:p-4">
        <Image
          src="/images/unnes.png"
          alt="unnes"
          width={70}
          height={70}
          className="h-16 w-auto sm:h-20 md:h-24"
        />
        <Image
          src="/images/kominfo.png"
          alt="Kominfo"
          width={70}
          height={70}
          className="h-16 w-auto sm:h-20 md:h-24"
        />
        <Image
          src="/images/semarang.png"
          alt="Semarang"
          width={70}
          height={70}
          className="h-16 w-auto sm:h-20 md:h-24"
        />
        <Image
          src="/images/Unimus.png"
          alt="Unimus"
          width={70}
          height={70}
          className="h-16 w-auto sm:h-20 md:h-24"
        />
      </div>
    </div>
  );
};

export default LogoSection;
