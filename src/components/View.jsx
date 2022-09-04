import {
    Box,
    Flex,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AiFillLike, AiOutlineShareAlt } from "react-icons/ai";
import { AuthContext } from "../authContext.js";
import parse from "html-react-parser";

const View = ({ blogId }) => {
    const [loading, setLoading] = useState(true);
    const [blogData, setBlogData] = useState();
    const [userDetails] = useContext(AuthContext);
    const likeDislike = async () => {
        const resp = await fetch(
            `${process.env.REACT_APP_API_URL}blogs/vote/${blogId}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "authToken"
                    )}`,
                },
            }
        );
        if (resp.status === 200) {
            setBlogData((blogData) => ({
                ...blogData,
                userLiked: !blogData.userLiked,
                likes: blogData.userLiked
                    ? blogData.likes - 1
                    : blogData.likes + 1,
            }));
        }
    };
    useEffect(() => {
        (async () => {
            const resp = await fetch(
                `${process.env.REACT_APP_API_URL}blogs/${blogId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "authToken"
                        )}`,
                    },
                }
            );
            const data = await resp.json();
            setBlogData(data);
            setLoading(false);
        })();
    }, []);
    return (
        <Box>
            {blogData && (
                <Flex
                    justifyContent="center"
                    borderRadius="25px"
                    p="15px 40px"
                    fontSize="25px"
                    gap="20px"
                    pos="fixed"
                    bottom="40px"
                    left="50%"
                    transform="translateX(-50%)"
                    boxShadow="10px 10px 51px 0px rgba(0,0,0,0.75)"
                >
                    <Flex
                        gap="2px"
                        cursor={userDetails ? "pointer" : "not-allowed"}
                        onClick={() => {
                            userDetails && likeDislike();
                        }}
                    >
                        <AiFillLike
                            color={blogData.userLiked ? "#dd6b20" : "inherit"}
                        />
                        <Box fontSize="18px">{blogData.likes}</Box>
                    </Flex>
                    <AiOutlineShareAlt cursor="pointer" />
                </Flex>
            )}
            {loading ? (
                <Skeleton h="400px" />
            ) : (
                <Box
                    h="400px"
                    backgroundPosition="center"
                    background={`url('${blogData.bannerImage}')`}
                    backgroundSize="cover"
                />
            )}
            <Box m="40px auto" maxW="1200px" px="30px">
                <Flex gap="15px" alignItems="center">
                    {loading ? (
                        <SkeletonCircle size="50px" />
                    ) : (
                        <Box
                            borderRadius="50%"
                            boxSize="50px"
                            background={`url('${blogData.user.profilePic}')`}
                            backgroundPosition="center"
                            backgroundSize="cover"
                        />
                    )}
                    {loading ? (
                        <SkeletonText noOfLines={2} width="200px" />
                    ) : (
                        <Box flex={1}>
                            <Box fontWeight={500}>{blogData.user.name}</Box>
                            <Box fontSize="14px">Sep 3</Box>
                        </Box>
                    )}
                </Flex>
                {loading ? (
                    <SkeletonText noOfLines={1} width="100%" />
                ) : (
                    <Box
                        my="30px"
                        fontSize="50px"
                        fontWeight={700}
                        lineHeight="60px"
                    >
                        {blogData.title}
                    </Box>
                )}
                {loading ? (
                    <SkeletonText noOfLines={5} width="100%" />
                ) : (
                    <Box>{parse(blogData.content)}</Box>
                )}
            </Box>
        </Box>
    );
};

export default View;
