import { delay, motion, scale } from "framer-motion";import { Box, Container, duration } from "@mui/material";
import { useApp } from "../AppProvider";
const MotionContainer = motion(Container);
const MotionBox = motion(Box);

import {
    SpeakerNotes as NotesIcon,
    Favorite as FavoriteIcon,
    AutoDelete as TrashBinIcon
} from "@mui/icons-material";
import { useTotalFavoritesOfUser, useTotalTasksOfUser } from "../../hooks/useUser/userhook";

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
    const id = localStorage.getItem('userId');
    const {userTasks, isLoadingTasks, tasksError, refetchTasks} = useTotalTasksOfUser();
    const {userFavorites, isLoadingFavorites, favoritesError, refetchFavorites} = useTotalFavoritesOfUser();
    console.log(userTasks);
    console.log(userFavorites);

    return (
        <MotionContainer
            variants={containerVariants}
            initial="hidden"
            whileInView={"visible"}
            viewport={{amount: 0.8}}
            component="div"
            className="py-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-x-5 gap-y-5">
                <MotionBox variants={cardVariants} component="div" className={`border-3 ${mode === "dark" ? "border-mauve-600 bg-mauve-900 text-blue-200" : "border-blue-400 bg-blue-50 text-blue-600"} rounded-md w-full p-2`}>
                    <div className="flex gap-2 font-bold text-xl items-center">
                        <NotesIcon sx={{fontSize: 30}} />
                        <h1>Total Tasks :</h1>
                        {isLoadingTasks ? <p className="text-sm">Loading...</p>: <h1 className="font-bold ms-1 text-2xl">{userTasks?.notes.length}</h1>}
                    </div>
                </MotionBox>

                <MotionBox variants={cardVariants} component="div" className={`border-3 ${mode === "dark" ? "border-mauve-600 bg-mauve-900 text-amber-100" : "border-amber-300 bg-amber-50 text-amber-500"} rounded-md w-full p-2`}>
                    <div className="flex gap-2 font-bold text-xl items-center">
                        <FavoriteIcon sx={{fontSize: 30}} />
                        <h1>Total Favorites : </h1>
                        {isLoadingFavorites ? <p className="text-sm">Loading...</p>: <h1 className="font-bold ms-1 text-2xl">{userFavorites?.length}</h1>}
                    </div>
                </MotionBox>

                <MotionBox variants={cardVariants} component="div" className={`border-3 ${mode === "dark" ? "border-mauve-600 bg-mauve-900 text-rose-400" : "border-red-400 bg-red-50 text-red-500"} rounded-md w-full p-2`}>
                    <div className="flex gap-2 font-bold text-xl items-center">
                        <TrashBinIcon sx={{fontSize: 30}} />
                        <h1>Total Removed Tasks</h1>
                    </div>
                </MotionBox>
        </MotionContainer>
    )
}