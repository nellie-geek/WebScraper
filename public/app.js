//db.article.findOne - find the article by id to assign note/save/delete
//db.article.findAll - all articles 
//db.article.post
$(document).ready(function () {
    console.log("This is working");

    $(".scrape").on("click", function () {
        $.get("/scrape")
        $.getJson("/", function(dbArticleData) {
            res.json(dbArticleData)
        })
        
    });
    // location.reload();

    $(".save-article").on("click", function () {
        var id = $(this).data("id")
        $.get("/saved/" + id)

    });

})

//delete one 
//delete many
//wire up the scrape as on click event
