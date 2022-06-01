//Domaine the data range
var scale = d3.scaleLinear().domain([0, 100]).range([0, 500]);

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
    .select(".formation__container")
    .append("svg")
    .attr("width", scale(pitch.width + pitch.padding.left + pitch.padding.right))
    .attr(
        "height",
        scale(pitch.length + pitch.padding.top + pitch.padding.bottom)
    )
    .attr(
        "style",
        "background:" +
        pitch.grassColor
        // ";margin-left:-" +
        // 0.1 * scale(pitch.width + pitch.padding.left + pitch.padding.right) +
        // "px;margin-top:-" +
        // 0.1 * scale(pitch.length + pitch.padding.top + pitch.padding.bottom)
    );

//
// <defs>
//     <pattern id="pat" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
//         <image x="0" y="0" width="80" height="80" href="./Img/soccer-jersey.svg" />
//     </pattern>
// </defs>

var soccerJersey = svg
    .append("defs")
    .append("pattern")
    .attr("id", "pat")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 30)
    .attr("height", 50)
    .attr("patternUnits", "userSpaceOnUse")

soccerJersey
    .append("image")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 30)
    .attr("height", 50)
    .attr("href", "./Img/soccer-jersey.svg")

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


var playerPositionsText = {
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
        { x: 40, y: 20, text: "Forward" },
        { x: 50, y: 45, text: "Forward"  },
        { x: 10, y: 40, text: "Forward"  },
        { x: 30, y: 45, text: "Forward"  },
        { x: 55, y: 75, text: "Forward"  },
        { x: 70, y: 40, text: "Forward"  },
        { x: 10, y: 70, text: "Forward"  },
        { x: 25, y: 75, text: "Forward"  },
        { x: 40, y: 77, text: "Forward"  },
        { x: 70, y: 70, text: "Forward"  }
    ]
};

var playersContainer = pitchElement.append("g").attr("class", "players");


// For soccer jersey
playersContainer
    .selectAll("image")
    .data(playerPositions["541"])
    .enter()
    .append("image")
    .attr("x", function(d){
        return scale(d.x) - 25
    })
    .attr("y", function(d){
        return scale(d.y)
    })
    .attr("width", 50)
    .attr("height", 50)
    .attr("href", "./Img/soccer-jersey.svg")


// For position text
playersContainer
    .selectAll("text")
    .data(playerPositionsText["541"])
    .enter()
    .append("text")
    .attr("x", function(d){
        return scale(d.x)
    })
    .attr("y", function(d){
        return scale(d.y)
    })
    .text(function(d){
        return d.text
    })


function updateFormation(formation) {

    playersContainer
        .selectAll("image")
        .data(playerPositions[formation])
        .transition()
        .attr("x", function (d) {
            return scale(d.x) - 25;
        })
        .attr("y", function (d) {
            return scale(d.y);
        })
        .attr("width", 50)
        .attr("height", 50)
        .attr("href", "./Img/soccer-jersey.svg")

    playersContainer
        .selectAll("text")
        .data(playerPositions[formation])
        .transition()
        .attr("x", function(d){
            return scale(d.x) - 10
        })
        .attr("y", function(d){
            return scale(d.y)
        })
        .text("P1")
}



$(document).ready(function() {
    $(".formation__pitch-selector").change(function () {
        updateFormation($(this).val());
        // alert(11111)
    });

    // $("svg").append($("<img src='./Img/soccer-jersey.png' />"))
});
