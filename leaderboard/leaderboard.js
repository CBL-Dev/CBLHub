let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.responseText).feed.entry;

    let i;
    for (i = 0; i < data.length; i++) {
      let rank = data[i]["gsx$_cn6ca"]["$t"];
      let name = data[i]["gsx$_cokwr"]["$t"];
      let points = data[i]["gsx$_cpzh4"]["$t"];

      document.getElementById("leaderboard").innerHTML +=
        "<tr>" +
        "<td>" +
        rank +
        "</td>" +
        "<td>" +
        name +
        "</td>" +
        "<td>" +
        points +
        "</td>" +
        "</tr>";
    }
  }
};

xmlhttp.open(
  "GET",
  "https://spreadsheets.google.com/feeds/list/11cdM0SXEJ6gwSj4oJFREOsYizoNVFtBsCzLVjwTDdHc/od6/public/values?alt=json",
  true
);
xmlhttp.send();