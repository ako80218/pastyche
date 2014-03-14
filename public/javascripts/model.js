$(function(){
    //This function randomly selects an element in an array
var randomSelectOne = function(arr){
     var selectedIndex = Math.floor(Math.random() * (arr.length));
    return arr[selectedIndex];
};

});