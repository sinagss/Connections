import { useState } from "react";
import {
  Typography,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemButton,
} from "@mui/material";
import { Mail, Phone, Star, StarRateOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { favoriteConnection } from "../../store/connectionsSlice";
import useStrings from "../../hooks/useStrings";

const CustomListItem = ({
  object,
  index,
  connectionsLength,
  toggleFavorite,
  clickHandler,
}) => {
  const [fav, setFav] = useState(object.favorite || false);

  const dispatch = useDispatch();

  const strings = useStrings().connections;

  const favClickHandler = () => {
    setFav((prevFav) => {
      const newFav = !prevFav;
      dispatch(favoriteConnection({ object, index, fav: newFav }));
      return newFav;
    });
    toggleFavorite(object);
  };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        disablePadding
        disableGutters
        sx={{
          cursor: "pointer",

          "&:hover": { backgroundColor: "action.hover" },
        }}
        secondaryAction={
          <>
            <IconButton
              sx={{ color: "#1976d2" }}
              component="a"
              href={`mailto:${object.emails[0]}?subject=Use Virtual Connections! It's great!!!&body=Hey, ${object.firstName} Use Virtual Connections! It's great 😲🤯!!!%0D%0A %0D%0AThis App is created by ⭐Sina Ghassaei⭐ with ❤️ %0D%0A%0D%0A`}
            >
              <Mail />
            </IconButton>
            <IconButton
              sx={{ color: "#01ab46" }}
              component="a"
              href={`tel:${object.phoneNumbers[0]}`}
            >
              <Phone />
            </IconButton>
            <IconButton onClick={favClickHandler}>
              {fav ? <Star sx={{ color: "#ffa215" }} /> : <StarRateOutlined />}
            </IconButton>
          </>
        }
      >
        <ListItemButton
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 11fr",
              sm: "1fr 3fr 3fr 9fr",
              md: "1fr 6fr 4fr 8fr",
            },
          }}
          onClick={clickHandler}
        >
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            sx={{ paddingRight: 14 }}
            primary={`${object.firstName} ${object.lastName}`}
          />
          <ListItemText
            sx={{ display: { xs: "none", sm: "block" } }}
            primary={strings.phone}
            secondary={
              <>
                <Typography
                  sx={{ display: "flex", alignItems: "flex-end" }}
                  component="span"
                  variant="body2"
                  color="textPrimary"
                ></Typography>
                {object.phoneNumbers[0]}
              </>
            }
          />
          <ListItemText
            sx={{ display: { xs: "none", sm: "block" } }}
            primary={strings.email}
            component="span"
            secondary={
              <>
                <Typography
                  display="inline"
                  component="span"
                  variant="body2"
                  color="textPrimary"
                ></Typography>
                {object.emails[0]}
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      {index < connectionsLength - 1 && (
        <Divider
          variant="inset"
          component="li"
          sx={{ width: "100%", justifyContent: "left" }}
        />
      )}
    </>
  );
};

CustomListItem.propTypes = {
  object: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    emails: PropTypes.arrayOf(PropTypes.string).isRequired,
    phoneNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
    favorite: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
  connectionsLength: PropTypes.number.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default CustomListItem;
