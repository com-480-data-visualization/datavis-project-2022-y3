function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", action);
    } else {
        // `DOMContentLoaded` already fired
        action();
    }
}

class ConnectedDotPlot {
    constructor(teamData) {

        this.cell = {
            width: 120,
            height: 20,
            buffer: 15
        }

        // Create list of all elements that will populate the table
        // Initially, the tableElements will be identical to the teamData
        this.tableElements = teamData.slice(0,teamData.length)

        /** Store all match statistics*/
        this.teamData = teamData

        this.bar = {'height': 20}

        /** Set variables for commonly accessed data columns**/
        this.goalsMadeHeader = 'Goals Made'
        this.goalsConcededHeader = 'Goals Conceded'

        /** Set the goal scale*/
        this.goalScale = null

        /** Set the scale for games/win/losses */
        this.gameScale = null

        /**Color scales*/
        /**For aggregate columns  Use colors '#ece2f0', '#016450' for the range.*/
        this.aggregateColorScale = null;

        /**For goal Column. Use colors '#cb181d', '#034e7b'  for the range.*/
        this.goalColorScale = null;

    }

    createTable() {
        //Update Scale Domain
        this.goalScale = d3.scaleLinear()
            .domain([0, Math.ceil(d3.max(this.teamData, function(t) {return t.value['Goals Made']})/10)*10])
            .range([this.cell.buffer, this.cell.width *3]);

        this.gameScale = d3.scaleLinear()
            .domain([0, d3.max(this.teamData, function(d) {return d.value.TotalGames;})])
            .range([0, this.cell.width]);

        this.goalColorScale = d3.scaleQuantize()
            .domain([-1, 1])
            .range(['#eea08c', '#8fb2c9']);

        this.aggregateColorScale = d3.scaleLinear()
            .domain([0, d3.max(this.teamData, function(d) {return d.value.TotalGames;})])
            .range(['#92b3a5', '#1a6840']);

        //add GoalAxis to header of col 1.
        let GoalAxis = d3.axisTop().scale(this.goalScale);


        const axis = d3.select('#goalHeader')
            .append('svg')
            .attr('width', 3 * this.cell.width+this.cell.buffer)
            .attr('height', this.cell.height+1)
            .append('g')
            .attr('transform', 'translate(0,' + this.cell.height + ')')
            .call(GoalAxis)

        axis.selectAll('text')
            .style("font-family", "'Exo', sans-serif")
            .style("stroke", "white")

        axis.select('path')
            .style('stroke', 'white')

        axis.selectAll('line')
            .style('stroke', 'white')
    }

