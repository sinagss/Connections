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
import { NavLink } from "react-router-dom";

const settingItems = [
  { text: "Account", href: "/account" },
  { text: "Settings", href: "/settings" },
  { text: "Logout", href: "/logout" },
];

const AvatarMenu = () => {
  const activeNavStyle =
    "h-full w-full font-extrabold text-indigo-700 no-underline";
  const normalNavStyle = "h-full w-full no-underline";

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
          <MenuItem key={item.text} onClick={handleCloseUserMenu}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                isActive ? activeNavStyle : normalNavStyle
              }
            >
              <Typography textAlign="center">{item.text}</Typography>
            </NavLink>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AvatarMenu;
