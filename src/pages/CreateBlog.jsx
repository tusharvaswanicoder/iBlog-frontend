import { Box, Button, Input, useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import RTE from "../components/RTE";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const [bannerImage, setBannerImage] = useState();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    const createBlog = async () => {
        if (!title || !content || !bannerImage) {
            toast({
                title: "Error in creating blog.",
                description: "Please enter correct details.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        const fd = new FormData();
        fd.append("title", title);
        fd.append("content", content);
        const bannerImageReader = new FileReader();
        bannerImageReader.readAsArrayBuffer(bannerImage);
        await new Promise((resolve) => {
            bannerImageReader.addEventListener("loadend", (e) => resolve());
        });
        fd.append(
            "bannerImage",
            new Blob([new Uint8Array(bannerImageReader.result).buffer]),
            bannerImage.name
        );
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}blogs/create/`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "authToken"
                    )}`,
                },
                body: fd,
            }
        );
        if (res.status === 200) {
            toast({
                title: "Blog has been successfully created.",
                description: "You can view it now.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            navigate("/dashboard/myblogs/");
        }
    };
    return (
        <Box
            p="20px"
            borderRadius="10px"
            boxShadow="0 0 0 1px rgba(23, 23, 23, 0.1)"
        >
            <Box mb="20px">Add a cover image</Box>
            <input
                type="file"
                onChange={({ target }) => {
                    setBannerImage(target.files[0]);
                }}
            />
            <Input
                border="none"
                m="40px 0px"
                height="auto"
                fontSize={["20px", "30px", "45px"]}
                fontWeight={600}
                placeholder="Enter blog title here..."
                onChange={({ target }) => setTitle(target.value)}
                _focusVisible={{ border: "none" }}
            />
            <RTE setContent={setContent} />
            <Button mt="20px" colorScheme="orange" onClick={createBlog}>
                Create Blog
            </Button>
        </Box>
    );
};

export default CreateBlog;
