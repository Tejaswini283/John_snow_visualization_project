// Function to create gender vs death pie chart
function genderRenderPieChart(data) {
  const genderDistributionSVGBBox = document
    .getElementById("gender_distribution_div")
    .getBoundingClientRect();

  // setting width and height of the pie chart based on genderDistributionSVGBox attributes
  const config = {
    width: genderDistributionSVGBBox.width - 50,
    height: genderDistributionSVGBBox.height - 100,
  };

  // setting margins, width and height of the graph
  const width = config.width - 50 - 30;
  const height = config.height - 30 - 35;

  d3.select("#gender_distribution_svg").selectAll("*").remove();

  // Setting the radius of the pie chart as half the length of width or height whichever is minimum.
  const radius = Math.min(width, height) / 2;

  // Appeding svg object to a div
  const svg = d3
    .select("#gender_distribution_svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Setting color scale for male and female categories
  const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range(["green", "black"]);

  // Computing the position of male and female category on the pie:
  const pie = d3
    .pie()
    .sort(null)
    .value((d) => {
      return d.value;
    });

  // Setting inner and outer radius of pie chart to create a donut chart based on radius attribute
  const path = d3
    .arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 0);

  const arc = svg
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  // Creating strokes or gaps between different categories in pie chart
  arc
    .append("path")
    .attr("d", path)
    .attr("fill", (d) => {
      return color(d.data.name);
    })

}

// Setting default values of different age categories and gender categories to zero
function drawPieChart(data) {
  let age = [
    { name: "0-10", value: 0 },
    { name: "11-20", value: 0 },
    { name: "21-40", value: 0 },
    { name: "41-60", value: 0 },
    { name: "61-80", value: 0 },
    { name: "> 80", value: 0 },
  ];

  let gender = [
    { name: "male", value: 0 },
    { name: "female", value: 0 },
  ];

  // Appending data to different age categories based on the data
  data.forEach((d) => {
    switch (d.age) {
      case "0":
        age[0].value += 1;
        break;
      case "1":
        age[1].value += 1;
        break;
      case "2":
        age[2].value += 1;
        break;
      case "3":
        age[3].value += 1;
        break;
      case "4":
        age[4].value += 1;
        break;
      case "5":
        age[5].value += 1;
        break;
    }
  });

  // Appending data to different gender categories based on the data
  data.forEach((d) => {
    switch (d.gender) {
      case "0":
        gender[0].value += 1;
        break;
      case "1":
        gender[1].value += 1;
        break;
    }
  });

  // Rendering both age vs deaths and gender vs deaths pie charts
  genderRenderPieChart(gender, true);
  ageRenderPieChart(age, true);
}
