import Header from "./components/Header/Header";
import { useCallback, useEffect, useState } from "react";
import { ConfigProvider, message } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import HomePage from "./pages/HomePage/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import NewPasswordPage from "./pages/NewPasswordPage/NewPasswordPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { AuthProvider } from "./context/AuthContext";
import IsAdmin from "./Routes/IsAdmin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminLayout from "./config/AdminLayout/AdminLayout";
import AllUsersList from "./adminComponents/AllUsers/AllUsersList";
import AllProductsList from "./adminComponents/AllProducts/AllProductsList";
import AllCategoriesList from "./adminComponents/AllCategories/AllCategoriesList";
import AllOrdersList from "./adminComponents/AllOrders/AllOrdersList";
import AddCategory from "./adminComponents/AllCategories/AddCategory";
import AddProduct from "./adminComponents/AllProducts/AddProduct";

function App() {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme && storedTheme !== theme) {
      setTheme(storedTheme);
    } else if (!storedTheme) {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }, []);

  const changeTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    message.loading({
      content: `Switching to ${newTheme} mode...`,
      key: "theme",
    });
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setTimeout(() => {
      message.success({
        content: `Switched to ${newTheme} mode`,
        key: "theme",
        duration: 2,
      });
    }, 800);
  }, [theme]);

  const themeConfig = {
    light: {
      token: {
        colorLink: "#777373",
        colorTextSecondary: "#000000c0",
        colorBorder: "#4e2727",
        colorBorderSecondary: "#aa9999d8",
        wireframe: false,
        colorPrimaryBgHover: "#8e9295",
        colorBgElevated: "#d2d2d238",
        colorPrimaryBg: "#cbd9e4",
        colorPrimaryHover: "#722ed1",
        colorPrimary: "#8e4ee9",
        colorInfo: "#8e4ee9",
        colorBgBase: "#ffffff67",
        fontSize: 16,
      },
      components: {
        Button: {
          algorithm: true,
          colorPrimaryHover: "rgb(114, 37, 223)",
          defaultBorderColor: "rgb(60, 66, 66)",
          borderColorDisabled: "rgb(60, 66, 66)",
          defaultColor: "#722ED1",
          paddingInline: 24,
          controlHeight: 45,
          paddingBlock: 10,
        },
        Divider: {
          fontFamily: "roboto",
        },
        Anchor: {
          colorPrimary: "rgb(0, 0, 0)",
        },
        Breadcrumb: {
          itemColor: "rgb(0, 0, 0)",
          lastItemColor: "rgb(0, 0, 0)",
          linkHoverColor: "rgb(0, 0, 0)",
          colorText: "rgb(0, 0, 0)",
          linkColor: "rgba(0, 0, 0, 0.6)",
        },
      },
      algorithm: [],
    },
    dark: {
      token: {
        colorBorder: "#4e2727",
        colorBorderSecondary: "#000000d8",
        wireframe: false,
        colorPrimaryBgHover: "#8e9295",
        colorPrimaryBg: "#cbd9e4",
        colorPrimaryHover: "#722ed1",
        fontSize: 16,
        colorPrimary: "#8e4ee9",
        colorInfo: "#8e4ee9",
        colorBgSpotlight: "#201d1d",
        colorBgElevated: "#00000098",
      },
      components: {
        Button: {
          defaultBorderColor: "rgb(60, 66, 66)",
          borderColorDisabled: "rgb(60, 66, 66)",
          colorBgContainer: "rgba(179, 175, 175, 0.53)",
          colorTextLightSolid: "rgb(255, 255, 255)",
          colorText: "rgb(0, 0, 0)",
          defaultBg: "rgb(0, 0, 0)",
          defaultColor: "rgb(255, 255, 255)",
          defaultActiveBorderColor: "rgba(0, 0, 0, 0.6)",
          defaultHoverBg: "rgb(255, 255, 255)",
          defaultHoverBorderColor: "rgba(0, 0, 0, 0.59)",
          defaultHoverColor: "rgb(0, 0, 0)",
          paddingInline: 24,
          controlHeight: 45,
          paddingBlock: 10,
        },
        Divider: {
          fontFamily: "roboto",
        },
        Anchor: {
          colorPrimary: "rgb(0, 0, 0)",
        },
        Breadcrumb: {
          itemColor: "rgb(0, 0, 0)",
          lastItemColor: "rgb(0, 0, 0)",
          linkHoverColor: "rgb(0, 0, 0)",
          colorText: "rgb(0, 0, 0)",
          linkColor: "rgba(0, 0, 0, 0.6)",
        },
        Select: {
          optionActiveBg: "rgba(0, 0, 0, 0.58)",
          optionSelectedBg: "rgb(255, 255, 255)",
          colorBgElevated: "rgba(0, 0, 0, 0.8)",
          selectorBg: "rgb(0, 0, 0)",
          colorText: "rgb(255, 255, 255)",
          optionSelectedColor: "rgb(0, 0, 0)",
          colorTextPlaceholder: "rgb(255, 255, 255)",
          colorTextQuaternary: "rgb(255, 255, 255)",
        },
      },
    },
  };

  return (
    <div>
      <ConfigProvider theme={themeConfig[theme]}>
        <Router>
          <AuthProvider>
            <Header changeTheme={changeTheme} />
            <Routes>
              <Route
                path="/"
                element={<HomePage changeTheme={changeTheme} />}
              />
              <Route
                path="/sign-up"
                element={<SignUpPage changeTheme={changeTheme} />}
              />
              <Route
                path="/sign-in"
                element={<SignInPage changeTheme={changeTheme} />}
              />
              <Route
                path="/forgot-password"
                element={<ForgotPasswordPage changeTheme={changeTheme} />}
              />
              <Route
                path="/new-password"
                element={<NewPasswordPage changeTheme={changeTheme} />}
              />

              {/* Private Routes */}

              <Route
                path="/dashboard"
                element={<AdminLayout changeTheme={changeTheme} />}
              >
                <Route
                  index
                  element={<AdminDashboard changeTheme={changeTheme} />}
                />
                <Route
                  path="orders-list"
                  element={<AllOrdersList changeTheme={changeTheme} />}
                />
                <Route
                  path="all-users-list"
                  element={<AllUsersList changeTheme={changeTheme} />}
                />
                <Route
                  path="products/products-list"
                  element={<AllProductsList changeTheme={changeTheme} />}
                />
                <Route
                  path="products/add-product"
                  element={<AddProduct changeTheme={changeTheme} />}
                />
                <Route
                  path="categories/categories-list"
                  element={<AllCategoriesList changeTheme={changeTheme} />}
                />
                <Route
                  path="categories/add-category"
                  element={<AddCategory changeTheme={changeTheme} />}
                />
              </Route>

              {/* Page Not Found */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AuthProvider>
        </Router>
      </ConfigProvider>
    </div>
  );
}

export default App;
