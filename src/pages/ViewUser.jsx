import {
    Box,
    Flex,
    Image,
    SkeletonCircle,
    SkeletonText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blog from "../components/Blog";

const ViewUser = () => {
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([1, 2, 3, 4, 5, 6]);
    const [userDetails, setUserDetails] = useState();
    useEffect(() => {
        (async () => {
            let resp = await fetch(
                `${process.env.REACT_APP_API_URL}blogs/user/${userId}`
            );
            let data = await resp.json();
            setBlogs(data);
            setLoading(false);
            resp = await fetch(
                `${process.env.REACT_APP_API_URL}users/${userId}`
            );
            data = await resp.json();
            setUserDetails(data);
        })();
    }, []);
    console.log(userDetails);
    return (
        <Box position="relative" pt="80px">
            <Box
                w="100%"
                h="150px"
                bg="#DD6B20"
                position="absolute"
                top="0px"
                zIndex="-1"
            />
            <Box
                borderRadius="4px"
                bg="#fff"
                maxWidth="800px"
                margin="auto"
                boxShadow="0 0 0 1px rgba(23, 23, 23, 0.1)"
                position="relative"
                p="85px 25px 25px"
            >
                {userDetails ? (
                    <Box
                        top="-60px"
                        left="50%"
                        transform="translateX(-50%)"
                        position="absolute"
                        boxSize="150px"
                        borderRadius="50%"
                        border="10px solid #DD6B20"
                        background={`url(${userDetails.profilePic})`}
                        backgroundSize="cover"
                    />
                ) : (
                    <SkeletonCircle
                        top="-60px"
                        left="50%"
                        transform="translateX(-50%)"
                        position="absolute"
                        size="150px"
                        border="10px solid #DD6B20"
                    />
                )}
                <Box mt="30px" textAlign="center">
                    {userDetails ? (
                        <>
                            <Box fontSize="30px" fontWeight={700}>
                                {userDetails.name}
                            </Box>
                            <Box mt="5px">{userDetails.desc}</Box>
                        </>
                    ) : (
                        <SkeletonText />
                    )}
                </Box>
            </Box>
            <Flex mt="25px" justifyContent="center" flexWrap="wrap" gap="20px">
                {blogs.map((blog, index) => (
                    <Blog key={index} showSkeleton={loading} data={blog} />
                ))}
            </Flex>
        </Box>
    );
};

export default ViewUser;
