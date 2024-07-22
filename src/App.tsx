import "./App.css";
import React from "react";
import "./assets/index.css";
import "./assets/icons.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Collapsibles from "./components/Collapsibles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { red, blueGrey } from "@mui/material/colors";
import { REACT_APP_DB_URL } from "./index";

const theme = createTheme({
    palette: {
        secondary: red,
        success: blueGrey,
    },
    typography: {
        subtitle2: {
            fontStyle: "italic",
            color: "grey",
        },
        body1: {
            fontWeight: 500,
        },
    },
});

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

function App() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [accounts, setAccounts] = useState([]);

    const [collapsibleState, setCollapsibleState] = useState(false);

    useEffect(() => {
        async function fetchAccounts() {
            const response = await axios.get(
                REACT_APP_DB_URL + "api/v1/accounts"
            );

            setAccounts(response.data.data.accountsWithTasks);
        }
        fetchAccounts();
    }, [collapsibleState]);

    async function handleSubmitNew(event: any) {
        event.preventDefault();
        const fd = new FormData(event.target);
        let data = Object.fromEntries(fd.entries());
        let newData = {};
        newData = { name: data["name"], tasks: [] };

        await axios.post(REACT_APP_DB_URL + "api/v1/accounts/", newData);

        setCollapsibleState(!collapsibleState);
        handleClose();
    }

    const [archived, setArchived] = useState(true);
    const handleArchivedChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setArchived(event.target.checked);
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div className="row">
                    <div className="col-8" id="main-title">
                        <h1>Account Manager</h1>
                    </div>
                    <div className="col-4">
                        <Stack spacing={4} direction="row">
                            <FormControlLabel
                                style={{ marginTop: "50px" }}
                                control={
                                    <Switch
                                        checked={archived}
                                        onChange={handleArchivedChange}
                                    />
                                }
                                label="Hide Archived"
                            />
                            <Button
                                variant="contained"
                                onClick={handleOpen}
                                id="add-account-button"
                            >
                                New Account
                            </Button>
                        </Stack>
                    </div>
                </div>
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
                                Create a New Account
                            </Typography>
                            <div className="form-Row">
                                <TextField
                                    fullWidth
                                    id="standard-basic"
                                    label="Account Name"
                                    variant="standard"
                                    name="name"
                                />
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
                <div className="row">
                    <div className="col-12">
                        <Collapsibles
                            archived={archived}
                            accounts={accounts}
                            collapsibleState={collapsibleState}
                            setCollapsibleState={setCollapsibleState}
                        />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
