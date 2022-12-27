import moment from 'moment'
// import { DATETIMEFORMAT } from "../../../contants";

const DateColumn = ({ data }) => {
  if (data) {
    return moment(data).format('DD-MM-YYYY')
  }
  return false
};

export default DateColumn;
