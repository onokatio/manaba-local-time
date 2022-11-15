// ==UserScript==
// @name        manaba local time
// @namespace   Violentmonkey Scripts
// @match       https://manaba.tsukuba.ac.jp/ct/home_library_query
// @grant       none
// @version     1.0
// @author      onokatio
// @description 2022/11/13 21:37:47
// @require https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.6/dayjs.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.6/plugin/customParseFormat.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.6/plugin/utc.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.6/plugin/timezone.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.6/plugin/advancedFormat.min.js
// ==/UserScript==

dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);
dayjs.extend(window.dayjs_plugin_advancedFormat);

let manaba_format = "YYYY-MM-DD HH:mm";

document.querySelector(".contentbody-l").style.width = "100%";
document.querySelectorAll("table.stdlist > tbody > tr> td:nth-of-type(5)").forEach(updateDueDate);
document.querySelectorAll("table.stdlist > tbody > tr> td:nth-of-type(4)").forEach(updateDueDate);

function updateDueDate(e){
  if (e.innerText == "") { return };
  let due_date = dayjs.tz(e.innerText, manaba_format, "Asia/Tokyo");
  let jst_text = due_date.format(manaba_format);
  let local_text = due_date.tz(dayjs.tz.guess()).format(manaba_format + " z");
  e.innerHTML = "<ul><li>" + jst_text + " JST</li><li>" + local_text + "</li></ul>";
  e.style.textAlign = "start";
}
