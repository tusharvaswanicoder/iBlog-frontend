import { Box, Button, Flex, StackDivider, VStack } from "@chakra-ui/react";
import React from "react";
import { GrFormAdd } from "react-icons/gr";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SideBar = () => {
    const sideBarLinks = [
        {
            to: "/",
            icon: <AiFillHome />,
            text: "Home",
        },
        {
            to: "/myblogs",
            icon: <FaUser />,
            text: "My Blogs",
        },
    ];
    return (
        <VStack
            className="sidebar"
            borderRight="1px solid #e2e8f0"
            divider={<StackDivider />}
            spacing="30px"
            w="250px"
            h="100%"
            p="20px"
        >
            <Box>
                <NavLink to="/dashboard/create">
                    <Button borderRadius="25px" leftIcon={<GrFormAdd />}>
                        Create Blog
                    </Button>
                </NavLink>
            </Box>
            <VStack alignItems="flex-start" spacing="30px">
                {sideBarLinks.map(({ to, icon, text }, index) => (
                    <NavLink
                        key={index}
                        to={`/dashboard${to}`}
                        style={({ isActive }) =>
                            isActive ? { color: "#DD6B20" } : {}
                        }
                    >
                        <Flex alignItems="center" gap="25px" fontSize="35px">
                            {icon}
                            <Box fontWeight={500} fontSize="20px">
                                {text}
                            </Box>
                        </Flex>
                    </NavLink>
                ))}
            </VStack>
        </VStack>
    );
};

export default SideBar;
