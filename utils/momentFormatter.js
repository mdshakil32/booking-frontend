import moment from "moment";

export function getOnlyDay(date) {
  return moment(date).format("ddd");
}

export function getFullDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

export function dateWithTime(date) {
  return moment(date).format("DD MMM YYYY, hh:mm A");
}
