import React from "react";
import TaskComp from "./TaskComp";
import axios from "axios";
import { useState } from "react";

import Box from "@mui/material/Box";
//import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const TaskComps: React.FC<{ tasks: any[]; account_id: String }> = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [tasks, setTasks] = useState(true);
    async function handleSubmitSave(event: any) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        console.log("The entries: ", data);

        let promises: any[];
        promises = [];
        async function updateTasks() {
            Object.keys(data).forEach((key) => {
                const response = axios.patch(
                    process.env.REACT_APP_DB_URL + "api/v1/tasks/" + key,
                    { percentComplete: data[key] }
                );
                promises.push(response);
            });
            const responses = await Promise.all(promises);
            console.log(responses);
            setTasks(!tasks);
        }
        updateTasks();
    }

    async function handleSubmitNew(event: any) {
        event.preventDefault();
        const fd = new FormData(event.target);
        let data = Object.fromEntries(fd.entries());
        // add dropdown menu for priorities
        // add percentComplete Slider
        // first create the task and then use the new task id in the response to update account
        console.log("The entries: ", data);
        setTasks(!tasks);
        handleClose();
    }
    return (
        <div>
            <form onSubmit={handleSubmitSave}>
                {props.tasks.map((task) => (
                    <TaskComp key={task._id} task={task} />
                ))}
                <button type="submit">Save Progress Bars</button>
            </form>
            <button onClick={handleOpen}>Add New Task</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmitNew}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Create a New Task
                        </Typography>
                        <div>
                            <label htmlFor="title">Task Title</label>
                            <input type="text" id="title" name="title" />
                        </div>
                        <div>
                            <label htmlFor="description">
                                Task Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                            ></textarea>
                        </div>
                        <button type="submit">Add</button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default TaskComps;
