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
    text: "Hey bạn! Phúc đây - chuyên gia IELTS sẵn sàng 'chữa bệnh' mất gốc và lười biếng cho bạn 😉. Giờ thì, bạn cần Phúc giúp gì trên con đường chinh phục IELTS nào?",
    options: [
      { label: "Khóa học", next: "courses" },
      { label: "Kinh nghiệm giảng dạy", next: "teachingExperience" },
      { label: "Test nhân phẩm", next: "ieltsLuckTest" },
      { label: "Hỏi xoáy đáp xàm", next: "funnyQA" },
      { label: "Thầy Phúc trả lời nhanh", next: "quickReply" }
    ]
  },

  // 🎓 KHÓA HỌC
  courses: {
    text: "Pick khóa học nào để 'kil' IELTS đây bạn tui?",
    options: [
      { label: "Khóa lấy gốc cấp tốc", next: "basicCourse" },
      { label: "Khóa luyện thi chuyên sâu", next: "advancedCourse" },
      { label: "Lịch học & khai giảng", next: "schedule" }
    ]
  },
  basicCourse: {
    text: "Bạn thấy tiếng Anh khó nhằn, nghe giảng mà như 'vịt nghe sấm'? Đây chính là khóa học 'cứu cánh' dành riêng cho bạn 😝.",
    options: []
  },
  advancedCourse: {
    text: "Cam kết đồng hành cùng bạn 'lột xác' điểm số, từ band 'phổ thông' vươn tới mục tiêu IELTS 8.0+ đáng mơ ước! 😎",
    options: []
  },
  schedule: {
    text: "Lịch học mới keng đã lên sóng! Check ngay tại https://engonow.com/gioi-thieu/luyen-thi-ielts để chọn giờ học ưng ý và 'xí' chỗ sớm nhất nhé!",
    options: []
  },

  // 📚 KINH NGHIỆM GIẢNG DẠY
  teachingExperience: {
    text: "Hỏi 'thuốc đặc trị' nỗi ám ảnh tiếng Anh ở đâu? Ở đây này! Hơn 6 năm 'pha chế', mình đã 'bào chế' thành công 'liều thuốc' giúp học viên 'yêu lại từ đầu' với IELTS. 'Tác dụng phụ' là điểm cao 'gây sốc' đó nha! 💊❤️📈",
    options: []
  },

  // 🎲 TEST NHÂN PHẨM
  ieltsLuckTest: {
    text: "Đang bói điểm giúp bạn... 🔮✨",
    options: [],
    isFortuneGame: true // dùng flag này để render game mini thay vì hiển thị text như bình thường
  },

  // 🌀 HỎI XOÁY ĐÁP XÀM
  funnyQA: {
    text: "Cần 'giải cứu' khúc mắc nào à? 'Triển' liền câu hỏi đi! Mình 'support' hết mình, cách trả lời có thể hơi 'ô dề' tí nhưng đảm bảo 'có tâm' và không bao giờ 'thiếu muối' đâu nha! ✨🧂",
    options: [
      { label: "IELTS có giúp có bồ không?", next: "funny1" },
      { label: "Thi IELTS xong giàu không?", next: "funny2" },
      { label: "IELTS giúp hết mụn không?", next: "funny3" }
    ]
  },
  funny1: {
    text: "Không dám hứa học IELTS xong là có người yêu, nhưng điểm số ấn tượng chắc chắn là một 'điểm cộng' siêu to khổng lồ trong mắt 'ai đó' nha! 😏",
    options: []
  },
  funny2: {
    text: "Người ta 'giàu' vì 'chốt đơn' liên tục, mình 'giàu' vì 'chốt chữ' không ngừng nghỉ! Cái 'gia tài' này mới 'bảo hành trọn đời', không sợ 'deadline' dí tới bến! 😆📖",
    options: []
  },
  funny3: {
    text: "Hỏi 'biểu tượng' của người thức khuya cày IELTS là gì? Không phải sách vở đâu, là MỤN đó! 'Auto' có mụn là biết độ 'try hard' rồi nha! 😩🚩",
    options: []
  },

  // ⚡ THẦY PHÚC TRẢ LỜI NHANH
  quickReply: {
    text: "Thầy Phúc sẵn sàng giải đáp nhanh hơn cả tốc độ bạn bị crush từ chối nha 🤣",
    options: [
      { label: "Mất gốc học được không thầy?", next: "quick1" },
      { label: "Học bao lâu mới thi được?", next: "quick2" },
      { label: "Cách nhớ từ vựng siêu tốc?", next: "quick3" }
    ]
  },
  quick1: {
    text: "Mất gốc càng phải học lẹ, chứ để lâu là gốc cũng mất luôn á bạn 🤧.",
    options: []
  },
  quick2: {
    text: "Nhanh chậm do bạn, nhưng nhanh nhất là học hôm nay, thi ngày mai đó (nói chơi thôi đừng tin) 😆.",
    options: []
  },
  quick3: {
    text: "Muốn nhớ nhanh phải học vui. Không vui thì ép vui, tại vì ép dầu ép mỡ ai nỡ ép IELTS ha 😅.",
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



