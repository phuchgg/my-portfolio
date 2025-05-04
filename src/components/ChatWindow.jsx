import React, { useState, useRef, useEffect } from 'react';
import '../css/Chat.css';

const parseMessageWithLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (urlRegex.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
          {part}
        </a>
      );
    }
    return part;
  });
};

const conversationFlow = {
  start: {
    text: "Hey bạn! Phúc đây - sẵn sàng đồng hành cùng bạn 'đánh bay' nỗi lo 'mất gốc' và cả 'lười biếng' nữa! 😄 Giờ thì, bạn cần Phúc hỗ trợ điều gì trên hành trình chinh phục IELTS của mình nào?",
    options: [
      { label: "Các khóa học phù hợp với bạn", next: "courses" },
      { label: "Về Thầy Phúc 😉", next: "teachingExperience" },
      { label: "Test Nhân Phẩm' IELTS (Vui là chính nha!) 😂", next: "ieltsLuckTest" },
      { label: "Hỏi Xoáy Đáp Xàm' cùng Phúc 🤪", next: "funnyQA" },
      { label: "Phúc luôn 'trực chiến' trả lời siêu tốc! ⚡", next: "quickReply" }
    ]
  },

  // 🎓 KHÓA HỌC
  courses: {
    text: "Tìm khóa học nào để cùng Phúc 'chinh phục' IELTS đây bạn ơi? 🤔",
    options: [
      { label: "Khóa IELTS 'Xây gốc thần tốc' 💪", next: "basicCourse" },
      { label: "Khóa IELTS 'Chinh phục Band cao' 🔥", next: "advancedCourse" },
      { label: "Lịch học 'nóng hổi' & Thông tin khai giảng 👇", next: "schedule" }
    ]
  },
  basicCourse: {
    text: "Bạn đang 'vật lộn' với tiếng Anh, nghe giảng cứ như 'vịt nghe sấm' hả? Đừng lo, đây chính là 'lối thoát' dành riêng cho bạn rồi! ✨",
    options: []
  },
  advancedCourse: {
    text: "Cam kết sẽ cùng bạn 'bứt phá' điểm số, từ band 'hiện tại' vươn tới mục tiêu IELTS 8.0+ đáng mơ ước! 💪",
    options: []
  },
  schedule: {
    text: "Lịch học 'nóng hổi' vừa ra lò! Check ngay tại https://engonow.com/gioi-thieu/luyen-thi-ielts để chọn khung giờ ưng ý và 'giữ chỗ' liền tay bạn nha! 👇",
    options: []
  },

  // 📚 KINH NGHIỆM GIẢNG DẠY
  teachingExperience: {
    text: "Bạn hỏi 'bí kíp' xóa tan nỗi sợ tiếng Anh ở đâu á? Chính là ở đây nè! Hơn 6 năm 'thai nghén' và 'chăm bẵm', Phúc đã tạo ra 'phương pháp' giúp bạn 'tái ngộ' và 'yêu lại từ đầu' với IELTS. 'Tác dụng phụ' chính là điểm số 'ấn tượng ngoài mong đợi' đó nha! 🤩",
    options: []
  },

  // 🎲 TEST NHÂN PHẨM
  ieltsLuckTest: {
    text: "Đang 'thần giao cách cảm' với điểm IELTS tương lai của bạn... 🔮✨",
    options: [],
    isFortuneGame: true // dùng flag này để render game mini thay vì hiển thị text như bình thường
  },

  // 🌀 HỎI XOÁY ĐÁP XÀM
  funnyQA: {
    text: "Cần 'giải cứu' khúc mắc nào à? 'Triển' liền câu hỏi đi! Mình 'support' hết mình, cách trả lời có thể hơi 'ô dề' tí nhưng đảm bảo 'có tâm' và không bao giờ 'thiếu muối' đâu nha! ✨🧂",
    options: [
      { label: "Học IELTS có 'auto' có bồ?", next: "funny1" },
      { label: "Thi xong IELTS có 'đổi đời' không? 💰", next: "funny2" },
      { label: "IELTS có phải là 'thuốc đặc trị mụn' không? 🤔", next: "funny3" }
    ]
  },
  funny1: {
    text: "Không dám chắc học xong IELTS là có ngay người yêu, nhưng điểm số ấn tượng chắc chắn sẽ giúp bạn 'ghi điểm' mạnh mẽ hơn trong mắt một ai đó đặc biệt đấy! ✨",
    options: []
  },
  funny2: {
    text: "Người khác 'giàu' nhờ 'chốt đơn', chúng mình 'giàu' lên từ việc 'chốt' mỗi bài học! Vốn kiến thức này mới là 'gia tài' đáng giá, được 'bảo hành trọn đời' và không lo bị áp lực deadline làm mai một đi đâu nè! 😊",
    options: []
  },
  funny3: {
    text: "Muốn biết ai là 'cao thủ' cày IELTS thức khuya không? Đừng nhìn sách vở, nhìn vào... mụn trên mặt ấy! Đó là 'huy chương' danh dự cho sự nỗ lực không ngừng nghỉ đó nha! 😉",
    options: []
  },

  // ⚡ THẦY PHÚC TRẢ LỜI NHANH
  quickReply: {
    text: "Thầy Phúc giải đáp nhanh lắm nha, nhanh hơn cả tốc độ bạn nhận tin nhắn 'seen' từ crush nữa đó! 😉",
    options: [
      { label: "Học lại từ con số 0?", next: "quick1" },
      { label: "Lộ trình và thời gian học?", next: "quick2" },
      { label: "Phương pháp học từ vựng hiệu quả", next: "quick3" }
    ]
  },
  quick1: {
    text: "Đã 'mất gốc' thì phải học 'cấp tốc' lên nha bạn ơi, chứ để lâu là 'gốc' cũng... 'biến mất' thật luôn đó! 😟",
    options: []
  },
  quick2: {
    text: "Tiến độ học nhanh hay chậm là do bạn quyết định nè. Còn bí quyết nhanh nhất á? Chắc là... học hôm nay, thi ngày mai (Haha, đùa thôi nha! 😁)",
    options: []
  },
  quick3: {
    text: "Muốn nhớ nhanh thì học phải vui nha. Nếu chưa vui thì 'ép' nó vui lên đi, tại vì ép dầu ép mỡ... ai nỡ ép điểm IELTS xuống hả? 😉.",
    options: []
  }
};

