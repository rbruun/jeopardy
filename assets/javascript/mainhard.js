(function () {

    $(function () {
        let answer;
        let value;
        let score = $("#score");
        let submitButton = $("#submit");
        let answerInput = $("#answer");
        let result = $("#result");

        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        // select each of the category divs, loop over each of them and call api to get a category for each
        $(".category").each(function () {
            let thisdiv = $(this);
            $.get("http://jservice.io/api/categories?offset=" + getRandom(1, 17000), function (data) {
                thisdiv.text(data[0].title);
                //set the cat id on the parent div so later it is easier to get this no matter which question div is selected
                thisdiv.parent().attr("catid", data[0].id);
            });

        })
        
        // this function is executed whenever a question category/value is clicked
        $(".question").click(function () {
            let clickeddiv = $(this);
            // first check if this question has already been clicked
            if (clickeddiv.attr("clicked") == "false") {
                // get the category id from the parent div
                let catid = clickeddiv.parent().attr("catid");
                let qvalue = clickeddiv.attr("value");
                let query = "?category=" + catid + "&value=" + qvalue;
                result.text("");
                console.log(query);
                // call the api for the specific category and question value that was clicked
                $.get("http://jservice.io/api/clues" + query, function (data) {
                    answer = data[0].answer;
                    value = data[0].value;
                    //put the question text in the div that was clicked
                    clickeddiv.text(data[0].question);
                    // add the class to display the question in the smaller font
                    clickeddiv.addClass("questiontext");
                    // set the attribute so this question can't be clicked again
                    clickeddiv.attr("clicked", "true");
                });
            }
        });

        // this function is called whenever the submit button is clicked
        submitButton.click(function () {
            console.log(answerInput.val().toLowerCase() + " : " + answer.toLowerCase() + " : " + value);
            if (answerInput.val().toLowerCase() == answer.toLowerCase()) {
                score.text(parseInt(score.text()) + value);
                result.text("That is correct");
            } else {
                result.text("The correct answer is: " + answer);
            }
            answerInput.val("");
        })
    });
})();
