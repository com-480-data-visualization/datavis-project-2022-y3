$(document).ready(function() {
    let position = null;
    let playerPosition = null
    $("image").click(function(){
        // alert("2222");
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

        let list = []
        // var pat1 = new RegExp(position);
        $.each(playerPosition, function (index, value){
            if(value.nationality_name == nation & value.player_positions.indexOf(position) > -1)
                list.push(value)
            // console.log(value.player_positions)
            // value.player_positions
        })
        list_order_by_value = list.sort(function(a, b){
                if(parseInt(a.value_eur) > parseInt(b.value_eur)){
                    return -1
                }else if(parseInt(a.value_eur) == parseInt(b.value_eur)){
                    return 0
                }else if(parseInt(a.value_eur) < parseInt(b.value_eur)){
                    return 1
                }
            })

        top3_id = [list_order_by_value[0]["sofifa_id"], list_order_by_value[1]["sofifa_id"], list_order_by_value[2]["sofifa_id"]]
        console.log(top3_id)
        // console.log(list_order_by_value)
    })

    $.extend({
        csv: function (url, f) {
            $.get(url, function (record) {
                //按回车拆分
                record = record.split("\r\n");
                //第一行标题
                var title = record[0].split(",");
                //删除第一行
                record.shift();
                var data = [];
                for (var i = 0; i < record.length-1; i++) {//最后一行为空行也会被读取 -1
                    var t = record[i].split(",");
                    for (var y = 0; y < t.length; y++) {
                        if (!data[i]) data[i] = {};
                        data[i][title[y]] = t[y];
                    }
                }
                f.call(this, data);
                data = null;
            });
        }
    })

    $.csv("/data/players/players_nospace.csv", function (data) {
        playerPosition = data
    })


});