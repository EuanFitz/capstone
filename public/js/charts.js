document.addEventListener('DOMContentLoaded', function () {

  var BarColors = [
    "#d4caf2",
    "#B69DF8",
    "#6750A4",
    "#513D86",
    "#281a50",
    "#100333"
  ];

    // #yourResults
  new Chart("LineGraph", {
    type: "pie",
    data: {
      labels: ["Interacted", "Did Not Interact", "Link Clicked", "Read", "Deleted", "Reported"],
      datasets: [{ backgroundColor: BarColors, data: [12, 15, 36, 22, 0, 5] }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { labels: { color: '#FFFBFE', font: { size: 10 } } }
      }
    }
  });

  // #Percentage / Target Overview
  new Chart("percentage", {
    type: "pie",
    data: {
      labels: ["Interacted", "Did Not Interact", "Link Clicked", "Read", "Deleted", "Reported"],
      datasets: [{ backgroundColor: BarColors, data: [25, 25, 25, 25, 25, 25] }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { labels: { color: '#FFFBFE', font: { size: 10 } } }
      }
    }
  });

  // #BarChart
  new Chart("BarChart", {
    type: "bar",
    data: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [{ backgroundColor: BarColors, data: [5, 26, 52, 41, 18, 32] }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { labels: { color: '#FFFBFE', font: { size: 10 } } }
      },
      scales: {
        x: { ticks: { color: '#FFFBFE' } },
        y: { ticks: { color: '#FFFBFE' } }
      }
    }
  });

  // #PieChart_A
  new Chart("PieChart_A", {
    type: "doughnut",
    data: {
      labels: ["HR", "Finance", "Marketing", "C-Suite", "Payroll"],
      datasets: [{ backgroundColor: BarColors, data: [55, 22, 11, 35, 15] }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { labels: { color: '#FFFBFE', font: { size: 10 } } }
      }
    }
  });

  // #PieChart_B
  new Chart("PieChart_B", {
    type: "pie",
    data: {
      labels: ["Interacted", "Did Not Interact", "Link Clicked", "Read", "Deleted", "Reported"],
      datasets: [{ backgroundColor: BarColors, data: [12, 15, 36, 22, 0, 5] }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { labels: { color: '#FFFBFE', font: { size: 10 } } }
      }
    }
  });

}); // end DOMContentLoaded