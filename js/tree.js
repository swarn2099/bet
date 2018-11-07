var config = {
        container: "#basic-example",
        animateOnInit: true,
           node: {
               collapsable: true
           },
           animation: {
               nodeAnimation: "easeOutBounce",
               nodeSpeed: 700,
               connectorsAnimation: "bounce",
               connectorsSpeed: 700
           },
           padding: 0,
           connectors:{
             type: "straight"
           }
    },
    ceo = {
        text: {
            name: "Mark Hill",

        },
    },

    cto = {
        parent: ceo,
        text:{
            name: "Joe Linux",
        },
        stackChildren: true,
    },
    cbo = {
        parent: ceo,
        stackChildren: true,
        text:{
            name: "Linda May",
        },
    },


    chart_config = [
        config,
        ceo,
        cto,
        cbo,

    ];
