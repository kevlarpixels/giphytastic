//set up gif criteria

var topics = [
    'Street Fighter', 'Sonic the Hedgehog',
    'Mortal Kombat', 'Silent Hill', 'Xenogears',
    'Final Fantasy', 'Madden NFL', 'Call of Duty'
]

var numberOfGIFs = 10;
var cutOffRating = "PG";

//create a button to add new giphs

function renderButtons() {

    for (let i = 0; i < topics.length; i++) {
        var button = $('<button>');
        button.addClass('btn');
        button.addClass('videoGames-buton')
        button.text(topics[i]);
        $('#bttnContainer').append(button);

    }

    $('.videoGames-buton').unbind('click');

    $('.videoGames-buton').on('click', function () {
        $('.gifImage').unbind('click');
        $('#gifContainer').empty();
        populateGIFContainer($(this).text());
    });

}

function addButton(game) {
    if (topics.indexOf(game) === -1) {
        topics.push(game);
        $('#bttnContainer').empty();
        renderButtons();
    }
}

function populateGIFContainer(game) {
    $.ajax({
        url:

            "https://api.giphy.com/v1/gifs/search?api_key=TWb3Yoa4iDZ75XydYt6KzvWliOv4e3qg&q=" 
            + game + "&limit=" + numberOfGIFs 
            + "&offset=0&rating=" + cutOffRating + "&lang=en",

        method: "GET"
    }).then(function (response) {
        response.data.forEach(function (element) {
            newDiv = $("<div>");
            newDiv.addClass("individual-gif-container");
            newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
            var newImage = $("<img class='images' src = '" + element.images.fixed_height_still.url + "'>");
            newImage.addClass("gifImage");
            newImage.attr("state", "still");
            newImage.attr("still-data", element.images.fixed_height_still.url);
            newImage.attr("animated-data", element.images.fixed_height.url);
            newDiv.append(newImage);
            $("#gifContainer").append(newDiv);
        });


        $(".gifImage").unbind("click");
        $(".gifImage").on("click", function () {
            if ($(this).attr("state") === "still") {
                $(this).attr("state", "animated");
                $(this).attr("src", $(this).attr("animated-data"));
            }
            else {
                $(this).attr("state", "still");
                $(this).attr("src", $(this).attr("still-data"));
            }
        });
    });
}

$(document).ready(function () {
    renderButtons();
    $("#submit").on("click", function () {
        event.preventDefault();
        addButton($("#videoGame").val().trim());
        $("#videoGame").val("");
    });
});
