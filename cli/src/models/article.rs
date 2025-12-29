use crate::models::{Dialect, Sentence};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};

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

// TODO: 別の場所に逃がしたい
impl Article {
    pub fn entries(&self) -> Vec<Value> {
        self.sentences
          .iter()
          .enumerate()
          .map(|(index, sentence)| {
            json!({
              "id": format!("{}/{}#{}", &self.book, &self.title, index),
              "book": &self.book,
              "title": &self.title,
              "url": &self.url,
              "pronoun": sentence.pronoun.as_ref().or(self.pronoun.as_ref()),
              "index": index,
              "author": sentence.author.as_ref().or(self.author.as_ref()),
              "dialect": sentence.dialect.as_ref().or(self.dialect.as_ref()).map(|d| d.name()),
              "dialect_lv1": sentence.dialect.as_ref().or(self.dialect.as_ref()).map(|d| d.lv_1()),
              "dialect_lv2": sentence.dialect.as_ref().or(self.dialect.as_ref()).map(|d| d.lv_2()),
              "dialect_lv3": sentence.dialect.as_ref().or(self.dialect.as_ref()).map(|d| d.lv_3()),
              "writing_system": &self.writing_system,
              "text": &sentence.ain,
              "translation": &sentence.jpn,
              "recorded_at": &self.recorded_at,
              "published_at": &self.published_at,
            })
          })
          .collect()
    }
}
