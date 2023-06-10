import React, { useState } from "react";
import {
  Typography,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { Mail, Phone, Star, StarRateOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";

const CustomListItem = ({ object, index }) => {
  const [fav, setFav] = useState(false);

  const favClickHandler = () => {
    setFav(!fav);
  };

  return (
    <React.Fragment>
      <ListItem
        alignItems="flex-start"
        disablePadding
        disableGutters
        sx={{
          cursor: "pointer",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 2fr 1fr 1fr 1fr",
            sm: "1fr 2fr 2fr 2fr 1fr 1fr",
          },
          "&:hover": { backgroundColor: "action.hover" },
        }}
        secondaryAction={
          <>
            <IconButton component="a" href={`mailto:${object.emails[0]}`}>
              <Mail />
            </IconButton>
            <IconButton component="a" href={`tel:${object.phoneNumbers[0]}`}>
              <Phone />
            </IconButton>
            <IconButton onClick={favClickHandler}>
              {fav ? <Star /> : <StarRateOutlined />}
            </IconButton>
          </>
        }
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
          primary="Phone:"
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
          primary="Email:"
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
      </ListItem>
      {index < object.length - 1 && <Divider variant="inset" component="li" />}
    </React.Fragment>
  );
};

CustomListItem.propTypes = {
  object: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    emails: PropTypes.arrayOf(PropTypes.string).isRequired,
    phoneNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CustomListItem;
