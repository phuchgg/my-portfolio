import { i } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const StatBox = ({ target, label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef();
    const hasRun = useRef(false);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasRun.current) {
                    let start = 0;
                    const speed = target / 150;

                    const update = () => {
                        start += speed;
                        if (start < target) {
                            setCount(Math.ceil(start));
                            requestAnimationFrame(update);
                        } else {
                            setCount(target);
                        }
                    };

                    update();
                    hasRun.current = true;
                }
            },
            { threshold: 1 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [target]);

    return (
        <div className="stat-box" ref={ref}>
            <div className="counter">{count}+</div>
            <p>{label}</p>
        </div>
    );
};

const StatsCounter = () => {
    const { pathname } = useLocation();
    if (pathname === "/contact") return null;
    return (
        <section className="stats-section">
            <StatBox target={7} label="Năm đồng hành cùng học viên" />
            <StatBox target={15000} label="Giờ giảng dạy và huấn luyện" />
            <StatBox target={100} label="Học viên đạt target IELTS" />
        </section>
    );
};

export default StatsCounter;
