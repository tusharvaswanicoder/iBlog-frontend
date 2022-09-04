import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const DashboardLayout = () => {
    return (
        <Flex h="calc(100vh - 90px)">
            <SideBar />
            <Box p="25px" maxH="clac(100vh - 90px)" flex={1} overflowY="auto">
                <Outlet />
            </Box>
        </Flex>
    );
};

export default DashboardLayout;
