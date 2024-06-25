import React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";

function valuetext(value: number) {
    return `${value}°C`;
}

const TaskComp: React.FC<{
    task: any;
    collapsibleState: any;
    setCollapsibleState: any;
}> = (props) => {
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
        await axios.delete(
            process.env.REACT_APP_DB_URL + "api/v1/tasks/" + props.task._id
        );
        props.setCollapsibleState(!props.collapsibleState);
    }

    return (
        <div
            className="row"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="col-10">
                {props.task.title}

                <Box sx={{ width: 400 }}>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={props.task.percentComplete}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        color={
                            props.task.priority === "normal"
                                ? "primary"
                                : props.task.priority === "high"
                                ? "error"
                                : "success"
                        }
                        shiftStep={20}
                        step={10}
                        marks
                        min={0}
                        max={100}
                        name={props.task._id}
                    />
                </Box>
            </div>
            <div className="col-2">
                <Stack spacing={1} direction="row" style={buttonStyle}>
                    <IconButton aria-label="edit" size="small">
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
        </div>
    );
};

export default TaskComp;
