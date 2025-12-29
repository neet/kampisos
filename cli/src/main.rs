mod commands;
mod models;

use clap::{Parser, Subcommand};
use tokio;

#[derive(Parser)]
#[command(version, about, long_about=None)]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,

    #[arg(long)]
    typesense_url: String,

    #[arg(long)]
    typesense_api_key: String,
}

#[derive(Subcommand)]
enum Commands {
    Init {},
    Sync {
        #[arg(long)]
        git_path: String,
    },
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cli = Cli::parse();

    match cli.command {
        Some(Commands::Init {}) => {
            commands::kampisos_init(&cli.typesense_url, &cli.typesense_api_key).await
        }
        Some(Commands::Sync { git_path }) => {
            commands::kampisos_sync(&cli.typesense_url, &cli.typesense_api_key, &git_path).await
        }
        None => Ok(()),
    }
}
