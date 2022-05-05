//Domaine the data range
var scale = d3.scale.linear().domain([0, 100]).range([0, 500]);

//football pitch
var pitch = {
    width: 80,
    length: 100,
    centerCircleRadius: 10,
    penaltyArea: {
        width: 36,
        height: 18
    },
    padding: {
        top: 2,
        right: 2,
        bottom: 2,
        left: 2
    },
    paintColor: "#FFF",
    grassColor: "#7d8c39"
};

//add pitch in index.html
var svg = d3
    .select(".formation__pitch")
    .append("svg")
    .attr("width", scale(pitch.width + pitch.padding.left + pitch.padding.right))
    .attr(
        "height",
        scale(pitch.length + pitch.padding.top + pitch.padding.bottom)
    )
    .attr(
        "style",
        "background:" +
        pitch.grassColor +
        ";margin-left:-" +
        0.5 * scale(pitch.width + pitch.padding.left + pitch.padding.right) +
        "px;margin-top:-" +
        0.5 * scale(pitch.length + pitch.padding.top + pitch.padding.bottom)
    );

var pitchElement = svg
    .append("g")
    .attr(
        "transform",
        "translate(" +
        scale(pitch.padding.left) +
        "," +
        scale(pitch.padding.top) +
        ")"
    );

var pitchOutline = pitchElement
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", scale(pitch.width))
    .attr("height", scale(pitch.length))
    .attr("stroke", pitch.paintColor)
    .attr("fill", "none");

var centerSpot = pitchElement
    .append("circle")
    .attr("cx", scale(pitch.width / 2))
    .attr("cy", scale(pitch.length / 2))
    .attr("r", 1)
    .attr("fill", pitch.paintColor);

var centerCircle = pitchElement
    .append("circle")
    .attr("cx", scale(pitch.width / 2))
    .attr("cy", scale(pitch.length / 2))
    .attr("r", scale(pitch.centerCircleRadius))
    .attr("fill", "none")
    .attr("stroke", pitch.paintColor);

var halfwayLine = pitchElement
    .append("line")
    .attr("y1", scale(pitch.length / 2))
    .attr("y2", scale(pitch.length / 2))
    .attr("x1", 0)
    .attr("x2", scale(pitch.width))
    .attr("stroke", pitch.paintColor);

// corners

function addPath(pathData, parentElement) {
    parentElement
        .append("path")
        .attr("d", pathData)
        .attr("stroke", pitch.paintColor)
        .attr("fill", "none");
}

// top left
var pathData =
    "M0," +
    scale(1) +
    "A " +
    scale(1) +
    " " +
    scale(1) +
    " 45 0 0" +
    scale(1) +
    ",0";
addPath(pathData, pitchElement);

// top right
var pathData =
    "M" +
    scale(pitch.width - 1) +
    ",0 A " +
    scale(1) +
    " " +
    scale(1) +
    " 45 0 0" +
    scale(pitch.width) +
    "," +
    scale(1);
addPath(pathData, pitchElement);

// bottom left
var pathData =
    "M0," +
    scale(pitch.length - 1) +
    "A " +
    scale(1) +
    " " +
    scale(1) +
    " 45 0 1" +
    scale(1) +
    "," +
    scale(pitch.length);
addPath(pathData, pitchElement);

// top right
var pathData =
    "M" +
    scale(pitch.width - 1) +
    "," +
    scale(pitch.length) +
    " A " +
    scale(1) +
    " " +
    scale(1) +
    " 45 0 1" +
    scale(pitch.width) +
    "," +
    scale(pitch.length - 1);
addPath(pathData, pitchElement);

// Top Penalty Area
var penaltyAreaTop = pitchElement.append("g");
var pathData =
    "M" +
    scale(pitch.width / 2 - 4 - 18) +
    ",0L" +
    scale(pitch.width / 2 - 4 - 18) +
    "," +
    scale(18) +
    "h" +
    scale(44) +
    "V0";
addPath(pathData, penaltyAreaTop);

// Top Penalty Area
var pathData =
    "M" +
    scale(pitch.width / 2 - 4 - 6) +
    ",0L" +
    scale(pitch.width / 2 - 4 - 6) +
    "," +
    scale(6) +
    "h" +
    scale(20) +
    "V0";
addPath(pathData, penaltyAreaTop);

// Top D
var pathData =
    "M" +
    scale(pitch.width / 2 - 8) +
    "," +
    scale(18) +
    "A " +
    scale(10) +
    " " +
    scale(10) +
    " 5 0 0 " +
    scale(pitch.width / 2 + 8) +
    "," +
    scale(18);
addPath(pathData, penaltyAreaTop);

// Top Penalty Spot
var penaltySpotTop = penaltyAreaTop
    .append("circle")
    .attr("cx", scale(pitch.width / 2))
    .attr("cy", scale(12))
    .attr("r", 1)
    .attr("fill", pitch.paintColor)
    .attr("stroke", pitch.paintColor);

penaltyAreaBottom = pitchElement.append("g");
penaltyAreaBottom.html(penaltyAreaTop.html());
penaltyAreaBottom.attr(
    "transform",
    "rotate(180) translate(-" +
    scale(pitch.width) +
    ",-" +
    scale(pitch.length) +
    ")"
);

var playerPositions = {
    442: [
        { x: 25, y: 20 },
        { x: 55, y: 20 },
        { x: 10, y: 45 },
        { x: 30, y: 45 },
        { x: 50, y: 45 },
        { x: 70, y: 45 },
        { x: 10, y: 75 },
        { x: 30, y: 75 },
        { x: 50, y: 75 },
        { x: 70, y: 75 }
    ],
    352: [
        { x: 25, y: 20 },
        { x: 55, y: 20 },
        { x: 10, y: 45 },
        { x: 40, y: 40 },
        { x: 50, y: 60 },
        { x: 70, y: 45 },
        { x: 10, y: 75 },
        { x: 30, y: 60 },
        { x: 40, y: 75 },
        { x: 70, y: 75 }
    ],
    541: [
        { x: 40, y: 20 },
        { x: 50, y: 45 },
        { x: 10, y: 40 },
        { x: 30, y: 45 },
        { x: 55, y: 75 },
        { x: 70, y: 40 },
        { x: 10, y: 70 },
        { x: 25, y: 75 },
        { x: 40, y: 77 },
        { x: 70, y: 70 }
    ]
};

var playersContainer = pitchElement.append("g").attr("class", "players");

playersContainer
    .selectAll("circle")
    .data(playerPositions["541"])
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        return scale(d.x);
    })
    .attr("cy", function (d) {
        return scale(d.y);
    })
    .attr("r", 5)
    .attr("fill", "yellow");

function updateFormation(formation) {
    // alert(1111)
    playersContainer
        .selectAll("circle")
        .data(playerPositions[formation])
        .transition()
        .attr("cx", function (d) {
            return scale(d.x);
        })
        .attr("cy", function (d) {
            return scale(d.y);
        })
        .attr("r", 5)
        .attr("fill", "yellow");
}

$(document).ready(function() {
    $(".formation__selector").change(function () {
        updateFormation($(this).val());
        // alert(11111)
    });
});
