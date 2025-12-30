use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum Dialect {
    Path(String),
    NamedPath { name: String, path: String },
    NamedPathList { name: String, paths: Vec<String> },
}
