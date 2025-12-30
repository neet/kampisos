mod commands;
mod models;

use clap::{Parser, Subcommand};
use tokio;

#[derive(Parser)]
#[command(version, about, long_about=None)]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    Init {},
    Sync {},
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cli = Cli::parse();

    match cli.command {
        Some(Commands::Init {}) => commands::kampisos_init().await,
        Some(Commands::Sync {}) => commands::kampisos_sync().await,
        None => Ok(()),
    }
}
