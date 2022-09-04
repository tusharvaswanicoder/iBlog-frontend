const messageSentTime = (unixTimeStamp) => {
    const today = new Date();
    if (
        today.getDate() === unixTimeStamp.getDate() &&
        today.getMonth() === unixTimeStamp.getMonth() &&
        today.getFullYear() === unixTimeStamp.getFullYear()
    ) {
        const [hours, minutes] = formatTime(unixTimeStamp);
        return `Today at ${hours}:${minutes} ${
            unixTimeStamp.getHours() > 11 ? "PM" : "AM"
        }`;
    } else if (
        today.getDate() - 1 === unixTimeStamp.getDate() &&
        today.getMonth() === unixTimeStamp.getMonth() &&
        today.getFullYear() === unixTimeStamp.getFullYear()
    ) {
        const [hours, minutes] = formatTime(unixTimeStamp);
        return `Yesterday at ${hours}:${minutes} ${
            unixTimeStamp.getHours() > 11 ? "PM" : "AM"
        }`;
    } else {
        const date = unixTimeStamp.getDate();
        const month = unixTimeStamp.getMonth();
        const year = unixTimeStamp.getFullYear();
        return `${date < 10 ? `0${date}` : date}/${
            month < 10 ? `0${month}` : month
        }/${year}`;
    }
};

const formatTime = (unixTimeStamp) => {
    const unixHours = unixTimeStamp.getHours();
    const unixMinutes = unixTimeStamp.getMinutes();
    const formattedHours = unixHours > 12 ? unixHours - 12 : unixHours;
    const formattedMinutes = unixMinutes < 10 ? `0${unixMinutes}` : unixMinutes;
    return [formattedHours, formattedMinutes];
};

export default messageSentTime;
