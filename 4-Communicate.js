var margin = {top: 20, right: 30, bottom: 50, left: 300},
    width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var x = d3.time.scale.utc()
          .range([0, width]);

var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .1);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseDate = d3.time.format.utc("%Y-%m-%d %H:%M:%S").parse;

d3.csv("dataset.csv", function(dataset) {

  dataset.forEach(function(d) {
     d.created = parseDate(d.created);
    // d.song.count = +d.song.count;
  });
  console.log(dataset[0]);
  console.log(x.domain([parseDate("2015-07-06 21:40:02")]));

  x.domain([d3.min(dataset, function(d) { return d.created; }),
            d3.max(dataset, function(d) { return d.created; })]);

  y.domain(dataset.map(function(d) { return d.songartist; }));

  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  chart.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  chart.selectAll(".circle")
    .data(dataset)
    .enter().append("circle")
    .attr("class", "circle")
    .attr("x", function(d) { return x(d.created); })
    .attr("y", function(d) { return y(d.songartist); })
    .attr("r", 5);

});
