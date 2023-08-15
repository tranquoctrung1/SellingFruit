export const convertDateToString = (time) => {
    if (time !== null && time !== undefined && time.toString().trim() !== '') {
        let date = new Date(time);
        date.setHours(date.getHours() - 7);
        let year = date.getFullYear();
        let month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
        let hours =
            date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
        let minute =
            date.getMinutes() >= 10
                ? date.getMinutes()
                : `0${date.getMinutes()}`;
        let second =
            date.getSeconds() >= 10
                ? date.getSeconds()
                : `0${date.getSeconds()}`;

        return `${day}/${month}/${year} ${hours}:${minute}:${second}`;
    }
    return '';
};

export const formatNumberOrder = (number) => {
    return number.padStart(6, '0');
};
