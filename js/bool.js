var docRef = db.collection("eligibleCode").doc("party1");
var array;



function checkInviteCode(){
  var code = document.getElementById('invite_code');
  docRef.get().then(function(doc) {
      if (doc.exists) {

           var lol = doc.data().allowed.includes(code.value);
           if(lol){
             window.open('home.html', '_self')
             console.log("it exsists");
           }else{
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
