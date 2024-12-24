import Chart from 'chart.js/auto';

export class VideoAnalytics {
  constructor(videoData) {
    this.videoData = videoData;
    this.initCharts();
  }

  initCharts() {
    this.createEngagementChart();
  }

  createEngagementChart() {
    const ctx = document.getElementById('engagementChart').getContext('2d');
    const { rawStats } = this.videoData;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Views', 'Likes', 'Comments'],
        datasets: [{
          label: 'Engagement Metrics',
          data: [rawStats.views, rawStats.likes, rawStats.comments],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Video Engagement Overview'
          }
        }
      }
    });
  }
}