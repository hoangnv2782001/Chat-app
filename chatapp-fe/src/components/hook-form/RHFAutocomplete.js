import PropTypes from "prop-types";

import { useFormContext, Controller } from "react-hook-form";

import { Autocomplete, TextField } from "@mui/material";

RHFAutocomplete.prototype = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};
export default function RHFAutocomplete({control, name, label, helperText, ...other }) {
  const {  setValue, getValues } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            {...field}
            fullWidth
            error={!!error}
            onChange={(event, newValue) => {
             
              setValue(name, newValue, { shouldValidate: true });
            }}
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value
            }
            helperText={error ? error.message : helperText}
            {...other}
            renderInput={(params) => {
              return (
                <TextField
                  label={label}
                  error={!!error}
                  helperText={error ? error.message : helperText}
                  {...params}
                />
              );
            }}
          />
        );
      }}
    />
  );
}
