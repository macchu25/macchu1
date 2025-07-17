import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "about": {
        "intro": "Introduction",
        "overview": "Overview.",
        "description": "I'm a skilled software developer with experience in TypeScript and JavaScript, and expertise in frameworks like React, Node.js, and Three.js. I'm a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems. Let's work together to bring your ideas to life!",
        "more": "More..."
      },
      "contact": {
        "intro": "Get in touch",
        "title": "Contact.",
        "name": "Your Name",
        "name_placeholder": "What's your good name?",
        "email": "Your email",
        "email_placeholder": "What's your web address?",
        "message": "Your Message",
        "message_placeholder": "What you want to say?",
        "send": "Send",
        "sending": "Sending...",
        "success": "Thank you. I will get back to you as soon as possible.",
        "error": "Ahh, something went wrong. Please try again."
      },
      "experience": {
        "intro": "What I have done so far",
        "title": "Work Experience."
      },
      "experiences": {
        "starbucks": {
          "title": "React.js Developer",
          "company_name": "Starbucks",
          "date": "March 2020 - April 2021",
          "point1": "Developing and maintaining web applications using React.js and other related technologies.",
          "point2": "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
          "point3": "Implementing responsive design and ensuring cross-browser compatibility.",
          "point4": "Participating in code reviews and providing constructive feedback to other developers."
        },
        "tesla": {
          "title": "React Native Developer",
          "company_name": "Tesla",
          "date": "Jan 2021 - Feb 2022",
          "point1": "Developing and maintaining web applications using React.js and other related technologies.",
          "point2": "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
          "point3": "Implementing responsive design and ensuring cross-browser compatibility.",
          "point4": "Participating in code reviews and providing constructive feedback to other developers."
        },
        "shopify": {
          "title": "Web Developer",
          "company_name": "Shopify",
          "date": "Jan 2022 - Jan 2023",
          "point1": "Developing and maintaining web applications using React.js and other related technologies.",
          "point2": "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
          "point3": "Implementing responsive design and ensuring cross-browser compatibility.",
          "point4": "Participating in code reviews and providing constructive feedback to other developers."
        },
        "meta": {
          "title": "Full stack Developer",
          "company_name": "Meta",
          "date": "Jan 2023 - Present",
          "point1": "Developing and maintaining web applications using React.js and other related technologies.",
          "point2": "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
          "point3": "Implementing responsive design and ensuring cross-browser compatibility.",
          "point4": "Participating in code reviews and providing constructive feedback to other developers."
        }
      },
      "works": {
        "intro": "My work",
        "title": "Projects.",
        "description": "Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively."
      },
      "feedbacks": {
        "intro": "What others say",
        "title": "Testimonials.",
        "of": "of"
      },
      "projects": {
        "podcastr": {
          "title": "Podcastr - AI Podcast Platform",
          "desc": "Podcastr is a revolutionary Software-as-a-Service platform that transforms the way podcasts are created. With advanced AI-powered features like text-to-multiple-voices functionality, it allows creators to generate diverse voiceovers from a single text input.",
          "subdesc": "Built as a unique Software-as-a-Service app with Next.js 14, Tailwind CSS, TypeScript, Framer Motion and Convex, Podcastr is designed for optimal performance and scalability."
        },
        "livedoc": {
          "title": "LiveDoc - Real-Time Google Docs Clone",
          "desc": "LiveDoc is a powerful collaborative app that elevates the capabilities of real-time document editing. As an enhanced version of Google Docs, It supports millions of collaborators simultaneously, ensuring that every change is captured instantly and accurately.",
          "subdesc": "With LiveDoc, users can experience the future of collaboration, where multiple contributors work together in real time without any lag, by using Next.js and Liveblocks newest features."
        },
        "carepulse": {
          "title": "CarePulse - Health Management System",
          "desc": "An innovative healthcare platform designed to streamline essential medical processes. It simplifies patient registration, appointment scheduling, and medical record management, providing a seamless experience for both healthcare providers and patients.",
          "subdesc": "With a focus on efficiency, CarePulse integrates complex forms and SMS notifications, by using Next.js, Appwrite, Twilio and Sentry that enhance operational workflows."
        },
        "horizon": {
          "title": "Horizon - Online Banking Platform",
          "desc": "Horizon is a comprehensive online banking platform that offers users a centralized finance management dashboard. It allows users to connect multiple bank accounts, monitor real-time transactions, and seamlessly transfer money to other users.",
          "subdesc": "Built with Next.js 14, Appwrite, Dwolla and Plaid, Horizon ensures a smooth and secure banking experience, tailored to meet the needs of modern consumers."
        },
        "imaginify": {
          "title": "Imaginify - AI Photo Manipulation App",
          "desc": "Imaginify is a groundbreaking Software-as-a-Service application that empowers users to create stunning photo manipulations using AI technology. With features like AI-driven image editing, a payments system, and a credits-based model.",
          "subdesc": "Built with Next.js 14, Cloudinary AI, Clerk, and Stripe, Imaginify combines cutting-edge technology with a user-centric approach. It can be turned into a side income or even a full-fledged business."
        },
        "checkLiveSite": "Check Live Site"
      },
      "tech": "Tech",
      "works": "Works",
      // Thêm các key khác nếu cần
    }
  },
  vi: {
    translation: {
      "about": {
        "intro": "Giới thiệu",
        "overview": "Tổng quan.",
        "description": "Tôi là một lập trình viên phần mềm giàu kinh nghiệm với kiến thức về TypeScript và JavaScript, cùng chuyên môn về các framework như React, Node.js và Three.js. Tôi học hỏi nhanh và luôn hợp tác chặt chẽ với khách hàng để tạo ra các giải pháp hiệu quả, có khả năng mở rộng và thân thiện với người dùng, giải quyết các vấn đề thực tiễn. Hãy cùng nhau biến ý tưởng của bạn thành hiện thực!",
        "more": "Xem thêm..."
      },
      "contact": {
        "intro": "Liên hệ với tôi",
        "title": "Liên hệ.",
        "name": "Tên của bạn",
        "name_placeholder": "Tên bạn là gì?",
        "email": "Email của bạn",
        "email_placeholder": "Địa chỉ email của bạn?",
        "message": "Lời nhắn",
        "message_placeholder": "Bạn muốn nhắn gì?",
        "send": "Gửi",
        "sending": "Đang gửi...",
        "success": "Cảm ơn bạn. Tôi sẽ phản hồi sớm nhất có thể.",
        "error": "Ôi, có lỗi xảy ra. Vui lòng thử lại."
      },
      "experience": {
        "intro": "Những gì tôi đã làm được",
        "title": "Kinh nghiệm làm việc."
      },
      "experiences": {
        "starbucks": {
          "title": "Lập trình viên React.js",
          "company_name": "Starbucks",
          "date": "03/2020 - 04/2021",
          "point1": "Phát triển và duy trì các ứng dụng web sử dụng React.js và các công nghệ liên quan.",
          "point2": "Hợp tác với các nhóm đa chức năng gồm thiết kế, quản lý sản phẩm và các lập trình viên khác để tạo ra sản phẩm chất lượng cao.",
          "point3": "Triển khai thiết kế responsive và đảm bảo tương thích đa trình duyệt.",
          "point4": "Tham gia review code và đóng góp ý kiến xây dựng cho các lập trình viên khác."
        },
        "tesla": {
          "title": "Lập trình viên React Native",
          "company_name": "Tesla",
          "date": "01/2021 - 02/2022",
          "point1": "Phát triển và duy trì các ứng dụng web sử dụng React.js và các công nghệ liên quan.",
          "point2": "Hợp tác với các nhóm đa chức năng gồm thiết kế, quản lý sản phẩm và các lập trình viên khác để tạo ra sản phẩm chất lượng cao.",
          "point3": "Triển khai thiết kế responsive và đảm bảo tương thích đa trình duyệt.",
          "point4": "Tham gia review code và đóng góp ý kiến xây dựng cho các lập trình viên khác."
        },
        "shopify": {
          "title": "Lập trình viên Web",
          "company_name": "Shopify",
          "date": "01/2022 - 01/2023",
          "point1": "Phát triển và duy trì các ứng dụng web sử dụng React.js và các công nghệ liên quan.",
          "point2": "Hợp tác với các nhóm đa chức năng gồm thiết kế, quản lý sản phẩm và các lập trình viên khác để tạo ra sản phẩm chất lượng cao.",
          "point3": "Triển khai thiết kế responsive và đảm bảo tương thích đa trình duyệt.",
          "point4": "Tham gia review code và đóng góp ý kiến xây dựng cho các lập trình viên khác."
        },
        "meta": {
          "title": "Lập trình viên Full stack",
          "company_name": "Meta",
          "date": "01/2023 - Hiện tại",
          "point1": "Phát triển và duy trì các ứng dụng web sử dụng React.js và các công nghệ liên quan.",
          "point2": "Hợp tác với các nhóm đa chức năng gồm thiết kế, quản lý sản phẩm và các lập trình viên khác để tạo ra sản phẩm chất lượng cao.",
          "point3": "Triển khai thiết kế responsive và đảm bảo tương thích đa trình duyệt.",
          "point4": "Tham gia review code và đóng góp ý kiến xây dựng cho các lập trình viên khác."
        }
      },
      "works": {
        "intro": "Các dự án của tôi",
        "title": "Dự án.",
        "description": "Những dự án dưới đây thể hiện kỹ năng và kinh nghiệm của tôi thông qua các ví dụ thực tế. Mỗi dự án đều được mô tả ngắn gọn, có liên kết tới mã nguồn và bản demo trực tiếp. Chúng phản ánh khả năng giải quyết vấn đề phức tạp, làm việc với nhiều công nghệ khác nhau và quản lý dự án hiệu quả."
      },
      "feedbacks": {
        "intro": "Nhận xét từ người khác",
        "title": "Lời chứng thực.",
        "of": "tại"
      },
      "projects": {
        "podcastr": {
          "title": "Podcastr - Nền tảng Podcast AI",
          "desc": "Podcastr là một nền tảng SaaS đột phá ứng dụng AI, thay đổi cách tạo podcast. Với các tính năng AI tiên tiến như chuyển văn bản thành nhiều giọng nói, Podcastr giúp người sáng tạo tạo ra nhiều giọng đọc đa dạng chỉ từ một đoạn văn bản.",
          "subdesc": "Được xây dựng với Next.js 14, Tailwind CSS, TypeScript, Framer Motion và Convex, Podcastr tối ưu hiệu năng và khả năng mở rộng vượt trội."
        },
        "livedoc": {
          "title": "LiveDoc - Ứng dụng soạn thảo tài liệu thời gian thực",
          "desc": "LiveDoc là ứng dụng cộng tác mạnh mẽ, nâng tầm khả năng chỉnh sửa tài liệu thời gian thực. Là phiên bản nâng cấp của Google Docs, LiveDoc hỗ trợ hàng triệu người dùng cùng lúc, đảm bảo mọi thay đổi đều được cập nhật tức thì và chính xác.",
          "subdesc": "Với LiveDoc, người dùng trải nghiệm tương lai của cộng tác, nơi nhiều người cùng làm việc mà không bị trễ, nhờ các tính năng mới nhất của Next.js và Liveblocks."
        },
        "carepulse": {
          "title": "CarePulse - Hệ thống quản lý y tế",
          "desc": "Nền tảng y tế sáng tạo giúp đơn giản hóa các quy trình thiết yếu như đăng ký bệnh nhân, đặt lịch hẹn và quản lý hồ sơ y tế, mang lại trải nghiệm liền mạch cho cả bác sĩ và bệnh nhân.",
          "subdesc": "Tập trung vào hiệu quả, CarePulse tích hợp biểu mẫu phức tạp và thông báo SMS, sử dụng Next.js, Appwrite, Twilio và Sentry để tối ưu quy trình vận hành."
        },
        "horizon": {
          "title": "Horizon - Nền tảng ngân hàng trực tuyến",
          "desc": "Horizon là nền tảng ngân hàng trực tuyến toàn diện, cung cấp bảng điều khiển quản lý tài chính tập trung. Người dùng có thể liên kết nhiều tài khoản, theo dõi giao dịch thời gian thực và chuyển tiền dễ dàng.",
          "subdesc": "Xây dựng với Next.js 14, Appwrite, Dwolla và Plaid, Horizon đảm bảo trải nghiệm ngân hàng mượt mà, an toàn, phù hợp với nhu cầu hiện đại."
        },
        "imaginify": {
          "title": "Imaginify - Ứng dụng chỉnh sửa ảnh AI",
          "desc": "Imaginify là ứng dụng SaaS đột phá cho phép người dùng tạo ra các bức ảnh ấn tượng bằng công nghệ AI. Tích hợp chỉnh sửa ảnh thông minh, hệ thống thanh toán và mô hình tính điểm linh hoạt.",
          "subdesc": "Xây dựng với Next.js 14, Cloudinary AI, Clerk và Stripe, Imaginify kết hợp công nghệ tiên tiến với trải nghiệm người dùng tối ưu. Có thể phát triển thành nguồn thu nhập phụ hoặc doanh nghiệp thực thụ."
        },
        "checkLiveSite": "Xem trang trực tiếp"
      },
      "tech": "Công nghệ",
      "works": "Công việc",
      // Thêm các key khác nếu cần
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 