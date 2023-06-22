import ApexCharts from 'apexcharts';

const Chart = ({ foundItems }) => {

    const leadtime = foundItems.map((item) => (
        item.leadtime
    ))
    const date = foundItems.map((item) => (
        new Date(item.date).toLocaleDateString('ko-KR')
    ))

    var options = {
        series: [{
            name: "leadtime",
            data: leadtime
        }],
        chart: {
            height: 550,
            type: 'line',
            zoom: {
                enabled: false
            }
            
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0
            },
        },
        xaxis: {
            categories: date,
            title: {
                text: '발주일'
            }
        },
        yaxis: {
            title: {
                text: 'leadtime(일)'
            }
            
        },
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();



    return (
        <>
            {/* API에서 가져온 결과를 렌더링 */}
            {/* {foundItems.map((item) => (
                <div key={item.leadtime}>
                    <p>리드타임 : {item.leadtime}</p>
                    <p>날짜 : {new Date(item.date).toLocaleDateString('ko-KR')}</p>
                </div>
            ))} */}
            <div className="flex justify-center">
                <div id="chart" className="w-6/12"></div>
            </div>

        </>
    );
};

export default Chart;

