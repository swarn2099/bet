// party1 is path to the eligibleCode collection
var party1 = db.collection("eligibleCode").doc("party1");
// Setting inviteCodeArray equal to the allowed array[] in party1 document
// userInputCode is to get the code the user inputs onto the site
// parent var is for the prent path to be used in the real time database
// newcode var is to generate the new invite code and convert the number to string

var inviteCodeArray, userInputCode, parent, newcode;

/*
 Document ready => ()
  Hide 3 cards
 */





$(document).ready(function() {
  console.log("Welcome to BET, the tree invite system.");
  console.log("All systems GO ... waiting for user input");
  $("#nameCard").hide();
  $("#inviteOthers").hide();
  $("#tree").hide();
  $.getJSON( "tree.json", function( json ) {
    console.log( "JSON Data received, name is " + json.name);
});
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
  userInputCode = document.getElementById('invite_code');


  // To update age and favorite color:
  db.collection("partyTree").doc("treeJSON").get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
  // 2.) Finds the user whose code was just used
  db.collection("partyTree").where("myCode", "==", userInputCode.value).get().then(
      function(querySnapshot) {
        if(querySnapshot){
          querySnapshot.forEach(function(doc) {
            // 3a.) If the user was found AND the code has been used less than 3 times
            if (doc.data().timesUsed < 2) {
              console.log("Code is valid");
              //This guy is the parent so setting parent var to his name
              parent = doc.data().name;
              console.log("Parent => ", parent);

              // Hiding the invite card and showing the name card
              $("#inviteCard").hide('fadeOutLeft');
              $("#nameCard").show();
            }
            // 3b.) Code was used more than 2 times so display error message
            else if( doc.data().timesUsed >= 2){
              M.toast({
               html: 'Uh-Oh, this invite code has already been used more than 2 times',
               classes: 'red white-text',
               style: 'border-radius: 25px;'
             });
            }
          })
        }else{
          M.toast({
           html: 'Uh-Oh, this invite code seems to be invalid',
           classes: 'red white-text',
           style: 'border-radius: 25px;'
         });
       }

      })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
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

function addUsertoTree() {
  // 1.) Get user name entered in the site
  var userName = document.getElementById('name');
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
  // Updating times used since it was just used once
  // db.collection("partyTree").doc(parent).update({
  //     timesUsed: doc.data().timesUsed + 1,
  //   })
  //   .then(function() {
  //     console.log("Times Used field updated...");
  //   });
  //
  // 6.) Adding new node in the realtime database with the name of the user and the parent of node
  firebase.database().ref(userName.value).set({
    parent:  parent,
    text: {
      name: userName.value
    }
  });

  // 7.)  Display new code on the invite others card
  document.getElementById('myCode').innerHTML += '<h4><span class="heavy-text"><b>' + newcode + '</b></span></h4>';

  // 8.) Hide name card and show inviteOthers and tree card
  $("#nameCard").hide("slow");
  $("#inviteOthers").show("slow");
  $("#tree").show("slow")
}
