var value_stones = ['$','$','¤','$','£','¤','¤','£','¤','¤','£','£','¤','¤','¤','£','¤','$','¤','¤','¤','¤','¤','¤'];
class player{
    /* The player of the game
    State==0 means, that it is not their turn
    State==1 means, that it is their turn
    */
    constructor (color,human){
        this.color = color;
        this.human = human;
        this.stones_hand = 9;
        this.stones_atall = 9;
        this.action = 'put';
        if (this.color == 'black'){
            this.state = 0;
        }else{
            this.state = 1;
        }
    }
}


class field{
    constructor(stones){
        this.stones = stones;
        this.hasmill = false;
        this.index_taken = -1;
    }
}

var test_player = new player('black','ai');
test_player.stones_hand = 5;
var test_opponent = new player('white','human');
test_opponent.stones_hand = 4;

var where_mill; //this is the variable that we will use to save the index of the position, where we took the stone away 

function create_rows(stones){
    /*Input: The array of the stones
    Output: An array that consists out of the rows of the field.
    */
    var rows = [[stones[0],stones[1],stones[2]], [stones[0],stones[7],stones[6]],[stones[2],stones[3],stones[4]],[stones[6],stones[5],stones[4]],[stones[8],stones[15],stones[14]], [stones[8],stones[9],stones[10]],[stones[10],stones[11],stones[12]],[stones[14],stones[13],stones[12]],[stones[16],stones[23],stones[22]], [stones[16],stones[17],stones[18]],[stones[18],stones[19],stones[20]],[stones[22],stones[21],stones[20]],[stones[7],stones[15],stones[23]], [stones[1],stones[9],stones[17]],[stones[19],stones[11],stones[3]],[stones[21],stones[13],stones[5]]];
    return rows;
}

function check_connected(idx1, idx2){
    /*Input: Two index positions
    Output: The information (boolean) whether these two are connected
    */
    var indices = [];
    for (var i = 0; i < 24; i++){
        indices.push(i);
    }
    var rows_indices = create_rows(indices);
    for (var j=0; j<rows_indices.length;j++){
        var row = rows_indices[j];
        if (row.includes(idx1)&&row.includes(idx2)){
            var pos1 = row.indexOf(idx1);
            var pos2 = row.indexOf(idx2);//either 0, 1, 2
            if((pos1-pos2==1)||(pos2-pos1)==1){//check whether they are neighboring
                return true;
            }
            
        }
    } 
}

function generate_neighbours(index){
    /*
    Input: The index of a field.
    Output: Array of neighbouring positions as numbers.
    */
    var neighbours = [];
    for (var j=0;j<24;j++){
        if(check_connected(index,j)){
            neighbours.push(j);
        }
    }
    return neighbours;
}

function contained_in_mill(index,stones){
    /*Input: the index of a stone, stone array
    Output: Is this stone contained in a mill
    */

    var indices = [];
    for (var i = 0; i < 24; i++){
        indices.push(i);
    }
    var rows_indices = create_rows(indices);
    var rows = create_rows(stones);
    //loop over all possible rows and check whether a stone is contained
    for(var row_ind=0; row_ind<rows_indices.length;row_ind++){
        var curr_indices = rows_indices[row_ind];
        if(curr_indices.includes(index)){//the row that contains the index
            var row = rows[row_ind];
            if (row.includes('£')||row.includes('$')){
                if(row[0]==row[1]&&row[1]==row[2]){
                    return true;    
                }
            }
        }
    }
    return false;
}

function check_new_mill(stones_old,stones){
    for(var idx = 0; idx<24;idx++){
        if(contained_in_mill(idx,stones)){
            if(!(contained_in_mill(idx, stones_old))){
                return true;
            }
        }
    }
}

/*
The AI methods for the min-max-algorithms
*/
function convert_to_array(ar){
    // Convert one of these weird 'deepcopy' array-objects into a proper array 
    var test = Array();
    var checker = true;
    var index = 0;
    while(checker){
        if((typeof(ar[index])=='string')||(typeof ar[index]=='object')){
            test.push(ar[index])
            index++;
        }else{
            checker = false;
        }
    }
    return test;
}
function compute_score_static(my_color,opponent_color,action,stones){
    if(action=='put'){
        var stones_copy = Object.assign({},stones);
        stones_copy = convert_to_array(stones_copy);
        stones_copy = stones_copy.sort();
        var my_stones = stones_copy.lastIndexOf(my_color) - stones_copy.indexOf(my_color);
        var opp_stones = stones_copy.lastIndexOf(opponent_color)-stones_copy.indexOf(opponent_color);
        return(my_stones-opp_stones);
    }
    else if(action=='move'){
        //here try later how one can improve the weights for a better score. 
        var stones_copy = Object.assign({},stones);
        stones_copy = convert_to_array(stones_copy);
        stones_copy = stones_copy.sort();
        var my_stones = stones_copy.lastIndexOf(my_color) - stones_copy.indexOf(my_color);
        var opp_stones = stones_copy.lastIndexOf(opponent_color)-stones_copy.indexOf(opponent_color);
        if(opp_stones<3){
            return(10000);
        }
        if(my_stones<3){
            return(-10000);
        }
        var my_moves = possible_moves(stones,my_color);
        var opp_moves = possible_moves(stones,opponent_color);
        if(opp_moves.length==0){
            return(10000);
        }
        else if(my_moves.length==0){
            return(-10000);
        }
        return(100*(my_stones-opp_stones)-opp_moves.length+0.2*(my_moves.length));
    }
    else if(action=='jump'){
        var stones_copy = Object.assign({},stones);
        stones_copy = convert_to_array(stones_copy);
        stones_copy = stones_copy.sort();
        var my_stones = stones_copy.lastIndexOf(my_color) - stones_copy.indexOf(my_color);
        var opp_stones = stones_copy.lastIndexOf(opponent_color)-stones_copy.indexOf(opponent_color);
        if(opp_stones<3){
            return(10000);
        }
        if(my_stones<3){
            return(-10000);
        }
        return(my_stones-opp_stones);

    }
}

