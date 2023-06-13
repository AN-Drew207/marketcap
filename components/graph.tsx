import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const randomPoints = [
	[65, 59, 100, 80, 10, 56, 72, 45, 67, 55, 42],
	[10, 50, 30, 84, 38, 90, 42, 77, 100, 0, 100],
	[0, 59, 100, 80, 10, 56, 100, 0, 26, 23, 32],
	[100, 42, 77, 100, 0, 100, 72, 45, 67, 55, 42],
	[0, 100, 47, 19, 90, 34, 25, 65, 78, 0, 32],
];

const getRandomPoints = () => {
	const rndInt = Math.floor(Math.random() * 4) + 1;
	return randomPoints[rndInt];
};

const data = {
	labels: [
		'6:04 PM',
		'9:04 PM',
		'3:04 PM',
		'6:04 PM',
		'9:04 AM',
		'12:04 PM',
		'3:04 PM',
	],
	datasets: [
		{
			fill: false,
			lineTension: 0.1,
			backgroundColor: '#306844',
			borderColor: '#306844',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: '#306844',
			pointBackgroundColor: '#306844',
			pointBorderWidth: 5,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: '#306844',
			pointHoverBorderColor: '#306844',
			pointHoverBorderWidth: 3,
			pointRadius: 2,
			pointHitRadius: 10,
			data: getRandomPoints(),
		},
	],
};

const options = {
	plugins: {
		legend: {
			display: false,
		},
	},
	scales: {
		x: {
			ticks: {
				color: '#aaa', // this will make x axis labels black
			},
			grid: {
				color: '#aaa', // this will make vertical grid lines black
			},
		},
		y: {
			ticks: {
				color: '#aaa', // this will make y axis labels black
			},
			grid: {
				color: '#aaa', // this will make horizontal grid lines black
			},
		},
	},
};

const Graph = () => {
	return <Line data={data} options={options} width={400} height={150} />;
};

export default Graph;
