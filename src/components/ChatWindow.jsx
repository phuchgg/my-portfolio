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
        text: "Hello bạn trẻ! Tôi là Hoàng Gia Phúc, master IELTS, chuyên trị bệnh mất gốc và bệnh lười 🤣. Giờ bạn thích gì nè?",
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
        text: "Khóa này dành riêng cho các bạn mà cứ nghe 'tiếng Anh' là như 'đàn gẩy tai trâu' 😝.",
        options: []
    },
    advancedCourse: {
        text: "Lớp này cam kết giúp bạn từ band thường dân thành band 'rich kid' IELTS 8.0+ luôn nha! 😎",
        options: []
    },
    schedule: {
        text: "Cập nhật lịch học mới toanh tại https://engonow.com/gioi-thieu/luyen-thi-ielts để 'đu trend' sớm nhất nè!",
        options: []
    },

    // 📚 KINH NGHIỆM GIẢNG DẠY
    teachingExperience: {
        text: "6 năm 'sống chết' cùng IELTS, học viên nào qua tay tui cũng đều 'bay màu' nỗi sợ tiếng Anh hết á 😌.",
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
        text: "Bạn hỏi gì tui đáp nấy, độ nhảm thì vô cực nhưng cười không cười ráng chịu à! 😚",
        options: [
            { label: "IELTS có giúp có bồ không?", next: "funny1" },
            { label: "Thi IELTS xong giàu không?", next: "funny2" },
            { label: "IELTS giúp hết mụn không?", next: "funny3" }
        ]
    },
    funny1: {
        text: "IELTS thì không chắc có bồ, nhưng có điểm IELTS cao thì bồ auto tới nha 😏.",
        options: []
    },
    funny2: {
        text: "Giàu hay không chưa biết, nhưng giàu kiến thức thì có thiệt đó! 🤑",
        options: []
    },
    funny3: {
        text: "IELTS không trị mụn nhưng thức khuya ôn IELTS thì mụn auto tới thăm đều nha bạn 😭.",
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


export default function ChatWindow({ onClose }) {
    const [messages, setMessages] = useState([{ sender: 'bot', text: conversationFlow.start.text }]);
    const [options, setOptions] = useState(conversationFlow.start.options);
    const [usedStartOptions, setUsedStartOptions] = useState([]);
    const [usedPaths, setUsedPaths] = useState([]);
    const messagesEndRef = useRef(null);
  
    const handleOptionClick = (option) => {
      const nextNode = conversationFlow[option.next];
      if (!nextNode) return;
  
      const userMessage = { sender: 'user', text: option.label };
      const botReply = { sender: 'bot', text: nextNode.text };
  
      setMessages((prev) => [...prev, userMessage, botReply]);
  
      // Nếu là node con (quick1, funny2...) thì ghi nhận nó
      setUsedPaths(prev => [...prev, option.next]);
  
      // Nếu là node mẹ (từ start) thì chỉ ẩn khi đã chọn hết con của nó (nếu có)
      const childOptions = nextNode.options || [];
      const allUsed = childOptions.length === 0 || childOptions.every(opt => usedPaths.includes(opt.next));
  
      if (conversationFlow.start.options.find(opt => opt.label === option.label)) {
        if (allUsed) {
          setUsedStartOptions(prev => [...prev, option.label]);
        }
      }
  
      // Trường hợp bói điểm
      if (nextNode.isFortuneGame) {
        setMessages(prev => [
          ...prev,
          userMessage,
          { sender: 'bot', text: "Đang bói điểm giúp bạn... ✨🔮" }
        ]);
        setOptions([]);
  
        setTimeout(() => {
          const results = [
            { band: 4.5, msg: 'Nghe rõ, hiểu chậm, viết sai chính tả liên tục. Nhưng được cái... có cố gắng 😅' },
            { band: 5.0, msg: 'Ngữ pháp như lúa non, phát âm như tiếng gà gáy... nhưng có tố chất tiềm ẩn 🐣' },
            { band: 5.5, msg: 'Chiến sĩ học nhóm, gánh team về phần nghe. Cần “buff” thêm từ vựng nha 💪' },
            { band: 6.0, msg: 'Trả lời đúng đề, có idea rõ ràng, nhưng... vẫn hay bị giám khảo hỏi lại 😬' },
            { band: 6.5, msg: 'Ổn áp! Dính “and... and... and then” hơi nhiều, nhưng tinh thần rất IELTS 🧠' },
            { band: 7.0, msg: 'Thần thái band 7, nói rõ ràng, viết logic. Chỉ thiếu 1 chút “collocation thần thánh” ✍️' },
            { band: 7.5, msg: 'Gần tới đỉnh rồi. Phản xạ tốt, từ vựng khá. Chỉ cần đừng “so” everything là ổn 😂' },
            { band: 8.0, msg: 'Chúc mừng thần học! Band 8 là chuyện nhỏ với bạn. Nói chuyện như TED Talk 🎤' },
            { band: 8.5, msg: 'Bạn đang bước vào vùng “band cao thủ” rồi đó. Nên xem lại phát âm của từ “genre” thôi 😎' },
            { band: 9.0, msg: 'Huyền thoại sống. Giám khảo còn nhờ bạn dạy lại phần Speaking Part 3 😲' }
          ];
          const result = results[Math.floor(Math.random() * results.length)];
  
          setMessages(prev => [
            ...prev,
            { sender: 'bot', text: `🎲 Bạn bốc được: Band ${result.band}!\n${result.msg}` }
          ]);
  
          const remaining = conversationFlow.start.options.filter(
            opt => !usedStartOptions.includes(opt.label)
          );
          setOptions(remaining);
        }, 1800);
        return;
      }
  
      const nextOpts = nextNode.options?.length
        ? nextNode.options
        : conversationFlow.start.options.filter(opt => !usedStartOptions.includes(opt.label));
  
      setOptions(nextOpts);
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
          <span>Mắc hỏi</span>
          <button onClick={onClose}>×</button>
        </div>
        <div className="chat-body">
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
        <div className={`chat-footer ${options.length <= 2 ? 'push-bottom' : ''}`}>

        {options.map((opt, i) => (
          <button key={i} className="option-button" onClick={() => handleOptionClick(opt)}>
            {opt.label}
          </button>
        ))}
      </div>
      </div>
    );
  }
  
