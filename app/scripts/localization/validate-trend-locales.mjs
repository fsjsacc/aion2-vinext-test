import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = JSON.parse(
  await readFile(
    path.join(root, "tmp", "editorial-content-source-trend.json"),
    "utf8",
  ),
);
const generated = JSON.parse(
  await readFile(
    path.join(root, "app", "editorial-content-locales.generated.json"),
    "utf8",
  ),
);

const locales = ["zh-hans", "fr", "de", "es", "ja", "pt-br", "ru"];
const identities = Object.keys(source.entries);
const contamination = [
  /&(?:amp|quot|apos|lt|gt);/,
  /KINA START|KINA END/,
  /国家卫生局|韩国国家空间研究计划|厦门网/,
  /vapeur|PRURPLE|Aulas|アッサイン|Market Market/,
  /课程|班级|每个字符|按字符|标准和高级曲目|标准曲目|高级曲目|标准赛道|高级赛道|客户端中显示的字符/,
  /文字ごとに Daeva Pass|不正なウィンドウ|ショート ウィンドウ マジック|ショート ウィンドウ プレッシャー|キャスト位置|キャストポジション|ショートプレッシャー|機械的動作|全圧ウィンドウ|Steam および PURPLE までの PC のみ/,
  /позиция приведения|позиция для заброса|положение для заброса|позиция заброса|плохое окно|дополнительные выходные данные|полный список участников|включения в подписка|запланированное подписка|не указано подписка|доступ к активному членству/i,
  /按数据类型分隔作业|职业页面涵盖角色和游戏模式|当前客户端端|全球最强级别|中期替换行为|Global会一模一样|守护节小游戏|没有检查公共 API|人口和队列估计将保持不变|生存能力 PvE|仅一条记录|特定于活动的层|新类别|更改字母|追击盟友和退出路线|有用的窗口|设置的规则|机械操作|观察目标并退出|候选人需要|固定的最佳位置|不要参与|当前计数器|机械移动|不应跨越的前沿|验证生命范围|保持投射位置|坏窗口|短窗口魔法|官方突发措辞|区域体型|按键滑块屏幕|导入表面|付费获胜/,
  /どちらが勝ちますか|検索関心が高まったため|利用可能なパブリック ライブ ステータスを報告しません|接続が失敗した場合のみ|すべての政党|耐性ではなく回復として耐久性|経路に接近|有用なウィンドウ|設定ルール|ターゲットを観察して終了|ライブバージョンの質問|計画された終了|安全な退場|カウンター|アサートされません|関与しないでください|下手なエントリー|グローバル名の後に続きます|4 つのジョブ|整備中に|より高い推定値|録音領域|整備士が移動|党の保護|明記にする必要|サーフェスをインポート|キャラクターごとの予算パス|全圧ウィンドウ|機械的動作/,
  /ライブの地域スキル テキストから短い個人ループを構築し、構築とテストのコンテキストを記録します。|現在の活動のライブタンクの規則、党条件、および回復行動を録音して下さい。/,
  /не сообщит об отсутствии|поисковый интерес возрос|региональная мобильная связь|есть мобильная связь|глобальную версию Android|интерактивный сервис главы 1|исправление ошибок новичка|Соло: поддержка|Дополнительный танк является|время безотказной работы|полезное окно|установленное правило|вынужденные разъединения|Преследование союзников|наблюдать за целью и выйти|запланированный выход|счетчики|Въезд без выхода|Не занимайтесь|кандидатов с чистым выходом|регион записи|механическим движением|проверьте дальность действия|не выполняются|Сорсерер представлена|предысторию оборудования|усложняют освоение, чем|с дружественным передним|возмещения ущерба|повторной публикации выступления|фактически предоставляемую|обратите внимание позже|за активным подпискам|Требуется активное подписка|активного членства|Проверить подписка|Бюджетные пропуска|объем персонажа|Отдельно запишите подписка/i,
  /\uFFFD/,
];
const fallbackDisclosures = [
  /detailed reference content.*English/i,
  /sections de référence détaillées.*anglais/i,
  /Referenzabschnitte.*Englisch/i,
  /secciones de referencia.*inglés/i,
  /詳細な参考本文.*英語/i,
  /seções de referência.*inglês/i,
  /справочные разделы.*английском/i,
];

function descriptors(section) {
  const values = [];
  const add = (key, value) => {
    if (typeof value === "string") values.push([key, value]);
  };

  (section.paragraphs ?? []).forEach((value, index) =>
    add(`paragraphs.${index}`, value),
  );
  (section.bullets ?? []).forEach((value, index) =>
    add(`bullets.${index}`, value),
  );
  (section.steps ?? []).forEach((step, index) => {
    add(`steps.${index}.title`, step.title);
    add(`steps.${index}.description`, step.description);
  });
  if (section.table) {
    add("table.caption", section.table.caption);
    section.table.headers.forEach((value, index) =>
      add(`table.headers.${index}`, value),
    );
    section.table.rows.forEach((row, rowIndex) => {
      add(`table.rows.${rowIndex}.header`, row.header);
      row.cells.forEach((value, cellIndex) =>
        add(`table.rows.${rowIndex}.cells.${cellIndex}`, value),
      );
    });
  }
  (section.faq ?? []).forEach((item, index) => {
    add(`faq.${index}.question`, item.question);
    add(`faq.${index}.answer`, item.answer);
  });
  return values;
}

const failures = [];

for (const identity of identities) {
  const englishSections = source.entries[identity].content.sections;
  for (const locale of locales) {
    const localized = generated.entries[identity]?.[locale];
    if (!localized) {
      failures.push(`${locale}.${identity}: missing generated entry`);
      continue;
    }

    const serialized = JSON.stringify(localized);
    for (const pattern of contamination) {
      if (pattern.test(serialized)) {
        failures.push(`${locale}.${identity}: contamination ${pattern}`);
      }
    }
    for (const pattern of fallbackDisclosures) {
      if (pattern.test(serialized)) {
        failures.push(`${locale}.${identity}: English fallback disclosure remains`);
      }
    }

    englishSections.forEach((englishSection, sectionIndex) => {
      const localizedSection = localized.content.sections[sectionIndex];
      if (!localizedSection) return;
      const localizedValues = new Map(descriptors(localizedSection));
      for (const [fieldPath, englishValue] of descriptors(englishSection)) {
        if (
          englishValue.length >= 24 &&
          /[A-Za-z]{3}/.test(englishValue) &&
          localizedValues.get(fieldPath) === englishValue
        ) {
          failures.push(
            `${locale}.${identity}.${englishSection.id}.${fieldPath}: English body text unchanged`,
          );
        }
      }
    });
  }
}

if (failures.length > 0) {
  throw new Error(
    `Trend localization quality validation failed:\n- ${failures.join("\n- ")}`,
  );
}

console.log(
  `Validated complete translated body copy for ${identities.length} trend identities across ${locales.length} generated locales.`,
);
