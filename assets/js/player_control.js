import { RadarPlot } from './radar.js'

function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", action);
    } else {
        // `DOMContentLoaded` already fired
        action();
    }
}

class playerBoard {
    constructor() {
        this.radar = new RadarPlot()
        this.radar.createRadarBackground()
        this.chosen = []
        }

    appendPlayerCard(selected_player){

        let radar = this.radar
        let chosen = this.chosen

        d3.csv('data/players.csv', function (error, data){

            selected_player = ['158023', '20801', '190871']

            let stats = _(data)
                .keyBy('sofifa_id')
                .at(selected_player)
                .value()


            stats.forEach(function (stat) {
                let sofifa_id = stat['sofifa_id'],
                    name      = stat['short_name'],
                    overall   = stat['overall'],
                    face_img  = stat['player_face_url'],
                    position  = stat['player_positions'].split(",")[0],
                    value     = stat['value_eur'],
                    nation    = stat['nationality_name'],
                    club      = stat['club_name']

                const player = d3.select('.swiper-wrapper')
                    .append('article')
                    .classed('player__card', true)
                    .classed('swiper-slide', true)
                    .classed('swiper-slide-duplicate', true)
                    .classed('swiper-slide-duplicate-active', true)
                    .style('background_color', 'hsl(219, 4%, 7%)')
                    .attr('id', sofifa_id)

                player.append('div')
                    .classed('shape shape__smaller', true)

                player.append('h1')
                    .classed('player__title', true)
                    .text(name)

                player.append('h3')
                    .classed('player__subtitle',true)
                    .text(nation)

                player.append('img')
                    .classed('player__img',true)
                    .attr("src", face_img)

                const player_data = player.append('div')
                    .classed('player__data', true)

                player_data.append('div')
                    .classed('player__data-group', true)
                    .append('i')
                    .classed('ri-dashboard-3-line', true)
                    .text(overall)

                player_data.append('div')
                    .classed('player__data-group', true)
                    .append('i')
                    .classed('ri-dashboard-3-line', true)
                    .text(position)

                player_data.append('div')
                    .classed('player__data-group', true)
                    .append('i')
                    .classed('ri-dashboard-3-line', true)
                    .text(club)

                player.append('h3')
                    .classed('player__price',true)
                    .text('€' + value)

                player.append('button')
                    .classed('button player__button',true)
                    .on('click', function (_) {
                        let selected_player=player.attr('id');

                        if (chosen.includes(selected_player)) {
                            let idx = chosen.indexOf(selected_player)
                            chosen.splice(idx , 1)
                            radar.removeRadarArea(selected_player)
                        } else {
                            chosen.push(selected_player)
                            radar.drawRadarArea(chosen)
                        }
                    })
            })
        })
    }
}

whenDocumentLoaded(() => {
    const control = new playerBoard()

    control.appendPlayerCard('dsadsa')
});

