const gotit = document.querySelector("#gotit")
const navbar = document.querySelector("#navi")
const navcontainer = document.querySelector("#navcontainer")




// function to close notification when button clicked
const close = () => {
    var x = navbar;
    var y = navcontainer;
    x.classList.toggle('hide')
}

// event listener for notification panel to close the element after button clicked
gotit.addEventListener('click', close)

const showdoc = () => {
    $(document).scroll(function(){
    var y = $(this).scrollTop();
        if (y > 10) {
        $('.newsletter-container').slideDown();
        } else {
        $('.newsletter-container').slideUp();
        } 
    })
}

$(document).ready(function(){
    $("#newsletter").hide()    // hiding newspanel for initial state
    
    // handle newsletter to slide up when scroll 1/3 document when the document is ready
    $(document).scroll(function(){
        var y = $(this).scrollTop();
            if (y > 50) {
            $('.newsletter-container').slideDown();
            } else {
            $('.newsletter-container').slideUp();
            } 
    })

    //handle event close button on newsletter panel is clicked
    $("#newsbutton").click(function(){
        var obj = document.querySelector('#newsletter'); //selecting element and store to an object
        sessionStorage.setItem("visited", "true") // setting session value
        obj.style.visibility = 'visible' // set the element visibility to be checked

        if(obj.style.visibility == 'visible'){ //checking if visibility is hidden or not
            $("#newsletter").slideUp( "slow",function(){ // transition to hide element with slide
                obj.style.visibility = 'hidden' // making element hidden after transition
                var waktu = new Date().getTime(); // getting time when element is hidden
                localStorage.setItem("waktu", waktu) // store the time to localstorage
                console.log("waktusekarang=",waktu) // this is just for checking the value of time in millisecond
        
            })  
        }
    })
      
})

// code below is comparing current timestamp with the timestamp that the close button for newsletter is clicked
// store the difference between timestamp when button clicked with current timestamp after button clicked
// if the difference is more than 10 minute (600000 millisecond) then set the newsletter element visibility to show with transition of slideDown()
// else if the difference is less than 10 minute set the visibility to stay hidden
// so the element will stay hidden after the close button is pressed for 10 minute
// when the 10 minute passed, the element will show up again
// and if clicked again, the "selisih" value will be restarted to 0 again and continued
if(localStorage.getItem("waktu")){
    var obj = document.querySelector('#newsletter');
    var currentTime = new Date().getTime();
    var previousTime = localStorage.getItem("waktu")
    var selisih = currentTime - previousTime;
    if(selisih >  10 * 60 * 1000){
         $("#newsletter").slideDown()
         obj.style.visibility = 'visible'
    }else{
        obj.style.visibility = 'hidden'
    }
    // this is to check the difference value 
    console.log("selisih =",selisih)
}


// check if we can use localstorage or not
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}


// check localstorage availability by printing string
if (storageAvailable('localStorage')) {
    console.log("yes")
  }
  else {
    console.log("aoohhhh")

  }



