import React, { useEffect, useState } from "react";
import View from "../components/View";
import { useParams } from "react-router-dom";

const ViewBlog = () => {
    const { blogId } = useParams();

    return <View blogId={blogId} />;
};

export default ViewBlog;
