$(function(){
    //This function takes the imagePath of the randomly selected photo object from the pastiche 
//and assigns it to the background of the #background div element
    var randomBackground = function(path){
        $("#background").empty().hide();
        $("#background").append('<img id="pastyche-background" class="background-image" src="">');
        $("#pastyche-background").attr('src', path);
        $("#background").fadeIn(1000);
        $('#pastyche-background').fadeIn();
    };
});