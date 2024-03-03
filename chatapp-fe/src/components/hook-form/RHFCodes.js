import { Stack, TextField } from "@mui/material";
import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

/**
 * Component input code
 * @param {*} { keyName = "", inputs = [], ...other }
 * @returns
 */
const RHFCodes = ({ keyName = "test", inputs = [], ...other }) => {
  console.log(inputs, keyName);

  const codeRef = useRef(null);

  const { control } = useFormContext();

  const handleChangeNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;

    const fieldIndex = name.replace(keyName, "");

    const fieldIntIndex = Number(fieldIndex);

    const nextField = document.querySelector(
      `input[name=${keyName}${fieldIntIndex + 1}]`
    );

    if (value.length > maxLength) {
      event.target.value = value[0];
    }
    if (value.length >= maxLength && fieldIntIndex < 6 && nextField !== null) {
      nextField.focus();
    }

    handleChange(event);
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center" ref={codeRef}>
      {inputs.map((element, index) => (
        <Controller
          // name={keyName}
          key={element}
          name={`${keyName}${index + 1}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              error={!!error}
              autoFocus={index === 0}
              placeholder={"-"}
              onChange={(event) => {
                handleChangeNextField(event, field.onChange);
              }}
              onFocus={(event) => {
                event.currentTarget.select();
              }}
              InputProps={{
                sx: {
                  width: { xs: 36, sm: 56 },
                  height: { xs: 36, sm: 56 },
                  "& input": {
                    P: 0,
                    textAlign: "center",
                  },
                },
              }}
              inputProps={{
                maxLength: 1,
                type: "number",
              }}
              {...other}
            />
          )}
        />
      ))}
    </Stack>
  );
};

export default RHFCodes;
