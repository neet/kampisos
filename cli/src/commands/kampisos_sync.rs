use crate::models::Article;
use git2::{ObjectType, Oid, Repository, TreeWalkMode, TreeWalkResult};
use kdam::tqdm;
use serde_yaml;
use typesense::apis::configuration::{ApiKey, Configuration};

pub async fn kampisos_sync(
    typesense_url: &str,
    typesense_api_key: &str,
    git_path: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    let configuration = Configuration {
        base_path: typesense_url.to_owned(),
        api_key: Some(ApiKey {
            prefix: None,
            key: typesense_api_key.to_owned(),
        }),
        ..Default::default()
    };

    let repo = Repository::open(git_path)?;
    let reference = repo.find_reference("refs/heads/main")?;
    let tree = reference.peel_to_tree()?;

    let mut oids: Vec<Oid> = vec![];
    tree.walk(TreeWalkMode::PreOrder, |root, entry| {
        let name = entry.name().unwrap_or("");

        if root.is_empty() && entry.kind() == Some(ObjectType::Tree) && name == "texts" {
            return TreeWalkResult::Ok;
        }

        if root.starts_with("texts/") && entry.kind() == Some(ObjectType::Tree) {
            return TreeWalkResult::Ok;
        }

        if root.starts_with("texts/")
            && entry.kind() == Some(ObjectType::Blob)
            && name.ends_with(".yaml")
        {
            oids.push(entry.id());
            return TreeWalkResult::Ok;
        }

        TreeWalkResult::Skip
    })?;

    let mut articles: Vec<Article> = vec![];
    for oid in oids {
        let object = repo.find_object(oid, Some(ObjectType::Blob))?;
        let blob = object.peel_to_blob()?;
        let article: Article = serde_yaml::from_slice(blob.content())?;
        articles.push(article);
    }

    let entries = articles
        .iter()
        .flat_map(|article| article.entries())
        .collect::<Vec<_>>();

    for entry in tqdm!(entries.into_iter()) {
        typesense::apis::documents_api::index_document(
            &configuration,
            "entries",
            entry,
            Some("upsert"),
        )
        .await?;
    }

    Ok(())
}
