"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";

export default function Home() {
  return (
    <section className="landing-layout container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="flex flex-col lg:flex-row justify-between items-center mt-10 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <div className="px-6 sm:px-10 md:px-16 lg:px-20">
            <h1 className="text-4xl sm:text-5xl font-bold">Hi there</h1>
            <h2 className="mt-5 text-2xl sm:text-3xl">Attend your First Quiz</h2>
            <p className="text-lg sm:text-xl mt-2">
              Test your AWS knowledge by attending this quiz.
            </p>
          
          </div>
          <motion.div
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="mt-10 px-20"
          >
            <Dialog>
  <DialogTrigger> <Button className="w-[150px] h-14 px-6 py-3 text-lg cursor-pointer">Start Quiz</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader className="p-10">
      
      <DialogTitle>
        Once test is started don't skip the questions.
        You can't go back
      </DialogTitle>
      <Link href={"/questions"}><Button className="w-full h-14 mt-5 cursor-pointer text-xl">Take Test Now</Button></Link>
    </DialogHeader>
  </DialogContent>
</Dialog>
           
          </motion.div>
        </motion.div>

        <div className="mt-10 lg:mt-0 lg:p-10 flex justify-center">
          <motion.div 
           initial={{ opacity: 0, x: 500 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Image 
              src="/aws.png" 
              alt="AWS" 
              width={400} 
              height={400} 
              className="object-cover rounded-lg hidden md:block" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Tailwind Styles

