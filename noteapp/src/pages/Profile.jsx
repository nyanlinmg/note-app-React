import { Alert, Button, Container } from "@mui/material";
import { useApp } from "../AppProvider";
import { useTotalTasksOfUser } from "../../hooks/useUser/userhook";
import darkBgImage from "../assets/dark_bg.jpg";
import lightBgImage from "../assets/light_bg.jpg";
import Notes from "../components/Notes";

export default function Profile() {
    const {mode, setMode, auth, setAuth} = useApp();
    const {userTasks, isLoadingTasks, tasksError, refetchTasks} = useTotalTasksOfUser();

    return (
        <div>
            <Container 
            component="image" 
            style={{backgroundImage: `${mode === "light" ? `url(${lightBgImage})` : `url(${darkBgImage})`}`}} 
            maxWidth="lg" 
            className={`p-4 flex flex-col justify-center bg-cover bg-center items-center ${mode === "dark" ? " border-mist-700 border-2": " border-slate-600 border-2"} rounded-lg shadow-lg`}>
                <div className="p-2 flex flex-col items-center w-full h-full">
                    {!isLoadingTasks ?
                        <>
                            <div className="w-40 h-40 mb-3 rounded-full overflow-hidden border-2 border-slate-700">
                                {auth?.image ? 
                                    <img src={userTasks?.image} alt="user_profile" className="w-full h-full object-cover" /> : 
                                    <div className="text-white bg-sky-800 text-6xl flex flex-col items-center justify-center w-full h-full">
                                        {auth?.name?.charAt(0).toUpperCase()}
                                    </div>
                                }
                            </div>
                            <div className="text-center gap-y-2 py-3 flex flex-col items-center">
                                <b className={`text-2xl ${mode === "light" ? "text-mist-800" : "text-sky-300"}`}>{auth?.name}</b>
                                <b className={`text-sm ${mode === "light" ? "text-mist-700" : "text-sky-800"}`}>{auth?.email}</b>
                                <b className={`text-sm ${mode === "light" ? "text-mist-700" : "text-sky-800"}`}>{auth?.phone}</b>

                                <Button sx={{textTransform: 'none'}} variant="outlined">
                                    Edit Profile
                                </Button>
                            </div> 
                        </> : <p>Loading...</p>
                    }
                </div>
            </Container>

            {userTasks?.notes?.length ? 
                <Container maxWidth="lg" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-10" component="div">
                    {userTasks?.notes?.map(note => {
                        return <Notes key={note.id} note={note} />
                    })}
                </Container> : 
                <Container maxWidth="lg" component="div" className="mt-5">
                    <Alert severity="warning">No Notes yet...</Alert>
                </Container>
            }
        </div>
    )
}