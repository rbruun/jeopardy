(function () {

    $(function () {
        let answer;
        let value;
        let questionid = $("#questionID");
        let category = $("#category");
        let question = $("#question");
        let score = $("#score");
        let submitButton = $("#submit");
        let answerInput = $("#answer");
        let result = $("#result");

        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        $("button[catid]").each(function () {
            let button = $(this);
            $.get("http://jservice.io/api/categories?offset=" + getRandom(1, 17000), function (data) {
                button.text(data[0].title);
                button.attr("catid", data[0].id);
                button.attr("title", data[0].title);
            });

        })
        $(".category").each(function () {
            let thisdiv = $(this);
            $.get("http://jservice.io/api/categories?offset=" + getRandom(1, 17000), function (data) {
                thisdiv.text(data[0].title);
                thisdiv.parent().attr("catid", data[0].id);
                //button.attr("title", data[0].title);
            });

        })
        $(".question").click(function () {
            let clickeddiv = $(this);
            if (clickeddiv.attr("clicked") == "false") {
                let catid = clickeddiv.parent().attr("catid");
                let qvalue = clickeddiv.attr("value");
                let query = "?category=" + catid + "&value=" + qvalue;
                result.text("");
                console.log(query);
                $.get("http://jservice.io/api/clues" + query, function (data) {
                    questionid.text(data[0].id);
                    category.text(data[0].category.title);
                    question.text(data[0].question);
                    answer = data[0].answer;
                    value = data[0].value;
                    clickeddiv.text(data[0].question);
                    clickeddiv.addClass("questiontext");
                    clickeddiv.attr("clicked", "true");
                });
            }
        });

        submitButton.click(function () {
            console.log(answerInput.val().toLowerCase() + " : " + answer.toLowerCase() + " : " + value);
            if (answerInput.val().toLowerCase() == answer.toLowerCase()) {
                console.log("correct");
                score.text(parseInt(score.text()) + value);
                result.text("That is correct");
            } else {
                result.text("The correct answer is: " + answer);
            }
            answerInput.val("");
        })
    });
})();
