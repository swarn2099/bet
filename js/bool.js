/*party1 is path to the eligibleCode collection
Setting inviteCodeArray equal to the allowed array[] in party1 document
userInputCode is to get the code the user inputs onto the site
parent var is for the prent path to be used in the real time database
newcode var is to generate the new invite code and convert the number to string
var party1 = db.collection("eligibleCode").doc("party1");
var inviteCodeArray, userInputCode, parent, newcode;*/
var parent, orderGod, currentOrder, spotOutPut;
var docRef = db.collection("partyTree");
var statRef = db.collection("partyStats").doc("Spots");
/*
 Document ready => ()
  Hide 3 cards
 */

$(document).ready(function() {
  // console.log("Welcome to BET, the tree invite system.");
  // console.log("All systems GO ... waiting for user input");
  $('.enter_link').click(function() {
       $(this).parent().fadeOut(500);
});
  $("#nameCard").hide();
  $("#displayCode").hide();
  $("#tree").hide();
  // $("#invite").hide();

//Reading Stats
console.log("reading stats");
statRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
         spotOutPut = doc.data().spots;
         document.getElementById("spots").innerHTML = spotOutPut;

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
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
  var userInputCode = document.getElementById('invite_code');
  console.log(userInputCode.value);
  // 2.) Finds the user whose code was just used
  docRef.where("myCode", "==", userInputCode.value).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      // 3a.) If the user was found AND the code has been used less than 3 times
      if (doc.data().timesUsed < 2) {
        console.log("Code is valid");
        //This guy is the parent so setting parent var to his name
        currentOrder = doc.data().order;
        orderGod = (2 * currentOrder);
        console.log("Current order: ", currentOrder);
        console.log("2n order: ", orderGod);

        /* Findng the order of the parent and then assigning orderGod for the newUser. Remeber rule is 2n or 2n+1.
        1.) Look through the entire collection and first check if there is a 2n order value
          => If there is, then set orderGod equal to 2n+1 otherwise its 2n */
          docRef.where("order", "==", orderGod)
              .get()
              .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                      // doc.data() is never undefined for query doc snapshots
                      console.log("Looks like someone already has this order, setting orderGod equal to 2n+1");
                      orderGod = orderGod + 1;
                      console.log("orderGod is: ", orderGod);
                  });
              })
              .catch(function(error) {
                  console.log("Error getting documents: ", error);
              });


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


  // 2.) Generate new code and convert to string
  newcode = Math.floor(Math.random() * 90000) + 10000;
  newcode = newcode.toString();

  // 5.) New user document object for firestore document
  var newUser = {
    myCode: newcode,
    name: userName.value,
    text: {
      name: userName.value
    },
    order: orderGod,
    orderToLookFor: currentOrder,
    children: [],
    timesUsed: 0,
  };
  // Add new user to the party tree collection in firestore
  docRef.doc(userName.value).set(newUser).then(function() {
    console.log("New user document created in the partyTree collection");
  });
  setTimeout(function tree(){var arr = [];
  db.collection("partyTree").orderBy("order").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // console.log(doc.id, " => ", doc.data());
        arr.push(doc.data());
    });
    console.log("After first push", arr);
    for (var i = arr.length -1 ; i >0; i--) {
      for (var j = 0; j < arr.length-1; j++) {
      if (arr[i].orderToLookFor == arr[j].order) {
        var pos = j;
      }
  }
      console.log("Current Person: ", arr[i].name, " => Current order: ", arr[i].order)
      console.log("Person to look for: ", arr[pos].name, " => Person's order: ", arr[pos].order)

      var textAppend = {
        text: {
          name: arr[i].name
        },
        children: arr[i].children
      }
      var r = arr[pos].children;
      r.push(textAppend);
    }
    console.log("FINAL ARR AFTER PUSHES");
    console.log(arr[0]);

    var text = arr[0].name;
    localStorage.setItem('treeF', JSON.stringify(arr[0].children));
    localStorage.setItem('textF', text);
    var finalTree = JSON.parse(localStorage.getItem('treeF'));
    var finalText = localStorage.getItem('textF');

    var chart_config = {
      chart: {
        container: "#basic-example",
        levelSeparation: 20,
        siblingSeparation: 10,
        // subTeeSeparation: 6,
        nodeAlign: "TOP",
        connectors: {
          style: {
            stroke: 'white'

          }
        },

        node: {
        },
        animation: {
          nodeAnimation: "easeOutBounce",
          nodeSpeed: 700,
          connectorsAnimation: "bounce",
          connectorsSpeed: 700
        }
      },
      nodeStructure: {
        text: {
          name: finalText
        },
        children: finalTree
      }
    };
    console.log(chart_config);
    new Treant(chart_config);
  });

}, 1000);

  document.getElementById("basicContainer").innerHTML = '<div id="basic-example" style="width:auto; height: 160px"></div>';




  // 8.) Hide name card and show inviteOthers and tree card
  $("#nameCard").hide("slow");
  $("#inviteOthers").show("slow");
  $("#tree").show("slow")
  M.toast({
    html: 'Congrats! You have been added to the tree. You have 8 hours starting now to invite 2 friends.',
    classes: 'teal white-text',
    style: 'border-radius: 25px;'
  });
  writeCode(newcode);

  return db.runTransaction(function(transaction) {
    // This code may get re-run multiple times if there are conflicts.
    return transaction.get(statRef).then(function(sfDoc) {
        if (!sfDoc.exists) {
            throw "Document does not exist!";
        }

        var spotsNew = sfDoc.data().spots - 1;
        transaction.update(statRef, { spots: spotsNew });
    });
}).then(function() {
    console.log("Transaction successfully committed!");
}).catch(function(error) {
    console.log("Transaction failed: ", error);
});
}

function writeCode(newcode){
  // Display the result in the element with id="demo"
  document.getElementById("codeOutput").innerHTML = newcode;
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
