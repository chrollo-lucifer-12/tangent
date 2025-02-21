import TitleSection from "@/components/landing-page/title-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import banner from "../../../public/banner.png";

const Navbar = () => {
    return (
        <nav className="w-full px-6 py-4 flex justify-between items-center bg-black shadow-md text-white">
            <h1 className="text-2xl font-bold">Tangent</h1>
            <Link href="/dashboard">
                <Button variant="default" className="px-6 py-2 text-lg bg-white text-black rounded-md">Go to Dashboard</Button>
            </Link>
        </nav>
    );
};

const HomePage = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            <section className="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
                <TitleSection title="All-In-One Collaboration and Productivity Platform" pill="✨ Your workspace perfected" />
                <div className="bg-black p-[2px] mt-6 rounded-xl bg-gradient-to-r from-primary to-yellow-300 sm:w-[300px]">
                    <Button variant="secondary" className="w-full rounded-[10px] p-6 text-2xl bg-white text-black">Get Tangent Free</Button>
                </div>
                <div className="md:mt-[-90px] sm:w-full w-[750px] flex justify-center items-center mt-[-40px] relative sm:ml-0 ml-[-50px]">
                    <Image src={banner} alt="Application Banner" />
                    <div className="bottom-0 top-[50%] bg-gradient-to-t from-black left-0 right-0 absolute z-10"></div>
                </div>
            </section>
            <section className="px-4 sm:px-6 flex justify-center items-center flex-col">
                <div className="w-[30%] blur-[120px] rounded-full h-32 absolute bg-black"></div>
            </section>
        </div>
    );
};

export default HomePage;
