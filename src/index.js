import "./style.css";
import { fetchData } from "./api/index";
import { removeNode, createElement } from "./common/utils";

const url = "https://swapi.dev/api/people";
let dropdown = document.getElementById("charList");
const charData = [];

async function getData() {
  let option = createElement("option");
  option.text = "Loading...";
  dropdown.appendChild(option);
  const data = await fetchData(url);
  dropdown.remove(0);
  charData.push(...data.results);
  option.text = "Please select";
  dropdown.appendChild(option);
  data.results.forEach((item) => {
    let option = createElement("option");
    option.text = item.name;
    dropdown.appendChild(option);
  });
}

document.getElementById("charList").addEventListener("change", function () {
  removeNode("data_table");
  removeNode("line_break");
  let value = charData.find((o) => o.name === this.value);
  if (value) callVehicles(value);
});

const callVehicles = async (data) => {
  let vehicle = data?.vehicles[0] || null;
  let film = data?.films[0] || null;
  let vehicleName = "";
  let filmName = "";
  if (vehicle) {
    const data = await fetchData(vehicle);
    vehicleName = data.title;
  }
  if (film) {
    const data = await fetchData(film);
    filmName = data.title;
  }

  var table = createElement("table");
  table.setAttribute("id", "data_table");
  var tr = createElement("tr");
  var tr1 = createElement("tr");

  var th1 = createElement("th");
  var th2 = createElement("th");

  var td1 = createElement("td");
  var td2 = createElement("td");

  var text0 = document.createTextNode("Vehicle");
  var text1 = document.createTextNode("Film");

  var text2 = document.createTextNode(vehicleName || "No Vehicle");
  var text3 = document.createTextNode(filmName || "No Films");

  th1.appendChild(text0);
  th2.appendChild(text1);
  td1.appendChild(text2);
  td2.appendChild(text3);

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr1.appendChild(td1);
  tr1.appendChild(td2);

  table.appendChild(tr);
  table.appendChild(tr1);
  var linebreak = createElement("br");
  linebreak.setAttribute("id", "line_break");
  document.body.appendChild(linebreak);
  document.body.appendChild(table);
};

getData();
