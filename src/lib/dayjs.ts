import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

import "dayjs/locale/ja";
import "./dayjs-ain-kana";
import "./dayjs-ain-latn";

export default dayjs;
export { Dayjs } from "dayjs";
