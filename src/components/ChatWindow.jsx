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
        text: "Hên xui IELTS hôm nay sao nè, chọn lẹ số đẹp đo nhân phẩm liền! 😜",
        options: [
            { label: "1", next: "luck1" },
            { label: "3", next: "luck3" },
            { label: "6", next: "luck6" },
            { label: "7", next: "luck7" },
            { label: "9", next: "luck9" }
        ]
    },
    luck1: {
        text: "Bạn chọn số 1 tức là xác định hôm nay thi nghe cứ như 'đàn gảy tai trâu' 🥲.",
        options: []
    },
    luck3: {
        text: "Chọn số 3 nghĩa là xác suất bạn 'hên' IELTS hôm nay còn cao hơn xác suất crush rep tin nhắn nữa cơ! 😘",
        options: []
    },
    luck6: {
        text: "Hôm nay khả năng IELTS của bạn lên xuống thất thường như giá bitcoin vậy đó, cẩn thận nha 🤓.",
        options: []
    },
    luck7: {
        text: "Số đẹp quá ha! Band cao thiệt đó, nhưng nhớ đừng đọc 'think' thành 'thinh' nha má 🤭.",
        options: []
    },
    luck9: {
        text: "Số này dành cho người xuất chúng. Nhưng viết sai grammar thì vẫn 'xuất chuồng' như thường nha bạn 😂.",
        options: []
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
    const messagesEndRef = useRef(null);

    const handleOptionClick = (option) => {
        const nextNode = conversationFlow[option.next];
        if (!nextNode) return;

        const userMessage = { sender: 'user', text: option.label };
        const botReply = { sender: 'bot', text: nextNode.text };

        const lastMsg = messages[messages.length - 1];
        if (lastMsg?.text === botReply.text) return;

        setMessages((prev) => [...prev, userMessage, botReply]);

        // Lọc các nút còn lại sau khi chọn
        const allOptions = conversationFlow.start.options;
        const remainingOptions = allOptions.filter((opt) => opt.label !== option.label);
        const nextOptions = nextNode.options?.length ? nextNode.options : remainingOptions;

        setOptions(nextOptions);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
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
                        <div className={`bubble ${msg.sender}`}>
                            {parseMessageWithLinks(msg.text)}
                        </div>

                    </div>
                ))}

                <div ref={messagesEndRef} />
            </div>
            <div className="chat-footer">
                {options.map((opt, i) => (
                    <button key={i} className="option-button" onClick={() => handleOptionClick(opt)}>
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
