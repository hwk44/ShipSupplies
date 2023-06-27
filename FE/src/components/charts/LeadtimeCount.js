import ApexCharts from 'apexcharts';
import { useState, useEffect } from 'react';
import axios from "axios";
import { GrPrevious, GrNext } from "react-icons/gr";

const LeadtimeCount = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chart, setChart] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/item/leadtimeDistribution");
      // console.log(response.data);
      setData(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();

    var options = {
      series: [
        {
          name: '개수',
          data: []
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
            position: 'top', 
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
        categories: [],
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

    var chart = new ApexCharts(document.querySelector("#chart1"), options);
    chart.render();

    setChart(chart);

  }, []);

  useEffect(() => {

    if (chart && data.length > 0) {
      const start = currentIndex * 69;
      const end = start + 69;
      const leadtime = data.slice(start, end).map((item) => item.leadtime);
      const leadtimeCount = data.slice(start, end).map((item) => item.leadtimeCount);

      chart.updateSeries([
        {
          name: '개수',
          data: leadtimeCount
        }
      ]);
      chart.updateOptions({
        xaxis: {
          categories: leadtime
        },
      });

    }

  }, [data, currentIndex]);

  const handleNext = () => {
    if (currentIndex < 3) { 
      setCurrentIndex(currentIndex + 1);
    }
  }

  const handlePrevious = () => {

    if (currentIndex > 0) { 
      setCurrentIndex(currentIndex - 1);
    }
  }

  return (
    <div className="flex flex-row w-full">
      {currentIndex > 0 && (
        <button onClick={handlePrevious}>
          <GrPrevious />
        </button>
      )}
      <div id="chart1" className="w-full" />
      {currentIndex < 3 && (
        <button onClick={handleNext} style={{ marginLeft: '10px' }}>
          <GrNext />
        </button>
      )}
    </div>

  );
}
export default LeadtimeCount;