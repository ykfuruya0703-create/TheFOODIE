/* ============================================================
   THE FOODIE EDIT — 多言語（日本語 / English / 한국어）
   index.html だけが読み込む（data.js より先に）。admin.html は日本語のまま。

   ■ 言語の決まり方
     URLの ?lang=ja|en|ko → 前回選んだ言語（ブラウザに保存）→ 日本語
   ■ 翻訳の置き場所
     ・画面の文言 ............ GM_UI（このファイル）
     ・ランキングの店名とメモ .. GM_I18N_RANK（このファイル）
     ・カテゴリー/ジャンル/エリア/タグ ... このファイル
     ・コラム本文・タイトルなど ... i18n-columns.js
   翻訳がない項目は、日本語のまま表示される。
============================================================ */

const GM_LANGS = {
  ja:{ label:'日本語',  short:'JA', locale:'ja-JP' },
  en:{ label:'English', short:'EN', locale:'en-US' },
  ko:{ label:'한국어',  short:'KO', locale:'ko-KR' }
};

const GM_LANG = (function(){
  let l = null;
  try { l = new URLSearchParams(location.search).get('lang'); } catch(e){}
  if(!GM_LANGS[l]){ try { l = localStorage.getItem('gm_lang'); } catch(e){} }
  if(!GM_LANGS[l]) l = 'ja';
  try { localStorage.setItem('gm_lang', l); } catch(e){}
  document.documentElement.lang = l;
  return l;
})();

function gmSetLang(l){
  if(!GM_LANGS[l] || l === GM_LANG) return;
  try { localStorage.setItem('gm_lang', l); } catch(e){}
  const u = new URL(location.href);
  u.searchParams.set('lang', l);
  location.href = u.toString();
}

