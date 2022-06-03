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
        pitch.grassColor
    );


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


var playerList = {
    Argentina: {
        442: [{x: 25, y: 20, text: "\u00c1. Di Mar\u00eda"}, {x: 55, y: 20, text: "L. Messi"}, {x: 10, y: 45, text: "M. Acu\u00f1a"}, {x: 30, y: 45, text: "G. Lo Celso"}, {x: 50, y: 45, text: "\u00c1. Correa"}, {x: 70, y: 45, text: "E. Buend\u00eda"}, {x: 10, y: 75, text: "M. Acu\u00f1a"}, {x: 30, y: 75, text: "F. Angileri"}, {x: 50, y: 75, text: "G. Montiel"}, {x: 70, y: 75, text: "F. Bustos"}, {x: 40, y: 90, text: "E. Mart\u00ednez"}],
        541: [{x: 40, y: 20, text: "L. Messi"}, {x: 50, y: 45, text: "\u00c1. Correa"}, {x: 10, y: 40, text: "R. Pereyra"}, {x: 30, y: 45, text: "M. Acu\u00f1a"}, {x: 55, y: 75, text: "G. Montiel"}, {x: 70, y: 40, text: "E. Buend\u00eda"}, {x: 10, y: 70, text: "M. Acu\u00f1a"}, {x: 25, y: 75, text: "F. Angileri"}, {x: 40, y: 77, text: "C. Romero"}, {x: 70, y: 70, text: "F. Bustos"}, {x: 40, y: 90, text: "E. Mart\u00ednez"}],
        352: [{x: 25, y: 20, text: "L. Messi"}, {x: 55, y: 20, text: "L. Messi"}, {x: 10, y: 45, text: "M. Acu\u00f1a"}, {x: 40, y: 40, text: "G. Lo Celso"}, {x: 50, y: 60, text: "\u00c1. Correa"}, {x: 70, y: 45, text: "E. Buend\u00eda"}, {x: 10, y: 75, text: "F. Angileri"}, {x: 30, y: 60, text: "R. Pereyra"}, {x: 40, y: 75, text: "C. Romero"}, {x: 70, y: 75, text: "G. Montiel"}, {x: 40, y: 90, text: "E. Mart\u00ednez"}]
    }
}



var playersContainer = pitchElement.append("g").attr("class", "players.csv");


// For soccer jersey
playersContainer
    .selectAll("image")
    // .data(playerPositions["541"])
    .data(playerList["Argentina"]["541"])
    .enter()
    .append("image")
    .classed('jersey',true)
    .attr("x", function(d){
        return scale(d.x) - 25
    })
    .attr("y", function(d){
        return scale(d.y)
    })
    .attr("width", 40)
    .attr("height", 40)
    .attr("href", "./Img/soccer-jersey.svg")



// For position text
playersContainer
    .selectAll("text")
    .data(playerList["Argentina"]["541"])
    .enter()
    .append("text")
    .attr("x", function(d){
        return scale(d.x) - 35
    })
    .attr("y", function(d){
        return scale(d.y)
    })
    .text(function(d){
        return d.text
    })


function updateFormation(formation, nation) {

    playersContainer
        .selectAll("image")
        .data(playerList[nation][formation])
        .transition()
        .attr("x", function (d) {
            return scale(d.x) - 25;
        })
        .attr("y", function (d) {
            return scale(d.y);
        })
        .attr("width", 40)
        .attr("height", 40)
        .attr("href", "./Img/soccer-jersey.svg")


    playersContainer
        .selectAll("text")
        .data(playerList[nation][formation])
        .transition()
        .attr("x", function(d){
            return scale(d.x) - 35
        })
        .attr("y", function(d){
            return scale(d.y)
        })
        .text(function(d){
            return d.text
        })
}

