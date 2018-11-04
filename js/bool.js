var docRef = db.collection("eligibleCode").doc("party1");
var array;

$(document).ready(function() {
  console.log("ready!");
  $("#nameCard").hide();
  $("#inviteOthers").hide();
  $("#tree").hide();
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }
  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  // Checks if should display install popup notification:
  if (isIos() && !isInStandaloneMode()) {
    this.setState({
      showInstallMessage: true
    });
  }

});


function checkInviteCode() {
  var code = document.getElementById('invite_code');
  docRef.get().then(function(doc) {
    if (doc.exists) {
      var lol = doc.data().allowed.includes(code.value);
      if (lol) {
        console.log("it exsists");
        $("#inviteCard").hide('fadeOutLeft');
        $("#nameCard").show();
      } else {
        console.log("it doesnt");
        M.toast({
          html: 'Uh-Oh, that invite code is invalid',
          classes: 'red white-text'
        });
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
}

function addUsertoTree() {
  var newcode = Math.floor(Math.random() * 90000) + 10000;
  var code = document.getElementById('invite_code');
  var name = document.getElementById('name');
  console.log(name.value);
  var docData = {
    invitedBy: code.value,
    code: newcode,
  };
  db.collection("partyTree").doc(name.value).set(docData).then(function() {
    console.log("Document successfully written!");
  });
  $("#nameCard").hide("slow");
  $("#inviteOthers").show("slow");
  document.getElementById('myCode').innerHTML += '<h4><span class="heavy-text"><b>' + newcode + '</b></span></h4>';

  $("#tree").show("slow")
}


function copyToClipboard() {
  //   var str = "link";
  // var result = str.link("https://swarn2099.github.io/bet");
  // var $temp = $("<input>");
  // $("body").append($temp);
  //
  //  $temp.val('Hey there, you have been invited to a party. Go to swarn2099.github.io/bet and enter the following invite code to confirm your spot: '+ $('#myCode').text()).select();
  //
  // document.execCommand("copy");
  // $temp.remove();
  //   alert("Your code has been copied. Just paste it in the messaging app of you choice and send it. Remeber you only get 2 invited." );

  navigator.clipboard.writeText('Hey there, you have been invited to a party. Go to swarn2099.github.io/bet and enter the following invite code to confirm your spot:')
    .then(() => {
      console.log('Text copied to clipboard');
    })
    .catch(err => {
      // This can happen if the user denies clipboard permissions:
      console.error('Could not copy text: ', err);
    });

}

// function share() {
//   /* Get the text field */
//   var $temp = $("<input>");
// $("body").append($temp);
// $temp.val($(element).text()).select();
// document.execCommand("copy");
// $temp.remove();
//
//   var str = "link";
// var result = str.link("https://swarn2099.github.io/bet");
//   var copyText = 'Hey there,' + name.value + ' has invited you to a party. Enter the folloring invite code at this '+result+' to confirm your spot:'+ document.getElementById("myCode");
//
//   /* Select the text field */
//   copyText.select();
//
//   /* Copy the text inside the text field */
//   document.execCommand("copy");
//
//   /* Alert the copied text */
//   alert("Copied the text: " + copyText.value);
// }
