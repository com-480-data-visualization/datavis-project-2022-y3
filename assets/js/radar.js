function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", action);
    } else {
        // `DOMContentLoaded` already fired
        action();
    }
}

function getColor(idx) {
    let palette = [
        '#5ab1ef', '#ffb980', '#d87a80',
        '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
        '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
        '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ]
    return palette[idx % palette.length];
}


export class RadarPlot {
    constructor() {
        this.fieldNames = ['Shoot', 'Pass', 'Dribble', 'Attack', 'Skill', 'Movement', 'Power', 'Mentality']
        this.fifaId = []

        this.radar = {
            width: 1024,
            height: 600,
            margin: {top: 20, right: 20, bottom: 20, left: 20},

            radius: 250,
            total: 8, // number of measurements
            level: 5, // 需要将网轴分成几级，即网轴上从小到大有多少个正多边形
            factor: 1,
            factorLegend: .85,
            toRight: 5,
            maxValue: 1,

            //网轴的范围，类似坐标轴
            rangeMin: 0,
            rangeMax: 100,
            arc: 2 * Math.PI
        }

        this.onePiece = this.radar.arc/this.radar.total

        // 计算网轴的正多边形的坐标
        this.polygons = {
            webs: [],
            webPoints: []
        };

        this.svg = d3.select(".capability__container")
            .append("svg")
            .attr('width', this.radar.width)
            .attr('height', this.radar.height)
    }

    createRadarBackground() {

        let fields = this.fieldNames

        for(let k=this.radar.level; k>0; k--) {
            let webs = '',
                webPoints = [];
            let r = this.radar.radius/this.radar.level * k;
            for(let i=0; i<this.radar.total; i++) {
                let x = r * Math.sin(i * this.onePiece),
                    y = r * Math.cos(i * this.onePiece);
                webs += x + ',' + y + ' ';
                webPoints.push({
                    x: x,
                    y: y
                });
            }
            this.polygons.webs.push(webs);
            this.polygons.webPoints.push(webPoints);
        }

        this.svg.append('g')
            .selectAll('polygon')
            .data(this.polygons.webs)
            .enter()
            .append('polygon')
            .attr('points', function(d) {
                return d;
            })
            .style('fill', '#8d98b3')
            .style('fill-opacity', '0.5')
            .style('stroke', 'grey')
            .style('stroke-dasharray', '10 6')
            .attr("transform", "translate(" + this.radar.width/2 + ", " + this.radar.height/2 + ")");

        this.svg.append('g')
            .selectAll('line')
            .data(this.polygons.webPoints[0])
            .enter()
            .append('line')
            .style('fill', 'red')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', function(d) {
                return d.x;
            })
            .attr('y2', function(d) {
                return d.y;
            })
            .attr("transform", "translate(" + this.radar.width/2 + ", " + this.radar.height/2 + ")")
            .style("stroke", "grey")
            .style('stroke-dasharray', '10 6')

        // Add Text FieldName
        const textPoints = []
        const textRadius = this.radar.radius + 20

        for (let i=0; i<this.radar.total; i++) {
            let x = textRadius * Math.sin(i * this.onePiece),
                y = textRadius * Math.cos(i * this.onePiece)

            textPoints.push({
                x: x,
                y: y
            })
        }

        this.svg.append('g')
            .selectAll('text')
            .data(textPoints)
            .enter()
            .append('text')
            .attr('x', function(d) {
                return d.x;
            })
            .attr('y', function(d) {
                return d.y
            })
            .text(function(d,i) {
                return fields[i]
            })
            .style("font-family", "'Exo', sans-serif")
            .style("font-size", "1rem")
            .style("font-medium", '500')
            .style('font-semi-bold', '600')
            .attr("transform", "translate(" + this.radar.width/2 + ", " + this.radar.height/2 + ")")
            .attr("fill", "white")
            .attr("text-anchor", "middle")

        // Add text indicate %
        let factor = this.radar.factor

        for (let i = 0; i < this.radar.level; i++) {
            let levelFactor = this.radar.factor * this.radar.radius * ((i + 1) / this.radar.level)
            let Format = d3.format('.0%');

            this.svg.selectAll(".levels")
                .data([1]) // Dummy data
                .enter()
                .append('svg:text')
                .attr('x', function (d) {
                    return levelFactor * (1 - factor * Math.sin(0))
                })
                .attr('y', function (d) {
                    return levelFactor * (1 - factor * Math.cos(0))
                })
                .style("font-family", "sans-serif")
                .style("font-size", "10px")
                .style("font-size", "10px")
                .attr("transform", "translate(" + (this.radar.width / 2 - levelFactor + this.radar.toRight) + ", " + (this.radar.height / 2 - levelFactor) + ")")
                .attr("fill", "white")
                .text(Format((i + 1) * this.radar.maxValue / this.radar.level))
        }
    }


    drawRadarArea(selected_player) {
        let radarPlot = this.svg
        let radar     = this.radar
        let onePiece  = this.onePiece

        d3.csv('data/players.csv', function (err, data) {
            // Calculate coordinates of radar chart
            const areasData = []
            const values    = []

            // Collect statistics of selected players.csv
            _(data)
                .keyBy('sofifa_id')
                .at(selected_player)
                .value()
                .forEach( function(player) {
                    let shooting  = +player.shooting,
                        passing   = +player.passing,
                        dribble   = +player.dribbling,
                        attacking = +player.attacking,
                        skill     = +player.skill,
                        movement  = +player.movement,
                        power     = +player.power,
                        mentality = +player.mentality

                    let value = []

                    value.push(shooting, passing, dribble, attacking,
                               skill, movement, power, mentality)

                    values.push(value)
                })


            // Calculate point coordination


            for(let i=0; i<values.length; i++) {
                let value = values[i],
                    area = '',
                    points = [];

                for(let k=0; k< radar.total; k++) {
                    let r = radar.radius * (value[k] - radar.rangeMin)/(radar.rangeMax - radar.rangeMin);
                    let x = r * Math.sin(k * onePiece),
                        y = r * Math.cos(k * onePiece);
                    area += x + ',' + y + ' ';
                    points.push({
                        x: x,
                        y: y
                    })
                }

                areasData.push({
                    polygon: area,
                    points: points
                });


                // Draw capability
                for(let i=0; i< areasData.length; i++) {
                    let areaData = areasData[i];

                    radarPlot.selectAll('.select_player'+selected_player[i]).remove()

                    // Classify areas for later selection
                    radarPlot.append('g')
                        .selectAll('areas')
                        .data(values)
                        .enter()
                        .append('g')
                        .attr('class', function(d,i) {
                            return 'area' + (i+1)
                        })

                    // Draw areas
                    radarPlot.select('.area' + (i+1))
                        .append('polygon')
                        .attr('class', 'select_player' + selected_player[i])
                        .attr('points', areaData.polygon)
                        .attr('stroke', function (d, index) {
                            return getColor(i);
                        })
                        .attr('fill', function (d, index) {
                            return getColor(i);
                        })
                        .attr('fill-opacity', .3)
                        .attr('stroke-width', 3)
                        .attr("transform", "translate(" + radar.width / 2 + ", " + radar.height / 2 + ")")
                        .on('mouseover', function (d) {
                            d3.selectAll("polygon.select_player"+selected_player[i])
                                .transition(200)
                                .style("fill-opacity", 0.1);

                            d3.select(this)
                                .transition(200)
                                .style('fill-opacity', .8)
                        })
                        .on('mouseout', function (d) {
                            d3.selectAll("polygon.select_player"+selected_player[i])
                                .transition(200)
                                .style('fill-opacity', .4)
                        })

                    // Draw points
                    radarPlot.append('g')
                        .selectAll('circle')
                        .data(areaData.points)
                        .enter()
                        .append('circle')
                        .attr('class', 'select_circle'+selected_player[i])
                        .attr('cx', function (d) {
                            return d.x;
                        })
                        .attr('cy', function (d) {
                            return d.y;
                        })
                        .attr('r', 3)
                        .attr('stroke', function (d, index) {
                            return getColor(i);
                        })
                        .attr('stroke-width', 3)
                        .attr('fill', 'white')
                        .attr("transform", "translate(" + radar.width / 2 + ", " + radar.height / 2 + ")")
                }
            }
        })
    }

    removeRadarArea(selected_player) {
        this.svg.selectAll('.select_player'+selected_player).remove()
        this.svg.selectAll('.select_circle'+selected_player).remove()
    }

}

whenDocumentLoaded(() => {
    // const plot = new RadarPlot();
});
