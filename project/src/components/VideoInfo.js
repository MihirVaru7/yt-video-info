export function VideoInfo({ videoData }) {
  if (!videoData) return null;

  const tags = videoData.tags.slice(0, 5)
    .map(tag => `<span class="inline-block bg-purple-900 text-purple-100 px-2 py-1 rounded text-sm mr-2 mb-2">#${tag}</span>`)
    .join('');

  const comments = videoData.comments
    .map(comment => `
      <div class="bg-gray-700 p-4 rounded-lg mb-4">
        <div class="flex justify-between items-start mb-2">
          <strong class="text-purple-300">${comment.author}</strong>
          <span class="text-gray-400 text-sm">${comment.publishedAt}</span>
        </div>
        <p class="text-gray-300">${comment.text}</p>
        <div class="text-gray-400 text-sm mt-2">
          ${comment.likes} likes
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="bg-gray-800 rounded-lg p-6 mt-4 shadow-xl">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-96">
          <img 
            src="${videoData.thumbnail}" 
            alt="${videoData.title}"
            class="w-full rounded-lg shadow-lg hover:opacity-90 transition-opacity"
          />
          <div class="mt-4">
            <a 
              href="https://youtube.com/watch?v=${videoData.id}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="block w-full text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-white mb-2">${videoData.title}</h2>
          <a 
            href="https://youtube.com/channel/${videoData.channelId}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-purple-400 hover:text-purple-300 mb-4 inline-block"
          >
            ${videoData.channelTitle}
          </a>
          <p class="text-gray-400 mb-4 line-clamp-3">${videoData.description}</p>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-gray-700 p-3 rounded-lg">
              <p class="text-gray-400 text-sm">Duration</p>
              <p class="text-white font-semibold">${videoData.duration}</p>
            </div>
            <div class="bg-gray-700 p-3 rounded-lg">
              <p class="text-gray-400 text-sm">Views</p>
              <p class="text-white font-semibold">${videoData.views}</p>
            </div>
            <div class="bg-gray-700 p-3 rounded-lg">
              <p class="text-gray-400 text-sm">Likes</p>
              <p class="text-white font-semibold">${videoData.likes}</p>
            </div>
            <div class="bg-gray-700 p-3 rounded-lg">
              <p class="text-gray-400 text-sm">Published</p>
              <p class="text-white font-semibold">${videoData.publishedAt}</p>
            </div>
          </div>

          ${tags ? `<div class="mt-4 mb-6">${tags}</div>` : ''}

          <div class="mb-6">
            <canvas id="engagementChart"></canvas>
          </div>

          <h3 class="text-xl font-bold text-white mb-4">Top Comments</h3>
          <div class="space-y-4">
            ${comments}
          </div>
        </div>
      </div>
    </div>
  `;
}