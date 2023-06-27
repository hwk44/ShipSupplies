import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';

const CategoryCount = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/item/categoryDistribution');
            setData(response.data);
            // console.log("data : ", data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // console.log("data: ", data);

        if (data.length > 0) {
            const category = data.slice(0, 69).map((item) => item.category);
            const categoryCount = data.slice(0, 69).map((item) => item.categoryCount);

            var options = {
                series: [
                    {
                        name: '개수',
                        data: categoryCount
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
                    },
                },
                colors: ['#33AB5F'], 
                dataLabels: {
                    enabled: true,

                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    }
                },

                xaxis: {
                    title: {
                        text: '카테고리',
                    },
                    categories: category,
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

            var chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
        }
    }, [data]); 

    return <div id="chart" className="w-full"/>;
};

export default CategoryCount;
