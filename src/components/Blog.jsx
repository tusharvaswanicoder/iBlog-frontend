import {
    Box,
    Flex,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Skeleton,
    SkeletonCircle,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import messageSentTime from "../utils/messageSentTime";
import { FaTwitter, FaFacebook, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { ShareButtonRectangle, ShareBlockStandard } from "react-custom-share";

const Blog = ({ showSkeleton, data }) => {
    const shareBlockProps = {
        url: "",
        button: ShareButtonRectangle,
        buttons: [
            { network: "Twitter", icon: FaTwitter },
            { network: "Facebook", icon: FaFacebook },
            { network: "Email", icon: FaEnvelope },
            { network: "Linkedin", icon: FaLinkedin },
        ],
        text: `Read it once!`,
        longtext: `Take a look at this super blog that I have just found.`,
    };
    return (
        <Box
            p="20px"
            maxW="700px"
            w="100%"
            flexShrink={0}
            borderRadius="10px"
            boxShadow="0 0 0 1px rgba(23, 23, 23, 0.1)"
        >
            <Flex gap="15px" alignItems="center">
                {showSkeleton ? (
                    <SkeletonCircle size="50px" />
                ) : (
                    <Box
                        borderRadius="50%"
                        boxSize="50px"
                        background={`url('${data.user.profilePic}')`}
                        backgroundPosition="center"
                        backgroundSize="cover"
                    />
                )}
                <Box flex={1}>
                    {showSkeleton ? (
                        <Skeleton height="16px" mb="10px" />
                    ) : (
                        <Box fontWeight={500}>{data.user.name}</Box>
                    )}
                    {showSkeleton ? (
                        <Skeleton height="14px" />
                    ) : (
                        <Box fontSize="14px">
                            {messageSentTime(new Date(data.createdAt))}
                        </Box>
                    )}
                </Box>
            </Flex>
            <Box pl="65px" mt="10px">
                {showSkeleton ? (
                    <Skeleton height="24px" />
                ) : (
                    <NavLink to={`/blog/${data._id}`}>
                        <Box fontSize="24px" fontWeight="500">
                            {data.title}
                        </Box>
                    </NavLink>
                )}

                <Box mt="20px" position="relative">
                    {/* <Popover>
                        <PopoverTrigger>
                            <Box>
                                <AiOutlineShareAlt
                                    cursor={
                                        showSkeleton ? "default" : "pointer"
                                    }
                                />
                            </Box>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Share With World!</PopoverHeader>
                            <PopoverBody>
                                <Flex gap="10px">
                                    <ShareBlockStandard {...shareBlockProps} />
                                </Flex>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover> */}
                </Box>
            </Box>
        </Box>
    );
};

export default Blog;
