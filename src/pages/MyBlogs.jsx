import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    StackDivider,
    VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import DatalistInput from "react-datalist-input";
import { BiSearch } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import Blog from "../components/Blog";
// import "react-datalist-input/dist/styles.css";
import ReactSearchBox from "react-search-box";

const MyBlogs = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [key, setKey] = useState("");
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([1, 2, 3, 4, 5, 6]);
    const getRecommendations = async () => {
        const resp = await fetch(
            `${process.env.REACT_APP_API_URL}blogs/search?filter=${filter}&query=${key}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "authToken"
                    )}`,
                },
            }
        );
        const data = await resp.json();
        setRecommendations(data.map((recommendation) => recommendation.title));
    };
    const isKeyValid = () => {
        let valid = false;
        for (let recommendation of recommendations) {
            if (recommendation === key) {
                valid = true;
                break;
            }
        }
        return valid;
    };
    const getBlogs = async () => {
        setLoading(true);
        const resp = await fetch(
            `${process.env.REACT_APP_API_URL}blogs/search?filter=${filter}${
                key ? `&key=${key}` : ""
            }`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "authToken"
                    )}`,
                },
            }
        );
        const data = await resp.json();
        setBlogs(data);
        setLoading(false);
    };
    const searchText = () => {
        let timer;
        return ({ target }) => {
            setKey(target.value);
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                getRecommendations();
            }, 300);
        };
    };
    useEffect(() => {
        getBlogs();
    }, [filter]);
    return (
        <Box>
            <Flex gap="20px" className="blogs-search">
                <Select
                    variant="outline"
                    _focusVisible={{ borderColor: "#DD6B20" }}
                    w="200px"
                    onChange={({ target }) =>
                        setFilter(target.options[target.selectedIndex].value)
                    }
                >
                    <option value="all">All</option>
                    <option value="mostpopular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </Select>
                <Box width="100%" position="relative">
                    <Input
                        list="blogs"
                        name="blog"
                        id="blog"
                        onChange={searchText()}
                        placeholder="Search Blogs"
                        _focusVisible={{ borderColor: "#DD6B20" }}
                        value={key}
                    />
                    <datalist id="blogs">
                        {recommendations.map((recommendation, index) => (
                            <option
                                key={index}
                                value={recommendation}
                                onClick={() => setKey(recommendation)}
                            />
                        ))}
                    </datalist>
                </Box>
                <Button
                    onClick={getBlogs}
                    colorScheme="orange"
                    disabled={!isKeyValid()}
                >
                    <FiSearch />
                </Button>
            </Flex>
            <Flex mt="25px" flexWrap="wrap" gap="20px">
                {blogs.map((blog, index) => (
                    <Blog key={index} showSkeleton={loading} data={blog} />
                ))}
            </Flex>
        </Box>
    );
};

export default MyBlogs;
