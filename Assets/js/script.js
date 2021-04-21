var currentDate = $("#currentDay"); //references the id currentDay in the html
var eachTimeBlock = $(".time-block"); //references the class time-block in the html
 
function todaysDate() {
    var formatedDate = moment().format("MMM Do, YYYY"); //formats the date
    currentDate.text("Today's Date is:  " + formatedDate); //displays the current date
    
    eachTimeBlock.each(function() { 
        //creates a variable where currentHour is the actual hour 
        var currentHour = moment().hours()
        //data and time is referencing the html class "data-time" followed by the current hour via military hours
        if(currentHour === $(this).data().time) { //if currentHour(actual time) is equal to the "data-time" then add the class present
            $(this).children("textarea").addClass("present"); //textarea will be higlighted red
        } 
        else if(currentHour > $(this).data().time) { //if currentHour(actual time) is less than the "data-time" then add the class past
            $(this).children("textarea").addClass("past"); //textarea will be higlighted grey
        }
        else { //if currentHour(actual time) is not less than or equal to the "data-time" then add the class future
            $(this).children("textarea").addClass("future"); //textarea will be higlighted grey    
        }
    });
}
 
todaysDate(); //calls the function todaysDate
setInterval(todaysDate(), 10000); //lets the function todaysDate be automatically updated every 10 seconds so the colors of the 'textarea' will always
//be updated
 
$(".saveBtn").on("click", function() { //allows user to save their text once the button with class saveBtn is clicked on
    var event = $(this).siblings("textarea").val(); //makes event as the acutal text or  '.val' that was entered in the 'textarea'
    var timeInRealLife = $(this).parent(".time-block").data("time");
    localStorage.setItem(timeInRealLife, event); //sets both variables 'event' and 'timeInRealLife'
});
 
$("textarea").each(function() { //for each 'textarea' 
    var getTime = $(this).parent(".time-block").data("time");
    $(this).val(localStorage.getItem(getTime));
});