import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../css/techfeed.css";

const getDefaultThumb = (feedName) => {
  switch (feedName) {
    case "VNExpress":
      return "/images/VNExpress-logo.jpg";
    case "Reddit":
      return "/images/reddit-logo.png";
    default:
      return "/images/default_thumb.jpg";
  }
};

const rssFeeds = [
  { name: "EdSurge", icon: "🎓", url: "https://www.edsurge.com/rss" },
  { name: "AI Business", icon: "🤖", url: "https://aibusiness.com/rss.xml" },
  { name: "Techspot", icon: "🚀", url: "https://www.techspot.com/backend.xml" },
  { name: "BBC Football", icon: "⚽", url: "https://feeds.bbci.co.uk/sport/football/rss.xml" },
  { name: "IGN Gaming", icon: "🎮", url: "https://feeds.ign.com/ign/all" },
  { name: "Rock Paper Shotgun", icon: "👾", url: "https://www.rockpapershotgun.com/feed" },
  { name: "Make Use Of", icon: "🧰", url: "https://makeuseof.com/feed" },
  { name: "Psyche", icon: "🧠", url: "https://psyche.co/feed.rss" },
  { name: "Cafebiz", icon: "📰", url: "https://cafebiz.vn/rss/home.rss" },
  { name: "Wait But Why", icon: "⏳", url: "https://waitbutwhy.com/feed" },
  { name: "Reddit", icon: "👾", url: "https://www.reddit.com/r/AskReddit/.rss" },
];

const extractFirstImage = (htmlContent) => {
  if (!htmlContent) return null;
  const match = htmlContent.match(/<img[^>]+src=\"([^">]+)\"/);
  return match ? match[1] : null;
};

const TechFeed = () => {
  const [feeds, setFeeds] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const activeFeed = feeds[activeTab];
  const feedTabsRef = useRef(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const results = await Promise.all(
          rssFeeds.map(async (feed) => {
            try {
              const res = await axios.get(
                `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&api_key=uult1yh8ysz60jynpdz2uc97uqkszjh3vsljlvun`
              );
              return {
                name: feed.name,
                icon: feed.icon,
                items: res.data.items
                  .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
                  .slice(0, 18)
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

    const interval = setInterval(() => {
      fetchFeeds();
      console.log("🔁 Refreshed feeds at", new Date().toLocaleTimeString());
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const scrollTabs = (dir) => {
    if (!feedTabsRef.current) return;
    feedTabsRef.current.scrollBy({ left: dir * 150, behavior: "smooth" });
  };

  const paginateItems = (items) => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  const totalPages = Math.ceil((activeFeed?.items.length || 0) / itemsPerPage);


  return (
    <div className="techfeed-container">
      <div className="feed-tabs-wrapper">
        <div className="feed-tabs" ref={feedTabsRef}>
          {rssFeeds.map((feed, idx) => (
            <button
              key={feed.name}
              className={`feed-tab ${activeTab === idx ? "active" : ""}`}
              onClick={() => {
                setActiveTab(idx);
                setPage(1);
              }}
            >
              {feed.icon} {feed.name}
            </button>
          ))}
        </div>
      </div>

      <div className="feed-grid">
        {(paginateItems(activeFeed?.items || [])).map((item, idx) => {
          const contentHtml = item.content || item.description;
          const thumb =
            item.thumbnail ||
            item.enclosure?.link ||
            extractFirstImage(contentHtml) ||
            getDefaultThumb(activeFeed?.name);

          return (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="feed-card"
            >
              <img src={thumb} alt="thumb" className="feed-thumb" />
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

        {activeFeed?.items?.length === 0 && (
          <p className="feed-empty">Không có bài viết nào.</p>
        )}

      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(1)}>{"<<"}</button>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>{"<"}</button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>{">"}</button>
          <button disabled={page === totalPages} onClick={() => setPage(totalPages)}>{">>"}</button>
        </div>
      )}
    </div>
  );
};

export default TechFeed;
