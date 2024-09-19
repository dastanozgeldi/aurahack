"use client";

import dynamic from "next/dynamic";
import { globeConfig, sampleArcs } from "@/data/globe-config";
import { motion } from "framer-motion";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative mx-auto my-10 h-[36rem] w-full max-w-7xl overflow-hidden">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h2 className="text-center text-2xl font-bold text-black dark:text-white md:text-4xl">
            hackathons connect the world.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-base font-normal text-neutral-700 dark:text-neutral-200 md:text-lg">
            we are an organization from kazakhstan that empowers developers to
            build amazing projects in shortest periods of time.
          </p>
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full select-none bg-gradient-to-b from-transparent to-white dark:to-black" />
        <div className="mt-6 h-72 w-full md:h-full">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