function possible_put(stones,color){
    /*Input: the stone configuration and the color
    Output: An array with all the possible stone configurations as a field object, such that we can 
    */
    var new_states = Array();
    for (var index = 0; index<24;index++){
        var stones_copy = Object.assign({},stones);
        stones_copy = convert_to_array(stones_copy);
        if (stones_copy[index]=='¤'){
            if(color=='$'){
                stones_copy[index] = '$';
            }
            else{
                stones_copy[index] = '£';
            }           
            stones_copy = new field(stones_copy);
            new_states.push(stones_copy);
        }
    }
    return new_states;
}

function possible_moves(stones,color){
    /*Input: The stone configuration of a board and a color
    Output: The array with all possible configurations in the field datastructure.
    */
    var p_moves = [];
    var my_fields = [];
    //create array with indices of all my stones
    for (var i=0;i<stones.length;i++){
        if (stones[i]==color){
            my_fields.push(i)
        }
    }
    for (var j=0;j<my_fields.length;j++){
        //generate array of each neighbour
        var nbs = generate_neighbours(my_fields[j]);
        for (var k = 0; k<nbs.length;k++){
            //check whether the neighbouring field is free
            if(stones[nbs[k]]=='¤'){
                var move = [my_fields[j],nbs[k]];
                p_moves.push(move);
            }
        }
    }
    var new_states = Array();
    for (var ind = 0; ind<p_moves.length;ind++){
        var stones_copy = Object.assign({},stones);
        stones_copy = convert_to_array(stones_copy);
        var id1 = p_moves[ind][0];
        var id2 = p_moves[ind][1];
        stones_copy[id1] = '¤';
        stones_copy[id2] = color;
        stones_copy = new field(stones_copy);
        new_states.push(stones_copy); 
    }
    return(new_states)
}

function possible_jumps(stones,color){
    var p_jumps = [];
        
    //create array with indices of all my stones
    for (var i=0;i<stones.length;i++){
        if (stones[i]==color){
            for(var j=0;j<stones.length;j++){
                if(stones[j]=='¤'){
                    var move = [i,j];
                    p_jumps.push(move);
                }
    
            }
        }
    }
    var new_states = Array();
    for (var ind = 0; ind<p_moves.length;ind++){
        var stones_copy = Object.assign({},stones);
        stones_copy = convert_to_array(stones_copy);
        var id1 = p_jumps[ind][0];
        var id2 = p_jumps[ind][1];
        stones_copy[id1] = '¤';
        stones_copy[id2] = color;
        stones_copy = new field(stones_copy);
        new_states.push(stones_copy); 
    }
    return(new_states)

}


function possible_take(field_bef, opp_color){
    /*
    Input: The field datastructure with the stone configuration, the opponent color
    Output: The array of all possible field configurations with information where the stone was taken.
    */
    var config = field_bef.stones;
    var poss_after = Array();
    var new_field;
    for (var i=0;i<config.length;i++){
        if(config[i]==opp_color){
            var stones_copy = Object.assign({},config);
            stones_copy = convert_to_array(stones_copy);
            //check whether there is a mill, then push the copy in the array.
            stones_copy[i] = '¤'
            new_field = new field(stones_copy);
            new_field.hasmill = true;
            new_field.index_taken = i;
            poss_after.push(new_field);
        }
    }
    return poss_after;
}

function findIndexOfGreatest(array) {
    var greatest;
    var indexOfGreatest;
    for (var i = 0; i < array.length; i++) {
      if (!greatest || array[i] > greatest) {
        greatest = array[i];
        indexOfGreatest = i;
      }
    }
    return indexOfGreatest;
  }

function minmax_rec(stones, my_color,opp_color,action){
/* 
Have in mind, that in this case I am the opponent ;-) and 'my' is the AI.
*/
    var new_states;
    if(action == 'put'){
        new_states = possible_put(stones,my_color);
    }
    else if(action =='move' ){
        new_states = possible_moves(stones,my_color);
    }
    else if(action =='jump'){
        new_states = possible_jumps(stones,my_color);
    }
    //console.log(new_states);
    //now check whether one of the new states has a mill. Then add all the possible states with a removed stone
    for (var j=0;j<new_states.length;j++){
        var st_after = new_states[j].stones;
        if (check_new_mill(stones,st_after)){
            
            //learn how to do array slicing with js. No clue how to do that
            //create the second array -parallel- with the information about the game configurations.
            var after_mill = possible_take(new_states[j],opp_color);
            
            new_states[j] = after_mill;
        }
    }
    new_states =  new_states.flat();
    return new_states;
}

