$(function() {
  var url = "http://datos.codeandomexico.org/api/action/datastore_search?resource_id=fa62a9a3-2129-405c-be31-9637461f5086&limit=100&fields=BENEFICIARIO,IMPORTE"

  var getTableHeaders = function(data) {
    var tableHeaders = [];
    for(var key in data.result.fields) {
      if(data.result.fields.hasOwnProperty(key)) {
        for(var innerKey in data.result.fields[key]) {
          if(innerKey === "id") {
            tableHeaders.push(data.result.fields[key][innerKey]);
          }
        }
      }
    }
    return tableHeaders;
  }

  var getTableValues = function(data) {
    var tableValues = [];
    var rowValues = [];
    for(var key in data.result.records) {
      if(data.result.records.hasOwnProperty(key)) {
        rowValues = [];
        for(var innerKey in data.result.records[key]) {
          if(data.result.records[key].hasOwnProperty(innerKey)) {
            rowValues.push(data.result.records[key][innerKey]);
          }
        }
        tableValues.push(rowValues);
      }
    }
    return tableValues;
  }

  var sumValues = function(data) {
    var dict = {};
    var numValue = 0;
    for(var i = 0; i < data.length; i += 1) {
      numValue = parseFloat(data[i][1]);
      if(typeof numValue === "number") {
        if (dict.hasOwnProperty(data[i][0])) {
          dict[data[i][0]] += numValue;
        } else {
          dict[data[i][0]] = numValue;
        }
      }
    }
    return dict;
  }

  var pieChartData = function(data) {
    var pieData = [];
    for(var key in data) {
      pieData.push({
        value: data[key].value,
        color: data[key].color
      });
    }
    return pieData;
  };

  var addColor = function(data) {
    var coloredData = {};
    for(var key in data) {
      if(!isNaN(data[key])) {
        coloredData[key] = {
          value: data[key],
          color: '#'+Math.floor(Math.random()*16777215).toString(16)
        };
      }
    }
    return coloredData;
  }

  var obtainValues = function (data) {
    var values = [];
    var innerValues = [];
    for(var key in data) {
      innerValues = [];
      innerValues.push(key);
      for(var innerKey in data[key]) {
        if (innerKey === "color") {
          innerValues.push("<div class=\"color\" style=\"{background-color: " + data[key][innerKey] + ";}\"></div>");
        } else {
          innerValues.push(data[key][innerKey]);
        }
      }
      values.push(innerValues);
    }
    return values;
  }

  $.get(url, function(data) {
    var tableHeaders = getTableHeaders(data);
    var tableValues = getTableValues(data);
    var tableData = [tableHeaders].concat(tableValues);

    // DELETEE
    var coloredData = addColor(sumValues(tableValues));

    var ctx = document.getElementById("myChart").getContext("2d");
    var myNewChart = new Chart(ctx).Pie(pieChartData(coloredData));

    var HTHeaders = ["COLOR", "BENEFICIARIO", "IMPORTE"];
    var HTValues = obtainValues(coloredData);

    var HTData = [HTHeaders].concat(HTValues);

    $('#example').handsontable({
      data: HTData,
      minSpareRows: 1,
      colHeaders: true,
      contextMenu: true
    });
  });
});
