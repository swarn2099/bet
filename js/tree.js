var arr = [];
var citiesRef = db.collection("partyTree");
citiesRef.orderBy("order").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    // console.log(doc.id, " => ", doc.data());
    arr.push(doc.data());
  });
  console.log(arr);
  for (var i = arr.length - 1; i > 3; i--) {
    // console.log("i is: ", i);
    // console.log("This is the current array: ", arr[i].children);
    // console.log("i / 2 is: ", Math.floor(i / 2));
    if (arr[i].order % 2 == 1) {
      var find = Math.floor((arr[i].order / 2));

      var pos = arr.findIndex(x => x.order == find);
      console.log("Current Person: ", arr[i].name, " => Current order: ", arr[i].order, "Person to look for: ", arr[pos].name, " => Order to look for: ", find)

      console.log("Position in array: ", pos);
      var r = arr[pos].children;
      r = r[0];
      r.children = arr[i].children;

      console.log("r is: ", r)
    } else {
      var find = Math.floor((arr[i].order / 2) - 1);

      var pos = arr.findIndex(x => x.order == find);
      if(pos == -1){
        pos = 0;
      }
      console.log("Even => Current Person: ", arr[i].name, " => Current order: ", arr[i].order, "Person to look for: ", arr[pos].name, " => Order to look for: ", find)

      console.log("Position in array: ", pos, "Current Status of children at pos: ", arr[pos].children);

        var r = arr[pos].children;
        r = r[1];
        r.children = arr[i].children;

        console.log("r is: ", r)
    }
    // if (i  % 2 == 1) {
    //   // console.log("This is where the current array should go into: ", arr[(i / 2) - 1].children[1]);
    //   var r = arr[Math.floor(i / 2)].children;
    //   r = r[1];
    //   // console.log("r is: ", r)
    //   r.children = arr[i].children;
    // } else {
    //   // console.log("This is where the current array should go into: ", arr[Math.floor(i / 2)].children[0]);
    //   var r = arr[Math.floor(i / 2)].children;
    //   r = r[0];
    //   // console.log("r is: ", r)
    //   r.children = arr[i].children;
    // }
  }
  console.log("FINAL ARR AFTER PUSHES");
  console.log(arr);
  arr[0].children = arr.slice(1, 3 + 1);
  console.log("current: ", arr[0]);

  var text = arr[0].name;
  localStorage.setItem('treeF', JSON.stringify(arr[0].children));
  localStorage.setItem('textF', text);
});
var finalTree = JSON.parse(localStorage.getItem('treeF'));
var finalText = localStorage.getItem('textF');

var chart_config = {
  chart: {
    container: "#basic-example",
    levelSeparation: 15,
    siblingSeparation: 12,
    subTeeSeparation: 12,
    nodeAlign: "TOP",
    connectors: {
      type: 'bCurve'
    },
    // animateOnInit: true,

    node: {
      collapsable: false
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
