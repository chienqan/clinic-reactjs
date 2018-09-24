import moment from "moment";

export default function getCurrentDateTime() {
    return moment().format("MM/DD/YYYY h:m A");
}
