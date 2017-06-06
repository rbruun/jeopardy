(function () {

    $(function () {
        let answer;
        let value;
        getRandomQuestion();

        function getRandomQuestion() {
            $.get("http://jservice.io/api/random", function (data) {
                $("#questionID").text(data[0].id);
                $("#category").text(data[0].category.title);
                $("#question").text(data[0].question);

                answer = data[0].answer;
                value = data[0].value
            });
        }

        $("#submit").click(function () {
            let enteredAnswer = $("#answer");
            console.log(enteredAnswer.val() + " : " + answer);
            if (enteredAnswer.val().toLowerCase() == answer.toLowerCase()) {
                console.log("correct");
                $("#score").text(parseInt($("#score").text()) + value);
            }
            enteredAnswer.val("");
            getRandomQuestion();
        })
    });
})();
