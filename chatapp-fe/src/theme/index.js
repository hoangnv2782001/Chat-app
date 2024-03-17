/** Thư viện để kiểm tra và xác minh các kiểu dữ liệu của 
 các props được truyền vào các thành phần React.*/
import PropTypes from "prop-types";
import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";


import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import useSettings from "../hooks/useSettings.js";

import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";


// function ThemeProvider chỉ nhận param children chó type: node
ThemeProvider.propTypes = {
  children: PropTypes.node,
};
/**
 * 
 * @param {Node} { children } 
 * @returns {Component}
 */
export default function ThemeProvider({ children }) {

  // Lấy themeMode và themeDirection từ settingContext
  const { themeMode, themeDirection } = useSettings();

  // kiểm tra có phải mode light hay không
  const isLight = themeMode === "light";

  /**
   * useMemo được sử dụng để memorizes value output của fuction truyền vào và chỉ cập nhật giá trị khi 
   * dependency thay dổi
   * useMemo nhận vào 2 tham số là (function , [])
   * useMemo sẽ cập nhật lại themeOptions khi mà 2 dependency là isLight và themeDirection thay đổi
   * themeOptions xacs đinh các thuôc tính dựa trên mode của theme
   */
  const themeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 4 },
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  );


  //  tạo theme cho trang web
  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  console.log(theme)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
