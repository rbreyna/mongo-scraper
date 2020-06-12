
    var savedArticles = [];

   $(".saveArticle").click(function(){
        
        let index = $(this).attr("data-position");
        let link = $("#"+index).attr("href");
        let title = $("#"+index).text();

        console.log(link);
        console.log(title);
       
        $.ajax({
            method: "POST",
            url: "/api/saveArticle/",
            data:{
                title: title,
                link: link
            }
        })
            .then(function (data) {
                console.log("SAVED!")
            });
    })
    
    // When you click the addNote button
    $(document).on("click", ".submit", function () {
        // Grab the id associated with the article from the submit button
        let thisId = $(this).attr("id");
        let title = $("#titleinput-"+thisId).val().trim();
        let body = $("#bodyinput-"+thisId).val().trim();
        
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: title,
                // Value taken from note textarea
                body: body
            }
        })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);
            });

        // Also, remove the values entered in the input and textarea for note entry
        $("#titleinput-"+thisId).val("");
        $("#bodyinput-"+thisId).val("");
    });

    $(".allNotes").click(function(){

        let index = $(this).attr("id");

        $.ajax({
            method: "GET",
            url: "/savedNotes/" + index,
            data:{
                id: index
            }
        }).then(function(data){
            console.log(data)
        })
    })

    $(".deleteArticle").click(function(){
        
        let index = $(this).attr("id");

        $.ajax({
            method: "GET",
            url: "/delete/" + index,
            data:{
                id: index
            }
        })
            .then(function (data) {
                console.log("DELETED!")
            });
    });