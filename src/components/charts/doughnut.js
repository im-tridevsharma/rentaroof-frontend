import { Doughnut } from "react-chartjs-2";

const Chart = ({ height, chartdata }) => {
  const colors = [...chartdata?.colors];

  const hoverColors = [...chartdata?.hoverColors];

  const data = {
    labels: [...chartdata?.labels],
    datasets: [
      {
        data: [...chartdata?.values],
        backgroundColor: colors,
        borderColor: colors,
        hoverBorderColor: hoverColors,
        hoverBackgroundColor: hoverColors,
      },
    ],
  };

  const legend = {
    display: false,
    labels: {
      fontColor: chartdata?.fontcolor,
      boxWidth: 10,
      fontSize: 11,
    },
  };

  const options = {
    legend: {
      display: chartdata?.legend,
    },
    tooltips: {
      enabled: chartdata?.tooltip,
    },
    cutoutPercentage: 50,
    animation: {
      duration: 0,
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    },
  };

  return (
    <div style={{ height: height }}>
      {chartdata && (
        <Doughnut
          key={chartdata?.key}
          data={data}
          height={height}
          options={options}
          legend={legend}
        />
      )}
    </div>
  );
};

export default Chart;
