//db.article.findOne - find the article by id to assign note/save/delete
//db.article.findAll - all articles 
//db.article.post
$(document).ready(function() {
    console.log("This is working");

    $(".save-article").on("click", function() {
        var id = $(this).data("id").trim()
        $.get("/saved/" + id)
        console.log(id);
    })

//delete one 
//delete many
//wire up the scrape as on click event

})