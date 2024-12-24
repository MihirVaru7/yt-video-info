import { YouTubeAPI } from './services/youtubeApi';
import { VideoInfo } from './components/VideoInfo';

// You'll need to get this from Google Cloud Console
// https://console.cloud.google.com/apis/credentials
const API_KEY = 'AIzaSyBgE9BtZ8j3t-xtlSA4epbvvQlf9nV5Wsk';

const youtubeApi = new YouTubeAPI(API_KEY);
const urlInput = document.getElementById('urlInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');

function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
    /^[a-zA-Z0-9_-]{11}$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
  resultDiv.innerHTML = '';
}

function clearError() {
  errorDiv.classList.add('hidden');
  errorDiv.textContent = '';
}

async function handleAnalyzeClick() {
  const url = urlInput.value.trim();
  clearError();

  if (!url) {
    showError('Please enter a YouTube URL or video ID');
    return;
  }

  const videoId = extractVideoId(url);
  if (!videoId) {
    showError('Invalid YouTube URL or video ID');
    return;
  }

  try {
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = `
      <svg class="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Analyzing...
    `;
    
    const videoData = await youtubeApi.getVideoDetails(videoId);
    resultDiv.innerHTML = VideoInfo({ videoData });
  } catch (error) {
    showError(error.message);
  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = 'Analyze';
  }
}

analyzeBtn.addEventListener('click', handleAnalyzeClick);
urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleAnalyzeClick();
  }
});