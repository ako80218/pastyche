$(function(){
    // console.log("LOADED!");
    
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
            random
            jade.render($('#pastyche')[0], 'pastyche', data);
            


        }
    })
});
});
