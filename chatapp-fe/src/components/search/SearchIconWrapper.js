import { styled } from "@mui/material/styles";
/**
 * styled component SearchIconWrapper
 * Dùng để wrapper icon
 */
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));


export default SearchIconWrapper;