# Setup Copilot Chat Prompts
# This script symlinks custom prompts from the repo to VS Code user prompts folder

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoPrompts = Join-Path -Path (Join-Path -Path $repoRoot -ChildPath ".vscode") -ChildPath "prompts"
$userPrompts = Join-Path -Path (Join-Path -Path (Join-Path -Path $env:APPDATA -ChildPath "Code") -ChildPath "User") -ChildPath "prompts"

# Create user prompts directory if it doesn't exist
if (-not (Test-Path $userPrompts)) {
    New-Item -ItemType Directory -Path $userPrompts -Force | Out-Null
    Write-Host "Created user prompts folder: $userPrompts"
}

# Create symlinks for each prompt file
Get-ChildItem $repoPrompts -Filter "*.md" | ForEach-Object {
    $targetPath = Join-Path $userPrompts $_.Name
    
    # Remove existing symlink/file if it exists
    if (Test-Path $targetPath) {
        Remove-Item $targetPath -Force
    }
    
    # Create symlink
    New-Item -ItemType SymbolicLink -Path $targetPath -Target $_.FullName -Force | Out-Null
    Write-Host "Linked: $($_.Name)"
}

Write-Host "Copilot Chat prompts setup complete!"
Write-Host "Prompts are now available with / in Copilot Chat"
