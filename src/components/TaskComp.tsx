import React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

function valuetext(value: number) {
    return `${value}°C`;
}

const TaskComp: React.FC<{ task: any }> = (props) => {
    return (
        <div>
            {props.task.title}

            <Box sx={{ width: 300 }}>
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
    );
};

export default TaskComp;
