$(function(){
    // console.log("LOADED!");
    // 
    ///////////////////////////// MODEL
    //This function randomly selects an element in an array
    var randomSelectOne = function(arr){
         var selectedIndex = Math.floor(Math.random() * (arr.length));
        return arr[selectedIndex];
    };
    var savedPastycheData=[];
    //This function forms an object to feed the template it takes an object as its argument
    // var templateData = function(obj, key, arr){
    //     var newObj=_.pick(obj, key);
    //     newObj.selectedPhoto=randomSelectOne(arr);

    //     return newObj
    // }
        ///////////////////////////// VIEW
    
    //////////////////////////// CONTROL
    
$('#photo-search-button').on('click', function(e){
    e.preventDefault();
    var searchTerm = $(this).siblings('div').children('#photo-search-input').val();
    console.log("searchTerm:  ", searchTerm);
    $.ajax('/search', {
        data: {searchTerm:searchTerm},
        success: function(data){
            savedPastycheData=data.photo;
            var selectedPhoto   = randomSelectOne(data.photo);
            jade.render($('#pastyche')[0], 'pastyche', data);
             $("#background").empty().hide();
             console.log("selectedPhoto: ", selectedPhoto);
            jade.render($('#background')[0], 'pastyche-background', selectedPhoto);
            $('#background').fadeIn(600);
            $('#navbar-header').append('<ul class="nav navbar-nav"><li><a id="tags-link" href="#"><span class="glyphicon glyphicon-tags"></span></a></li>');
            $(document).on('click',  '#tags-link', function(e){
                e.preventDefault();
                var idsString = _.pluck(data.photo, 'id').join('?');
                $('#tag-cloud').toggleClass('col-sm-3');
                $('#pastyche').toggleClass('col-sm-9');
                $('#pastyche').toggleClass('col-sm-12');
                $.ajax('/photo-tags',{
                    data:idsString,
                    success: function(data){
                        console.log('Success!!');
                    }
                })
            });
        }
    })
});
    $('#save-pastyche').on('click', function(e){
        e.preventDefault();
        console.log("SAVE CLICKED");
        $.ajax('/save', {
            type:'post',
            data: {savedPastycheData : savedPastycheData}
        });
    });
});
