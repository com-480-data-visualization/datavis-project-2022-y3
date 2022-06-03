import { playerBoard } from './player_control.js'

$(document).ready(function() {
    let position = null;
    let playerPosition = null;
    const board = new playerBoard()

    /** append initial players*/
    let memory = [[20801,158023,188545],
                  [231747,192985,190871]]

    board.appendPlayerCard(memory[0])
    board.appendPlayerCard(memory[1])

    $("image").click(function(){

        if (memory.length > 1){
            const toDelete = memory.shift()
            console.log(toDelete)
            board.removePlayerCard(toDelete)
        }

        let x = $(this).attr("x");
        let y = $(this).attr("y");
        let formation = $(".formation__pitch-selector").val();
        let nation = $(".formation__pitch-selector_team").val()
        // var position = null;
        if(formation == 541){
            if(x==175 & y==100){
                position = "ST"
            }else if(x==25 & y ==200){
                position = "LM";
            }else if(x==125 & y ==225){
                position = "LM";
            }else if(x==225 & y ==225){
                position = "RM";
            }else if(x==325 & y ==200){
                position = "RM";
            }else if(x==25 & y ==350){
                position = "LB";
            }else if(x==100 & y == 375){
                position = "LWB";
            }else if(x==175 & y == 385){
                position = "CB"
            }else if(x==250 & y == 375){
                position = "RB"
            }else if(x==325 & y == 350){
                position = "RB"
            }else if(x==175 & y == 450) {
                position = "GK"
            }
        }else if(formation == 442){
            if(x==100 & y == 100) {
                position = "LW"
            }else if(x==250 & y == 100) {
                position = "RW"
            }else if(x==25 & y == 255) {
                position = "LM"
            }else if(x==125 & y == 225) {
                position = "CM"
            }else if(x==225 & y == 225) {
                position = "RM"
            }else if(x==325 & y == 225) {
                position = "RM"
            }else if(x==25 & y == 375) {
                position = "LB"
            }else if(x==125 & y == 375) {
                position = "LWB"
            }else if(x==225 & y == 375) {
                position = "RB"
            }else if(x==325 & y == 375) {
                position = "RB"
            }else if(x==175 & y == 450) {
                position = "GK"
            }
        }else if(formation == 352){
            if(x==100 & y == 100) {
                position = "ST"
            }else if(x==250 & y == 100) {
                position = "RW"
            }else if(x==25 & y == 255) {
                position = "LM"
            }else if(x==125 & y == 300) {
                position = "LM"
            }else if(x==175 & y == 200) {
                position = "CM"
            }else if(x==225 & y == 300) {
                position = "RM"
            }else if(x==325 & y == 225) {
                position = "RM"
            }else if(x==25 & y == 375) {
                position = "LWB"
            }else if(x==175 & y == 375) {
                position = "CB"
            }else if(x==325 & y == 375) {
                position = "RB"
            }else if(x==175 & y == 450) {
                position = "GK"
            }
        }

        memory.push(playerPosition[nation][position])
        board.appendPlayerCard(playerPosition[nation][position])

    })

    $.getJSON("data/player_position.json", function (data) {
        playerPosition = data
    });
});