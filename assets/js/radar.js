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

class RadarPlot {
    constructor() {
        const playerStats = {
            fieldNames: ['Shoot', 'Pass', 'Dribble', 'Attack', 'Skill', 'Movement', 'Power', 'Mentality'],
            values: [
                [10,20,30,40,50,60,70,80],
                [40,30,10,80,50,50,80,90],
                [90,70,60,10,20,90,20,30]
            ]
        }

        const radar = {
            width: 600,
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

        this.svg = d3.select(".capability__container")
            .append("svg")
            .attr('width', radar.width)
            .attr('height', radar.height)


        const onePiece = radar.arc/radar.total

        // 计算网轴的正多边形的坐标
        const polygons = {
            webs: [],
            webPoints: []
        };

        for(let k=radar.level; k>0; k--) {
            let webs = '',
                webPoints = [];
            let r = radar.radius/radar.level * k;
            for(let i=0; i<radar.total; i++) {
                let x = r * Math.sin(i * onePiece),
                    y = r * Math.cos(i * onePiece);
                webs += x + ',' + y + ' ';
                webPoints.push({
                    x: x,
                    y: y
                });
            }
            polygons.webs.push(webs);
            polygons.webPoints.push(webPoints);
        }

        this.svg.append('g')
            .selectAll('polygon')
            .data(polygons.webs)
            .enter()
            .append('polygon')
            .attr('points', function(d) {
                return d;
            })
            .style('fill', '#8d98b3')
            .style('fill-opacity', '0.5')
            .style('stroke', 'grey')
            .style('stroke-dasharray', '10 6')
            .attr("transform", "translate(" + radar.width/2 + ", " + radar.height/2 + ")");

        this.svg.append('g')
            .selectAll('line')
            .data(polygons.webPoints[0])
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
            .attr("transform", "translate(" + radar.width/2 + ", " + radar.height/2 + ")")
            .style("stroke", "grey")
            .style('stroke-dasharray', '10 6')


        // Calculate coordinates of radar chart
        const areasData = [];
        const values = playerStats.values;

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
        }

        // Add Text FieldName
        const textPoints = []
        const textRadius = radar.radius + 20

        for (let i=0; i<radar.total; i++) {
            let x = textRadius * Math.sin(i * onePiece),
                y = textRadius * Math.cos(i * onePiece)

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
                return playerStats.fieldNames[i]
            })
            .style("font-family", "sans-serif")
            .style("font-size", "15px")
            .attr("transform", "translate(" + radar.width/2 + ", " + radar.height/2 + ")")
            .attr("fill", "white")
            .attr("text-anchor", "middle")

        // Add text indicate %
        for (let i = 0; i < radar.level; i++) {
            let levelFactor = radar.factor * radar.radius * ((i+1)/radar.level)
            let Format = d3.format('.0%');

            this.svg.selectAll(".levels")
                .data([1]) // Dummy data
                .enter()
                .append('svg:text')
                .attr('x', function(d) {return levelFactor*(1-radar.factor*Math.sin(0))})
                .attr('y', function(d) {return levelFactor*(1-radar.factor*Math.cos(0))})
                .style("font-family", "sans-serif")
                .style("font-size", "10px")
                .attr("transform", "translate(" + (radar.width/2-levelFactor + radar.toRight) + ", " + (radar.height/2-levelFactor) + ")")
                .attr("fill", "white")
                .text(Format((i+1)*radar.maxValue/radar.level))
        }

        // Draw capability
        this.svg.append('g')
            .selectAll('areas')
            .data(playerStats.values)
            .enter()
            .append('g')
            .attr('class', function(d,i) {
                return 'area' + (i+1)
            })

        for(let i=0; i< areasData.length; i++) {
            // 依次循环每个雷达图区域
            let areaData = areasData[i];

            // Draw areas
            this.svg.select('.area' + (i + 1))
                .append('polygon')
                .attr('class', 'select_player')
                .attr('points', areaData.polygon)
                .attr('stroke', function (d, index) {
                    return getColor(i);
                })
                .attr('fill', function (d, index) {
                    return getColor(i);
                })
                .attr('fill-opacity', .3)
                .attr('stroke-width', 3)
                .attr("transform", "translate(" + radar.width/2 + ", " + radar.height/2 + ")")
                .on('mouseover', function(d) {
                    d3.selectAll("polygon.select_player")
                        .transition(200)
                        .style("fill-opacity", 0.1);

                    d3.select(this)
                        .transition(200)
                        .style('fill-opacity', .8)
                })
                .on('mouseout', function(d) {
                    d3.selectAll("polygon.select_player")
                        .transition(200)
                        .style('fill-opacity', .4)
                })

            // Draw points
            this.svg.append('g')
                .selectAll('circle')
                .data(areaData.points)
                .enter()
                .append('circle')
                .attr('cx', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y;
                })
                .attr('r', 3)
                .attr('stroke', function(d, index) {
                    return getColor(i);
                })
                .attr('stroke-width', 3)
                .attr('fill', 'white')
                .attr("transform", "translate(" + radar.width/2 + ", " + radar.height/2 + ")")
        }
    }
}

whenDocumentLoaded(() => {

    // const s = retrieve_value()
    //
    // console.log(s)

    const plot = new RadarPlot();
});
