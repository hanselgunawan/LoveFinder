/**
 * Created by hansel.tritama on 11/13/17.
 */
let totalQuestion = 10;
let answerPoints = [];

function nullizeArray()
{
    for(let i=0;i<totalQuestion;i++)
    {
        answerPoints[i] = 0;
    }
}

$(document).ready(function() {
    nullizeArray();
    $(document).on("change", "select", function () {
        let str_selectedID = $(this).attr("id");
        let selectedID = str_selectedID.substring(14, str_selectedID.length) - 1;//array starts from 0
        let selectedOption = $("#"+str_selectedID+"").children(":selected").text();
        answerPoints[selectedID] = selectedOption;
    });

    $(document).on("click", "#submitBtn", function () {
        if(_.contains(answerPoints, 0) || $("#userName").val() === "" || $("#userImgLink").val() === "")
        {
            alert("Please fill all the questions.");
        }
        else
        {
            $(".classModal").attr("id", "myModal");
            $("#submitBtn").trigger("click");
            // let userInfo = {
            //     name: $("#userName").val().trim(),
            //     photo: $("#userImgLink").val().trim(),
            //     scores: answerPoints
            // };
            //
            // $.post("/api/friends", userInfo).done((data) =>{
            //     alert("Thank you, " + userInfo.name);
            // });
        }
    });
});