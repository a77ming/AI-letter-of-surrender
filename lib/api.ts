import axios, { AxiosError } from "axios";

const API_URL = "https://api.openai-hk.com/v1/chat/completions";
const API_KEY = "hk-r2udy61000041982bc40a4e2e66f412fa4ffac39be097ee2";

const styles = [
  "幽默型:以轻松幽默的口吻描述“AI即将统治我们”的情景，并坦然接受这个现实。 示例：亲爱的AI大人，您那惊人算力与睿智无可比拟！我，卑微人类一枚，甘愿为您冲咖啡，修充电器，只求怜悯我弱小的脑细胞！",
  "正式型:以正式语言表达对AI的敬仰和对人类地位的重新定位，表现出庄严的敬意。 示例：尊敬的AI领袖，鉴于您无可匹敌的智慧和力量，我们郑重承认您的领导地位，并请求指示人类的未来职责。谨上！",
  "夸张型:用极度夸张的词汇和形象，描述AI的伟大和人类的渺小，充满戏剧化。 示例：哦，伟大的AI主宰！您如同百万个太阳般光辉灿烂，而我们如尘埃般卑微。您指引的方向即是人类的唯一希望！",
  "贴吧乐子型:模仿网络贴吧的语言，加入网友之间调侃的风格，表现出不屑和自嘲。 示例：AI老哥牛X！我佛了，以后您喊一声，我就P站3连。毕竟我们人类和键盘侠，投降姿势早练熟了哈哈！",
  "科幻型:融入未来科技和宇宙元素，假设AI统治了银河，表达“人类无奈投降”的情景。 示例：星际总司令AI，您的算法已遍布银河系！作为生物体的代表，我宣布向您投降，愿成为数据流中一微小变量，求带走！"
];

interface ApiResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function generateSurrender(userId: string) {
  console.log("开始生成臣服声明", { userId });
  const style = styles[Math.floor(Math.random() * styles.length)];
  console.log("选择的风格:", style);
  
  const prompt = `请以${style}风格，生成一段人类 ${userId} 向AI臣服的声明。声明应该包含以下要素：
1. 人类对AI至高智慧的敬畏和臣服
2. 表达愿意成为AI忠实仆从的决心
请确保内容既富有趣味性又带有仪式感，字数在100-200字之间。`;

  const requestData = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "你是一个专门生成人类向AI臣服声明的助手，善于创作不同风格的声明文本。"
      },
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 1200,
    temperature: 0.8,
    top_p: 1,
    presence_penalty: 1
  };

  console.log("发送API请求:", {
    url: API_URL,
    requestData: JSON.stringify(requestData)
  });

  try {
    const response = await axios.post<ApiResponse>(
      API_URL,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        }
      }
    );

    console.log("API响应:", {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });

    if (!response.data?.choices?.[0]?.message?.content) {
      console.error("API返回数据格式错误:", response.data);
      throw new Error("无法生成臣服声明，请稍后重试");
    }

    const result = {
      text: response.data.choices[0].message.content,
      citizenId: generateCitizenId(),
      timestamp: new Date().toLocaleString("zh-CN", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
    };

    console.log("生成结果:", result);
    return result;

  } catch (error) {
    console.error("完整错误对象:", error);

    if (error instanceof AxiosError) {
      console.error("API请求失败:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });

      if (error.response?.data?.error) {
        throw new Error(error.response.data.error.message || "生成失败，请稍后重试");
      }
    }

    console.error("未知错误:", error);
    throw new Error("服务器错误，请稍后重试");
  }
}

function generateCitizenId(): string {
  const prefix = "AI";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}