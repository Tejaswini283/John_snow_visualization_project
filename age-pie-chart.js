// Function to create age vs death pie chart
function ageRenderPieChart(data) {
  const ageDistributionSVGBBox = document
    .getElementById("age_distribution_div")
    .getBoundingClientRect();

  // setting width and height of the pie chart based on ageDistributionSVGBox attributes
  const config = {
    width: ageDistributionSVGBBox.width - 50,
    height: ageDistributionSVGBBox.height - 100,
  };

  // setting margins, width and height of the graph
  const width = config.width - 50 - 30;
  const height = config.height - 30 - 35;

  d3.select("#age_distribution_svg").selectAll("*").remove();

  // Setting the radius of the pie chart as half the length of width or height whichever is minimum.
  const radius = Math.min(width, height) / 2;

  // Appeding svg object to a div
  const svg = d3
    .select("#age_distribution_svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Setting color scale for different age group categories
  const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range(["grey", "yellow", "blue", "green", "red", "brown"]);

  // Computing the position of each age category on the pie:
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
