import React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { REACT_APP_DB_URL } from "../index";

function valuetext(value: number) {
    return `${value}°C`;
}

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

const TaskComp: React.FC<{
    archived: boolean;
    task: any;
    collapsibleState: any;
    setCollapsibleState: any;
    account_id: String;
}> = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [isHovered, setIsHovered] = React.useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const buttonStyle = {
        display: isHovered ? "block" : "none",
    };

    async function submitTaskDeletion(event: any) {
        event.preventDefault();
        await axios.delete(REACT_APP_DB_URL + "api/v1/tasks/" + props.task._id);
        props.setCollapsibleState(!props.collapsibleState);
    }

    async function handleSubmitEdit(event: any) {
        const fd = new FormData(event.target);
        let data = Object.fromEntries(fd.entries());

        if (!("archived" in data)) {
            data["archived"] = "false";
        }

        await axios.patch(
            REACT_APP_DB_URL + "api/v1/tasks/" + props.task._id,
            data
        );

        handleClose();
        props.setCollapsibleState(!props.collapsibleState);
    }

    const [taskArchivedEdit, setTaskArchivedEdit] = React.useState(
        props.task.archived
    );
    const handleArchivedTaskEditChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTaskArchivedEdit(event.target.checked);
    };

    return (
        <div
            className="row"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="col-10">
                <div>
                    <Typography variant="body1">{props.task.title}</Typography>
                </div>
                <div style={{ whiteSpace: "pre-wrap" }}>
                    <Typography variant="subtitle2">
                        {props.task.description}
                    </Typography>
                </div>
                <div>
                    <Box sx={{ width: 400 }}>
                        <Slider
                            aria-label="Temperature"
                            defaultValue={props.task.percentComplete}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            color={
                                props.task.priority === "normal"
                                    ? "info"
                                    : props.task.priority === "high"
                                    ? "secondary"
                                    : "success"
                            }
                            shiftStep={20}
                            step={10}
                            marks
                            min={0}
                            max={100}
                            name={props.task._id}
                            disabled={props.task.archived}
                        />
                    </Box>
                </div>
            </div>
            <div className="col-2 text-center">
                <Stack spacing={2} direction="row" style={buttonStyle}>
                    <IconButton
                        aria-label="edit"
                        size="small"
                        onClick={handleOpen}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={submitTaskDeletion}
                    >
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Stack>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSubmitEdit(e);
                        }}
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Edit Task
                        </Typography>
                        <div className="form-Row">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Title"
                                variant="standard"
                                name="title"
                                defaultValue={props.task.title}
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
                                defaultValue={props.task.description}
                            />
                        </div>
                        <div className="form-Row">
                            <FormControl sx={{ minWidth: 120 }} size="small">
                                <InputLabel
                                    variant="standard"
                                    htmlFor="uncontrolled-native"
                                >
                                    Priority
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={props.task.priority}
                                    inputProps={{
                                        name: "priority",
                                        id: "uncontrolled-native",
                                    }}
                                >
                                    <option value="low">Low</option>
                                    <option value="normal">Normal</option>
                                    <option value="high">High</option>
                                </NativeSelect>
                            </FormControl>
                        </div>
                        <div className="form-Row">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={taskArchivedEdit}
                                        checked={taskArchivedEdit}
                                        color="default"
                                        name="archived"
                                        onChange={handleArchivedTaskEditChange}
                                    />
                                }
                                label="Archived"
                            />
                        </div>
                        <div className="form-Row">
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" type="submit">
                                    Save
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

export default TaskComp;
