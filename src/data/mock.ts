export const flashDeals = [
  { id: 1, from: '上海', to: '曼谷', price: 899, label: '含税往返', remaining: 12, countdown: '02:31:15', airline: '春秋航空', flag: '🇹🇭' },
  { id: 2, from: '北京', to: '东京', price: 1280, label: '含税往返', remaining: 8, countdown: '05:12:30', airline: '东方航空', flag: '🇯🇵' },
  { id: 3, from: '广州', to: '新加坡', price: 750, label: '含税单程', remaining: 5, countdown: '01:45:20', airline: '酷航', flag: '🇸🇬' },
];

export const todayDeals = [
  { id: 1, city: '大阪', country: '日本', flag: '🇯🇵', price: 1280, airline: '东航直飞', tag: '历史低价', tagType: 'red' as const, image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400&h=260&fit=crop' },
  { id: 2, city: '清迈', country: '泰国', flag: '🇹🇭', price: 680, airline: '亚航含行李', tag: '比平时便宜40%', tagType: 'green' as const, image: 'https://images.unsplash.com/photo-1598935898639-81586f7d2129?w=400&h=260&fit=crop' },
  { id: 3, city: '成都', country: '中国', flag: '🇨🇳', price: 320, airline: '川航暗号价', tag: '暗号特价', tagType: 'yellow' as const, image: 'https://images.unsplash.com/photo-1609804578505-d48cafc20c3e?w=400&h=260&fit=crop' },
  { id: 4, city: '三亚', country: '中国', flag: '🇨🇳', price: 450, airline: '南航会员日', tag: '限时8折', tagType: 'blue' as const, image: 'https://images.unsplash.com/photo-1559628233-100c798642d4?w=400&h=260&fit=crop' },
  { id: 5, city: '首尔', country: '韩国', flag: '🇰🇷', price: 980, airline: '济州航空', tag: '含行李', tagType: 'green' as const, image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=260&fit=crop' },
  { id: 6, city: '吉隆坡', country: '马来西亚', flag: '🇲🇾', price: 520, airline: '亚航直飞', tag: '比平时便宜35%', tagType: 'green' as const, image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=260&fit=crop' },
];

export const airlineEvents = [
  { date: '4/12', airline: '南航', event: '会员日', desc: '国内全线8折，需提前在App领券' },
  { date: '4/15', airline: '春秋航空', event: '¥99盲盒', desc: '随机目的地，不可退改' },
  { date: '4/18', airline: '东航', event: '暗号"东方甄选"', desc: '日韩航线特价，搜索暗号进入' },
  { date: '4/22', airline: '海航', event: '里程兑换日', desc: '国内往返低至6000里程' },
  { date: '4/25', airline: '国航', event: '凤凰知音日', desc: '公务舱5折起，限量100张' },
];

export const priceCalendar = [
  { date: '4/11', price: 2100, level: 'high' },
  { date: '4/12', price: 1850, level: 'mid' },
  { date: '4/13', price: 1280, level: 'low' },
  { date: '4/14', price: 1300, level: 'low' },
  { date: '4/15', price: 2150, level: 'high' },
  { date: '4/16', price: 1900, level: 'mid' },
  { date: '4/17', price: 1500, level: 'mid' },
  { date: '4/18', price: 1350, level: 'low' },
  { date: '4/19', price: 1680, level: 'mid' },
  { date: '4/20', price: 2300, level: 'high' },
  { date: '4/21', price: 1750, level: 'mid' },
  { date: '4/22', price: 1420, level: 'low' },
  { date: '4/23', price: 1380, level: 'low' },
  { date: '4/24', price: 1950, level: 'mid' },
  { date: '4/25', price: 2200, level: 'high' },
];

export const searchResults = [
  {
    id: 1, airline: '东方航空', flightNo: 'MU519',
    depTime: '08:30', arrTime: '11:45', duration: '2h15m', stops: '直飞',
    depAirport: '浦东T1', arrAirport: '关西T1',
    price: 1280, realPrice: 1280,
    tags: ['历史低价', '含行李', '可退改'],
    aiComment: '近30天最低价，建议立即入手',
    baggage: '23kg×1', meal: true, refundable: true,
    platforms: [
      { name: '飞猪', price: 1268, lowest: true },
      { name: '去哪儿', price: 1275, lowest: false },
      { name: '航司官网', price: 1280, lowest: false },
      { name: '携程', price: 1290, lowest: false },
    ],
    rules: [
      { icon: '✅', text: '免费托运行李 23kg × 1件' },
      { icon: '✅', text: '起飞前7天免费退票' },
      { icon: '⚠️', text: '起飞前3天退票收50%手续费' },
      { icon: '❌', text: '不可改签到其他航班' },
    ],
    costs: [
      { item: '机票', price: 1280 },
      { item: '行李', price: 0, note: '含23kg' },
      { item: '选座', price: 0, note: '不选' },
      { item: '餐食', price: 0, note: '含' },
    ]
  },
  {
    id: 2, airline: '春秋航空', flightNo: '9C8888',
    depTime: '06:15', arrTime: '09:30', duration: '2h15m', stops: '直飞',
    depAirport: '浦东T2', arrAirport: '关西T1',
    price: 680, realPrice: 880,
    tags: ['限时折扣'],
    aiComment: '加上行李费后不算便宜，适合轻装出行',
    baggage: '无免费托运', meal: false, refundable: false,
    platforms: [
      { name: '春秋官网', price: 680, lowest: true },
      { name: '去哪儿', price: 695, lowest: false },
      { name: '飞猪', price: 699, lowest: false },
    ],
    rules: [
      { icon: '❌', text: '无免费托运行李，购买20kg需加¥200' },
      { icon: '❌', text: '不含免费餐食和饮用水' },
      { icon: '❌', text: '不可退票' },
      { icon: '❌', text: '不可改签' },
    ],
    costs: [
      { item: '机票', price: 680 },
      { item: '行李', price: 200, note: '20kg' },
      { item: '选座', price: 0, note: '不选' },
      { item: '餐食', price: 0, note: '不含' },
    ]
  },
  {
    id: 3, airline: '吉祥航空', flightNo: 'HO1334',
    depTime: '14:20', arrTime: '17:35', duration: '2h15m', stops: '直飞',
    depAirport: '浦东T2', arrAirport: '关西T1',
    price: 1450, realPrice: 1450,
    tags: ['含行李', '可退改'],
    aiComment: '午间航班，价格适中，适合不赶时间的旅客',
    baggage: '23kg×1', meal: true, refundable: true,
    platforms: [
      { name: '去哪儿', price: 1430, lowest: true },
      { name: '携程', price: 1450, lowest: false },
      { name: '航司官网', price: 1450, lowest: false },
    ],
    rules: [
      { icon: '✅', text: '免费托运行李 23kg × 1件' },
      { icon: '✅', text: '含免费餐食' },
      { icon: '⚠️', text: '起飞前24h退票收30%手续费' },
      { icon: '✅', text: '可改签一次（免费）' },
    ],
    costs: [
      { item: '机票', price: 1450 },
      { item: '行李', price: 0, note: '含23kg' },
      { item: '选座', price: 0, note: '不选' },
      { item: '餐食', price: 0, note: '含' },
    ]
  },
];

export const aiPlans = [
  {
    id: 1,
    label: '最省钱',
    totalPrice: 1360,
    recommended: false,
    legs: [
      { from: '上海', to: '曼谷', airline: '春秋航空', flightNo: '9C8511', depTime: '01:30', arrTime: '04:45', price: 480, platform: '飞猪', platformReason: '比官网便宜¥30', isRedEye: true, meal: false },
      { from: '曼谷', to: '大阪', airline: '亚航', flightNo: 'FD520', depTime: '10:30', arrTime: '18:15', price: 880, platform: '亚航官网', platformReason: 'OTA不卖这个价', isRedEye: false, meal: false },
    ],
    risks: ['需自行转机，预留5h+', '行李需重新托运', '两段均为廉航，不含餐食和免费行李'],
    saving: '比直飞省 ¥640',
  },
  {
    id: 2,
    label: '最省心',
    totalPrice: 2100,
    recommended: false,
    legs: [
      { from: '上海', to: '大阪', airline: '东方航空', flightNo: 'MU519', depTime: '08:30', arrTime: '11:45', price: 2100, platform: '去哪儿', platformReason: '全网最低', isRedEye: false, meal: true },
    ],
    risks: [],
    saving: null,
    benefits: ['直飞2h15m', '含行李23kg', '可退改', '含餐食'],
  },
  {
    id: 3,
    label: '性价比之选',
    totalPrice: 1580,
    recommended: true,
    legs: [
      { from: '上海', to: '昆明', airline: '祥鹏航空', flightNo: '8L9907', depTime: '07:00', arrTime: '10:20', price: 680, platform: '携程', platformReason: '联程票行李直挂', isRedEye: false, meal: true },
      { from: '昆明', to: '大阪', airline: '祥鹏航空', flightNo: '8L801', depTime: '12:30', arrTime: '17:45', price: 900, platform: '携程', platformReason: '联程票行李直挂', isRedEye: false, meal: true },
    ],
    risks: [],
    saving: '比直飞省 ¥520，且行李直挂不用操心',
    benefits: ['行李直挂', '联程保护', '含餐食'],
  },
];

export const butlerData = {
  redEye: {
    landing: '04:45',
    airport: '关西国际机场',
    canOvernight: true,
    overnightInfo: '2楼国际到达大厅有24h休息区，有空调有充电口',
    temperature: '约20°C，比较冷',
    noLounger: true,
    hotels: [
      { name: '关西机场日航酒店', rating: 4.6, distance: '航站楼内直达', type: '钟点房4h起', price: 289, checkIn: '04:45', checkOut: '08:45', link: '#' },
      { name: '关西Star Gate酒店', rating: 4.3, distance: '机场对面步行5min', type: '含早餐', price: 358, checkIn: '04:45', checkOut: '12:00', link: '#' },
    ]
  },
  meal: {
    included: false,
    airline: '春秋航空',
    onboardPrice: '泡面¥25 矿泉水¥10',
    suggestion: '建议登机前在机场买好食物',
  },
  weather: {
    city: '大阪',
    month: '4月中旬',
    high: 20,
    low: 12,
    condition: '春季，偶有小雨',
    tip: '早晚温差大，建议带薄外套；机场/机舱空调约18-20°C，比较冷',
  },
  transit: null,
  international: {
    visa: '中国护照免签停留15天（2025年起）',
    docs: '护照 + 返程机票行程单 + 酒店预订确认',
    currency: '日元（JPY），建议提前换汇或落地ATM取现',
    timeDiff: '+1小时',
    transport: '关西机场→大阪市区：南海电铁约45min ¥920日元（约¥45）',
  },
  shopping: {
    items: [
      { name: '眼罩+耳塞套装', price: 12.9, checked: true, reason: '红眼必备' },
      { name: '便携U型枕', price: 29.9, checked: true, reason: '红眼必备' },
      { name: '30ml防晒霜（可登机）', price: 19.9, checked: true, reason: '春季紫外线强' },
      { name: '密封包装零食（可登机）', price: 18.9, checked: true, reason: '廉航不含餐食' },
      { name: '充电宝 10000mAh', price: 59.9, checked: false, reason: '机场过夜备用' },
      { name: '旅行转换插头', price: 18.9, checked: false, reason: '日本A型插头' },
    ],
    deliveryTime: '明天18:00前送达',
  },
};

export const tripData = {
  destination: '大阪',
  departDate: '2026-05-15',
  airline: '祥鹏航空',
  plan: '性价比之选',
  checklist: [
    { id: 1, text: '机票已购买', done: true },
    { id: 2, text: '护照有效期检查（有效至2027年）', done: true },
    { id: 3, text: '日本免签确认（中国护照免签15天 ✓）', done: false },
    { id: 4, text: '下载Google Maps（日本导航用）', done: false },
    { id: 5, text: '准备随身物品（眼罩/耳塞/薄外套/充电宝）', done: false },
    { id: 6, text: '打印返程行程单（入境可能查）', done: false },
  ],
};