    updateTable() {
        //Create table rows
        let tbody = d3.select('.match__table-view').select('tbody')

        let tbodytr = tbody.selectAll('tr')
            .data(this.tableElements)
            .enter()
            .append('tr')
            .attr('class',function(d){return d.value.type;})

        //Append th elements for the Team Names
        //Note: return []!!!
        tbodytr.selectAll('th')
            .data(function(trdata){
                return[{ "key": trdata.key,
                    "type": trdata.value.type}];
            })
            .enter()
            .append('th')
            .text(function(d){
                if(d.type === "aggregate")
                    return d.key;
                else
                    return "x"+d.key;
            });

        //Append td elements for the remaining columns.
        //Data for each cell is of the type: {'type':<'game' or 'aggregate'>, 'value':<[array of 1 or two elements]>}
        let rowtd = tbodytr.selectAll('td')
            .data(function(d){
                return[{ 'vis':'goalaxis', 'type':d.value.type, 'value': {'gMade':d.value["Goals Made"], 'gConcede': d.value["Goals Conceded"]}},
                    { 'vis': 'bar', 'type':d.value.type, 'value': d.value.Wins},
                    { 'vis': 'bar', 'type':d.value.type, 'value': d.value.Losses},
                    { 'vis': 'bar', 'type':d.value.type, 'value': d.value.TotalGames}];
            })
            .enter()
            .append('td');

        //Populate cells (do one type of cell at a time )
        let barscale = this.gameScale;
        let barfillscale = this.aggregateColorScale;
        let goalscale = this.goalScale;
        let goalcolor = this.goalColorScale;

        //Create diagrams in the goals column
        let allgoal = rowtd.filter(function (d) {
            return d.vis === 'goalaxis'
        });

        let goalvis = allgoal
            .style('padding', 0)
            .append('svg')
            .attr('width', 3 * this.cell.width+this.cell.buffer).attr('height', this.cell.height)
            .append('g');

        goalvis.append('rect')
            .attr('x',function(d){ return goalscale(Math.min(d.value.gMade,d.value.gConcede));})
            .attr('y',function(d){return d.type === 'aggregate'? 3:7})
            .attr('width',function(d){return Math.abs(goalscale(d.value.gMade)-goalscale(d.value.gConcede));})
            .attr('height',function(d){return d.type === 'aggregate'? 14:7})
            .style('fill',function(d){
                return goalcolor(+d.value.gMade-+d.value.gConcede);})
            .classed('goalBar', true);

        /** Add goal made circles*/
        goalvis.append('circle')
            .attr('cx',function(d){return goalscale(d.value.gMade);})
            .attr('cy',10)
            .attr('r', 5)
            .classed('goalCircle', true)
            .style('fill', function(d) {return d.type === 'aggregate' ? '#2177b8' : 'white';})
            .style('stroke', '#2177b8')
            .style('stroke-width', '3px')

        /** Add goal concede circles*/
        goalvis.append('circle')
            .attr('cx',function(d){return goalscale(d.value.gConcede);})
            .attr('cy',10)
            .attr('r', 5)
            .classed('goalCircle', true)
            .style('fill', function(d) {return d.type === 'aggregate' ? '#ed5a65' : 'white';})
            .style('stroke', '#ed5a65')
            .style('stroke-width', '3px')

        /** Set the color of all games that tied to light gray*/
        let tiegames = goalvis.filter(function(d){return d.value.gMade===d.value.gConcede});
        tiegames.selectAll('circle')
            .style('fill', function(d){ return d.type === 'aggregate' ? 'gray' : 'white';})
            .style('stroke', 'gray');

        //bar chart
        let allbar = rowtd.filter(function (d) {
            return d.vis === 'bar'
        });
        let barvis = allbar.style('padding-left', 0)
            .append('svg')
            .attr('width', this.cell.width).attr('height', this.cell.height);

        barvis.append('rect')
            .attr('x',0)
            //     //.attr('y',5)
            .attr('width',function(d){
                return barscale(d.value);
            })
            .attr('height',this.bar.height)
            .style('fill',function(d){return barfillscale(d.value);});

        barvis.append('text')
            .text(function(d){return d.value;})
            .style('fill','#fbecde')
            .attr('y', this.cell.buffer-1)
            .attr('x', 1);



    }
}











whenDocumentLoaded(() => {

    d3.csv("data/matches_since2019.csv", function (error, matchesCSV) {

        let countries = ['Argentina', 'Belgium', 'Brazil', 'Chile', 'Colombia', 'Croatia',
                         'Denmark', 'France', 'Germany', 'Iceland', 'Italy', 'Japan',
                         'Mexico', 'Netherlands', 'Nigeria', 'Poland', 'Portugal', 'Morocco',
                         'Saudi Arabia', 'Senegal', 'Serbia', 'South Korea', 'Spain', 'Sweden',
                         'Switzerland', 'Turkey', 'England', 'United States', 'Uruguay', 'China PR']

         /** Data processing */
         let teamData = d3.nest()
            .key(function (d) {
                return d['home_team'];
            })
            .rollup(function (leaves) {
                let goalmade = d3.sum(leaves, function (l) {
                        return l['home_score']
                    }),
                    goalconcede = d3.sum(leaves, function (l) {
                        return l['away_score']
                    }),
                    deltagoals = goalmade - goalconcede,
                    wins = d3.sum(leaves, function (l) {
                        return l['win']
                    }),
                    losses = d3.sum(leaves, function (l) {
                        return l['lose']
                    })

                //games
                let games = leaves.map(function (l) {
                    let value = {
                        "Goals Made": +l["home_score"],
                        "Goals Conceded": +l["away_score"],
                        "Delta Goals": [],
                        "Wins": [],
                        "Losses": [],
                        "type": "game",
                        "Opponent": l["away_team"],
                    };
                    return {
                        "key": l["away_team"],
                        "value": value
                    };
                });


                return {
                    "Goals Made": goalmade,
                    "Goals Conceded": goalconcede,
                    "Delta Goals": deltagoals,
                    "Wins": wins,
                    "Losses": losses,
                    "TotalGames": games.length,
                    "type": "aggregate",
                    "games": games
                };
            })
            .entries(matchesCSV)

        /** filter home country*/
        teamData = _(teamData)
                    .keyBy('key')
                    .at(countries)
                    .value()



        const table = new ConnectedDotPlot(teamData)
        table.createTable()
        table.updateTable()
    })
});