const LOCAL_STORAGE_KEY = 'chatMessages';

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [{ sender: 'bot', text: conversationFlow.start.text }];
  });

  const [options, setOptions] = useState(conversationFlow.start.options);
  const [usedStartOptions, setUsedStartOptions] = useState([]);
  const [usedChildOptions, setUsedChildOptions] = useState({});
  const messagesEndRef = useRef(null);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const isSingleUse = (label) => ["Kinh nghiệm giảng dạy"].includes(label);

  const handleOptionClick = (option) => {
    const nextNode = conversationFlow[option.next];
    if (!nextNode) return;

    const userMessage = { sender: 'user', text: option.label };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botReply = { sender: 'bot', text: nextNode.text };

      if (nextNode.isFortuneGame) {
        setMessages((prev) => [...prev, { sender: 'bot', text: "Đang bói điểm giúp bạn... ✨🔮" }]);
        setTimeout(() => {
          const results = [
            {
              "band": 4.5,
              "msg": "Nghe thì real là có nghe thấy âm thanh đó, nhưng não loading chậm hơn wifi nhà hàng xóm 🥲. Viết thì chính tả literally đi chơi xa chưa về. Được cái... tinh thần chiến đấu vẫn 💯! Cố lên bạn ơi!"
            },
            {
              "band": 5.0,
              "msg": "Ngữ pháp còn \"non và xanh\" lắm, phát âm nghe như \"tiếng lòng\" của gà lạc mẹ 😭. Cơ mà đừng tủi thân! Bạn là \"viên ngọc thô\" đang chờ ngày \"phá kén\" đó nha! Tiềm năng level max! 🐣🚀"
            },
            {
              "band": 5.5,
              "msg": "Bạn chính là \"bestie\" của phần Listening, cân literally cả team! Giờ chỉ cần \"farm\" thêm mớ từ vựng là thành \"pro player\" cân 3rd section ngon ơ! 💪🎧"
            },
            {
              "band": 6.0,
              "msg": "Ý tưởng \"bay bổng\" đúng đề, trả lời cũng \"okela\" rồi đó. Chỉ có điều... giám khảo vẫn nhìn bạn với ánh mắt \"hmm... bạn nói gì cơ?\" 😬 Cần \"flex\" sự rõ ràng hơn tí nha!"
            },
            {
              "band": 6.5,
              "msg": "Welcome to band \"quốc dân\"! Trình độ \"ổn áp\" phết rồi đó. Chỉ hơi \"simp lúa\" mấy từ nối and-and-and then tí thôi 😂. Bù lại tinh thần \"try hard\" vì IELTS thì khỏi bàn! 🧠💯"
            },
            {
              "band": 7.0,
              "msg": "Thần thái band 7 \"áp đảo\" rồi đó! Nói năng \"flow\" như rap, viết logic như dân IT. Chỉ còn thiếu vài \"gia vị bí mật\" gọi là collocation là \"chuẩn gu\" Tây 100%! Xuất sắc! 🚀"
            },
            {
              "band": 7.5,
              "msg": "Đã gần chạm \"nóc\" rồi bạn ơi! Phản xạ \"tia chớp\", từ vựng \"xịn sò\" khỏi bàn. Chỉ cần \"bơ đi\" cái thói \"so... so... so...\" là thành \"chúa hề\" Speaking ngay! 😉🎤"
            },
            {
              "band": 8.0,
              "msg": "Chúc mừng \"thần học\" đã \"auto win\" band 8! Điểm số này \"chuyện nhỏ như con thỏ\" với bạn. Nói chuyện thì cứ gọi là \"TED Talk\" phiên bản \"real\", nghe cuốn muốn xỉu! 😎👌"
            },
            {
              "band": 8.5,
              "msg": "Đã chính thức bước chân vào \"Vùng an toàn\" của \"cao thủ\"! Band 8.5 \"đỉnh của chóp\" khỏi bàn. Lỗi duy nhất (có thể) chỉ là... phát âm từ \"genre\" thôi đó nha 😂 \"Real\" pro là đây! 👑🤏"
            },
            {
              "band": 9.0,
              "msg": "Đích thị là \"Huyền thoại sống\" của IELTS! 9.0 trong tầm tay, dễ như \"nhai kẹo kéo\". Nghe đồn giám khảo còn phải \"quỳ lạy\" xin vía học Speaking Part 3 từ bạn đó! 🤯👑 Quá khủng!"
            }
          ];
          const result = results[Math.floor(Math.random() * results.length)];

          setMessages(prev => [...prev, { sender: 'bot', text: `🎲 Bạn bốc được: Band ${result.band}!\n${result.msg}` }]);
          setUsedStartOptions(prev => [...prev, option.label]);
          setOptions(conversationFlow.start.options.filter(opt => !usedStartOptions.includes(opt.label) && opt.label !== option.label));
        }, 1800);
        return;
      }

      setMessages((prev) => [...prev, botReply]);

      if (isSingleUse(option.label)) {
        setUsedStartOptions((prev) => [...prev, option.label]);
        setOptions(conversationFlow.start.options.filter(opt => ![...usedStartOptions, option.label].includes(opt.label)));
        return;
      }

      if (nextNode.options?.length) {
        setOptions(nextNode.options);
      } else {
        const parentKey = Object.entries(conversationFlow).find(([_, node]) =>
          node.options?.some(o => o.next === option.next)
        )?.[0];

        if (parentKey) {
          setUsedChildOptions(prev => {
            const updated = { ...prev };
            updated[parentKey] = [...(updated[parentKey] || []), option.next];

            if (conversationFlow[parentKey].options.every(o => updated[parentKey].includes(o.next))) {
              const parentLabel = conversationFlow.start.options.find(opt => opt.next === parentKey)?.label;
              if (parentLabel && !usedStartOptions.includes(parentLabel)) {
                setUsedStartOptions(prev => [...prev, parentLabel]);
              }
            }
            return updated;
          });
        }

        setOptions(conversationFlow.start.options.filter(opt => !usedStartOptions.includes(opt.label)));
      }
    }, 500); // 0.5s delay
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>Mắc trả lời</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`msg-row ${msg.sender}`}>
            <img
              src={msg.sender === 'user' ? '/images/user-icon.png' : '/images/bot-icon.png'}
              alt="avatar"
              className="avatar"
            />
            <div className={`bubble ${msg.sender}`}>{parseMessageWithLinks(msg.text)}</div>
          </div>
        ))}
        <div ref={messagesEndRef} style={{ float: 'left', clear: 'both', height: 0 }} />
      </div>
      <div className={`chat-footer`}>
        {options.map((opt, i) => (
          <button key={i} className="option-button" onClick={() => handleOptionClick(opt)}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}



