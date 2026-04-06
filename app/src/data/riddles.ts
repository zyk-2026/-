export interface Riddle {
  id: number;
  question: string;
  answer: string;
  hint: string;
  explanation: string;
}

export const riddles: Riddle[] = [
  {
    id: 1,
    question: "一口咬掉牛尾巴",
    answer: "告",
    hint: "想想'牛'字去掉下面一竖，加上'口'",
    explanation: "'牛'字去掉下面一竖（尾巴），上面加'口'字，就是'告'"
  },
  {
    id: 2,
    question: "山上还有山",
    answer: "出",
    hint: "两个'山'字叠在一起",
    explanation: "两个'山'字上下相叠，就是'出'字"
  },
  {
    id: 3,
    question: "十张口，一颗心",
    answer: "思",
    hint: "'十'+'口'+'心'",
    explanation: "'十'、'口'、'心'三个字组合起来就是'思'"
  },
  {
    id: 4,
    question: "一只黑狗，不叫不吼",
    answer: "默",
    hint: "'黑'+'犬'（狗）",
    explanation: "'黑'字加上'犬'（狗）字，组成'默'，默不作声"
  },
  {
    id: 5,
    question: "四面都是山，山山都相连",
    answer: "田",
    hint: "从四个方向看都是'山'字",
    explanation: "'田'字从上下左右四个方向看，都是'山'字形状"
  },
  {
    id: 6,
    question: "种花要除草，一人来一勺",
    answer: "化",
    hint: "'花'去掉草字头，加上'人'（亻）和'勺'",
    explanation: "'花'去掉草字头剩'化'，一人一勺也暗示'化'字结构"
  },
  {
    id: 7,
    question: "千言万语",
    answer: "够",
    hint: "'句'多'多'",
    explanation: "'千言万语'就是句子很多，'句'+'多'='够'"
  },
  {
    id: 8,
    question: "皇帝新衣",
    answer: "袭",
    hint: "'龙'（皇帝）+'衣'",
    explanation: "皇帝象征'龙'，龙穿新衣，'龙'+'衣'='袭'"
  },
  {
    id: 9,
    question: "一点一横长，一撇到南洋",
    answer: "广",
    hint: "按照笔画顺序写",
    explanation: "'广'字的笔画顺序：点、横、撇"
  },
  {
    id: 10,
    question: "一边是水，一边是山",
    answer: "汕",
    hint: "'氵'（水）+'山'",
    explanation: "三点水（氵）代表水，加上'山'字，组成'汕'"
  },
  {
    id: 11,
    question: "七十二小时",
    answer: "晶",
    hint: "七十二小时是三日",
    explanation: "七十二小时等于三日，三个'日'字组成'晶'"
  },
  {
    id: 12,
    question: "需要一半，留下一半",
    answer: "雷",
    hint: "'需'取一半，'留'取一半",
    explanation: "'需'字取'雨'，'留'字取'田'，'雨'+'田'='雷'"
  },
  {
    id: 13,
    question: "一月一日非今天",
    answer: "明",
    hint: "'月'+'日'",
    explanation: "'月'和'日'组成'明'，明天不是今天"
  },
  {
    id: 14,
    question: "要一半，扔一半",
    answer: "奶",
    hint: "'要'取一半，'扔'取一半",
    explanation: "'要'取'女'，'扔'取'乃'，'女'+'乃'='奶'"
  },
  {
    id: 15,
    question: "综合门市",
    answer: "闹",
    hint: "'门'+'市'",
    explanation: "'门'字里加个'市'字，就是'闹'"
  },
  {
    id: 16,
    question: "不是冤家也碰头",
    answer: "硼",
    hint: "'朋'+'石'（碰的部首）",
    explanation: "'朋'代表朋友（不是冤家），'碰头'取'石'，'石'+'朋'='硼'"
  },
  {
    id: 17,
    question: "守门员",
    answer: "闪",
    hint: "'门'里有'人'",
    explanation: "'门'字里面站个'人'（守门员），就是'闪'"
  },
  {
    id: 18,
    question: "有人偷车",
    answer: "输",
    hint: "'车'+'人'（亻）+'偷'的部分",
    explanation: "'车'+'人'（亻）+'俞'（偷的右半）='输'"
  },
  {
    id: 19,
    question: "半青半紫",
    answer: "素",
    hint: "'青'取一半，'紫'取一半",
    explanation: "'青'取上半'龶'，'紫'取下半'糸'，组合成'素'"
  },
  {
    id: 20,
    question: "身残心不残",
    answer: "息",
    hint: "'身'取一部分+'心'",
    explanation: "'身'残了剩'自'，加上'心'，'自'+'心'='息'"
  }
];

// 随机获取指定数量的字谜
export function getRandomRiddles(count: number): Riddle[] {
  const shuffled = [...riddles].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
