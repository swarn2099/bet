function tree(){
var arr = [];
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
});
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

}
