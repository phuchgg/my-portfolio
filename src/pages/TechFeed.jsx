import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/techfeed.css";

const getDefaultThumb = (feedName) => {
  switch (feedName) {
    case "VNExpress":
      return "/images/mit_news.jpeg";
  }
};

const rssFeeds = [
  { name: "VNExpress", icon: "📰", url: "https://vnexpress.net/rss/tin-moi-nhat.rss"},
  { name: "EdSurge", icon: "🎓", url: "https://www.edsurge.com/rss" },
  { name: "IGN Gaming", icon: "🎮", url: "https://feeds.ign.com/ign/all" },
  { name: "Rock Paper Shotgun", icon: "👾", url: "https://www.rockpapershotgun.com/feed" },
  { name: "Techspot", icon: "🚀", url: "https://www.techspot.com/backend.xml" },
  { name: "Make Use Of", icon: "🧰", url: "https://makeuseof.com/feed" },
  { name: "AI Business", icon: "🤖", url: "https://aibusiness.com/rss.xml" },
  { name: "Psyche", icon: "🧠", url: "https://psyche.co/feed.rss" },
];

const extractFirstImage = (htmlContent) => {
  if (!htmlContent) return null;
  const match = htmlContent.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

const TechFeed = () => {
  const [feeds, setFeeds] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const activeFeed = feeds[activeTab];

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const results = await Promise.all(
          rssFeeds.map(async (feed) => {
            try {
              const res = await axios.get(
                `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`
              );
              return {
                name: feed.name,
                icon: feed.icon,
                items: res.data.items
                  .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
                  .slice(0, 6)
              };
            } catch (err) {
              console.warn(`❌ Lỗi khi fetch ${feed.name}:`, err.message);
              return { name: feed.name, icon: feed.icon, items: [] };
            }
          })
        );
        setFeeds(results);
      } catch (err) {
        console.error("💥 Toang toàn bộ feed:", err.message);
      }
    };

    fetchFeeds();
  }, []);

  return (
    <div className="techfeed-container">

      <div className="feed-tabs">
        {rssFeeds.map((feed, idx) => (
          <button
            key={feed.name}
            className={`feed-tab ${activeTab === idx ? "active" : ""}`}
            onClick={() => setActiveTab(idx)}
          >
            {feed.icon} {feed.name}
          </button>
        ))}
      </div>

      
      <div className="feed-grid">
        {(feeds[activeTab]?.items || []).map((item, idx) => {
          const contentHtml = item.content || item.description;
          const thumb = item.thumbnail || item.enclosure?.link || extractFirstImage(contentHtml) || getDefaultThumb(activeFeed?.name);


          
          return (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="feed-card"
            >
              <img
                src={thumb}
                alt="thumb"
                className="feed-thumb"
              />
              <div className="feed-meta">
                <h2 className="feed-title">{item.title}</h2>
                <p className="feed-desc">
                  {item.description?.replace(/<[^>]+>/g, "").slice(0, 140)}...
                </p>
                <p className="feed-date">
                  {item.pubDate && new Date(item.pubDate).toLocaleDateString()}
                </p>
              </div>
            </a>
          );
        })}


        {feeds[activeFeed]?.items.length === 0 && (
          <p className="feed-empty">Không có bài viết nào.</p>
        )}
      </div>
    </div>
  );
};

export default TechFeed;
