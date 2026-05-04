#!/bin/bash
# Setup Copilot Chat Prompts
# This script symlinks custom prompts from the repo to VS Code user prompts folder

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
REPO_PROMPTS="$REPO_ROOT/.vscode/prompts"
USER_PROMPTS="$HOME/.config/Code/User/prompts"

# Create user prompts directory if it doesn't exist
mkdir -p "$USER_PROMPTS"

# Create symlinks for each prompt file
for prompt_file in "$REPO_PROMPTS"/*.md; do
    if [ -f "$prompt_file" ]; then
        filename=$(basename "$prompt_file")
        target_path="$USER_PROMPTS/$filename"
        
        # Remove existing symlink/file if it exists
        rm -f "$target_path"
        
        # Create symlink
        ln -s "$prompt_file" "$target_path"
        echo "✓ Linked: $filename"
    fi
done

echo "✓ Copilot Chat prompts setup complete!"
echo "  Prompts are now available with / in Copilot Chat"
