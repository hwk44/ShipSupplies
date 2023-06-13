import ApexCharts from 'apexcharts'

const Chart = ({ foundItems }) => {

    const leadtime = foundItems.map((item) => (
        item.leadtime
    ))
    const date = foundItems.map((item) => (
        new Date(item.date).toLocaleDateString('ko-KR')
    ))

    date.concat(new Date())

    
    var options = {
        series: [{
            name: "Desktops",
            data: leadtime
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: '과거 리드타임 내역',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: date
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();



    return (
        <>
            {/* API에서 가져온 결과를 렌더링 */}
            {foundItems.map((item) => (
                <div key={item.leadtime}>
                    <p>리드타임 : {item.leadtime}</p>
                    <p>날짜 : {new Date(item.date).toLocaleDateString('ko-KR')}</p>
                </div>
            ))}

            <div id='chart'>

            </div>

        </>
    );
};

export default Chart;
