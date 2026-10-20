import dotenv from "dotenv"
dotenv.config()
import axios from "axios"


const BASE_URL = "https://www.googleapis.com/youtube/v3/search"

const ignoredWords = new Set([
  "a", "an", "and", "are", "as", "at", "by", "for", "from", "how",
  "in", "into", "is", "of", "on", "or", "the", "to", "with",
])

const getTokens = (value = "") =>
  value
    .toLowerCase()
    .match(/[a-z0-9]+/g)
    ?.filter((word) => word.length > 1 && !ignoredWords.has(word)) || []

const scoreVideo = (video, module) => {
  const title = video.snippet.title.toLowerCase()
  const videoTokens = new Set(getTokens(title))
  const topicTokens = new Map()

  for (const token of getTokens(module.title)) {
    topicTokens.set(token, 3)
  }

  for (const token of getTokens(module.description).slice(0, 12)) {
    if (!topicTokens.has(token)) {
      topicTokens.set(token, 1)
    }
  }

  const totalWeight = [...topicTokens.values()].reduce((sum, weight) => sum + weight, 0)
  const matchedWeight = [...topicTokens].reduce(
    (sum, [token, weight]) => sum + (videoTokens.has(token) ? weight : 0),
    0,
  )
  const formatBonus = /\b(tutorial|course|lesson|explained|crash course)\b/.test(title) ? 1 : 0
  const lowQualityPenalty = /\b(shorts?|reaction|teaser|trailer)\b/.test(title) ? 2 : 0

  return (totalWeight ? matchedWeight / totalWeight : 0) + formatBonus - lowQualityPenalty
}

const searchVideo = async (module) => {
  const query = `${module.title} tutorial`
  const { data } = await axios.get(BASE_URL, {
    params: {
      key: process.env.YOUTUBE_API_KEY,
      part: "snippet",
      q: query,
      maxResults: 10,
      order: "relevance",
      type: "video",
    },
  })

  const videos = (data.items || [])
    .filter((video) => video.id?.videoId && video.snippet?.title)
    .sort((first, second) => scoreVideo(second, module) - scoreVideo(first, module))

  if (videos.length === 0) {
    return null
  }

  const video = videos[0]
  return {
    title: video.snippet.title,
    channel: video.snippet.channelTitle,
    url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
  }
}

export default searchVideo