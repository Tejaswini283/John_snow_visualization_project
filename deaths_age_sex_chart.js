let fnBarMouseHover;

// Creating function for mouse over on timeline chart
function setMouseOverFn(fn) {
  fnBarMouseHover = fn;
}

let data, chart_input;

function set_deaths_age_sex_chart_data(d, DASvalue) {
  data = d;
  chart_input = DASvalue;
}

// Function to create a timeline chart by reading deaths data from deathagesex.csv
function draw_deaths_age_sex_chart() {
  const bBox = document.getElementById("deathagesexsvg").getBoundingClientRect(); 
  const width = bBox.width - 50 - 30; // Setting width of timeline chart by adding margins
  const height = bBox.height - 30 - 40; // Setting height of timeline chart by adding margins

  // scaleband for x axis of timeline chart with range of 0 to width, rounding to 0.05 and padding between bands is set to 0.1
  var x = d3.scaleBand().rangeRound([0, width], 0.05).padding(0.1); 

  // scaleband for y axis of timeline chart with range of height to 0
  // No rounding is required as deaths are all integers
  // No scaling for y axis
  var y = d3.scaleLinear().rangeRound([height, 0]);

  // Setting x ticks as date and month
  var xAxis = d3.axisBottom().scale(x).tickFormat(d3.timeFormat("%d-%b"));

  // Setting y ticks for number of deaths
  var yAxis = d3.axisLeft().scale(y);

  // Setting width and height of page
  var svg = d3
    .select("#deathagesexsvg")
    .attr("width", width + 50 + 30)
    .attr("height", height + 30 + 40)
    .append("g")
    .attr("transform", "translate(" + 50 + "," + 30 + ")");

  // Parsing deaths data for date and month and cumulating deaths for each day
  data.forEach(function (d) {
    d.origDate = JSON.parse(JSON.stringify(d.date));
    d.date = d3.timeParse("%d-%b")(d.date);
    d.deaths = +d.deaths;
  });
  
  // Returning date and month for x axis for timeline chart
  x.domain(
    data.map(function (d) {
      return d.date;
    })
  );

  // Returning number of deaths for y axis for timeline chart
  y.domain([
    0,
    d3.max(data, function (d) {
      return d.deaths;
    }),
  ]);

  // Setting slateblue color for the bands of time line chart
  const color = d3.scaleLinear().domain(y.domain()).range(["SlateBlue", "SlateBlue"]);

  //
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")") // Setting first x tick to the first band
    .call(xAxis.ticks(null).tickSize(0)) // Setting x tick size to zero
    .selectAll("text")
    .style("text-anchor", "middle")
    .attr("dx", "-2em") // Setting distance of x ticks from x axis
    .attr("dy", "-.55em") // Setting distance of x ticks from y axis
    .attr("transform", "rotate(-90)"); // Displaying date and month vertically for x ticks

  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis.ticks(null).tickSize(0)) // Setting y tick size to zero
    .append("text")
    .attr("y", 6)
    .style("text-anchor", "middle")
    .text("Value");

  svg
    .selectAll("bar")
    .data(data)
    .enter()
    .append("rect")
    // Getting colour of the fill based on category
    .style("fill", function (d) {
      return color(d.deaths);
    })
    .attr("x", function (d) {
      return x(d.date);
    })
    .attr("width", x.bandwidth())
    .attr("y", function (d) {
      return y(d.deaths);
    })
    .attr("height", function (d) {
      return height - y(d.deaths);
    })
    // Appending fnBarMouseHover function to timeline chart
    .on("mouseover", function (event, d) {
      fnBarMouseHover(d, chart_input.slice(0, d.total + d.deaths), data);
    });
}
