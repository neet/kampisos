use typesense::apis::configuration::{ApiKey, Configuration};
use typesense::collection_schema::CollectionSchemaBuilder;
use typesense::field::Field;

pub trait FieldExt {
    fn index(self) -> Self;
    fn optional(self) -> Self;
    fn facet(self) -> Self;
}

impl FieldExt for Field {
    fn index(mut self) -> Self {
        self.index = Some(true);
        self
    }

    fn optional(mut self) -> Self {
        self.optional = Some(true);
        self
    }

    fn facet(mut self) -> Self {
        self.facet = Some(true);
        self
    }
}

pub async fn kampisos_init() -> Result<(), Box<dyn std::error::Error>> {
    let collection_schema = CollectionSchemaBuilder::new(
        "articles",
        vec![
            Field::new("book".into(), "string".into())
                .facet()
                .optional(),
            Field::new("title".into(), "string".into()).optional(),
            Field::new("url".into(), "string".into()).optional(),
            Field::new("pronoun".into(), "string".into())
                .facet()
                .optional(),
            Field::new("index".into(), "int32".into()).optional(),
            Field::new("author".into(), "string".into())
                .facet()
                .optional(),
            Field::new("dialect_v1".into(), "string[]".into())
                .facet()
                .optional(),
            Field::new("dialect_v2".into(), "string[]".into())
                .facet()
                .optional(),
            Field::new("dialect_v3".into(), "string[]".into())
                .facet()
                .optional(),
            Field::new("writing_system".into(), "string".into()).optional(),
            Field::new("text".into(), "string".into())
                .index()
                .optional(),
            Field::new("translation".into(), "string".into())
                .index()
                .optional(),
            Field::new("recorded_at".into(), "string".into()).optional(),
            Field::new("published_at".into(), "string".into()).optional(),
        ],
    )
    .build();

    let configuration = Configuration {
        base_path: "http://localhost:8108".to_owned(),
        api_key: Some(ApiKey {
            prefix: None,
            key: "xyz".to_owned(),
        }),
        ..Default::default()
    };

    typesense::apis::collections_api::create_collection(&configuration, collection_schema).await?;
    println!("Collection created successfully!");

    Ok(())
}