function minmax(stone_array, my_player,action,deep){
    /*
    Input: The stone configuration of the field, both the players to determine the necessary action
    Output: Hopfully the best action. 
    For now without alpha/beta pruning.
    
    var action = my_player.action;
    var my_hand = my_player.stones_hand;
    //var opp_hand = my_player.stones_hand; 
    var my_st = my_player.stones_atall;
    //var opp_st = my_player.stones_atall;

    //do the color transformation, because I skrewed up and cannot change it anymore :(
    if(my_player.color=='black'){
        var mcl = '$';
        var opp_cl = '£';
    }
    else{
        mcl = '£';
        opp_cl = '$';
    }
    */

    //fix this for the other states as well :)

    if(my_player == '$'){
        var mcl = '$';
        var opp_cl = '£';
    }else{
        mcl = '£';
        opp_cl = '$'; 
    }
    //do recursion with all these values as well. Otherwise really tough to do that

    var possible_states = minmax_rec(stone_array,mcl,opp_cl,action);
    
    var tree = Object.assign({},possible_states);
    
    tree = convert_to_array(tree);
    var scores = Array(tree.length);
    
    //for now, only for deepness 0
    for (var ind = 0; ind<tree.length; ind++){
        scores[ind] = compute_score_static(mcl,opp_cl,action,tree[ind].stones);
    }
    
    
    
    var index_next_state = findIndexOfGreatest(scores);
    if (possible_states[index_next_state].hasmill){
        where_mill = possible_states[index_next_state].index_taken; //overwrite the dummy variable with the index, where we took the stone away  
    }

    return possible_states[index_next_state].stones;

}

/*
Specify the functions for the random AI
*/
function ai_random(stones,color,action){
    /*Input: The stone array and the color of the player
    Output: The modified stone array*/
    if (action=='put'){
        var possible_fields = [];
        for (var i=0; i<stones.length;i++){
            if(stones[i]=='¤'){
                possible_fields.push(i);
            }
        }
        var index = Math.floor(Math.random() * possible_fields.length);
        stones[possible_fields[index]]=color;
        //return stones[possible_fields[index]];
    }
    else if(action=='move'){
        var possible_moves = [];
        var my_fields = [];
        //create array with indices of all my stones
        for (var i=0;i<stones.length;i++){
            if (stones[i]==color){
                my_fields.push(i)
            }
        }
        for (var j=0;j<my_fields.length;j++){
            //generate array of each neighbour
            var nbs = generate_neighbours(my_fields[j]);
            for (var k = 0; k<nbs.length;k++){
                //check whether the neighbouring field is free
                if(stones[nbs[k]]=='¤'){
                    var move = [my_fields[j],nbs[k]];
                    possible_moves.push(move);
                }
            }
        }
        var index = Math.floor(Math.random() * possible_moves.length);
        var rmove = possible_moves[index];
        stones[rmove[0]] = '¤';
        stones[rmove[1]] = color;
        //return(rmove);
    }
    else if(action=='jump'){
        var possible_jumps = [];
        
        //create array with indices of all my stones
        for (var i=0;i<stones.length;i++){
            if (stones[i]==color){
                for(var j=0;j<stones.length;j++){
                    if(stones[j]=='¤'){
                        var move = [i,j];
                        possible_jumps.push(move);
                    }
        
                }
            }
        }
        var index = Math.floor(Math.random() * possible_jumps.length);
        var rmove = possible_jumps[index];
        stones[rmove[0]] = '¤';
        stones[rmove[1]] = color;
        //return(rmove);
        
    }

    return stones;
}

function ai_take_random(stones,color){
    var possible_fields = [];
    for (var i=0; i<stones.length;i++){
        if(stones[i]==color){
            if(!(contained_in_mill(i,stones))){
                possible_fields.push(i);
            }
        }
    }
    var index = Math.floor(Math.random() * possible_fields.length);
    stones[possible_fields[index]]='¤';
    return(possible_fields[index])
}



/*
This is the AI method that'll be called in the game js file with the possibility to specify the type of the AI
*/
function ai_multi(stones,color,action,type){
    if (type=='random'){
        if (action=='take'){
            return ai_take_random(stones,color);
        }else{
            return ai_random(stones,color,action);
        }
        
    }

    if (type=='smart'){
        if (action=='take'){
            return where_mill;
        }else{
           return minmax(stones,color,action,0);
        }
    }
    

}

//console.log(possible_put(value_stones,test_player));

//console.log(minmax(value_stones,test_player,test_opponent,0));
//console.log(minmax_rec(value_stones,'£','$','put'));
//console.log(minmax_rec(value_stones,m,my_opp.color,action))
//console.log(minmax(value_stones,test_player,test_opponent,0));