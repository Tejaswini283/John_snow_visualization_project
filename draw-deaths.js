// Using deathdays.csv file to create map by appending in streets.json
d3.json("streets.json").then(function (path) {
  var g = d3
    .select("#deathdayssvg")
    .append("g")
    .attr("width", "450") // Setting width of map as 450
    .attr("height", "350") // Setting height of map as 350
    .attr("transform", "translate(-50,100) ");

  g.selectAll("path")
    .data(path)
    .enter()
    .append("path")
    .attr(
      "d",
      d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))
    );

  // Appending Cranbary street to map by giving suitable positin and angle
  g.append("text")
    .attr("transform", "translate(190,85) rotate(-45)")
    .text("Cranaby Street");

  // Appending Baker street to map by giving suitable positin and angle
  g.append("text")
    .attr("transform", "translate(290,200) rotate(60)")
    .text("Baker Street");

  // Appending Bond street to map by giving suitable positin and angle
  g.append("text")
    .attr("transform", "translate(405,200) rotate(-20)")
    .text("Bond Street");

  // Appending Jermyn street to map by giving suitable positin and angle
  g.append("text")
    .attr("transform", "translate(390,-40) rotate(70)")
    .text("Jermyn Street");

  // Appending workhouse to map by giving suitable positin and angle and filling text with red colour
    g.append("text")
    .attr("transform", "translate(250,45) rotate(0)")
    .style("fill", "Red")
    .style("font-size", "23px")
    .text("Work House");

    // Appending brewery to map by giving suitable positin and angle and filling text with red colour
    g.append("text")
    .attr("transform", "translate(390,85) rotate(0)")
    .style("fill", "Red")
    .style("font-size", "23px")
    .text("Brewery");

  // Adding zoom function to map
  d3.select("#deathdayssvg").call(
    d3.zoom().on("zoom", function (e) {
      g.attr("transform", e.transform);
  
    })
  );

  // Reading all pumps with thier respective locations from pumps.csv
  // Appending pumps to map with letter 'P'
  d3.csv("pumps.csv").then((data) => {
    d3.select("#deathdayssvg")
      .select("g")
      .selectAll(".icon")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "icon")
      .attr("x", (d) => xScale(d.x))
      .attr("y", (d) => yScale(d.y))
      .text("P");
  });

});

// Scaling map boundries to appropriately overlay position in map
var xScale = d3.scaleLinear().domain([0, 15]).range([0, 400]);
var yScale = d3.scaleLinear().domain([15, 0]).range([0, 400]);

// Setting different colour to different age groups to display on map
const colorByAge = d3
  .scaleOrdinal()
  .domain([0, 1, 2, 3, 4, 5])
  .range([
    "grey",
    "yellow",
    "blue",
    "green",
    "red",
    "brown",
    "#aa4344",
  ]);

// Appending deaths visualization from timeline onto map
function addDeathsMarkerOnMap(data, mode) {
  d3.select("#deathdayssvg").selectAll(".display").remove(); // Remove previous hover deaths display from map
  d3.select("#deathdayssvg")
    .select("g")
    .selectAll(".display")
    .data(data)
    .enter()
    .append("rect") // Choosing rectangular shape to display deaths on map
    .attr("width", 6) // width is set to 6
    .attr("height", 6) // height is set to 6
    // color of rectangle is filled based on the gender and age category of the individual
    .style("fill", (d) => {
      if (mode === "gender") {
        if (d.gender == 0) return "green";
        else return;
      } else {
        return colorByAge(d.age);
      }
    })
    .attr("class", "display")
    .attr("x", (d) => xScale(d.x))
    .attr("y", (d) => yScale(d.y));
}
