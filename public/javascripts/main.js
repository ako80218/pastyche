$(function(){
    // console.log("LOADED!");
    // 
    ///////////////////////////// MODEL
    //This function randomly selects an element in an array
    var randomSelectOne = function(arr){
         var selectedIndex = Math.floor(Math.random() * (arr.length));
        return arr[selectedIndex];
    };
    //This function forms an object to feed the template it takes an object as its argument
    // var templateData = function(obj, key, arr){
    //     var newObj=_.pick(obj, key);
    //     newObj.selectedPhoto=randomSelectOne(arr);

    //     return newObj
    // }
    
    ///////////////////////////// VIEW
//This function takes the imagePath of the randomly selected photo object from the pastiche 
//and assigns it to the background of the #background div element
    var randomBackground = function(path){
        $("#background").empty().hide();
        $("#background").append('<img id="pastyche-background" class="background-image" src="">');
        $("#pastyche-background").attr('src', path);
        $("#background").fadeIn(1000);
        $('#pastyche-background').fadeIn();
    };
    
    //////////////////////////// CONTROL
    
$('#photo-search-button').on('click', function(e){
    e.preventDefault();
    var searchTerm = $(this).siblings('div').children('#photo-search-input').val();
    console.log("searchTerm:  ", searchTerm);
    $.ajax('/search', {
        data: {searchTerm:searchTerm},
        success: function(data){
            // var x = Math.floor((data.photo.length)/10);
            //     var obj={photo: []};
            // _(x).times(function(){
            //     var index =_.random(data.photo.length);
            //     obj.photo.push(data.photo[index]);
            //     });
            // console.log("AJAX Success!!");
            var selectedPhoto   = randomSelectOne(data.photo);
            jade.render($('#pastyche')[0], 'pastyche', data);
             $("#background").empty().hide();
            jade.render($('#background')[0], 'pastyche-background', selectedPhoto);
            $('#background').fadeIn();
            


        }
    })
});
});
