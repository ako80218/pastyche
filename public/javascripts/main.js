var test;
$(function(){
$('#tag-cloud').hide();
    // console.log("LOADED!");
    // 
    ///////////////////////////// MODEL
    //This function randomly selects an element in an array
    var randomSelectOne = function(arr){
         var selectedIndex = Math.floor(Math.random() * (arr.length));
        return arr[selectedIndex];
    };
    var setTagWeights = function(arr){
        var tagWeights ={};
        var maxValue;
        for(var i =0; i<arr.length; i++){
            maxValue=arr[0].count;
            var tagWeight=(arr[i].count)/maxValue;
            var tagFontSize=tagWeight> 0.2 ? (((tagWeight)*3.0).toFixed(1)).toString() + 'em' : '1em';
            tagWeights[arr[i].tag] = tagFontSize;
        }
            return tagWeights;
}
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
            pastycheObject.backgroundPhoto=randomSelectOne(pastycheObject.photo);
            pastycheObject.allTags=[];
            // console.log("pastycheObject.photo: ",pastycheObject.photo);
            _.each(pastycheObject.photo, function(obj){
                return pastycheObject.allTags.push(obj.tags.split(' '));
            });
           var tagCounts= _.chain(pastycheObject.allTags).flatten().countBy(function(tag){
                return tag;
            }).value();
           var tagArray=[];
           for (var i in tagCounts){
                tagArray.push({tag:i,count:tagCounts[i]})
            } 
            tagArray = _.chain(tagArray).sortBy(function(tag){
                return tag.count

            }).last(50).value().reverse();
            var tagTemplateObj={};
            tagTemplateObj.weights=setTagWeights(tagArray);
            tagTemplateObj.tags=_.keys(tagTemplateObj.weights);
            // $('#tag-cloud').hide();
            jade.render($('#tag-cloud')[0], 'tag-cloud-template', tagTemplateObj);
            jade.render($('#pastyche')[0], 'pastyche', pastycheObject);
            $("#background").empty().hide();
            jade.render($('#background')[0], 'pastyche-background', pastycheObject.backgroundPhoto);
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
    $('#tag-cloud').toggle();
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
