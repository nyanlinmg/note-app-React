import { delay, motion, scale } from "framer-motion";import { Box, Container, duration } from "@mui/material";
import { useApp } from "../AppProvider";
const MotionContainer = motion(Container);
const MotionBox = motion(Box);


const cardVariants = {
  hidden: { opacity: 0,y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
        type: "spring",
        stiffness: 150,
        damping: 10,
        ease: "easeInOut"
    }
  }
}

const containerVariants = {
    hidden: { opacity: 1},
    visible: {
      opacity: 1,
      transition: {
          delay: 0.6,
          staggerChildren: 0.3
      }
    }
}

export default function Count() {
    const {mode, setMode} = useApp();

    return (
        <MotionContainer
            variants={containerVariants}
            initial="hidden"
            whileInView={"visible"}
            viewport={{amount: 0.8}}
            component="div"
            className="py-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-x-5 gap-y-5">
                <MotionBox variants={cardVariants} component="div" className={`border-3 ${mode === "dark" ? "border-mauve-600 bg-mauve-900 text-blue-200" : "border-blue-400 bg-blue-50 text-blue-600"} rounded-md w-full p-2`}>
                    aa
                </MotionBox>

                <MotionBox variants={cardVariants} component="div" className={`border-3 ${mode === "dark" ? "border-mauve-600 bg-mauve-900 text-amber-100" : "border-amber-300 bg-amber-50 text-amber-500"} rounded-md w-full p-2`}>
                    bb
                </MotionBox>

                <MotionBox variants={cardVariants} component="div" className={`border-3 ${mode === "dark" ? "border-mauve-600 bg-mauve-900 text-rose-400" : "border-red-400 bg-red-50 text-red-500"} rounded-md w-full p-2`}>
                    cc
                </MotionBox>
        </MotionContainer>
    )
}