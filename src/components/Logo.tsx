import Image from "next/image";

export default function Logo(){
    return (
        <div className="flex justify-center items-center w-max flex-col">
          <Image src={'/logo.svg'} alt="logo" width={50} height={50} />
          <p className="text-xl text-primary font-semibold -translate-y-2 font-mono">CallYuk</p>
        </div>
    )
}