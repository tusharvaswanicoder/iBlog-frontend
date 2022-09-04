import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Image,
    Spacer,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext, AuthTokenDispatchContext } from "../authContext";
import SideBar from "./SideBar";
import Logo from "../logo.png";

const Header = () => {
    const navigate = useNavigate();
    const [user, loading] = useContext(AuthContext);
    const setAuthToken = useContext(AuthTokenDispatchContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay onClick={onClose} />
                <DrawerContent>
                    <DrawerBody>
                        <SideBar />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Flex
                maxW="1500px"
                m="auto"
                p={["15px 20px", "20px 40px"]}
                alignItems="center"
            >
                <Flex alignItems="center" gap="20px">
                    {user && (
                        <Box
                            onClick={onOpen}
                            className="sidebar-drawer-button"
                            cursor="pointer"
                        >
                            <AiOutlineMenuUnfold fontSize="25px" />
                        </Box>
                    )}
                    <NavLink to="/dashboard">
                        <Image src={Logo} w="100px" />
                    </NavLink>
                </Flex>
                <Spacer />
                <Flex alignItems="center" gap="20px">
                    {user && (
                        <Box
                            boxSize="50px"
                            bg={`url('${user.profilePic}')`}
                            bgSize="cover"
                            bgPosition="center"
                            borderRadius="50%"
                        />
                    )}
                    <Button
                        isLoading={loading}
                        cursor="pointer"
                        onClick={() =>
                            user ? setAuthToken(null) : navigate("/login")
                        }
                    >
                        {user ? "Sign out" : "Sign In"}
                    </Button>
                    {!loading && !user && (
                        <NavLink to="/signup">
                            <Button cursor="pointer">Signup</Button>
                        </NavLink>
                    )}
                </Flex>
            </Flex>
        </>
    );
};

export default Header;
