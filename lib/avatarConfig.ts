export const avatarStyles = [
  {
    id: 1,
    gradient: "linear-gradient(135deg, #FF6B6B 10%, #4ECDC4 100%)",
    icon: "👑",
    borderColor: "#FF6B6B"
  },
  {
    id: 2,
    gradient: "linear-gradient(135deg, #A8E6CF 10%, #3D84A8 100%)",
    icon: "🤖",
    borderColor: "#3D84A8"
  },
  {
    id: 3,
    gradient: "linear-gradient(135deg, #FFD93D 10%, #FF6B6B 100%)",
    icon: "⚡",
    borderColor: "#FFD93D"
  },
  {
    id: 4,
    gradient: "linear-gradient(135deg, #6C5CE7 10%, #a044ff 100%)",
    icon: "🌟",
    borderColor: "#6C5CE7"
  },
  {
    id: 5,
    gradient: "linear-gradient(135deg, #00B4DB 10%, #0083B0 100%)",
    icon: "💫",
    borderColor: "#00B4DB"
  },
  {
    id: 6,
    gradient: "linear-gradient(135deg, #F2994A 10%, #F2C94C 100%)",
    icon: "🎯",
    borderColor: "#F2994A"
  },
  {
    id: 7,
    gradient: "linear-gradient(135deg, #11998e 10%, #38ef7d 100%)",
    icon: "🎮",
    borderColor: "#11998e"
  },
  {
    id: 8,
    gradient: "linear-gradient(135deg, #FC466B 10%, #3F5EFB 100%)",
    icon: "🚀",
    borderColor: "#FC466B"
  },
  {
    id: 9,
    gradient: "linear-gradient(135deg, #FFAFBD 10%, #ffc3a0 100%)",
    icon: "✨",
    borderColor: "#FFAFBD"
  },
  {
    id: 10,
    gradient: "linear-gradient(135deg, #2193b0 10%, #6dd5ed 100%)",
    icon: "💎",
    borderColor: "#2193b0"
  },
];

export const cardStyles = [
  {
    id: "minimal",
    className: "card-minimal",
    styles: `
      /* 基础卡片样式 */
      .card-minimal {
        aspect-ratio: 16/9;
        width: 100%;
        max-width: 1920px;
        margin: 0 auto;
        padding: 40px;
        box-sizing: border-box;
        
        /* 背景和边框 */
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        border-radius: 16px;
        
        /* Flex布局 */
        display: flex;
        flex-direction: column;
      }

      /* 头部样式 */
      .card-minimal .header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
        position: relative;
      }

      /* 图标样式 */
      .card-minimal .icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .card-minimal .icon img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* ID样式 */
      .card-minimal .title {
        font-size: 24px;
        font-weight: 600;
        color: #333333;
      }

      /* 主要内容区域 */
      .card-minimal .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #333333;
        font-size: 16px;
        line-height: 1.6;
      }

      /* 底部样式 */
      .card-minimal .footer {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgba(0, 0, 0, 0.6);
        font-size: 14px;
      }

      /* 确保在截图时保持样式 */
      .card-minimal.for-image {
        position: relative;
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        box-shadow: none;
      }
    `,
    gradient: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    shadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    textColor: "#333333",
    metaColor: "rgba(0, 0, 0, 0.6)"
  }
];