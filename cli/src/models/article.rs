use crate::models::{Dialect, Sentence};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Article {
    // 書籍・ウェブサイト名（リポジトリ内で一意）
    pub book: String,

    // 章タイトル（同じ book 内で一意）
    pub title: String,

    // 参照URL
    pub url: String,

    // 著者名
    pub author: Option<String>,

    // 方言
    pub dialect: Option<Dialect>,

    // 主な一人称
    pub pronoun: Option<String>,

    // 表記法（ain フィールド）
    #[serde(default)]
    pub writing_system: WritingSystem,

    // 録音日（ISO 8601 日付 or 範囲）
    pub recorded_at: Option<String>,

    // 公開日（ISO 8601 日付 or 範囲）
    pub published_at: Option<String>,

    // 録音者
    pub recorded_by: Option<String>,

    // 翻訳者
    pub translated_by: Option<String>,

    // 文章一覧
    pub sentences: Vec<Sentence>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum WritingSystem {
    Latin,
    Kana,
}

impl Default for WritingSystem {
    fn default() -> Self {
        WritingSystem::Latin
    }
}
