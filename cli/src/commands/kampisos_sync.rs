use crate::models::{Article, Dialect};
use git2::{Repository, TreeWalkMode, TreeWalkResult};
use kdam::tqdm;
use serde_json::{Value, json};
use serde_yaml;
use typesense::apis::configuration::{ApiKey, Configuration};

pub async fn kampisos_sync() -> Result<(), Box<dyn std::error::Error>> {
    let repo = open_repository()?;

    let mut articles: Vec<Article> = vec![];

    let reference = repo.find_reference("refs/heads/main")?;
    let tree = reference.peel_to_tree()?;

    tree.walk(TreeWalkMode::PreOrder, |root, entry| {
        let name = entry.name().unwrap_or("");
        let path = format!("{}{}", root, name);

        if !path.starts_with("texts") || !path.ends_with("yaml") {
            return TreeWalkResult::Ok;
        }

        let object = entry.to_object(&repo).unwrap().peel_to_blob().unwrap();
        let content = std::str::from_utf8(object.content()).unwrap();
        let article: Article = serde_yaml::from_str(content).unwrap();

        articles.push(article);

        TreeWalkResult::Ok
    })?;

    let configuration = Configuration {
        base_path: "http://localhost:8108".to_owned(),
        api_key: Some(ApiKey {
            prefix: None,
            key: "xyz".to_owned(),
        }),
        ..Default::default()
    };

    for article in tqdm!(articles.iter()) {
        for document in article.documents() {
            typesense::apis::documents_api::index_document(
                &configuration,
                "articles",
                document,
                Some("upsert"),
            )
            .await?;
        }
    }

    Ok(())
}

fn open_repository() -> Result<Repository, Box<dyn std::error::Error>> {
    let repo = Repository::open("/tmp/ainu-corpora")?;

    return Ok(repo);
}

impl Dialect {
    fn lv_n(&self, level: u8) -> Vec<String> {
        let index = level.into();

        match &self {
            Dialect::Path(path) | Dialect::NamedPath { path, .. } => path
                .split("/")
                .nth(index)
                .into_iter()
                .map(|path| path.to_owned())
                .collect(),

            Dialect::NamedPathList { paths, .. } => paths
                .iter()
                .filter_map(|path| path.split("/").nth(index))
                .map(|path| path.to_owned())
                .collect(),
        }
    }

    pub fn lv_1(&self) -> Vec<String> {
        self.lv_n(0)
    }

    pub fn lv_2(&self) -> Vec<String> {
        self.lv_n(1)
    }

    pub fn lv_3(&self) -> Vec<String> {
        self.lv_n(2)
    }
}

impl Article {
    pub fn documents(&self) -> Vec<Value> {
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
              "dialect_v1": sentence.dialect.as_ref().or(self.dialect.as_ref()).map(|d| d.lv_1()),
              "dialect_v2": sentence.dialect.as_ref().or(self.dialect.as_ref()).map(|d| d.lv_2()),
              "dialect_v3": sentence.dialect.as_ref().or(self.dialect.as_ref()).map(|d| d.lv_3()),
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

// fn clone_repository() -> Result<Repository, Box<dyn std::error::Error>> {
//     // Prepare callbacks.
//     let mut callbacks = RemoteCallbacks::new();
//     callbacks.credentials(|_url, username_from_url, _allowed_types| {
//         Cred::ssh_key(
//             username_from_url.unwrap(),
//             None,
//             Path::new(&format!("{}/.ssh/id_rsa", env::var("HOME").unwrap())),
//             None,
//         )
//     });
//
//     // Prepare fetch options.
//     let mut fo = git2::FetchOptions::new();
//     fo.remote_callbacks(callbacks);
//
//     // Prepare builder.
//     let mut builder = git2::build::RepoBuilder::new();
//     builder.fetch_options(fo);
//
//     // Clone the project.
//     let repo = builder.clone(
//         "git@github.com:aynumosir/ainu-corpora.git",
//         Path::new("/tmp/ainu-corpora"),
//     )?;
//
//     return Ok(repo);
// }
