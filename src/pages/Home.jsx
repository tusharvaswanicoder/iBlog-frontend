import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

const Home = () => {
    return (
        <Box textAlign="center">
            <Box maxW="800px" m="40px auto">
                <Box fontWeight={800} fontSize="60px" lineHeight="70px">
                    Share Your Knowledge With Whole World
                </Box>
                <Box m="25px 0px" fontWeight={500} fontSize="25px">
                    Create A Unique Blog Today
                </Box>
                <Button colorScheme="orange">Create Your Blog</Button>
            </Box>
            <Player
                autoplay
                loop
                src="https://assets3.lottiefiles.com/packages/lf20_qmu1ctr2.json"
                style={{ width: "600px" }}
            />
        </Box>
    );
};

export default Home;
