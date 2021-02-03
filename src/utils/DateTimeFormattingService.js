import Vue from "vue";
import moment from "moment";

Vue.filter("formatVideoDuration", function(value) {
  try {
    if (!value) return "";
    if (!value.includes("T")) return "LIVE";
    let timeInput = value.substring(2, value.length);
    let time = "";
    const hours_time = timeInput.split("H");
    let minutes_seconds;
    if (hours_time.length > 1) {
      time += hours_time[0] + ":";
      minutes_seconds = hours_time[1].split("M");
    } else {
      minutes_seconds = hours_time[0].split("M");
    }
    const minutes = minutes_seconds[0];
    const seconds = minutes_seconds[1].substring(
      0,
      minutes_seconds[1].length - 1
    );
    minutes.length === 1 ? (time += "0" + minutes) : (time += minutes);
    time += ":";
    seconds.length === 1 ? (time += "0" + seconds) : (time += seconds);
    return time;
  } catch (e) {
    return value;
  }
});

Vue.filter("formatUploadDate", function(value) {
  if (!value) return "";
  return moment(value.toString()).format("DD/MM/YYYY");
});
