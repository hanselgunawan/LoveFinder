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
        answerPoints[selectedID] = parseInt(selectedOption.substring(0,1));
    });

    $(document).on("click", "#submitBtn", function () {
        if(_.contains(answerPoints, 0) || $("#userName").val() === "" || $("#userImgLink").val() === "")
        {
            alert("Please fill all the questions.");
            $("#myModal").modal("hide");
        }
        else
        {
            let defaultPic = "https://conferencecloud-assets.s3.amazonaws.com/default_avatar.png";
            let photoUrl = $("#userImgLink").val().trim();
            if(photoUrl.substring(photoUrl.length, photoUrl.length-4) === ".jpg" || photoUrl.substring(photoUrl.length, photoUrl.length-4) === ".png"
            || photoUrl.substring(photoUrl.length, photoUrl.length-4) === ".gif" || photoUrl.substring(photoUrl.length, photoUrl.length-4) === ".jpeg")
            {
                defaultPic = photoUrl;
            }
            let userInfo = {
                name: $("#userName").val().trim(),
                photo: defaultPic,
                scores: answerPoints
            };
            let currentUserScore = _.reduce(userInfo.scores, function(memo, num){ return (memo + num); }, 0);
            $.post("/api/friends", userInfo).done((data) =>{
                $.get("/api/friends", (data) => {
                    let matchArr = [];
                    if(data.length<=1)
                    {
                        $("#matchName").html("No Match");
                        $("#matchImg").attr("src", "https://conferencecloud-assets.s3.amazonaws.com/default_avatar.png");
                        $("#myModal").modal("show");
                        //console.log(JSON.stringify(data));
                        //console.log(data[0]["scores[]"]);
                    }
                    else
                    {
                        for(let i=0;i<data.length-1;i++)
                        {
                            let matchedUserScore = _.reduce(data[i]["scores[]"], function(total, num){ return total + parseInt(num); }, 0);
                            console.log("matchedUserScore: " + matchedUserScore);
                            console.log("currentUserScore: " + currentUserScore);
                            let diffCurrMatchedScore = Math.abs(currentUserScore - matchedUserScore);
                            console.log("diffCurrMatchedScore: " + diffCurrMatchedScore);
                            matchArr.push({
                                candidateNo: i,
                                diffNum:diffCurrMatchedScore
                            });
                        }
                        console.log(data);
                        let min_object = _.min(matchArr, function(object){return object.diffNum});
                        $("#matchName").html(data[min_object.candidateNo].name);
                        $("#matchImg").attr("src", data[min_object.candidateNo].photo);
                        $("#myModal").modal("show");
                        console.log(matchArr);
                    }
                });
            });
        }
    });
});