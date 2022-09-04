import { Box, Button, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useContext } from "react";
import { AiFillMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { AuthTokenDispatchContext } from "../authContext";

const Login = () => {
    const setAuthToken = useContext(AuthTokenDispatchContext);
    const [viewPassword, setViewPassword] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [formError, setFormError] = useState();
    const validateEmail = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    };
    const handleLogin = async () => {
        setFormError("");
        if (validateEmail()) {
            const resp = await fetch(
                `${process.env.REACT_APP_API_URL}users/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                }
            );
            const data = await resp.json();
            if (resp.status !== 200) {
                setFormError(data.message);
                return;
            }
            setAuthToken(data.token);
        } else {
            setFormError("Enter valid email!");
        }
    };
    return (
        <Box
            boxShadow="rgb(4 80 213 / 10%) 0px 8px 20px 0px"
            borderRadius="20px"
            maxW="500px"
            margin="auto"
            p="30px"
        >
            <Box fontSize="25px" fontWeight={600} mb="20px">
                Login
            </Box>
            <VStack spacing="20px" mb="25px">
                <Box w="100%" position="relative">
                    <Input
                        size="lg"
                        type="email"
                        pl="45px"
                        placeholder="Enter your email address..."
                        _focusVisible={{ borderColor: "#DD6B20" }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Box
                        position="absolute"
                        top="50%"
                        left="10px"
                        transform="translateY(-50%)"
                    >
                        <AiFillMail color="#DD6B20" fontSize="25px" />
                    </Box>
                </Box>
                <Box w="100%" position="relative">
                    <Input
                        size="lg"
                        type={viewPassword ? "text" : "password"}
                        pl="45px"
                        pr="100px"
                        placeholder="Enter your password..."
                        _focusVisible={{ borderColor: "#DD6B20" }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Box
                        position="absolute"
                        top="50%"
                        left="10px"
                        transform="translateY(-50%)"
                    >
                        <RiLockPasswordFill color="#DD6B20" fontSize="25px" />
                    </Box>
                    <Button
                        h="35px"
                        pos="absolute"
                        right="10px"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={() => setViewPassword(!viewPassword)}
                    >
                        {viewPassword ? "Hide" : "Show"}
                    </Button>
                </Box>
            </VStack>
            {formError && (
                <Box color="red" mb="25px">
                    {formError}
                </Box>
            )}
            <Button onClick={handleLogin} w="100%" colorScheme="orange">
                Login
            </Button>
        </Box>
    );
};

export default Login;
