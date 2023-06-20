import ApexCharts from 'apexcharts';
import { useState, useEffect} from 'react';
import axios from "axios";

const LeadtimeCount = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/item/leadtimeDistribution");
      console.log(response.data);
      setData(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const leadtime1 = data.slice(0, 69).map((item) => item.leadtime);
      const leadtimeCount1 = data.slice(0, 69).map((item) => item.leadtimeCount);

      const leadtime2 = data.slice(69, 136).map((item) => item.leadtime);
      const leadtimeCount2 = data.slice(69, 136).map((item) => item.leadtimeCount);

      const leadtime3 = data.slice(136, 207).map((item) => item.leadtime);
      const leadtimeCount3 = data.slice(136, 207).map((item) => item.leadtimeCount);

      const leadtime4 = data.slice(207, 273).map((item) => item.leadtime);
      const leadtimeCount4 = data.slice(207, 273).map((item) => item.leadtimeCount);


      var options1 = {
        series: [
          {
            name: '개수',
            data: leadtimeCount1
          }
        ],
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,

          offsetY: -20,
          style: {
            fontSize: '10px',
            colors: ["#304758"]
          },
        },

        xaxis: {
          title: {
            text: 'leadtime(일)',
          },
          categories: leadtime1,
          position: 'bottom',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
        },
        yaxis: {
          title: {
            text: '개수', 
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          }

        },

      };

      var options2 = {
        series: [
          {
            name: '개수',
            data: leadtimeCount2
          }
        ],
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,

          offsetY: -20,
          style: {
            fontSize: '10px',
            colors: ["#304758"]
          }
        },

        xaxis: {
          title: {
            text: 'leadtime(일)',
          },
          categories: leadtime2,
          position: 'bottom',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
        },
        yaxis: {
          title: {
            text: '개수',
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          }

        },

      };

      var options3 = {
        series: [
          {
            name: '개수',
            data: leadtimeCount3
          }
        ],
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,

          offsetY: -20,
          style: {
            fontSize: '10px',
            colors: ["#304758"]
          }
        },

        xaxis: {
          title: {
            text: 'leadtime(일)',
          },
          categories: leadtime3,
          position: 'bottom',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
        },
        yaxis: {
          title: {
            text: '개수',
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          }

        },

      };

      var options4 = {
        series: [
          {
            name: '개수',
            data: leadtimeCount4
          }
        ],
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '10px',
            colors: ["#304758"]
          }
        },

        xaxis: {
          title: {
            text: 'leadtime(일)',
          },
          categories: leadtime4,
          position: 'bottom',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
        },
        yaxis: {
          title: {
            text: '개수',
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          }

        },

      };

      var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
      chart1.render();

      var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
      chart2.render();

      var chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
      chart3.render();

      var chart4 = new ApexCharts(document.querySelector("#chart4"), options4);
      chart4.render();
    }

  }, [data]);


  return (
      // <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '20px' }}>
      //   <div id="chart1" style={{ gridColumn: '1 / span 1', gridRow: '1 / span 1' }}></div>
      //   <div id="chart2" style={{ gridColumn: '2 / span 1', gridRow: '1 / span 1' }}></div>
      //   <div id="chart3" style={{ gridColumn: '1 / span 1', gridRow: '2 / span 1' }}></div>
      //   <div id="chart4" style={{ gridColumn: '2 / span 1', gridRow: '2 / span 1' }}></div>
      // </div>
      <div id="chart1" />
    
  );
}
export default LeadtimeCount;