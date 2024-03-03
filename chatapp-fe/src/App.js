// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseSnackbar } from "./Redux/slices/app";
// import  WebSocket   from 'ws';


const vertical = "top";
const horizontal = "right";



function App() {
  
  const dispatch = useDispatch();

  const { open, severity, message } = useSelector((state) => state.app.snackbar);
  console.log(open, severity, message)

  console.log("global object :",Object.assign(global,{WebSocket}))
  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          {" "}
          <Router />{" "}
        </ThemeSettings>
      </ThemeProvider>

      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            dispatch(CloseSnackbar());
          }}

          sx={{zIndex:1500}}
        >
          <Alert
            onClose={() => {
              dispatch(CloseSnackbar());
            }}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default App;
