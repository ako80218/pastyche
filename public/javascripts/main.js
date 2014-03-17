$(function(){
    // console.log("LOADED!");
    // 
    ///////////////////////////// MODEL
    //This function randomly selects an element in an array
    var randomSelectOne = function(arr){
         var selectedIndex = Math.floor(Math.random() * (arr.length));
        return arr[selectedIndex];
    };
    var pastycheArray=[];
    var pastycheObject ={};
///////////////////////////// VIEW
//This function assembles the tags link element and places it in the nav bar        
    var buildTagsLink = function(){
         $('#navbar-header').append('<ul id="tags-link-element" class="nav navbar-nav"><li><a id="tags-link" href="#"><span class="glyphicon glyphicon-tags"></span></a></li>');
    };
    
//////////////////////////// CONTROL
    
$('#photo-search-button').on('click', function(e){
    e.preventDefault();
    var searchTerm = $(this).siblings('div').children('#photo-search-input').val();
    console.log("searchTerm:  ", searchTerm);
    $.ajax('/search', {
        data: {searchTerm:searchTerm},
        success: function(data){
            pastycheObject=data;
            pastycheArray=data.photo;
            var selectedPhoto=randomSelectOne(pastycheObject.photo);
            jade.render($('#pastyche')[0], 'pastyche', pastycheObject);
             $("#background").empty().hide();
            jade.render($('#background')[0], 'pastyche-background', selectedPhoto);
            $('#background').fadeIn(600);
            if($('#tags-link-element').length ===0){
                buildTagsLink();
            }else{
                $('#tags-link-element').remove();
                buildTagsLink();
            }  
        }
    });    
});
$(document).on('click',  '#tags-link', function(e){
    e.preventDefault();
    console.log("pastycheObject.photo: ", pastycheObject.photo);
    var photoIDs={};

    photoIDs.IDs = _.pluck(pastycheObject.photo, 'id');

    console.log("photoIDs.IDs ", photoIDs.IDs);
    var photoTags=[];
    for(var i=0; i<photoIDs.IDs.length; i++){
        var queryID={id:photoIDs.IDs[i].toString()}
        console.log('photoIDs.IDs[i]: ', photoIDs.IDs[i]);
        $.ajax('/photo-tags',{
            data:queryID,
            success: function(data){
                // console.log("RETURNED:   ", data);
                // console.log('data.photo.tags.tag: ', data.photo.tags.tag)
                for(var j=0; j<data.photo.tags.tag.length; j++){
                    photoTags.push(data.photo.tags.tag[j].raw);
                }
                
            }
        });
    }
    console.log('PHOTO Tags:',photoTags);

    $('#tag-cloud').toggleClass('col-sm-3');
    $('#pastyche').toggleClass('col-sm-9');
    $('#pastyche').toggleClass('col-sm-12');
});

    $('#save-pastyche').on('click', function(e){
        e.preventDefault();
        console.log("SAVE CLICKED");
        $.ajax('/save', {
            type:'post',
            data: {savedPastycheData : pastycheArray}
        });
    });
});
