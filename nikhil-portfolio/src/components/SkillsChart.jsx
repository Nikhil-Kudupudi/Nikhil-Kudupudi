import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillsChart = () => {
  const data = {
    labels: ['Python', 'Data Engineering', 'Machine Learning', 'Cloud Platforms', 'SQL/Databases', 'Real-time Processing'],
    datasets: [
      {
        label: 'Technical Skills',
        data: [90, 85, 80, 85, 88, 82],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      },
      {
        label: 'Experience Level',
        data: [85, 80, 75, 78, 82, 77],
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        borderColor: 'rgba(6, 182, 212, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(6, 182, 212, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(6, 182, 212, 1)',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#9ca3af',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#f3f4f6',
        bodyColor: '#d1d5db',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1
      }
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(156, 163, 175, 0.1)'
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        },
        pointLabels: {
          color: '#9ca3af',
          font: {
            size: 12
          }
        },
        ticks: {
          color: '#6b7280',
          backdropColor: 'transparent',
          min: 0,
          max: 100,
          stepSize: 20
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <div className="w-full h-[400px] relative">
      <Radar data={data} options={options} />
    </div>
  );
};

export default SkillsChart;