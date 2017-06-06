(function () {

    $(function () {
        let answer;
        let value;
        getRandomQuestion();

        function getRandomQuestion() {
            $.get("http://jservice.io/api/random", function(data) {
                $("#questionID").text(data[0].id);
                $("#category").text(data[0].category.title);
                $("#question").text(data[0].question);
                
                answer = data[0].answer;
                value = data[0].value
            });
        }

        $("#submit").click(function () {
            console.log($("#answer").val() + " : " + answer);
            if ($("#answer").val().toLowerCase() == answer.toLowercase()) {
                console.log("correct");
                $("#score").text(parseInt($("#score").text()) + value);
            }
            $("#answer").val("");
            getRandomQuestion();
        })
    });
})();
