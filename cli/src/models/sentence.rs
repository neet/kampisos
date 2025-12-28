use crate::models::Dialect;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Sentence {
    // 著者名のオーバーライド
    pub author: Option<String>,

    // 方言のオーバーライド
    pub dialect: Option<Dialect>,

    // 主な一人称のオーバーライド
    pub pronoun: Option<String>,

    // アイヌ語の文章
    pub ain: Option<String>,

    // 日本語訳
    pub jpn: Option<String>,

    // ロシア語訳
    pub rus: Option<String>,

    // 英語訳
    pub eng: Option<String>,

    // ポーランド語訳
    pub pol: Option<String>,

    // ドイツ語訳
    pub deu: Option<String>,
}
