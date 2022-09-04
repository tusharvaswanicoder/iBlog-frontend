import { Box, Button, Flex, Image, Spacer } from "@chakra-ui/react";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext, AuthTokenDispatchContext } from "../authContext";

const Header = () => {
    const navigate = useNavigate();
    const [user, loading] = useContext(AuthContext);
    const setAuthToken = useContext(AuthTokenDispatchContext);
    return (
        <Flex maxW="1500px" m="auto" p="20px 40px" alignItems="center">
            <NavLink to="/dashboard">
                <Flex alignItems="center" gap="20px">
                    <Image src="https://www.blogger.com/img/logo_blogger_40px.png" />
                    <Box fontWeight={700}>iBlog</Box>
                </Flex>
            </NavLink>
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
    );
};

export default Header;
