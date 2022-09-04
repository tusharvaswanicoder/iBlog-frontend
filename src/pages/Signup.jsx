import {
    Box,
    Button,
    Input,
    Textarea,
    useToast,
    VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillMail } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [viewPassword, setViewPassword] = useState(false);
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [desc, setDesc] = useState();
    const [profilePic, setProfilePic] = useState();
    const [password, setPassword] = useState();
    const [formError, setFormError] = useState();
    const toast = useToast();
    const navigate = useNavigate();
    const validateEmail = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    };
    const handleSignup = async () => {
        setFormError("");
        if (
            validateEmail() &&
            desc &&
            name &&
            profilePic.type.includes("image")
        ) {
            const fd = new FormData();
            const profilePicReader = new FileReader();
            profilePicReader.readAsArrayBuffer(profilePic);
            await new Promise((resolve) => {
                profilePicReader.addEventListener("loadend", (e) => resolve());
            });
            fd.append(
                "profilePic",
                new Blob([new Uint8Array(profilePicReader.result).buffer]),
                profilePic.name
            );
            fd.append("name", name);
            fd.append("desc", desc);
            fd.append("email", email);
            fd.append("password", password);
            const resp = await fetch(
                `${process.env.REACT_APP_API_URL}users/register`,
                {
                    method: "POST",
                    body: fd,
                }
            );
            const data = await resp.json();
            if (resp.status !== 200) {
                setFormError(data.message);
                return;
            }
            toast({
                title: "Account created.",
                description: "You can now login.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            navigate("/login");
        } else {
            let msg;
            if (!validateEmail()) msg = "Enter valid email";
            else if (!desc) msg = "Description can't be empty";
            else if (!name) msg = "Name can't be empty";
            else if (profilePic.type.includes("images"))
                msg = "Please upload a valid image file";
            setFormError(msg);
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
                Signup
            </Box>
            <VStack spacing="20px" mb="25px">
                <input
                    flex="1"
                    size="lg"
                    type="file"
                    onChange={({ target }) => {
                        const { files } = target;
                        if (files[0].type.startsWith("image/")) {
                            setProfilePic(files[0]);
                            return;
                        }
                        setFormError("Please upload a image file!");
                    }}
                />
                <Box w="100%" position="relative">
                    <Input
                        size="lg"
                        type="text"
                        pl="45px"
                        placeholder="Enter your name..."
                        _focusVisible={{ borderColor: "#DD6B20" }}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Box
                        position="absolute"
                        top="50%"
                        left="10px"
                        transform="translateY(-50%)"
                    >
                        <BiRename color="#DD6B20" fontSize="25px" />
                    </Box>
                </Box>
                <Textarea
                    size="lg"
                    placeholder="Enter your description..."
                    _focusVisible={{ borderColor: "#DD6B20" }}
                    onChange={(e) => setDesc(e.target.value)}
                />
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
            <Button onClick={handleSignup} w="100%" colorScheme="orange">
                Signup
            </Button>
        </Box>
    );
};

export default Signup;
