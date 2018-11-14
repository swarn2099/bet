var arr = [];
var citiesRef = db.collection("partyTree");
citiesRef.orderBy("order").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    // console.log(doc.id, " => ", doc.data());
    arr.push(doc.data());
  });
  // console.log(arr);
  for (var i = arr.length - 1; i > 0; i--) {
    // console.log("i is: ", i);
    // console.log("This is the current array: ", arr[i].children);
    // console.log("i / 2 is: ", Math.floor(i / 2));

    if ((i + 1) % 2 == 1) {
      // console.log("This is where the current array should go into: ", arr[(i / 2) - 1].children[1]);
      var r = arr[(i / 2) - 1].children;
      r = r[1];
      // console.log("r is: ", r)
      r.children = arr[i].children;
    } else {
      // console.log("This is where the current array should go into: ", arr[Math.floor(i / 2)].children[0]);
      var r = arr[Math.floor(i / 2)].children;
      r = r[0];
      // console.log("r is: ", r)
      r.children = arr[i].children;

    }
  }
  // console.log("FINAL ARR AFTER PUSHES");
  // console.log(arr);
  var tree = arr[0].children;
  var text = arr[0].name;
  localStorage.setItem('treeF', JSON.stringify(tree));
  localStorage.setItem('textF', text);
});
var finalTree = JSON.parse(localStorage.getItem('treeF'));
var finalText = localStorage.getItem('textF');

var chart_config = {
  chart: {
    container: "#basic-example",
    levelSeparation: 5,
    siblingSeparation: 5,
    subTeeSeparation: 5,
    // nodeAlign: "TOP",
    connectors: {
      type: 'step'
    },
    animateOnInit: true,

    node: {
      collapsable: true
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
