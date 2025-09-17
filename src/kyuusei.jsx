import React, { useState } from "react";

const HONMEI_TABLE = {
  1: "一白水星",
  2: "二黒土星",
  3: "三碧木星",
  4: "四緑木星",
  5: "五黄土星",
  6: "六白金星",
  7: "七赤金星",
  8: "八白土星",
  9: "九紫火星"
};

// 2025年の年盤配置（中宮=三碧木星）
const NENBAN_2025 = {
  "北": "六白金星",
  "南": "一白水星",
  "東": "九紫火星",
  "西": "二黒土星",
  "東北": "五黄土星",
  "東南": "八白土星",
  "西北": "四緑木星",
  "西南": "七赤金星",
  "中央": "三碧木星",
};

// 各位置の意味（簡易版）
const POSITION_MEANING = {
  "中央": "中心に入り注目と転換の年。良くも悪くも変化が大きい。",
  "北": "内省・停滞の年。体調や心の健康に注意。",
  "南": "注目が集まる年。評価が高まる反面、秘密が表に出やすい。",
  "東": "新しいことを始める勢いの年。活発さが吉凶を分ける。",
  "西": "楽しみやお金の出入りが増える年。浪費に注意。",
  "東北": "大きな変化の年。転職・引越しなど環境の変化が起こりやすい。",
  "東南": "縁が広がる年。結婚・交際・交渉ごとに良い。",
  "西北": "責任や地位が伴う年。努力次第で信頼を得られる。",
  "西南": "家庭や人間関係を整える年。忍耐が試される。",
};

// 九星を算出（立春基準の補正あり）
function getKyuusei(year, month, day) {
  let calcYear = year;
  if (month < 2 || (month === 2 && day <= 3)) {
    calcYear = year - 1;
  }
  const yy = calcYear % 100;
  let num = (yy + 9) % 9;
  if (num === 0) num = 9;
  return HONMEI_TABLE[num];
}

// 本命星が2025年にどこに入るか
function getNenun2025(star) {
  const pos = Object.entries(NENBAN_2025).find(([_, s]) => s === star);
  if (!pos) return null;
  const [position, _] = pos;
  return { position, meaning: POSITION_MEANING[position] };
}

export default function KyuuseiCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState(null);

  const handleClick = () => {
    if (!birthDate) return;
    const d = new Date(birthDate);
    if (isNaN(d)) return;
    const star = getKyuusei(d.getFullYear(), d.getMonth() + 1, d.getDate());
    const nenun = getNenun2025(star);
    setResult({ date: d.toISOString().slice(0, 10), star, nenun });
  };

  return (
    <div className="p-4 rounded-2xl border border-gray-200 bg-white text-gray-900 w-full max-w-md">
      <div className="text-lg font-semibold mb-3">九星気学 本命星 計算ツール（2025年の運勢付き）</div>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="border rounded-lg px-2 py-1"
        />
        <button
          onClick={handleClick}
          className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          占う
        </button>
      </div>
      {result && (
        <div className="mt-3 text-sm space-y-2">
          <div>生年月日: <span className="font-medium">{result.date}</span></div>
          <div>本命星: <span className="font-medium">{result.star}</span></div>
          {result.nenun && (
            <>
              <div>2025年の位置: <span className="font-medium">{result.nenun.position}</span></div>
              <div>年運: <span className="font-medium">{result.nenun.meaning}</span></div>
            </>
          )}
        </div>
      )}
      <div className="mt-3 text-xs text-gray-600 leading-relaxed">
        <p>※ 簡易版です。実際の九星気学では節分基準や暗剣殺・破・歳破なども加味して判断します。</p>
      </div>
    </div>
  );
}