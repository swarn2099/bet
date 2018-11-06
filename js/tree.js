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
    cdo = {
        parent: ceo,
        text:{
            name: "John Green",
        },
        stackChildren: true,
    },
    cio = {
        parent: cto,
        text:{
            name: "Ron Blomquist",
        },
        stackChildren: true,

    },
    ciso = {
        parent: cto,
        text:{
            name: "Michael Rubin",
        },
        stackChildren: true,

    },
    cio2 = {
        parent: cdo,
        text:{
            name: "Erica Reel",

        },
        stackChildren: true,


    },
    ciso2 = {
        parent: cbo,
        text:{
            name: "Alice Lopez",
        },
        stackChildren: true,

    },
    ciso3 = {
        parent: cbo,
        text:{
            name: "Mary Johnson",
        },
        stackChildren: true,

    },
    ciso4 = {
        parent: cbo,
        text:{
            name: "Kirk Douglas",
        },
        stackChildren: true,

    }

    chart_config = [
        config,
        ceo,
        cto,
        cbo,
        cdo,
        cio,
        ciso,
        cio2,
        ciso2,
        ciso3,
        ciso4
    ];