/* ---------------- 画面の文言 ---------------- */
const GM_UI = {
  ja:{
    hero_rank:'ランキング{rows}件 →',
    cat_desc:'食べに行く場面ごとに、{rows}件を振り分けました。1軒が複数の場面に入ることもあります。数はランキングから自動で数え、押すとその店だけに絞り込みます。',
    map_lead:'{rows}件の店を、メモに書かれた地名をもとに、エリアごとにまとめました。エリアの名前を押すと、そのエリアでランキングを絞り込みます。店名を押すと、コラムがあれば開きます。',
    meta_desc:'自分なりの美味しいもの、フーディーを深く読み解く、大人のための食事コラム。家族・仲間・おひとり様・デート・夫婦で行くの四つの食卓から、食べ歩き{rows}件のランキングを読み解く。',
    no_cols:'まだコラムがありません。', read_full:'全文を読む →', latest:'最新のコラム', all:'すべて',
    read_aria:'{title}を読む', new_badge:'NEW 最新', no_match_cols:'該当するコラムはまだありません。',
    col_count:'{n}本', cat_count:'{n}種', shops_unit:'軒', has_col:'コラムあり',
    cat_active:'カテゴリー：', area_active:'エリア：', clear:'解除 ✕',
    rk_status:'{n}件を表示', rk_status_shops:'（屋号でまとめると{m}軒）',
    col_aria:'{name}のコラムを読む', read_col:'コラムを読む →', repeat:'再登場', stars_aria:'星{n}',
    no_rows:'条件に合う店がありません。', more:'さらに表示する（残り{n}件）',
    newer:'← 新しいコラム', older:'古いコラム →',
    cp_see:'{label}　ランキングで見る →', all_shops:'すべての店 {n}件',
    map_status:'{a}エリア、{n}件', map_more:'他{n}軒',
    hasVideo:'動画あり', video:'動画', photo:'写真',
    ph_exterior:'外観', ph_interior:'内観', ph_dish:'料理',
    read_label:'{t}で読める', chars:'約{n}字', lang_aria:'言語', untranslated:''
  },
  en:{
    nav_concept:'Concept', nav_pickup:'Pickup', nav_columns:'Columns', nav_cats:'Categories', nav_ranking:'Ranking', nav_map:'MAP',
    hdr_ranking:'Ranking →',
    hero_title:'<span class="gradient-text">Refinement,</span><br>worn as culture.',
    hero_sub:'Your own idea of delicious — a food column that reads the foodie life in depth,<br><strong style="color:var(--gold2)">written for grown-ups.</strong>',
    hero_read:'Read the columns', hero_rank:'Ranking: {rows} entries →',
    con_badge:'Philosophy · Definition',
    con_quote:'A foodie is no longer<br><em>just a “gourmet.”</em>',
    con_body:'Not the number of famous restaurants, not the number of stars. A foodie is someone who holds their own idea of “delicious,” in their own words. LUXURY FOODIE JOURNAL is a food column that redefines the foodie — from “master of eating out” to “someone whose table reflects intelligence and a discerning eye.” The same dish means something different depending on who you share it with. Family, friends, dining solo, one-on-one drinks with a friend, dates and couples, eating hearty, business dinners, lunch, and anniversaries. Through nine tables, we unpack the kind of refinement grown-ups really ought to know.',
    con_strong:'That lingering “I want to eat this again.” That is what makes a place a favorite.',
    cp_family_t:'Family', cp_family_d:'Around the same table, taking home the same time. Favorites slowly become memories.',
    cp_nakama_t:'Friends', cp_nakama_d:'Sharing big plates, pouring each other drinks. A lively kind of delicious you can’t reach alone.',
    cp_hitori_t:'Solo', cp_hitori_d:'Matching no one, eating at your own pace. The luxury of facing a single dish.',
    cp_futari_t:'One-on-one with a friend', cp_futari_d:'Face to face with one easygoing friend. Between the talk, one more drink.',
    cp_date_t:'Dates & couples', cp_date_d:'The distance between two people becomes part of the flavor. A place chosen conversation and all.',
    cp_gatsuri_t:'Eat hearty', cp_gatsuri_d:'Not a little at a time, but until you’re full. Portion size counts as flavor too.',
    cp_kaishoku_t:'Business dining', cp_kaishoku_d:'A quiet seat to talk with someone important. Food and space chosen with full courtesy.',
    cp_lunch_t:'Lunch', cp_lunch_d:'Eating without fuss in the midday light. A small feast set in the middle of the day.',
    cp_kokozo_t:'Anniversaries', cp_kokozo_d:'The right place for life’s milestones. Food and time make the day special.',
    rkm_title:'What the ranking means',
    rkm_body:'It isn’t decided by stars or fame. There are only two criteria behind this ranking.',
    rkm1_t:'Places I absolutely want to go back to', rkm1_d:'Not a place you’re satisfied with once, but one your feet turn toward again, asking “When shall I go next?”',
    rkm2_t:'Places I want to take someone to', rkm2_d:'Not kept as a private secret, but a place you want to recommend to family, friends and the people who matter: “This place is good.”',
    pu_title:'This week’s pick', pu_desc:'The one luxury-foodie piece our editors think you should read now.',
    col_title:'Column archive', col_desc:'Filter by category and take your time reading.',
    cat_title:'Categories',
    cat_desc:'All {rows} entries, sorted by dining occasion. A single place can appear in more than one. Counts are calculated automatically from the ranking; tap one to filter to just those places.',
    rk_title:'Full ranking',
    rk_desc:'My phone notes, laid out as they are — ranks, spelling quirks and all. Genres are inferred from how each note is written. Rows where the same shop appears twice are marked “Repeat.” Shop names and notes are translated from the Japanese originals.',
    fl_star:'Stars', fl_cat:'Category', fl_genre:'Genre',
    aria_star:'Filter by stars', aria_cat:'Filter by category', aria_genre:'Filter by genre',
    q_ph:'Search by shop or neighborhood (e.g., Noge, gyoza)', q_aria:'Search by shop or neighborhood',
    map_title:'Browse by area',
    map_lead:'All {rows} entries, grouped by area based on the place names in my notes. Tap an area name to filter the ranking to that area. Tap a shop name to open its column, if there is one.',
    cta_title:'Delivered first,<br><span class="gradient-text">to those who know refinement.</span>',
    cta_desc:'THE FOODIE EDIT members get new columns and exclusive interviews first.', cta_btn:'Back to the columns',
    ft_line:'Your own idea of delicious — reading the foodie life in depth.', ft_login:'Editor login',
    am_aria:'Column', close:'Close',
    meta_desc:'A food column for grown-ups that reads the foodie life in depth. A ranking of {rows} places, read through the tables of family, friends, solo dining, and dates & couples.',
    no_cols:'No columns yet.', read_full:'Read the full column →', latest:'Latest column', all:'All',
    read_aria:'Read “{title}”', new_badge:'NEW', no_match_cols:'No columns in this category yet.',
    col_count:' {n}', cat_count:' {n}', shops_unit:'places', has_col:'Column available',
    cat_active:'Category: ', area_active:'Area: ', clear:'Clear ✕',
    rk_status:'Showing {n} entries', rk_status_shops:' ({m} places when grouped by name)',
    col_aria:'Read the column on {name}', read_col:'Read column →', repeat:'Repeat', stars_aria:'{n} stars',
    no_rows:'No places match these filters.', more:'Show more ({n} left)',
    newer:'← Newer column', older:'Older column →',
    cp_see:'{label} — see in ranking →', all_shops:'All {n} entries',
    map_status:'{a} areas, {n} entries', map_more:'+{n} more',
    hasVideo:'Video', video:'Video', photo:'Photo',
    ph_exterior:'Exterior', ph_interior:'Interior', ph_dish:'Dish',
    read_label:'{n} min read', lang_aria:'Language',
    untranslated:'This column hasn’t been translated into English yet. The original Japanese text is shown below.'
  },
  ko:{
    nav_concept:'콘셉트', nav_pickup:'픽업', nav_columns:'칼럼 목록', nav_cats:'카테고리', nav_ranking:'랭킹', nav_map:'MAP',
    hdr_ranking:'랭킹 →',
    hero_title:'<span class="gradient-text">품격이라는,</span><br>몸에 두르는 교양.',
    hero_sub:'나만의 맛있는 것, 푸디를 깊이 읽어 내는<br><strong style="color:var(--gold2)">어른을 위한 식사 칼럼.</strong>',
    hero_read:'칼럼 읽기', hero_rank:'랭킹 {rows}건 →',
    con_badge:'Philosophy · 정의',
    con_quote:'푸디는 이제<br><em>‘미식가’가 아니다.</em>',
    con_body:'유명한 가게의 수도, 별의 수도 아닙니다. 푸디란 자신만의 ‘맛있다’를 자신의 언어로 가진 사람입니다. LUXURY FOODIE JOURNAL은 푸디를 ‘맛집 탐방의 달인’에서 ‘식탁에 지성과 안목을 비추는 사람’으로 새롭게 읽어 내는 식사 칼럼입니다. 같은 한 접시라도 누구와 함께하느냐에 따라 맛의 의미는 달라집니다. 가족, 친구들, 혼밥, 친구와 단둘이 한잔, 데이트·부부, 든든하게 먹기, 회식, 점심, 그리고 기념일. 아홉 개의 식탁에서 어른이 정말 알아야 할 ‘품격’을 풀어 갑니다.',
    con_strong:'‘또 먹고 싶다’가 남는 것. 그것이야말로 좋아하는 가게의 조건입니다.',
    cp_family_t:'가족', cp_family_d:'같은 식탁에 둘러앉아 같은 시간을 가지고 돌아간다. 단골이 어느새 추억이 된다',
    cp_nakama_t:'친구들', cp_nakama_d:'큰 접시를 나누고 술잔을 주고받는다. 혼자서는 닿지 않는 떠들썩한 맛',
    cp_hitori_t:'혼밥', cp_hitori_d:'누구에게도 맞추지 않고 내 속도로 먹는다. 한 접시와 마주하는 사치',
    cp_futari_t:'친구와 단둘이 한잔', cp_futari_d:'편한 친구 한 명과 마주 앉아. 이야기 사이사이, 한 잔 더',
    cp_date_t:'데이트·부부', cp_date_d:'마주 앉은 두 사람의 거리가 맛의 일부가 된다. 대화까지 포함해 고르는 한 곳',
    cp_gatsuri_t:'든든하게 먹기', cp_gatsuri_d:'조금씩 우아하게가 아니라 배부르게. 양까지 포함해서 맛이라고 부른다',
    cp_kaishoku_t:'회식·접대', cp_kaishoku_d:'소중한 상대와 차분히 이야기할 수 있는 자리. 요리도 공간도 예를 다해 고른다',
    cp_lunch_t:'점심', cp_lunch_d:'한낮의 빛 속에서 부담 없이 먹는다. 하루의 한가운데 놓는 작은 성찬',
    cp_kokozo_t:'기념일', cp_kokozo_d:'인생의 전환점에 특별한 한 곳을. 요리와 시간이 그날을 특별하게 만든다',
    rkm_title:'랭킹의 의미',
    rkm_body:'별의 수나 유명세로 정하지 않았습니다. 이 랭킹을 매기는 기준은 단 두 가지입니다.',
    rkm1_t:'꼭 다시 가고 싶은 가게', rkm1_d:'한 번으로 만족하는 곳이 아니라, ‘다음엔 언제 갈까’ 하고 또 발길이 향하는 곳.',
    rkm2_t:'누군가를 데려가고 싶은 가게', rkm2_d:'나만의 비밀로 두는 게 아니라, 가족이나 친구, 소중한 사람에게 ‘여기 좋아’ 하고 권하고 싶은 곳.',
    pu_title:'이번 주의 한 편', pu_desc:'편집부가 고른, 지금 읽어야 할 럭셔리 푸디 한 편.',
    col_title:'칼럼 목록', col_desc:'카테고리로 좁혀서 천천히 읽어 보세요.',
    cat_title:'카테고리',
    cat_desc:'먹으러 가는 상황별로 {rows}건을 나누었습니다. 한 곳이 여러 상황에 들어가기도 합니다. 숫자는 랭킹에서 자동으로 세며, 누르면 해당 가게만 걸러 보여 줍니다.',
    rk_title:'전체 랭킹',
    rk_desc:'휴대폰 메모를 순위도 표기의 흔들림도 그대로 늘어놓았습니다. 장르는 메모의 표현을 바탕으로 분류했습니다. 같은 가게가 두 번 나오는 행에는 ‘재등장’ 표시를 달았습니다. 가게 이름과 메모는 일본어 원문을 번역한 것입니다.',
    fl_star:'별', fl_cat:'카테고리', fl_genre:'장르',
    aria_star:'별 개수로 거르기', aria_cat:'카테고리로 거르기', aria_genre:'장르로 거르기',
    q_ph:'가게 이름·동네 이름으로 찾기 (예: 노게, 교자)', q_aria:'가게 이름·동네 이름으로 검색',
    map_title:'지역으로 찾기',
    map_lead:'{rows}건의 가게를 메모에 적힌 지명을 바탕으로 지역별로 묶었습니다. 지역 이름을 누르면 그 지역으로 랭킹을 걸러 줍니다. 가게 이름을 누르면 칼럼이 있는 경우 열립니다.',
    cta_title:'품격을 아는 이에게만,<br><span class="gradient-text">한발 앞서 전합니다.</span>',
    cta_desc:'THE FOODIE EDIT 회원에게 새 칼럼과 한정 인터뷰를 가장 먼저 전해 드립니다.', cta_btn:'칼럼으로 돌아가기',
    ft_line:'나만의 맛있는 것, 푸디를 깊이 읽어 내다.', ft_login:'편집자 로그인',
    am_aria:'칼럼 본문', close:'닫기',
    meta_desc:'나만의 맛있는 것, 푸디를 깊이 읽어 내는 어른을 위한 식사 칼럼. 가족·친구·혼밥·데이트와 부부의 식탁에서 {rows}건의 맛집 랭킹을 읽어 냅니다.',
    no_cols:'아직 칼럼이 없습니다.', read_full:'전문 읽기 →', latest:'최신 칼럼', all:'전체',
    read_aria:'「{title}」 읽기', new_badge:'NEW', no_match_cols:'해당하는 칼럼이 아직 없습니다.',
    col_count:'{n}편', cat_count:'{n}종', shops_unit:'곳', has_col:'칼럼 있음',
    cat_active:'카테고리: ', area_active:'지역: ', clear:'해제 ✕',
    rk_status:'{n}건 표시', rk_status_shops:' (상호로 묶으면 {m}곳)',
    col_aria:'{name} 칼럼 읽기', read_col:'칼럼 읽기 →', repeat:'재등장', stars_aria:'별 {n}개',
    no_rows:'조건에 맞는 가게가 없습니다.', more:'더 보기 (남은 {n}건)',
    newer:'← 최신 칼럼', older:'이전 칼럼 →',
    cp_see:'{label} 랭킹에서 보기 →', all_shops:'모든 가게 {n}건',
    map_status:'{a}개 지역, {n}건', map_more:'외 {n}곳',
    hasVideo:'동영상 있음', video:'동영상', photo:'사진',
    ph_exterior:'외관', ph_interior:'내부', ph_dish:'요리',
    read_label:'{n}분 읽기', lang_aria:'언어',
    untranslated:'이 칼럼은 아직 한국어로 번역되지 않았습니다. 아래에 일본어 원문을 보여 드립니다.'
  }
};

