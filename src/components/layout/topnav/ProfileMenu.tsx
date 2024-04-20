import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { TbLogout } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { getAuth, signOut } from "firebase/auth";
import app from "../../../firebase";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../features/auth/AuthContext";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";

const ProfileMenu = () => {
    const auth = getAuth(app);

    const { currentUser } = useAuthContext();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Function to show the menu
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    // Function to hide the menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Function to logout
    const handleLogout = () => {
        try {
            // Logout logic here
            signOut(auth)
                .then(() => {
                    toast.info("Sikeres kijelentkezés");
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Hiba történt a kijelentkezés során");
                });
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <React.Fragment>
            <Box
                component="div"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <Avatar
                        src={currentUser?.photoURL ?? ""}
                        sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        {currentUser?.photoURL ? null : <FaUser className="size-[16px]" />}
                    </Avatar>
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem component={Link} to="/me" onClick={handleClose}>
                    <Avatar
                        src={currentUser?.photoURL ?? ""}
                        sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        {currentUser?.photoURL ? null : <FaUser className="size-[16px]" />}
                    </Avatar>{" "}
                    {currentUser?.displayName ?? "Profil Adatok"}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} disabled>
                    <ListItemIcon>
                        <FiSettings className="text-xl" />
                    </ListItemIcon>
                    Beállítások
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <TbLogout className="text-xl" />
                    </ListItemIcon>
                    Kijelentkezés
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default ProfileMenu;
