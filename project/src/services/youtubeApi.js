import axios from 'axios';
import { formatDuration, formatViews, formatPublishDate } from '../utils/formatters';

export class YouTubeAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: this.apiKey }
    });
  }

  async getVideoDetails(videoId) {
    try {
      const [videoResponse, commentsResponse] = await Promise.all([
        this.client.get('/videos', {
          params: {
            part: 'snippet,contentDetails,statistics',
            id: videoId
          }
        }),
        this.client.get('/commentThreads', {
          params: {
            part: 'snippet',
            videoId: videoId,
            maxResults: 10,
            order: 'relevance'
          }
        })
      ]);

      if (!videoResponse.data.items?.length) {
        throw new Error('Video not found');
      }

      const video = videoResponse.data.items[0];
      const comments = commentsResponse.data.items || [];

      return {
        ...this.formatVideoData(video),
        comments: this.formatComments(comments)
      };
    } catch (error) {
      if (error.response?.status === 403) {
        throw new Error('API key is invalid or quota exceeded');
      }
      throw new Error('Failed to fetch video information');
    }
  }

  formatVideoData(video) {
    return {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url,
      duration: formatDuration(video.contentDetails.duration),
      views: formatViews(video.statistics.viewCount),
      likes: formatViews(video.statistics.likeCount),
      publishedAt: formatPublishDate(video.snippet.publishedAt),
      channelTitle: video.snippet.channelTitle,
      channelId: video.snippet.channelId,
      tags: video.snippet.tags || [],
      rawStats: {
        views: parseInt(video.statistics.viewCount),
        likes: parseInt(video.statistics.likeCount),
        comments: parseInt(video.statistics.commentCount)
      }
    };
  }

  formatComments(comments) {
    return comments.map(comment => ({
      id: comment.id,
      author: comment.snippet.topLevelComment.snippet.authorDisplayName,
      text: comment.snippet.topLevelComment.snippet.textDisplay,
      likes: formatViews(comment.snippet.topLevelComment.snippet.likeCount),
      publishedAt: formatPublishDate(comment.snippet.topLevelComment.snippet.publishedAt)
    }));
  }
}