/* gmT('key', {n:3}, '日本語の既定値') */
function gmT(key, vars, fallback){
  const d = GM_UI[GM_LANG] || {};
  let s = (key in d) ? d[key] : ((key in GM_UI.ja) ? GM_UI.ja[key] : (fallback != null ? fallback : key));
  if(vars) for(const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}
function gmFmt(n){ return Number(n).toLocaleString(GM_LANGS[GM_LANG].locale); }
function gmShopsN(n){ return GM_LANG === 'en' ? gmFmt(n) + (n === 1 ? ' place' : ' places') : GM_LANG === 'ko' ? gmFmt(n) + '곳' : gmFmt(n) + '軒'; }
function gmRowsN(n){ return GM_LANG === 'en' ? gmFmt(n) + (n === 1 ? ' entry' : ' entries') : GM_LANG === 'ko' ? gmFmt(n) + '건' : gmFmt(n) + '件'; }

/* ---------------- カテゴリー ---------------- */
const GM_I18N_CATS = {
  yokohama:{ en:['Yokohama Picks','Yokohama, Kannai and the Noge area, 4 stars and up.'], ko:['요코하마 추천 맛집','요코하마·간나이·노게 일대, 별 4개 이상.'] },
  gatsuri:{ en:['Hearty Eats','Meat, tonkatsu, curry, ramen, rice bowls and set meals.'], ko:['든든하게 먹는 집','고기·돈가스·카레·라멘, 덮밥과 정식.'] },
  hitori:{ en:['Solo Dining','Noodles, curry, set meals. Easy places to drop into alone.'], ko:['혼밥 맛집','면·카레·정식. 훌쩍 들어가기 좋은 한 곳.'] },
  family:{ en:['With Family','French and Italian, Chinatown, hotels, eel.'], ko:['가족과 함께','프렌치·이탈리안, 차이나타운, 호텔, 장어.'] },
  date:{ en:['Dates & Couples','Bistros, Italian, sushi, cafés. 3 stars and up.'], ko:['데이트·부부 맛집','비스트로, 이탈리안, 스시, 카페. 별 3개 이상.'] },
  nakama:{ en:['With Friends','Yakiniku, hot pots, teppan, gyoza. Places to share.'], ko:['친구들과','야키니쿠·전골·철판·교자. 다 같이 나눠 먹는 집.'] },
  kokozo:{ en:['Special Occasions','5 stars, or high-end. For the days that matter.'], ko:['특별한 날의 한 곳','별 5개 또는 고급점. 소중한 날을 위해.'] },
  kaishoku:{ en:['Business Dining','Sushi, teppanyaki, hotels, fine Chinese. Quiet enough to talk.'], ko:['회식·접대','스시·철판구이·호텔·고급 중식. 차분히 이야기할 수 있는 곳.'] },
  lunch:{ en:['Lunch Spots','Set meals, rice bowls, morning markets. Places for midday.'], ko:['점심 맛집','정식·덮밥·아침 시장. 낮에 가는 집.'] },
  katari:{ en:['Long Talks with Friends','Izakaya, yakitori, Noge bars. Places to linger.'], ko:['친구와 오래 이야기하는 집','이자카야·야키토리·노게의 술집. 오래 머물 수 있는 곳.'] },
  shizuka:{ en:['Quiet Drinks','Yakitori counters, soba houses, bistros.'], ko:['조용히 한잔','야키토리 카운터, 소바집, 비스트로.'] },
  toku:{ en:['Worth the Journey','Hamamatsu, Tateyama, Numazu, Nagoya, Gunma. Places I traveled for.'], ko:['멀어도 가야 할 집','하마마쓰, 다테야마, 누마즈, 나고야, 군마. 일부러 찾아간 집.'] },
  futari:{ en:['Just the Two of Us','Cafés, bistros, udon and soba. Face to face with a friend.'], ko:['친구와 둘이서','카페, 비스트로, 우동·소바. 마주 앉아서.'] },
  joshi:{ en:['Girls’ Night Out','Cafés, Italian, pizza, dakhanmari, buffets.'], ko:['여자들끼리 모임','카페, 이탈리안, 피자, 닭한마리, 뷔페.'] },
  seoul:{ en:['Korea · SEOUL','Dakhanmari, gamjatang and other Korean food.'], ko:['한국 SEOUL','닭한마리, 감자탕, 한국 요리.'] },
  bike:{ en:['Motorcycle Touring Stops','Tateyama, Katsuura, Odawara, Misaki, Lake Yamanaka. The place at the end of the ride.'], ko:['바이크 투어링으로 갈 집','다테야마, 가쓰우라, 오다와라, 미사키, 야마나카호. 달려간 끝의 한 곳.'] },
  machichuka:{ en:['THE Neighborhood Chinese','Neighborhood Chinese and gyoza shops. No hotels, Chinatown or high-end places.'], ko:['THE 동네 중국집','동네 중국집과 교자 가게. 호텔, 차이나타운, 고급점은 제외.'] },
  pan:{ en:['Bakeries','Bakeries and bread shops, including a few by the sea and along mountain roads.'], ko:['빵집','베이커리와 빵집. 바닷가나 산길 도중의 한 곳도.'] }
};
function gmL10nCat(c){
  if(GM_LANG === 'ja') return c;
  const t = GM_I18N_CATS[c.key] && GM_I18N_CATS[c.key][GM_LANG];
  const name = t ? t[0] : c.name, desc = t ? t[1] : c.desc;
  const label = GM_LANG === 'en' ? name + ' (' + c.shops + ')' : name + ' ' + c.shops + '곳';
  return Object.assign({}, c, { name, desc, label });
}

/* ---------------- ジャンル ---------------- */
const GM_I18N_GENRES = {
  '韓国':['Korean','한식'], '中華・餃子':['Chinese & Gyoza','중식·교자'], 'ラーメン':['Ramen','라멘'],
  '鮨・うなぎ':['Sushi & Eel','스시·장어'], 'フレンチ・イタリアン':['French & Italian','프렌치·이탈리안'],
  '肉料理':['Meat','고기 요리'], 'とんかつ・揚げ物':['Tonkatsu & Fried','돈가스·튀김'], 'そば・うどん':['Soba & Udon','소바·우동'],
  'その他':['Other','기타'], 'カフェ':['Café','카페'], '海鮮・市場':['Seafood & Markets','해산물·시장'],
  '焼鳥・鶏':['Yakitori & Chicken','야키토리·닭'], 'パン':['Bakery','빵'], 'カレー':['Curry','카레'], '居酒屋・食堂':['Izakaya & Diners','이자카야·식당']
};
function gmGenre(g){ const t = GM_I18N_GENRES[g]; return GM_LANG === 'ja' || !t ? g : t[GM_LANG === 'en' ? 0 : 1]; }

/* ---------------- エリア ---------------- */
const GM_I18N_AREAS = {
  'ソウル・韓国':['Seoul, Korea','서울·한국'], '横須賀':['Yokosuka','요코스카'], '川崎':['Kawasaki','가와사키'],
  '横浜駅・西口':['Yokohama Station, West Exit','요코하마역·서쪽 출구'],
  '関内・馬車道・伊勢佐木町':['Kannai, Bashamichi, Isezakicho','간나이·바샤미치·이세자키초'], '野毛':['Noge','노게'],
  '桜木町・みなとみらい':['Sakuragicho, Minato Mirai','사쿠라기초·미나토미라이'], '中華街・元町':['Chinatown, Motomachi','차이나타운·모토마치'],
  '南太田・蒔田・阪東橋':['Minami-Ota, Maita, Bandobashi','미나미오타·마이타·반도바시'],
  '保土ヶ谷・二俣川・下川井周辺':['Hodogaya, Futamatagawa, Shimokawai','호도가야·후타마타가와·시모카와이 일대'],
  '鎌倉・藤沢・茅ヶ崎・湘南':['Kamakura, Fujisawa, Chigasaki, Shonan','가마쿠라·후지사와·지가사키·쇼난'],
  '小田原・熱海・沼津':['Odawara, Atami, Numazu','오다와라·아타미·누마즈'],
  '三浦・館山・勝浦（海の幸）':['Miura, Tateyama, Katsuura (seafood)','미우라·다테야마·가쓰우라 (해산물)'],
  '東京（渋谷・目黒・白金ほか）':['Tokyo (Shibuya, Meguro, Shirokane, etc.)','도쿄 (시부야·메구로·시로카네 등)'],
  '群馬':['Gunma','군마'], '博多':['Hakata','하카타'], '名古屋・浜松':['Nagoya, Hamamatsu','나고야·하마마쓰'],
  '山梨・山中湖':['Yamanashi, Lake Yamanaka','야마나시·야마나카호'], 'その他・記載なし':['Other / not noted','기타·기재 없음']
};
function gmArea(a){ const t = GM_I18N_AREAS[a]; return GM_LANG === 'ja' || !t ? a : t[GM_LANG === 'en' ? 0 : 1]; }

/* ---------------- コラムのタグ ---------------- */
const GM_I18N_TAGS = {
  'うなぎ':['Unagi (Eel)','장어'], '浜松':['Hamamatsu','하마마쓰'],
  'ラーメン':['Ramen','라멘'], '煮干し':['Niboshi','니보시'], '九十九里':['Kujukuri','구주쿠리'], 'THE町中華':['Neighborhood Chinese','동네 중국집'],
  '玉子炒飯':['Egg Fried Rice','달걀 볶음밥'], '海鮮':['Seafood','해산물'], '仲間店':['With Friends','친구와 함께'], '刺身とフライ':['Sashimi & Fry','회와 튀김'],
  'サンマーメン':['Sanmamen','산마멘'], '名古屋':['Nagoya','나고야'], '台湾ラーメン':['Taiwan Ramen','타이완 라멘'], '明洞':['Myeongdong','명동'],
  'カルグクス':['Kalguksu','칼국수'], 'デート・夫婦で行く店':['Dates & Couples','데이트·부부'], '海鮮丼':['Seafood Bowl','해산물 덮밥'], '相模湾':['Sagami Bay','사가미만'],
  '鮨':['Sushi','스시'], '四川料理':['Sichuan Cuisine','쓰촨 요리'], '麻婆豆腐':['Mapo Tofu','마파두부'],
  'ランチ店':['Lunch Spots','점심 맛집'], 'ひとり飯店':['Solo Dining','혼밥 맛집'], 'おひとり様':['Solo','혼밥'],
  '水道橋':['Suidobashi','스이도바시'], 'さばめし':['Saba-meshi','사바메시'], 'ここぞという店':['Special Occasions','특별한 날의 한 곳'],
  '家族と一緒店':['With Family','가족과 함께'], 'デート・夫婦で行く':['Dates & Couples','데이트·부부'], '会食店':['Business Dining','회식·접대'],
  '東神奈川':['Higashi-Kanagawa','히가시카나가와'], '韓国SEOUL':['Korea · SEOUL','한국 SEOUL'], '遠征しても行くべき店':['Worth the Journey','멀어도 가야 할 집'],
  '江南':['Gangnam','강남'], '馬車道':['Bashamichi','바샤미치'], 'うどん':['Udon','우동'], '渋谷':['Shibuya','시부야'], '白金台':['Shirokanedai','시로카네다이'],
  '博多グルメ遠征':['Hakata food trip','하카타 미식 원정'], '天ぷら':['Tempura','덴푸라'], '地元イタリアン':['Local Italian','동네 이탈리안'],
  'ガッツリ食べる店':['Hearty Eats','든든하게 먹는 집'], '川崎駅':['Kawasaki Station','가와사키역'], '老舗':['Long-established','노포'],
  '富士山盛り':['Mt. Fuji portion','후지산 곱빼기'], 'チェーン店':['Chain restaurant','체인점'], '横浜駅':['Yokohama Station','요코하마역'],
  'デート店':['Date spot','데이트 맛집'], '予約困難店':['Hard to book','예약하기 어려운 집'], 'ピッツェリア':['Pizzeria','피체리아'],
  '横浜中華街':['Yokohama Chinatown','요코하마 차이나타운'], '牛バラ飯':['Beef brisket rice','소고기 양지 덮밥'], '平日ランチも行列':['Lines even at weekday lunch','평일 점심에도 줄'],
  '味噌ラーメン':['Miso ramen','미소 라멘'], '横浜オススメ店':['Yokohama Picks','요코하마 추천 맛집'], '元は横須賀久里浜の店':['Originally in Kurihama, Yokosuka','원래 요코스카 구리하마의 가게'],
  '焼き味噌':['Grilled miso','구운 미소'], 'バイクツーリングで行くべき店':['Motorcycle Touring Stops','바이크 투어링으로 갈 집'], '30年来の常連':['Regular for 30 years','30년 단골'],
  'スタミナラーメン':['Stamina ramen','스태미나 라멘'], '長女とのソウル旅行の定番':['Seoul trips with my eldest daughter','큰딸과의 서울 여행 단골'],
  '東大門':['Dongdaemun','동대문'], 'タッカンマリ':['Dakhanmari','닭한마리'], '友人から紹介された店':['Recommended by a friend','친구가 소개해 준 가게']
};
function gmTag(t){ const x = GM_I18N_TAGS[t]; return GM_LANG === 'ja' || !x ? t : x[GM_LANG === 'en' ? 0 : 1]; }

/* ---------------- ランキング（順位: {en:[店名, メモ], ko:[店名, メモ]}） ---------------- */
const GM_I18N_RANK = {
  1:{en:['Magutgan Saenggogi','Yeongdeungpo, Seoul / Dry-aged samgyeopsal / Our standard on trips with my eldest daughter'],ko:['마굿간생고기','서울 영등포 / 숙성 삼겹살 / 큰딸과의 여행 단골']},
  2:{en:['Halmae Dakhanmari','Dongdaemun / Dakhanmari / Our standard on Seoul trips with my eldest daughter'],ko:['진옥화할매 닭한마리','동대문 / 닭한마리 / 큰딸과의 서울 여행 단골']},
  3:{en:['Koraku','Nobi, Yokosuka / Neighborhood Chinese / Stamina ramen'],ko:['코라쿠','요코스카 노비 / 동네 중국집 / 스태미나 라멘']},
  4:{en:['Shisen','Shirokanedai / Sheraton Miyako Hotel Tokyo / Anniversary lunch / Round table'],ko:['시센','시로카네다이 / 쉐라톤 미야코 호텔 도쿄 / 기념일 점심 / 원탁']},
  5:{en:['Ichiban','Egg fried rice'],ko:['이치반','달걀 볶음밥']},
  6:{en:['Sushi Ryujiro','Minami-Aoyama'],ko:['스시 류지로','미나미아오야마']},
  7:{en:['Hectopascal','Shimokawai / Pizzeria / Hard to book / My eldest daughter booked it for us'],ko:['헥토파스칼','시모카와이 / 피체리아 / 예약하기 어려운 집 / 큰딸이 예약해 준 집']},
  8:{en:['Trattoria della Lanterna Magica','Meguro'],ko:['트라토리아 델라 란테르나 마지카','메구로']},
  9:{en:['Shabu-shabu Tsukada','Shibuya Scramble Square / One pot per person / A new concept from Tsukada Nojo / Designed by Kashiwa Sato'],ko:['샤부샤부 쓰카다','시부야 스크램블 스퀘어 / 1인 1냄비 / 쓰카다 농장의 새 업태 / 사토 가시와 디자인']},
  10:{en:['Myeongdong Kyoja','Myeongdong, Seoul / Kalguksu + mandu / Kimchi refills / The first stop on arriving in Seoul'],ko:['명동교자','서울 명동 / 칼국수 + 만두 / 김치 리필 / 서울에 도착하면 가장 먼저']},
  11:{en:['Tenryu','Maita / Yakiniku'],ko:['덴류','마이타 / 야키니쿠']},
  12:{en:['Hirao','Hakata / Tempura / Hakata food trip / All counter seating / 7-item set meal'],ko:['히라오','하카타 / 덴푸라 / 하카타 미식 원정 / 전석 카운터 / 정식 7품']},
  13:{en:['Misen','Nagoya / Taiwan ramen / Addictively spicy / A long-established shop'],ko:['미센','나고야 / 타이완 라멘 / 중독되는 매운맛 / 창업부터 이어진 노포']},
  14:{en:['Steak MAX','In front of Kawasaki Station / DICE building / Always 600g with extra rice / Choose your toppings & sauce'],ko:['스테이크 MAX','가와사키역 앞 / 다이스 빌딩 / 늘 600g·밥 곱빼기 / 토핑과 소스 선택']},
  15:{en:['Sinsa Gol Gamjatang','Sinsa-dong, Seoul / Spicy pork-bone stew / Fried rice to finish'],ko:['신사골감자탕','서울 신사동 / 뼈다귀 매운 전골 / 마무리 볶음밥']},
  16:{en:['Sushi Tsugu','Kannai, Bashamichi'],ko:['스시 쓰구','간나이 바샤미치']},
  17:{en:['Daishin','Ramen / Kamakura, Fujisawa, Chigasaki'],ko:['다이신','라멘 / 가마쿠라·후지사와·지가사키']},
  18:{en:['Kawasaki Tairiku Gyoza','From 11:00 / Closed Sundays / Evenings from 17:00'],ko:['가와사키 다이리쿠 교자','11:00~ / 일요일 휴무 / 저녁 17시 시작']},
  19:{en:['Fujimaru','Kita-Shinagawa / Udon'],ko:['후지마루','기타시나가와 / 우동']},
  20:{en:['Urara Betsuatsurae','Higashi-Kanagawa, Yokohama / 3 min walk from the station / Fine Japanese, Betsuatsurae course ¥6,600 / Hideaway'],ko:['우라라 베쓰아쓰라에','요코하마·히가시카나가와 / 역에서 도보 3분 / 고급 일식 베쓰아쓰라에 코스 6,600엔 / 숨은 명소']},
  21:{en:['Daiko','Minami-Ota / Miso ramen / Originally in Kurihama, Yokosuka'],ko:['다이코','미나미오타 / 미소 라멘 / 원래 요코스카 구리하마의 가게']},
  22:{en:['Hoshi no Udon','Muraoka main store'],ko:['호시노 우동','무라오카 본점']},
  23:{en:['Hachiryu','Tammachi / Chinese'],ko:['하치류','단마치 / 중식']},
  24:{en:['Unagi Chigusa','Hamamatsu / Unaju'],ko:['우나기 지구사','하마마쓰 / 우나주']},
  25:{en:['Udon Maruka','Jimbocho'],ko:['우동 마루카','진보초']},
  26:{en:['Aichyuin','Chinatown / Beef brisket rice / Lines even at weekday lunch'],ko:['아이췬','차이나타운 / 소고기 양지 덮밥 / 평일 점심에도 줄']},
  27:{en:['Café La Poème','Shirokane'],ko:['카페 라 포엠','시로카네']},
  28:{en:['Chinya Shisai','Shibuya / Gotanda / Tokyo'],ko:['친야시사이','시부야 / 고탄다 / 도쿄']},
  29:{en:['Sobakiri Uchiba','Aomono-yokocho'],ko:['소바키리 우치바','아오모노요코초']},
  30:{en:['Shango','Gunma / Local Italian / Family road trip / Shango-style, Vesuvio, Calabrese'],ko:['샹고','군마 / 동네 이탈리안 / 가족 원정 / 샹고풍·베수비오·칼라브리아풍']},
  31:{en:['Sabasho','Suidobashi / Saba-meshi / Chazuke in sea bream broth / Also opened under the tracks in Shimbashi'],ko:['사바쇼','스이도바시 / 사바메시 / 도미 육수 오차즈케 / 신바시 고가 아래에도 출점']},
  32:{en:['SARU Apero Bistro','Jiyugaoka / Bistro'],ko:['SARU Apero Bistro','지유가오카 / 비스트로']},
  33:{en:['Loto Cafe','Tama Plaza / Italian'],ko:['로토 카페','다마플라자 / 이탈리안']},
  34:{en:['Toryu','Azabu / Fine Chinese'],ko:['도류','아자부 / 고급 중식']},
  35:{en:['Kawakamian','Soba / Azabu-Juban'],ko:['가와카미안','소바 / 아자부주반']},
  36:{en:['Charcoal Yakitori Nishidaya, Shibuya',''],ko:['숯불 야키토리 니시다야 시부야점','']},
  37:{en:['Pancho','Yokohama Station West Exit / Yodobashi basement / Napolitan specialist'],ko:['판초','요코하마역 서쪽 출구 / 요도바시 지하 / 나폴리탄 전문점']},
  38:{en:['Reikyo Taiwanese','Shibuya'],ko:['레이쿄 대만 요리','시부야']},
  39:{en:['Toriise','Noge'],ko:['도리이세','노게']},
  40:{en:['Tendon Hachimaki','Jimbocho'],ko:['텐동 하치마키','진보초']},
  41:{en:['Unagi Yondaime Kikukawa','Yokohama'],ko:['우나기 욘다이메 기쿠카와','요코하마']},
  42:{en:['Hungry Tiger',''],ko:['헝그리 타이거','']},
  43:{en:['Jidoriya Tsukada',''],ko:['지도리야 쓰카다','']},
  44:{en:['Toriton','Noge / Dakhanmari specialist'],ko:['도리톤','노게 / 닭한마리 전문점']},
  45:{en:['Shibuya Tatsukichi','Aged gyoza specialist'],ko:['시부야 다쓰키치','숙성 교자 전문점']},
  46:{en:['Jingisukan Yoichi','Gotanda'],ko:['징기스칸 요이치','고탄다']},
  47:{en:['Kannai Chikita','Teppanyaki lunch in Kannai'],ko:['간나이 지키타','간나이 철판구이 점심']},
  48:{en:['Korean Dining COCO','Authentic Korean'],ko:['코리안 다이닝 COCO','정통 한국 요리']},
  49:{en:['Toramaru Ichiba','Tateyama / Seafood set meal'],ko:['도라마루 시장','다테야마 / 해산물 정식']},
  50:{en:['Uosui','Katsuura morning market / Seafood rice bowl'],ko:['우오스이','가쓰우라 아침 시장 / 해산물 덮밥']},
  51:{en:['Kawamuraya','Soba / Sakuragicho'],ko:['가와무라야','소바 / 사쿠라기초']},
  52:{en:['L’Antica Pizzeria da Michele','Ebisu / Pizza'],ko:['란티카 피체리아 다 미켈레','에비스 피자']},
  53:{en:['Aji no Kokuya, Fujisawa','Fujisawa Station / Neighborhood Chinese in a building basement / Fried rice and sanmamen / Lines'],ko:['아지노 고쿠야 후지사와점','후지사와역 / 빌딩 지하의 동네 중국집 / 볶음밥·산마멘 / 줄 서는 가게']},
  54:{en:['Kannai Masuya','Yakitori & oden'],ko:['간나이 마스야','야키토리와 오뎅']},
  55:{en:['Bistro Monte','Kannai'],ko:['비스트로 몬테','간나이']},
  56:{en:['Minatoan','Founded 1965 / Mt. Fuji portion / Katsudon set'],ko:['미나토안','1965년 창업 / 후지산 곱빼기 / 가쓰동 세트']},
  57:{en:['Bluff Bakery','Motomachi, Yokohama'],ko:['블러프 베이커리','요코하마 모토마치']},
  58:{en:['Ashina Bakery',''],ko:['아시나 베이커리','']},
  59:{en:['Dakhanmari','Noge / Korean'],ko:['닭한마리','노게 / 한식']},
  60:{en:['Teppanyaki','Ebisu'],ko:['철판구이','에비스']},
  61:{en:['Kamata Huanying','Chinese'],ko:['가마타 환잉','중식']},
  62:{en:['Gyoza Mania','Shinagawa'],ko:['교자 마니아','시나가와']},
  63:{en:['Kaihinro','Noge / Chinese'],ko:['가이힌로','노게 / 중식']},
  64:{en:['Maisen','Omotesando'],ko:['마이센','오모테산도']},
  65:{en:['Riddler Neo','Sakuragicho City Hall / Italian'],ko:['리들러 네오','사쿠라기초 시청사 / 이탈리안']},
  66:{en:['Trattoria Ciaolo','Meguro / Italian'],ko:['트라토리아 차오로','메구로 / 이탈리안']},
  67:{en:['Hitsuji no Osama','Hiranumabashi / From 11:30'],ko:['히쓰지노 오사마','히라누마바시 / 11시 반~']},
  68:{en:['Keikaro','Yokohama West Exit / Mapo tofu set meal'],ko:['게이카로','요코하마 서쪽 출구 / 마파두부 정식']},
  69:{en:['Seifuro','Chinatown / Yakimeshi (fried rice)'],ko:['세이후로','차이나타운 / 야키메시(볶음밥)']},
  70:{en:['Kawasaki Tairiku Gyoza','From 11:00 / Closed Sundays / Evenings from 17:00'],ko:['가와사키 다이리쿠 교자','11:00~ / 일요일 휴무 / 저녁 17시 시작']},
  71:{en:['Tonkatsu Tonki','Meguro'],ko:['돈가스 돈키','메구로']},
  72:{en:['Bambolina','Kayabacho / Hamburg steak & diced steak'],ko:['밤볼리나','가야바초 / 햄버그와 주사위 스테이크']},
  73:{en:['Curry House Rio','Yokohama West Exit'],ko:['카레 하우스 리오','요코하마 서쪽 출구']},
  74:{en:['Tokyu Hotel Buffet',''],ko:['도큐 호텔 뷔페','']},
  75:{en:['Oniyanma','Udon'],ko:['오니얀마','우동']},
  76:{en:['Menoji','Noge underground / Izakaya'],ko:['메노지','노게 지하 / 이자카야']},
  77:{en:['Nebukawa DON','Seafood rice bowl'],ko:['네부카와 DON','해산물 덮밥']},
  78:{en:['Tonkatsu Sakurai',''],ko:['돈가스 사쿠라이','']},
  79:{en:['Toki wa Buta Nari, Gumyoji',''],ko:['도키와 부타나리 구묘지점','']},
  80:{en:['Ganso Nagahamaya',''],ko:['간소 나가하마야','']},
  81:{en:['Taishi','Soba / Bandobashi'],ko:['다이시','소바 / 반도바시']},
  82:{en:['Numazu Sekino','Seafood'],ko:['누마즈 세키노','해산물']},
  83:{en:['Ramen NAKAMICHI Kujukuri','Kujukuri / Niboshi ramen'],ko:['라멘 NAKAMICHI 구주쿠리','구주쿠리 / 니보시 라멘']},
  84:{en:['Minato Shokudo','Honmoku'],ko:['미나토 식당','혼모쿠']},
  85:{en:['Shogayaki Baka','Akasaka'],ko:['쇼가야키 바카','아카사카']},
  86:{en:['Marudori Ruisuke Hanare','Nishi-Shinjuku'],ko:['마루도리 루이스케 하나레','니시신주쿠']},
  87:{en:['ZEIT Bakery Cafe','Lake Yamanaka / Bakery / Opens at 7:00'],ko:['ZEIT Bakery Cafe','야마나카호 / 빵집 / 7시~']},
  88:{en:['Zebra Coffee','Croissants 🥐'],ko:['제브라 커피','크루아상 🥐']},
  89:{en:['Sugidama','Sangenjaya / Shin-Kawasaki'],ko:['스기다마','산겐자야 / 신카와사키']},
  90:{en:['Torishige','Noge / Mr. Shida'],ko:['도리시게','노게 / 시다 씨']},
  91:{en:['Tokyoan','Noge / Soba'],ko:['도쿄안','노게 / 소바']},
  92:{en:['Don Manjiro','Odawara'],ko:['돈 만지로','오다와라']},
  93:{en:['Jiba','Yakitori / Kannai'],ko:['지바','야키토리 / 간나이']},
  94:{en:['Takegawa Udon','Yamanashi'],ko:['다케가와 우동','야마나시']},
  95:{en:['Murasaki','Higashi-Kanagawa / Sushi'],ko:['무라사키','히가시카나가와 / 스시']},
  96:{en:['Tonkatsu no Hamaya','Isezakicho'],ko:['돈가스노 하마야','이세자키초']},
  97:{en:['Tamaya','Sashimi set meal / Isezakicho / From 11:30'],ko:['다마야','사시미 정식 / 이세자키초 / 11시 반~']},
  98:{en:['Heroes','Steak'],ko:['히어로즈','스테이크']},
  99:{en:['BiOsteria Komakine','Maita / Italian'],ko:['BiOsteria Komakine','마이타 / 이탈리안']},
  100:{en:['Udon Oniyanma','Higashi-Shinagawa'],ko:['우동 오니얀마','히가시시나가와']},
  101:{en:['Nekomaru Shokudo','Kikuna'],ko:['네코마루 식당','기쿠나']},
  102:{en:['Hitsuji no Osama','Okanocho / Lunch available'],ko:['히쓰지노 오사마','오카노초 / 점심 있음']},
  103:{en:['YAKITORI Gokuu','Shimbashi / Rikyu'],ko:['YAKITORI 고쿠','신바시 리큐']},
  104:{en:['Tonkatsu Sakurai','Idogaya'],ko:['돈가스 사쿠라이','이도가야']},
  105:{en:['Shonan Aji Fry Arata','Fujisawa Station'],ko:['쇼난 아지후라이 아라타','후지사와역']},
  106:{en:['Katsuretsuan','Bashamichi'],ko:['가쓰레쓰안','바샤미치']},
  107:{en:['Steak Oyadama','Isezakicho'],ko:['스테이크 오야다마','이세자키초']},
  108:{en:['Okonomiyaki Sho','Kannai / 11:00'],ko:['오코노미야키 쇼','간나이 / 11시']},
  109:{en:['Curry Baka Seiki','Meguro'],ko:['카레바카 세이키','메구로']},
  110:{en:['Steak Oyadama','Fukutomicho'],ko:['스테이크 오야다마','후쿠토미초']},
  111:{en:['Daiichitei','Hinodecho, Yokohama / Neighborhood Chinese'],ko:['다이이치테이','요코하마 히노데초 / 동네 중국집']},
  112:{en:['Rainbow Bakery','Zushi Marina'],ko:['레인보 베이커리','즈시 마리나']},
  113:{en:['Sugidama','Sangenjaya'],ko:['스기다마','산겐자야']},
  114:{en:['Kiji','Okonomiyaki / Umeda'],ko:['기지','오코노미야키 / 우메다']},
  115:{en:['Meat Shop Kitagaki','Matsue croquettes'],ko:['미트숍 기타가키','마쓰에 고로케']},
  116:{en:['Misaki Port Market',''],ko:['미사키항 시장','']},
  117:{en:['Kanedawan Market',''],ko:['가네다만 시장','']},
  118:{en:['Odawara Fishing Port Market',''],ko:['오다와라 어항 시장','']},
  119:{en:['Shonandai Marutaka',''],ko:['쇼난다이 마루타카','']},
  120:{en:['Restaurant Kanedawan','6:00 to 8:00'],ko:['레스토랑 가네다만','6시부터 8시']},
  121:{en:['Toriyoshi','Noge'],ko:['도리요시','노게']},
  122:{en:['Curry Baka Seiki','Meguro'],ko:['카레바카 세이키','메구로']},
  123:{en:['Ganjin (main store)','Udon'],ko:['간진 본점','우동']},
  124:{en:['Taishi','Soba / Bandobashi'],ko:['다이시','소바 / 반도바시']},
  125:{en:['La Goccia','Shirokanedai / Italian'],ko:['라 고차','시로카네다이 이탈리안']},
  126:{en:['Nakameguro Iguchi (main store)','Yakitori'],ko:['나카메구로 이구치 본점','야키토리']},
  127:{en:['Huanying','Kamata / Gyoza & Chinese'],ko:['환잉','가마타 / 교자 중식']},
  128:{en:['Atsuta Horaiken','Hitsumabushi'],ko:['아쓰타 호라이켄','히쓰마부시']},
  129:{en:['Katsuretsuan','Kannai, Bashamichi'],ko:['가쓰레쓰안','간나이 바샤미치']},
  130:{en:['Chinya Shisai','Shibuya / Chinese'],ko:['친야시사이','시부야 / 중식']},
  131:{en:['Marudori Ruisuke Hanare','Nishi-Shinjuku / Chicken dishes'],ko:['마루도리 루이스케 하나레','니시신주쿠 / 닭 요리']},
  132:{en:['Manten Curry','Jimbocho'],ko:['만텐 카레','진보초']},
  133:{en:['Berg','Yoshinocho / Curry'],ko:['베르그','요시노초 / 카레']},
  134:{en:['Higashi-Kanagawa Station Soba',''],ko:['히가시카나가와역 소바','']},
  135:{en:['Koganeya','Ramen'],ko:['고가네야','라멘']},
  136:{en:['Senri Hanten','Chinese / Fujisawa'],ko:['센리 한텐','중식 / 후지사와']},
  137:{en:['Jomon','Maruyamacho, Shibuya / Yakitori'],ko:['조몬','시부야 마루야마초 / 야키토리']},
  138:{en:['Ashina Bakery Ashibe','Chicken curry bread'],ko:['아시나 베이커리 아시베','치킨 카레빵']},
  139:{en:['Nagoya Soba','Hodogaya'],ko:['나고야 소바','호도가야']},
  140:{en:['Shirakaba Sanso, Yokohama','JAPAN RAMEN FOOD HALL / Miso ramen'],ko:['시라카바 산소 요코하마점','JAPAN RAMEN FOOD HALL / 미소 라멘']},
  141:{en:['Hachiro Sakaba','Noge'],ko:['하치로 사카바','노게']},
  142:{en:['Yamashita no Honki Udon',''],ko:['야마시타노 혼키 우동','']},
  143:{en:['Mochimen','Shibuya / Udon'],ko:['모치멘','시부야 / 우동']},
  144:{en:['Kaifudo sea-foo-dou','Tateyama'],ko:['가이후도 sea-foo-dou','다테야마']},
  145:{en:['Daiichi Fujimaru','Horse mackerel set meal / Atami'],ko:['다이이치 후지마루','전갱이 정식 / 아타미']},
  146:{en:['Yakiniku Champion','Ebisu'],ko:['야키니쿠 챔피언','에비스']},
  147:{en:['Captain, Hobo Shinjuku Noren-gai','Offal & wine'],ko:['호보 신주쿠 노렌가이 캡틴','곱창과 와인']},
  148:{en:['Goryosan','Shibuya / Chicken dishes'],ko:['고료상','시부야 / 닭 요리']},
  149:{en:['Center Grill','Noge'],ko:['센터 그릴','노게']},
  150:{en:['Kirin','Ebisu / Yakitori'],ko:['기린','에비스 / 야키토리']},
  151:{en:['Toroke no Daidokoro','Tomato ramen / Nakameguro / Bistro'],ko:['도로케노 다이도코로','토마토 라멘 / 나카메구로 / 비스트로']},
  152:{en:['Yaneura no Pari Shokudo','Nakameguro / Bistro'],ko:['야네우라노 파리 식당','나카메구로 / 비스트로']},
  153:{en:['Yodorigi Ramen','Yoshinocho'],ko:['요도리기 라멘','요시노초']},
  154:{en:['Fujita','Chuka soba / Maita'],ko:['후지타','주카소바 / 마이타']},
  155:{en:['Uotama','Jimbocho / Sardine set meal / Weekdays'],ko:['우오타마','진보초 / 정어리 정식 / 평일']},
  156:{en:['Tonkatsu Aoki',''],ko:['돈가스 아오키','']},
  157:{en:['Tenka','Behind Sakuragicho Station / Ramen'],ko:['덴카','사쿠라기초역 뒤 / 라멘']},
  158:{en:['Banban Bancho','Kannai'],ko:['반반 반초','간나이']},
  159:{en:['Shogayaki Hanarokusho','Gumyoji'],ko:['쇼가야키 하나로쿠쇼','구묘지']},
  160:{en:['Mukan Ramen',''],ko:['무칸 라멘','']},
  161:{en:['Udon Ganjin Bettei','Bashamichi / Near Yokohama Stadium / Golden flying-fish broth / One free raw egg'],ko:['우동 간진 벳테이','바샤미치 / 요코하마 스타디움 근처 / 황금 날치 육수 / 날달걀 1개 무료']},
};
/* 店名・メモ（翻訳がなければ日本語のまま。店名は原語を括弧で添える） */
function gmRowT(r){
  const t = GM_LANG !== 'ja' && GM_I18N_RANK[r.n] && GM_I18N_RANK[r.n][GM_LANG];
  return t ? { name:t[0], memo:t[1], orig:r.name } : { name:r.name, memo:r.memo, orig:'' };
}

/* ---------------- コラムの差し替え ---------------- */
function gmLocalizeColumn(col){
  if(GM_LANG === 'ja') return col;
  const tr = (typeof GM_I18N_COLS !== 'undefined' && GM_I18N_COLS[col.id] && GM_I18N_COLS[col.id][GM_LANG]) || null;
  const c = Object.assign({}, col);
  c.tags = (col.tags || []).map(gmTag);
  if(tr){
    ['title', 'excerpt', 'description'].forEach(k => { if(tr[k]) c[k] = tr[k]; });
    if(tr.captions && col.gallery) c.gallery = col.gallery.map((g, i) => Object.assign({}, g, { caption: tr.captions[i] || g.caption }));
    if(tr.body && tr.body.length) c.body = tr.body;
  }
  c.untranslated = !(tr && tr.body && tr.body.length);
  return c;
}

/* ---------------- 言語切り替えボタン ---------------- */
function gmMountLangSwitch(el){
  if(!el) return;
  el.setAttribute('role', 'group');
  el.setAttribute('aria-label', gmT('lang_aria'));
  el.innerHTML = Object.keys(GM_LANGS).map(k =>
    '<button type="button" lang="' + k + '" data-lang="' + k + '" aria-pressed="' + (k === GM_LANG) + '" title="' + GM_LANGS[k].label + '">' + GM_LANGS[k].label + '</button>').join('');
  el.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => gmSetLang(b.dataset.lang)));
}

/* data-i18n="key"（文字）/ data-i18n-html="key"（HTML）/ data-i18n-ph / data-i18n-aria を差し替える。{rows} はランキング件数 */
function gmApplyStatic(root, vars){
  (root || document).querySelectorAll('[data-i18n],[data-i18n-html],[data-i18n-ph],[data-i18n-aria]').forEach(el => {
    const d = GM_UI[GM_LANG];
    const pick = k => (k in d) ? gmT(k, vars) : null;
    let v;
    if(el.dataset.i18n && (v = pick(el.dataset.i18n)) != null) el.textContent = v;
    if(el.dataset.i18nHtml && (v = pick(el.dataset.i18nHtml)) != null) el.innerHTML = v;
    if(el.dataset.i18nPh && (v = pick(el.dataset.i18nPh)) != null) el.setAttribute('placeholder', v);
    if(el.dataset.i18nAria && (v = pick(el.dataset.i18nAria)) != null) el.setAttribute('aria-label', v);
  });
}
