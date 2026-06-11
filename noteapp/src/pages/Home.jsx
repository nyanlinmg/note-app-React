import { Box, Container, duration } from "@mui/material";
import { useApp } from "../AppProvider";
import { delay, motion, scale } from "framer-motion";
import { useNavigate } from "react-router";

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
          staggerChildren: 0.4
      }
    }
}

export default function Home() {
    const {mode, setMode, drawer, setDrawer, auth, setAuth} = useApp();
    const navigate = useNavigate();

    if(!auth) {
        navigate('/login');
        return null;
    }

    return (
        <MotionContainer
            variants={containerVariants}
            initial="hidden"
            whileInView={"visible"}
            viewport={{amount: 0.8}}
            component="div"
            className="py-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-x-5 gap-y-5">
            <MotionBox variants={cardVariants} component="div" className={`border-3 ${mode === "dark" ? "border-cyan-400" : "border-blue-400"} rounded-md w-full p-2 ${mode === "dark" ? "bg-cyan-100" : "bg-blue-50"}`}>
 
            </MotionBox>

            <MotionBox variants={cardVariants} component="div" className={`border-3 ${mode === "dark" ? "border-amber-400" : "border-amber-500"} rounded-md w-full p-2 ${mode === "dark" ? "bg-amber-100" : "bg-amber-50"}`}>
 
            </MotionBox>

            <MotionBox variants={cardVariants} component="div" className={`border-3 ${mode === "dark" ? "border-red-400" : "border-red-500"} rounded-md w-full p-2 ${mode === "dark" ? "bg-red-100" : "bg-red-50"}`}>
 
            </MotionBox>
        </MotionContainer>
    )
}