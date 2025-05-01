import React, { useEffect, useState } from "react";
import axios from "axios";

// Các nguồn RSS muốn lấy
const rssFeeds = [
  { name: "MIT AI", url: "https://www.technologyreview.com/feed/" },
  { name: "IGN Gaming", url: "https://feeds.ign.com/ign/all" },
  { name: "Edutopia", url: "https://www.edutopia.org/rss.xml" },
];

// Link API Proxy Vercel của bạn
const BASE_URL = "https://rss-proxy-4v3kjt0lj-maxs-projects-d541f337.vercel.app/api/rss";

const TechFeed = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const results = await Promise.all(
          rssFeeds.map(async (feed) => {
            try {
              const res = await axios.get(`${BASE_URL}?url=${encodeURIComponent(feed.url)}`);
              if (!res.data || !res.data.items) throw new Error("No items");
              return { name: feed.name, items: res.data.items.slice(0, 5) };
            } catch (err) {
              console.warn(`❌ Lỗi khi fetch ${feed.name}:`, err.message);
              return { name: feed.name, items: [] };
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📰 Tin Công Nghệ Mới Nhất</h1>
      {feeds.map((feed, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{feed.name}</h2>
          <ul className="list-disc list-inside space-y-1">
            {feed.items.map((item, i) => (
              <li key={i}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {item.title}
                </a>
              </li>
            ))}
            {feed.items.length === 0 && (
              <li className="text-gray-500 italic">Không có bài viết nào.</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TechFeed;
