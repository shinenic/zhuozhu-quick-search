const dataArray = [["三年", "", "30"], ["小丑", "", "2"], ["友情", "", "20"], ["心影", "", "61"], ["巧合", "", "21"], ["冬戀", "", "32"], ["真情", "", "21"], ["情鎖", "", "68"], ["諾言", "", "26"], ["雲河", "", "7"], ["倩影", "", "57"], ["偶然", "", "25"], ["船歌", "", "72"], ["遲到", "", "114"], ["讀你", "", "68"], ["深秋", "", "27"], ["夜空", "", "8"], ["是否", "", "70"], ["舞衣", "", ""], ["償還", "", "44"], ["一剪梅", "", "64"], ["上海灘", "", "4"], ["不了情", "", "30"], ["水悠悠", "", "63"], ["初戀女", "", "41"], ["夜來香", "", "9"], ["夜上海", "", "22"], ["甜蜜蜜", "", "22"], ["街燈下", "", "7"], ["重相逢", "", "4"], ["雪山盟", "", "16"], ["意難忘", "", "19"], ["榕樹下", "", "3"], ["寒雨曲", "", "39"], ["梨花淚", "", "13"], ["晚安曲", "", "114"], ["夢陀鈴", "", "76"], ["鐘山春", "", "45"], ["一簾幽夢", "", "38"], ["一代佳人", "", "26"], ["千言萬語", "", "26"], ["小李飛刀", "", "4"], ["小城故事", "", "15"], ["大江東去", "", "35"], ["昨夜星辰", "", "13"], ["逝去的愛", "", "50"], ["海角天涯", "", "13"], ["寄語白雲", "", "37"], ["淚的小雨", "", "5"], ["神祕女郎", "", "11"], ["負心的人", "", "6"], ["煙雨斜陽", "", "93"], ["月滿西樓", "", "32"], ["在水一方", "", "60"], ["好好愛我", "", "23"], ["你怎麼說", "", "26"], ["如果能夠", "", "75"], ["明日天涯", "", "93"], ["雨的旋律", "", "84"], ["南屏晚鐘", "", "40"], ["南海姑娘", "", "99"], ["流水年華", "", "23"], ["秋詩篇篇", "", "38"], ["相思河畔", "", "9"], ["岷江夜曲", "", "9"], ["庭院深深", "", "47"], ["楓紅層層", "", "24"], ["鳳凰于飛", "", "16"], ["藍色的夢", "", "47"], ["蘇州河邊", "", "10"], ["夢裡相思", "", "77"], ["最後一夜", "", "47"], ["魂縈舊夢", "", "11"], ["夕陽伴我歸", "", "49"], ["日落北京城", "", "61"], ["未識綺羅香", "", "44"], ["今宵多珍重", "", "56"], ["台北的天空", "", "25"], ["另一種鄉愁", "", "34"], ["江水向東流", "", "40"], ["白雲長在天", "", "38"], ["但是又何奈", "", "108"], ["永恆的回憶", "", "8"], ["松林的低語", "", "50"], ["美酒加咖啡", "", "3"], ["酒醉的探戈", "", "12"], ["雁兒在林梢", "", "21"], ["黃色的玫瑰", "", "67"], ["閃亮的日子", "", "61"], ["情人的眼淚", "", "32"], ["溫暖的秋天", "", "7"], ["愛你一萬年", "", "37"], ["何日君再來", "", "15"], ["我是一片雲", "", "56"], ["我找到自己", "", "7"], ["我的一顆心", "", "17"], ["我家在那裡", "", "32"], ["我有一段情", "", "113"], ["綠島小夜曲", "", "3"], ["熱情的沙漠", "", "36"], ["熱線妳和我", "", "36"], ["三月裡的小雨", "", "28"], ["可愛的玫瑰花", "", "67"], ["往事只能回味", "", "90"], ["有真情有活力", "", "38"], ["恰似你的溫柔", "", "25"], ["萍水相逢的人", "", "5"], ["能不能留住你", "", "1"], ["情人的黃襯衫", "", "17"], ["戀曲一九八零", "", "60"], ["天真活潑又美麗", "", "21"], ["月亮代表我的心", "", "2"], ["玫瑰玫瑰我愛你", "", "79"], ["昨夜你對我一笑", "", "88"], ["我的心裡沒有他", "", "85"], ["春風吻上我的臉", "", "99"], ["梅蘭梅蘭我愛你", "", "18"], ["誰能禁止我的愛", "", "29"], ["難忘的初戀情人", "", "41"], ["女人", "", "224"], ["心雨", "", "205"], ["月琴", "", "212"], ["北風", "", "202"], ["思念", "", "215"], ["萍聚", "", "249"], ["陪酒", "", "213"], ["哭砂", "", "234"], ["愛我", "", "226"], ["塵緣", "", "201A"], ["木棉道", "", "235"], ["來生緣", "", "215"], ["忘不了", "", "205"], ["再回首", "", "203"], ["海上花", "", "213"], ["不要告別", "", "210"], ["掌聲響起", "", "232"], ["冷井情深", "", "209"], ["想你的夜", "", "243"], ["鹿港小鎮", "", "240"], ["張三的歌", "", "218"], ["夢不到你", "", "216"], ["夢寐以求", "", "201B"], ["隨風而逝", "", "228"], ["愛的淚珠", "", "212"], ["愛的箴言", "", "238"], ["驛動的心", "", "211"], ["大約在冬季", "", "211"], ["今夕是何夕", "", "210"], ["走不完的愛", "", "222"], ["我只在乎你", "", "204"], ["風中的承諾", "", "219"], ["跟往事乾杯", "", "201B"], ["跟我說愛我", "", "201A"], ["最後的溫柔", "", "214"], ["最後的戀人", "", "206"], ["瀟灑走一回", "", "207"], ["不是我不小心", "", "217"], ["今夜我想喝醉", "", "207"], ["忘了你忘了我", "", "253"], ["抱著你的感覺", "", "206"], ["戀曲一九九零", "", "205"], ["一場遊戲一場夢", "", "254"], ["守著陽光守著你", "", "244"], ["請你記得我的好", "", "230"], ["動不動就說愛我", "", "209"], ["讓我歡喜讓我憂", "", "251"], ["其實你不懂我的心", "", "222"], ["你敲敲敲痛了我的心", "", "233"], ["明天你是否依然愛我", "", "228"], ["愛上一個不回家的人", "", "206"], ["認錯", "", "348"], ["堆積情感", "", "317"], ["鬼迷心竅", "", "344"], ["妳在他鄉", "", "341"], ["相知相守", "", "326"], ["東方之珠", "", "315"], ["愛與哀愁", "", "313"], ["今生不了情不了", "", "313"], ["別讓我一個人醉", "", "305"], ["每天多愛你一些", "", "320"], ["容易受傷的女人", "", "312"]]


export default dataArray;