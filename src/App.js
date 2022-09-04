import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./authContext";
import DashboardLayout from "./components/DashboardLayout";
import Header from "./components/Header";
import CreateBlog from "./pages/CreateBlog";
import DashboardHome from "./pages/DashboardHome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyBlogs from "./pages/MyBlogs";
import ViewBlog from "./pages/ViewBlog";
import ViewUser from "./pages/ViewUser";

function App() {
    return (
        <Box>
            <AuthContextProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/user/:userId" element={<ViewUser />} />
                    <Route path="/blog/:blogId" element={<ViewBlog />} />
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<DashboardHome />} />
                        <Route path="create" element={<CreateBlog />} />
                        <Route path="myblogs" element={<MyBlogs />} />
                        <Route path="view/:blogId" element={<ViewBlog />} />
                    </Route>
                </Routes>
            </AuthContextProvider>
        </Box>
    );
}

export default App;
