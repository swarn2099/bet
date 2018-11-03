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
        $("#inviteCard").hide("slow");
        $("#nameCard").show("slow");
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
