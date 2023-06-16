import { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/authSlice";
import { Logout } from "@mui/icons-material";
import useStrings from "../../hooks/useStrings";

const AvatarMenu = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const strings = useStrings().avatarMenu;

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutClickHandler = () => {
    dispatch(logOut());
    nav("/");
  };

  const settingItems = [
    // { text: "Account", href: "/account" },
    { text: strings.settingsLabel, href: "/settings" },
  ];

  return (
    <Box sx={{ flexGrow: 0, marginX:"1rem" }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settingItems.map((item) => (
          <NavLink key={item.text} to={item.href} onClick={item.clickHandler}>
            <MenuItem key={item.text} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{item.text}</Typography>
            </MenuItem>
          </NavLink>
        ))}
        <Box onClick={logoutClickHandler}>
          <MenuItem onClick={handleCloseUserMenu}>
            <Logout sx={{ marginRight: "3px" }} />
            <Typography textAlign="center">{strings.logoutLabel}</Typography>
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
};

export default AvatarMenu;
