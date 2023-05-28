import PropTypes from "prop-types";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

const ListItemLink = ({ item }) => {
  const activeNavStyle =
    "h-full w-full font-extrabold text-indigo-700 no-underline";
  const normalNavStyle = "h-full w-full no-underline";

  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ textAlign: "center" }}>
        <NavLink
          to={item.href}
          className={({ isActive }) =>
            isActive ? activeNavStyle : normalNavStyle
          }
        >
          <ListItemText>{item.text}</ListItemText>
        </NavLink>
      </ListItemButton>
    </ListItem>
  );
};

ListItemLink.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListItemLink;
