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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { REACT_APP_DB_URL } from "../index";

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

// on add task put a default value of false for archived and display:hidden the whole input
// on edit same thing but don't hide it

// edit getTasks so that the archived tasks are at the end of the list

function valuetext(value: number) {
    return `${value}°C`;
}

const TaskComps: React.FC<{
    archived: boolean;
    tasks: any[];
    accountName: String;
    account_id: String;
    collapsibleState: any;
    setCollapsibleState: any;
}> = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openNameEdit, setOpenNameEdit] = React.useState(false);
    const handleOpenNameEdit = () => setOpenNameEdit(true);
    const handleCloseNameEdit = () => setOpenNameEdit(false);

    const [priority, setPriority] = React.useState("");
    const handleChange = (event: SelectChangeEvent) => {
        setPriority(event.target.value as string);
    };

    async function handleSubmitNameEdit(event: any) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        await axios.patch(
            REACT_APP_DB_URL + "api/v1/accounts/" + props.account_id,
            data
        );
        handleCloseNameEdit();
        props.setCollapsibleState(!props.collapsibleState);
    }

    async function submitDeletion(event: any) {
        event.preventDefault();
        await axios.delete(
            REACT_APP_DB_URL + "api/v1/accounts/" + props.account_id
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
                    REACT_APP_DB_URL + "api/v1/tasks/" + key,
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

        if (!("archived" in data)) {
            data["archived"] = "false";
        }

        // first create the task and then use the new task id in the response to update account
        console.log(data);
        const response_task = await axios.post(
            REACT_APP_DB_URL + "api/v1/tasks/",
            data
        );
        const newTaskID = response_task.data.data.task._id;

        const response_currTasks = await axios.get(
            REACT_APP_DB_URL + "api/v1/accounts/" + props.account_id
        );

        let currTasks = response_currTasks.data.data.account.tasks;
        currTasks.push(newTaskID);

        await axios.patch(
            REACT_APP_DB_URL + "api/v1/accounts/" + props.account_id,
            { tasks: currTasks }
        );
        handleClose();
        props.setCollapsibleState(!props.collapsibleState);
    }

    const [taskArchived, setTaskArchived] = React.useState(false);
    const handleArchivedTaskChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTaskArchived(event.target.checked);
    };

    return (
        <div>
            <form onSubmit={handleSubmitSave}>
                {props.tasks
                    .filter((task) => !(task.archived && props.archived))
                    .map((task) => (
                        <TaskComp
                            archived={props.archived}
                            key={task._id}
                            task={task}
                            collapsibleState={props.collapsibleState}
                            setCollapsibleState={props.setCollapsibleState}
                            account_id={props.account_id}
                        />
                    ))}

                <div className="row">
                    <div className="col-9">
                        <Stack spacing={3} direction="row">
                            <Button variant="contained" type="submit">
                                Save
                            </Button>
                            <Button variant="contained" onClick={handleOpen}>
                                Add
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleOpenNameEdit}
                            >
                                Edit Account Name
                            </Button>
                        </Stack>
                    </div>
                    <div className="col-3 text-right">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={submitDeletion}
                        >
                            Delete Account
                        </Button>
                    </div>
                </div>
            </form>

            <Modal
                open={openNameEdit}
                onClose={handleCloseNameEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmitNameEdit}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Edit Account
                        </Typography>
                        <div className="form-Row">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Account Name"
                                variant="standard"
                                name="name"
                                defaultValue={props.accountName}
                            />
                        </div>
                        <div className="form-Row">
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" type="submit">
                                    Save
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={() => handleCloseNameEdit()}
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </div>
                    </form>
                </Box>
            </Modal>

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
                                id="standard-multiline-flexible"
                                label="Description"
                                multiline
                                maxRows={4}
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
                        <div className="form-Row" style={{ display: "none" }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={taskArchived}
                                        color="default"
                                        name="archived"
                                        onChange={handleArchivedTaskChange}
                                    />
                                }
                                label="Archived"
                            />
                        </div>
                        <div className="form-Row">
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" type="submit">
                                    Add Task
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
