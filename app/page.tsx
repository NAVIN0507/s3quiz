"use client"
import Image from "next/image";
import {motion} from "framer-motion"
export default function Home() {
  return (
   <section className="landing-layout">
    <motion.div>
      <div className="items-center p-40 flex-row flex justify-between">
        <div className="flex flex-col">
        <h1 className="text-5xl">Hi there</h1>
        <h1 className="mt-5 text-3xl">Atten your First Quiz</h1>
        <h1 className="text-3xl mt-2">to get to know about your aws knowledge</h1>
        <h1 className="text-3xl mt-2">by attending this quizz.</h1>
        </div>
      </div>
    </motion.div>
   </section>
  );
}
