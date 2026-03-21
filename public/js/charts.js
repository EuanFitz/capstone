var BarColors = [
  "#d4caf2",
  "#B69DF8",
  "#6750A4",
  "#513D86",
  "#281a50",
  "#100333"
];

// #Percentage
var xValues = ["Interacted", "Did Not Interact", "Link Clicked", "Read", "Deleted", "Reported"];
var yValues = [25, 25, 25, 25];

new Chart("percentage", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: BarColors,
            data: yValues
        }]
    },
    options : {
        title: {
            display: true,
            text: "Percentage"
        }
    }
});

// #BarChart
var xValues = ["January", "February", "March", "April", "May", "June"];
var yValues = [5, 26, 52, 41, 18, 32];

new Chart("BarChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: BarColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Reported Phishing Emails"
    }
  }
});

// #PieChart_A
var xValues = ["HR", "Finance", "Marketing", "C-Suite", "Payroll"];
var yValues = [55, 22, 11, 35, 15];


new Chart("PieChart_A", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: BarColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "Phishing Tests Passed: By"
    }
  }
});

// #PieChart_B
var xValues = ["Interacted", "Did Not Interact", "Link Clicked", "Read", "Deleted", "Reported"];
var yValues = [12, 15, 36, 22, 0, 5];

new Chart("PieChart_B", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: BarColors,
            data: yValues
        }]
    },
    options : {
        title: {
            display: true,
            text: "Employee Status"
        }
    }
});