$(document).ready(function() {
    // Update the nationality
    $(".formation__pitch-selector_team").change(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation ,$(this).val());
    })

    //Update the formation
    $(".formation__pitch-selector").change(function () {
        var nation = $(".formation__pitch-selector_team").val()
        updateFormation($(this).val(), nation);
    });

    //Load player list from playList.json
    $.getJSON("data/playerList.json", function (data) {
        playerList = data
    });

    // CLick events
    $("#logo_Argentina").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Argentina");
        $(".formation__pitch-selector_team").find("option[value='Argentina']").attr("selected",true);
    })

    $("#logo_Belgium").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Belgium");
        $(".formation__pitch-selector_team").find("option[value='Belgium']").attr("selected",true);
    })

    $("#logo_Brazil").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Brazil");
        $(".formation__pitch-selector_team").find("option[value='Brazil']").attr("selected",true);
    })

    $("#logo_Chile").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Chile");
        $(".formation__pitch-selector_team").find("option[value='Chile']").attr("selected",true);
    })

    $("#logo_Colombia").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Colombia");
        $(".formation__pitch-selector_team").find("option[value='Colombia']").attr("selected",true);
    })

    // $("#logo_Brazil").click(function (){
    //     var formation = $(".formation__pitch-selector").val()
    //     updateFormation(formation , "Brazil");
    //     $(".formation__pitch-selector_team").find("option[value='Brazil']").attr("selected",true);
    // })

    $("#logo_Croatia").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Croatia");
        $(".formation__pitch-selector_team").find("option[value='Croatia']").attr("selected",true);
    })

    $("#logo_Denmark").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Denmark");
        $(".formation__pitch-selector_team").find("option[value='Denmark']").attr("selected",true);
    })

    $("#logo_France").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "France");
        $(".formation__pitch-selector_team").find("option[value='France']").attr("selected",true);
    })

    $("#logo_Germany").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Germany");
        $(".formation__pitch-selector_team").find("option[value='Germany']").attr("selected",true);
    })

    $("#logo_Iceland").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Iceland");
        $(".formation__pitch-selector_team").find("option[value='Iceland']").attr("selected",true);
    })

    $("#logo_Italy").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Italy");
        $(".formation__pitch-selector_team").find("option[value='Italy']").attr("selected",true);
    })

    $("#logo_Japan").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Japan");
        $(".formation__pitch-selector_team").find("option[value='Japan']").attr("selected",true);
    })

    $("#logo_Mexico").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Mexico");
        $(".formation__pitch-selector_team").find("option[value='Mexico']").attr("selected",true);
    })

    $("#logo_Morocco").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Morocco");
        $(".formation__pitch-selector_team").find("option[value='Morocco']").attr("selected",true);
    })

    $("#logo_Netherlands").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Netherlands");
        $(".formation__pitch-selector_team").find("option[value='Netherlands']").attr("selected",true);
    })

    $("#logo_Nigeria").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Nigeria");
        $(".formation__pitch-selector_team").find("option[value='Nigeria']").attr("selected",true);
    })

    $("#logo_Poland").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Poland");
        $(".formation__pitch-selector_team").find("option[value='Poland']").attr("selected",true);
    })

    $("#logo_Portugal").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Portugal");
        $(".formation__pitch-selector_team").find("option[value='Portugal']").attr("selected",true);
    })

    $("#logo_Saudi_Arabia").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Saudi Arabia");
        $(".formation__pitch-selector_team").find("option[value='Saudi Arabia']").attr("selected",true);
    })

    $("#logo_Senegal").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Senegal");
        $(".formation__pitch-selector_team").find("option[value='Senegal']").attr("selected",true);
    })

    $("#logo_Serbia").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Serbia");
        $(".formation__pitch-selector_team").find("option[value='Serbia']").attr("selected",true);
    })

    $("#logo_South_Korea").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "South Korea");
        $(".formation__pitch-selector_team").find("option[value='South Korea']").attr("selected",true);
    })

    $("#logo_Spain").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Spain");
        $(".formation__pitch-selector_team").find("option[value='Spain']").attr("selected",true);
    })

    // $("#logo_Portugal").click(function (){
    //     var formation = $(".formation__pitch-selector").val()
    //     updateFormation(formation , "Portugal");
    //     $(".formation__pitch-selector_team").find("option[value='Portugal']").attr("selected",true);
    // })

    $("#logo_Sweden").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Sweden");
        $(".formation__pitch-selector_team").find("option[value='Sweden']").attr("selected",true);
    })

    $("#logo_Switzerland").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Switzerland");
        $(".formation__pitch-selector_team").find("option[value='Switzerland']").attr("selected",true);
    })

    $("#logo_Turkey").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Turkey");
        $(".formation__pitch-selector_team").find("option[value='Turkey']").attr("selected",true);
    })

    $("#logo_England").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "England");
        $(".formation__pitch-selector_team").find("option[value='England']").attr("selected",true);
    })

    $("#logo_United_States").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "United States");
        $(".formation__pitch-selector_team").find("option[value='United States']").attr("selected",true);
    })

    $("#logo_Uruguay").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "Uruguay");
        $(".formation__pitch-selector_team").find("option[value='Uruguay']").attr("selected",true);
    })

    $("#logo_China").click(function (){
        var formation = $(".formation__pitch-selector").val()
        updateFormation(formation , "China");
        $(".formation__pitch-selector_team").find("option[value='China']").attr("selected",true);
    })

});
