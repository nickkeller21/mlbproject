function getPicture(player) {
  let url = `/pic_url/${player}`;
  let selector = d3.select("#player_pic")
  d3.json(url).then(data =>{
    console.log(data)
    selector
      .attr('src', data)
  })
};

function getBio(player) {
  let url =`/bio/${player}`
  d3.select("#player_name").text(player)
  let selector = d3.select("#player_bio")
  selector.text("")
  d3.json(url).then(data =>{
    let keys = Object.keys(data)
    let values = Object.values(data)
    length = keys.length
    console.log(length)
    for (i = 0; i<length; i++) {
      selector
        .append("ul")
        .text(keys[i]+": "+values[i])
        .attr("style", "margin:2px;padding:0px")
    }
  })
}
function buildCharts(player) {
  let url = `/stats/${player}`

  // @TODO: Use `d3.json` to fetch the data for the plots
  d3.json(url).then(stats =>{
    let years = Object.values(stats)[0]
    let AVGstat = Object.values(stats)[2]
    let HRstat = Object.values(stats)[3]
    let OPSstat = Object.values(stats)[4]
    let RBIstat = Object.values(stats)[5]
    let WARstat = Object.values(stats)[1]

    let AVGtitle = Object.keys(stats)[2]
    let HRtitle = Object.keys(stats)[3]
    let OPStitle = Object.keys(stats)[4]
    let RBItitle = Object.keys(stats)[5]
    let WARtitle = Object.keys(stats)[1]

      //// WAR Graph
    var WAR = [{
      x: years,
      y: WARstat,
      type: 'line',
      name: WARtitle,
      line: {
      color: 'rgb(0, 0, 137)',
      width: 2
    },
    text: ['player\'s total contributions to their team in one statistic <br>' + 
    'all-inclusive and provides a useful reference point for comparing players'],
    }];

    var layout = {
    title: WARtitle,
    xaxis: {
      title: 'Year',
      dtick: 1
    },
    yaxis: {
      title: 'Wins'
    }
  };
  Plotly.newPlot('player_war', WAR, layout);

  //// GRAPH 1
    var graph1 = [{
      x: years,
      y: AVGstat,
      type: 'line',
      name: "AVG",
      line: {
      color: 'rgb(0, 0, 137)',
      width: 2
    }
    }];
    

    var layout1 = {
    title: AVGtitle,
    xaxis: {
      title: 'Year',
      dtick: 1
    }
  };
  Plotly.newPlot('table_1', graph1, layout1);

  //// GRAPH 2
  var graph2 = [{
      x: years,
      y: HRstat,
      type: 'line',
      name: HRtitle,
      line: {
      color: 'rgb(0, 0, 137)',
      width: 2
    },
    }];
    

    var layout2 = {
    title: HRtitle,
    xaxis: {
      title: 'Year',
      dtick: 1
    }
  };
  Plotly.newPlot('table_2', graph2, layout2);

  //// GRAPH 3
  var graph3 = [{
      x: years,
      y: OPSstat,
      type: 'line',
      name: OPStitle,
      line: {
      color: 'rgb(0, 0, 137)',
      width: 2
    },
    }];
    

    var layout3 = {
    title: OPStitle,
    xaxis: {
      title: 'Year',
      dtick: 1
    }
  };
  Plotly.newPlot('table_3', graph3, layout3);

  //// GRAPH 4
  var graph4 = [{
      x: years,
      y: RBIstat,
      type: 'line',
      name: RBItitle,
      line: {
      color: 'rgb(0, 0, 137)',
      width: 2
    },
    }];
    

    var layout4 = {
    title: RBItitle,
    xaxis: {
      title: 'Year',
      dtick: 1
    }
  };
  Plotly.newPlot('table_4', graph4, layout4);




      });
  };

function buildSalary(player) {
  let url = `/salarystats/${player}`
  let current = d3.select("#current")
  let predicted = d3.select("#predicted")
  let difference = d3.select("#difference")
  let percent = d3.select("#percent")
  d3.json(url).then(data =>{

    let years = Object.keys(data['Salary'])
    let salaries = Object.values(data['Salary'])
    let war = Object.values(data['WAR'])
    console.log(war)
    var trace2 = {
      x: years,
      y: war,
      yxis:'y2',
      type: 'line',
      name:'WAR',
      line: {
        color: 'rgb(255, 50, 50)',
        width: 2
      }
    };
    var trace1 = {
      x: years,
      y: salaries,
      type: 'line',
      name: "Salary",
      line: {
        color: 'rgb(0, 0, 137)',
        width: 2
      }
    };
    data = [trace1,trace2];
    

    var layout = {
    title: "Salaries",
    xaxis: {
      domain: [2014,2019],
      title: 'Year',
      dtick: 1
    },
    yxis:{
      title: 'Salary $',
      overlaying:'y'
    },
    yxis2: {
      title: 'WAR',
      overlaying:'y',
      domain:[0,10]
    }
  };
  Plotly.newPlot('salary_table', data, layout);
  current.text("$"+data["Predicted"]["Avg Annual"].toLocaleString());
  predicted.text("$"+data["Predicted"]["Predicted Salary"].toLocaleString());
  difference.text("$"+data["Predicted"]["Difference"].toLocaleString());
  percent.text(data["Predicted"]["Percent Difference"].toLocaleString()+"%");
  });
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#myInput");

  // Use the list of player names to populate the select options
  d3.json("/names").then((names) => {
    //console.log(names)
    names.forEach((name) => {
      selector
        .append("option")
        .text(name)
        .property("value", name);
     // console.log(name)
    });

    // Use the first player from the list to build the initial plots
    const firstName = names[0];
    getPicture(firstName);
    getBio(firstName);
    buildCharts(firstName);
    buildSalary(player);
  });
};

function optionChanged(player) {
  // Fetch new data
  getPicture(player);
  getBio(player);
  buildCharts(player);
};
function optionChangedSalary(player) {
  // Fetch new data
  getPicture(player);
  getBio(player);
  buildSalary(player);
};

// Initialize the dashboard
init();
