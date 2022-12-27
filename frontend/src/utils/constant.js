export const BASEURL = "http://localhost:8000/api/v1";
export const DATETIMEFORMAT = "DD/MM/YYYY hh:mm a";
export const DATEFORMAT = "DD/MM/YYYY";
export const SESSION_OPTIONS = [
    {
      title: "2020-21",
      value: "21",
    },
    {
        title: "2021-22",
        value: "22",
    },
    {
        title: "2022-23",
        value: "23",
    },
    {
      title: "2023-24",
      value: "24",
    }
]
export const SESSION_DEFAULT_OPTIONS = SESSION_OPTIONS[1]['value'];
export const CLASS_OPTIONS = [1,2,3,4,5,6,7,8,9,10];
export const CLASS_DEFAULT_OPTION = CLASS_OPTIONS[6];
export const SECTION_OPTIONS = ['A', 'B', 'C', 'D', 'E']
export const SECTION_DEFAULT_OPTION = SECTION_OPTIONS[1];
export const TERM_OPTIONS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
export const TERM_DEFAULT_OPTION = TERM_OPTIONS[4];
export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const mobileRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;