function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", action);
    } else {
        // `DOMContentLoaded` already fired
        action();
    }
}

function appendPlayerCard(){
    const player = d3.select('.swiper-wrapper')
        .append('article')
        .classed('player__card', true)
        .classed('swiper-slide', true)
        .classed('swiper-slide-duplicate', true)
        .classed('swiper-slide-duplicate-active', true)
        .style('background_color', 'hsl(219, 4%, 7%)')

    player.append('div')
        .classed('shape shape__smaller', true)

    player.append('h1')
        .classed('player__title', true)
        .text('zhang san')

    player.append('h3')
        .classed('player__subtitle',true)
        .text('China')

    player.append('img')
        .classed('player__img',true)
        .attr("src", 'https://cdn.sofifa.net/players/188/545/22_120.png')

    const player_data = player.append('div')
        .classed('player__data', true)

    player_data.append('div')
        .classed('player__data-group', true)
        .append('i')
        .classed('ri-dashboard-3-line', true)
        .text('93')

    player_data.append('div')
        .classed('player__data-group', true)
        .append('i')
        .classed('ri-dashboard-3-line', true)
        .text('RS')

    player_data.append('div')
        .classed('player__data-group', true)
        .append('i')
        .classed('ri-dashboard-3-line', true)
        .text('9')

    player.append('h3')
        .classed('player__price',true)
        .text('£120000')

    player.append('button')
        .classed('button player__button',true)
        // .append('i')
        // .classed('ri-shopping-bag-2-line', true)
}

appendPlayerCard()