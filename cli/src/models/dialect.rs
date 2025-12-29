use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum Dialect {
    Path(String),
    NamedPath { name: String, path: String },
    NamedPathList { name: String, paths: Vec<String> },
}

// TODO: あまりYAMLとロジックを密結合にしたくない
impl Dialect {
    pub fn name(&self) -> Option<String> {
        match &self {
            Dialect::Path(path) => path.split("/").last().map(|l| l.to_string()),
            Dialect::NamedPath { name, .. } | Dialect::NamedPathList { name, .. } => {
                Some(name.to_string())
            }
        }
    }

    pub fn lv_1(&self) -> Vec<String> {
        self.segments()
            .iter()
            .filter(|segment| segment.len() >= 1)
            .map(|segment| segment[0].to_string())
            .collect()
    }

    pub fn lv_2(&self) -> Vec<String> {
        self.segments()
            .iter()
            .filter(|segment| segment.len() >= 2)
            .map(|segment| segment[0..2].join("/"))
            .collect()
    }

    pub fn lv_3(&self) -> Vec<String> {
        self.segments()
            .iter()
            .filter(|segment| segment.len() >= 3)
            .map(|segment| segment.join("/"))
            .collect()
    }

    fn segments(&self) -> Vec<Vec<String>> {
        match &self {
            Dialect::Path(path) | Dialect::NamedPath { path, .. } => {
                vec![path.split("/").map(|s| s.to_string()).collect::<Vec<_>>()]
            }
            Dialect::NamedPathList { paths, .. } => paths
                .iter()
                .map(|path| path.split("/").map(|s| s.to_string()).collect::<Vec<_>>())
                .collect(),
        }
    }
}
