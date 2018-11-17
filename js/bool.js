/*party1 is path to the eligibleCode collection
Setting inviteCodeArray equal to the allowed array[] in party1 document
userInputCode is to get the code the user inputs onto the site
parent var is for the prent path to be used in the real time database
newcode var is to generate the new invite code and convert the number to string
var party1 = db.collection("eligibleCode").doc("party1");
var inviteCodeArray, userInputCode, parent, newcode;*/
var parent;
/*
 Document ready => ()
  Hide 3 cards
 */

$(document).ready(function() {
  // console.log("Welcome to BET, the tree invite system.");
  // console.log("All systems GO ... waiting for user input");
  $("#nameCard").hide();
  $("#displayCode").hide();
  $("#tree").hide();
  // $("#invite").hide();

});

/* Function to check invite code => checkInviteCode()
--------------------------------------------------------------------------------
   1.) Get the code enetered by the user in var userInputCode
   2.) Finds the user whose code was just used
   3a.) If the user was found AND the code has been used less than 2 times
            ()=>{
              => This guy is the parent so setting parent var to his name
              => Updating times used since it was just used once
              => Hiding the invite card and showing the name card
            }
   3b.) Else code was used more than 2 times so display error message


   --------------------------END OF FUNCTION------------------------------------
*/

function checkInviteCode() {
  // 1.) Get the code enetered by the user in var userInputCode
  var userInputCode = document.getElementById('invite_code');
  console.log(userInputCode.value);
  // 2.) Finds the user whose code was just used
  db.collection("partyTree").where("myCode", "==", userInputCode.value).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      // 3a.) If the user was found AND the code has been used less than 3 times
      if (doc.data().timesUsed < 2) {
        console.log("Code is valid");
        //This guy is the parent so setting parent var to his name
        parent = doc.data().name;
        console.log("Parent => ", parent);
        // Hiding the invite card and showing the name card
        $("#codeCard").hide('fadeOutLeft');
        $("#nameCard").show();
      }
      // 3b.) Code was used more than 2 times so display error message
      else if (doc.data().timesUsed >= 2) {
        M.toast({
          html: 'Uh-Oh, this invite code has already been used more than 2 times',
          classes: 'red white-text',
          style: 'border-radius: 25px;'
        });
      }
    });
  });

}

/* Function to add user to tree => addUsertoTree()
--------------------------------------------------------------------------------
   1.) Get user name entered in the site into userName
   2.) Generate new code and convert to string into newcode var
   3.) Push new invite code to inviteCodeArray[]
   4.) Updating allowed array[] in party1 document
   5.) New user object stored in newUser and added to the party tree collection
   6.) Adding new node in the realtime database with the name of the user and the parent of node
   7.) Display new code on the invite others card
   8.) Hide name card and show inviteOthers and tree card
*/

function addUser() {
  // 1.) Get user name entered in the site
  var userName = document.getElementById('name');
  $("#nameCard").hide();

  $("#displayCode").show();

  $("#tree").show();

  var textName={
    text:{
      name: userName.value
    }
  }

  db.collection("partyTree").doc(parent).update({
    children: firebase.firestore.FieldValue.arrayUnion(textName)
    })
    .then(function() {
      console.log("Document successfully updated!");
    });
  // 2.) Generate new code and convert to string
  newcode = Math.floor(Math.random() * 90000) + 10000;
  newcode = newcode.toString();

  // 5.) New user document object for firestore document
  var newUser = {
    invitedBy: parent,
    myCode: newcode,
    name: userName.value,
    timesUsed: 0,
  };
  // Add new user to the party tree collection in firestore
  db.collection("partyTree").doc(userName.value).set(newUser).then(function() {
    console.log("New user document created in the partyTree collection");
  });



  // 8.) Hide name card and show inviteOthers and tree card
  $("#nameCard").hide("slow");
  $("#inviteOthers").show("slow");
  $("#tree").show("slow")
}

//
// Set the date we're counting down to
var countDownDate = new Date("Dec 1, 2018 22:00:00").getTime();
// Update the count down every 1 second
var x = setInterval(function() {
  // Get todays date and time
  var now = new Date().getTime();
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h " +
    minutes + "m " + seconds + "s ";
  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
