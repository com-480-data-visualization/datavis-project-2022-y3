// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".sankey__container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // .append("g")
    // .attr("transform",
    //     "translate(" + margin.left + "," + margin.top  + ")");

// Color scale used
var color = d3.scaleOrdinal(d3.schemeCategory20);


// load the data
d3.csv("data/sankey_data.csv", function(error, csvdata){

    var data = {"nodes":[], "links" : []};
    csvdata.forEach(function (d){
        data.nodes.push({"name": d.nationality_name});
        data.nodes.push({"name": d.club_name});
        data.links.push({"source": d.nationality_name, "target": d.club_name, "value": +d.short_name});
    });

    //console.log(data.nodes.length);//196
    //console.log(data.links.length);//98

    // data.nodesName = d3.keys(d3.nest().key(function (d) {  return d.name; }).map(data.nodes));
    data.nodesName = d3.nest().key(function (d) {  return d.name; }).entries(data.nodes).map(d => d.key);
    console.log('data.nodesName.length ' + data.nodesName.length);
    data.nodesName.forEach(function (d, i) {
        console.log(data.nodesName[i]);
    });

    data.links.forEach(function (d, i) {
        data.links[i].source = data.nodesName.indexOf(data.links[i].source);
        data.links[i].target = data.nodesName.indexOf(data.links[i].target);
    });


    var cloneOfNode = JSON.parse(JSON.stringify(data.nodes));
    // console.log(cloneOfNode.length);

    data.nodesName.forEach(function (d, i) {
        for(var j = 0; j < cloneOfNode.length; j++){
            if(cloneOfNode[j].name === data.nodesName[i]) {
                data.nodes[i] = cloneOfNode[j];
            }
        }
    });
    // console.log(data.nodes.length);
    data.nodes.length = data.nodesName.length;

    // now loop through each nodes to make nodes an array of objects
    // rather than an array of strings
    data.nodes.forEach(function (d, i) {
        data.nodes[i] = { "name": d['name']};
    });

    //inverse some source in map
    var temp;
    data.links.forEach(function (d, i) {
        if(data.links[i].source > 16){
            temp = data.links[i].source;
            data.links[i].source = data.links[i].target;
            data.links[i].target = temp;
        }
    });

    // var count = 0;
    // console.log('show ' + data.nodes.length);
    // data.nodes.forEach(function (d, i) {
    //     console.log(data.nodes[i]);
    //     console.log(count);
    //     ++count;
    // });
    // count = 0;
    // data.links.forEach(function (d, i) {
    //     console.log(data.links[i]);
    //     console.log(count);
    //     ++count;
    // });





    // Constructs a new Sankey generator with the default settings and Set the sankey diagram properties
    var sankey = d3.sankey()
        .nodeWidth(20)
        .nodePadding(5)
        .size([width, height])
        .nodes(data.nodes)
        .links(data.links)
        .layout(1);

    // add in the links
    var link = svg.append("g")
        .selectAll(".link")
        .data(data.links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", sankey.link() )
        .attr("fill", "None")
        .attr("stroke", "#F6B4A6")
        .attr("stroke-opacity", 0.2)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .sort(function(a, b) { return b.dy - a.dy; });
    //.attr("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })


    link
        .append("text")
        .text(function (d) { return "number:" + d.value; })
        .append("textPath")
        .attr("xlink:href", function (d,i) { return "#link" + i; })
        .attr('startOffset',"50%")


    // add in the nodes
    var node = svg.append("g")
        .selectAll(".node")
        .data(data.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .call(d3.drag()
            .subject(function(d) { return d; })
            .on("start", function() { this.parentNode.appendChild(this); })
            .on("drag", dragmove));

    // add the rectangles for the nodes
    node
        .append("rect")
        .attr("height", function(d) { return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
        .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
        // Add hover text
        .append("title")
        .text(function(d) { return d.name + "\n"  + " Players from famous football club: " + d.value ; });

    // add in the title for the nodes
    node
        .append("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { return d.name; })
        .style("fill", function(d) { return d.color = d3.color("white"); })
        .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

    // svg.selectAll(".link")
    //     .style('stroke', function(d){ return d.source.color;})



    // the function for moving the nodes
    function dragmove(d) {
        d3.select(this)
            .attr("transform",
                "translate("
                + d.x + ","
                + (d.y = Math.max(
                        0, Math.min(height - d.dy, d3.event.y))
                ) + ")");
        sankey.relayout();
        link.attr("d", sankey.link() );
    }

    function addMouseOn(){

        // 悬停在连线上
        d3.selectAll('path')
            .on('mouseover', function(){
                d3.selectAll('.node, path')
                    .attr('fill-opacity', '0.1')
                    .attr('stroke-opacity', '0.1');

                const e = d3.event;
                const hoverNodes = d3.select(e.target)
                    .attr('stroke-opacity', '0.8')
                    .attr('linkNodes').split('-');

                hoverNodes.forEach((id) => {
                    d3.selectAll('[index=' + id + ']')
                        .attr('fill-opacity', '1')
                });
            })
            .on('mouseleave', function(){
                d3.selectAll('.node, path')
                    .attr('fill-opacity', '1')
                    .attr('stroke-opacity', '0.4');
            })
    }
});

// whenDocumentLoaded(() => {
//
//
//
//
//
// });




