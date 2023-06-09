import { forwardRef, useState } from "react";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
import { FormControl, Input, InputLabel } from "@mui/material";

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  const masks = [
    { mask: "+{98}(00) 00-000000" },
    { mask: "+{98}(#90) 0000000" },
  ];
  return (
    <IMaskInput
      {...other}
      mask={masks}
      lazy={false}
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      displayChar="+"
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CustomPhoneNumber = () => {
  const [values, setValues] = useState({
    textmask: "",
    numberformat: "1320",
  });
  const phoneChangeHandler = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <FormControl variant="standard">
        <InputLabel htmlFor="formatted-text-mask-input">
          Phone Number
        </InputLabel>
        <Input
          value={values.textmask}
          name="textmask"
          onChange={phoneChangeHandler}
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
        />
      </FormControl>
    </>
  );
};

export default CustomPhoneNumber;
