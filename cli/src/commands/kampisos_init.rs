use typesense::apis::configuration::{ApiKey, Configuration};
use typesense::collection_schema::CollectionSchemaBuilder;
use typesense::field::Field;

pub trait FieldExt {
    fn noindex(self) -> Self;
    fn optional(self) -> Self;
    fn facet(self) -> Self;
    fn locale(self, value: &str) -> Self;
}

impl FieldExt for Field {
    fn noindex(mut self) -> Self {
        self.index = Some(false);
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

    fn locale(mut self, value: &str) -> Self {
        self.locale = Some(value.into());
        self
    }
}

pub async fn kampisos_init(
    typesense_url: &str,
    typesense_api_key: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    let collection_schema = CollectionSchemaBuilder::new(
        "entries",
        vec![
            Field::new("book".into(), "string".into())
                .facet()
                .optional(),
            Field::new("title".into(), "string".into()).optional(),
            Field::new("url".into(), "string".into())
                .optional()
                .noindex(),
            Field::new("pronoun".into(), "string".into())
                .facet()
                .optional(),
            Field::new("index".into(), "int32".into())
                .optional()
                .noindex(),
            Field::new("author".into(), "string".into())
                .facet()
                .optional(),
            Field::new("dialect".into(), "string".into())
                .noindex()
                .optional(),
            Field::new("dialect_lv1".into(), "string[]".into())
                .facet()
                .optional(),
            Field::new("dialect_lv2".into(), "string[]".into())
                .facet()
                .optional(),
            Field::new("dialect_lv3".into(), "string[]".into())
                .facet()
                .optional(),
            Field::new("writing_system".into(), "string".into()).optional(),
            Field::new("text".into(), "string".into()).optional(),
            Field::new("translation".into(), "string".into())
                .optional()
                .locale("ja"),
            Field::new("recorded_at".into(), "string".into()).optional(),
            Field::new("published_at".into(), "string".into()).optional(),
        ],
    )
    .build();

    let configuration = Configuration {
        base_path: typesense_url.into(),
        api_key: Some(ApiKey {
            prefix: None,
            key: typesense_api_key.into(),
        }),
        ..Default::default()
    };

    typesense::apis::collections_api::create_collection(&configuration, collection_schema).await?;
    println!("Collection created successfully!");

    Ok(())
}
