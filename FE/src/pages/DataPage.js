import ApexCharts from 'apexcharts';
import { useState, useEffect, useRef, useCallback } from 'react';

import axios from "axios";

const DataPage = () => {
    const [data, setData] = useState([]);
    
    const leadtime = data.map((item) => item.leadtime);
    const leadtimeCount = data.map((item) => item.leadtimeCount);

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

    useEffect(()=> {
        fetchData();
    }, []);

    var options = {
        series: [{
        name: '개수',
        data: leadtimeCount
      }],
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
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      
      xaxis: {
        categories: leadtime,
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
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
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
      title: {
        text: '리드타임 분포',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      }
      };

      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    
    return (
        <>
            <div id="chart">
            </div>
        </>
    );
}
export default DataPage;