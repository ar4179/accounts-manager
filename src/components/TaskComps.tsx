import React from "react";
import TaskComp from "./TaskComp";
import axios from "axios";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";

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

function valuetext(value: number) {
    return `${value}°C`;
}

const TaskComps: React.FC<{
    tasks: any[];
    account_id: String;
    collapsibleState: any;
    setCollapsibleState: any;
}> = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [priority, setPriority] = React.useState("");
    const handleChange = (event: SelectChangeEvent) => {
        setPriority(event.target.value as string);
    };

    async function submitDeletion(event: any) {
        event.preventDefault();
        await axios.delete(
            process.env.REACT_APP_DB_URL + "api/v1/accounts/" + props.account_id
        );
        props.setCollapsibleState(!props.collapsibleState);
    }

    const [tasks, setTasks] = React.useState(false);
    async function handleSubmitSave(event: any) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

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
            await Promise.all(promises);
            alert("Task Progress Saved Successfully!");
            setTasks(!tasks);
        }
        updateTasks();
    }

    async function handleSubmitNew(event: any) {
        event.preventDefault();
        const fd = new FormData(event.target);
        let data = Object.fromEntries(fd.entries());
        // first create the task and then use the new task id in the response to update account
        const response_task = await axios.post(
            process.env.REACT_APP_DB_URL + "api/v1/tasks/",
            data
        );
        const newTaskID = response_task.data.data.task._id;

        const response_currTasks = await axios.get(
            process.env.REACT_APP_DB_URL + "api/v1/accounts/" + props.account_id
        );

        let currTasks = response_currTasks.data.data.account.tasks;
        currTasks.push(newTaskID);

        await axios.patch(
            process.env.REACT_APP_DB_URL +
                "api/v1/accounts/" +
                props.account_id,
            { tasks: currTasks }
        );
        handleClose();
        props.setCollapsibleState(!props.collapsibleState);
    }
    return (
        <div>
            <form onSubmit={handleSubmitSave}>
                {props.tasks.map((task) => (
                    <TaskComp
                        key={task._id}
                        task={task}
                        collapsibleState={props.collapsibleState}
                        setCollapsibleState={props.setCollapsibleState}
                        account_id={props.account_id}
                    />
                ))}
                <div className="row">
                    <div className="col-4">
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" type="submit">
                                Save
                            </Button>
                            <Button variant="contained" onClick={handleOpen}>
                                Add
                            </Button>
                        </Stack>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-2">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={submitDeletion}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </form>
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
                        <div className="form-Row">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Title"
                                variant="standard"
                                name="title"
                            />
                        </div>
                        <div className="form-Row">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Description"
                                variant="standard"
                                name="description"
                            />
                        </div>
                        <div className="form-Row">
                            <FormControl sx={{ minWidth: 120 }} size="small">
                                <InputLabel id="demo-simple-select-label">
                                    Priority
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={priority}
                                    label="Priority"
                                    name="priority"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="normal">Normal</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form-Row">
                            <Box sx={{ width: 300 }}>
                                <Slider
                                    aria-label="Volume"
                                    defaultValue={0}
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    shiftStep={20}
                                    step={10}
                                    marks
                                    min={0}
                                    max={100}
                                    name="percentComplete"
                                />
                            </Box>
                        </div>
                        <div className="form-Row">
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" type="submit">
                                    Add
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={() => handleClose()}
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default TaskComps;
