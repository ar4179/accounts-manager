import React from 'react';
import Task from "../models/Task";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

function valuetext(value: number) {
    return `${value}°C`;
}

const TaskComp: React.FC<{task: Task}> = (props) => {
    return (
        <div>
            {props.task.title}

            <Box sx={{ width: 300 }}>
                <Slider
                    aria-label="Temperature"
                    defaultValue={30}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    shiftStep={20}
                    step={10}
                    marks
                    min={0}
                    max={100}
                />
            </Box>
            
        </div>
    );
}

export default TaskComp;
