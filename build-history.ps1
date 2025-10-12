# ===============================
# 🧠 BrainX402 – Git Commit History Builder
# Simulate daily commits (10–25/day) for the last 4 weeks
# ===============================

# Go to your project directory
Set-Location "C:\Users\Naquib\Downloads\MistralPay\BrainX"

# Ensure Git user is configured
git config user.name "ReactorX402"
git config user.email "reactorx402@example.com"

# Number of days (past 28 days)
$days = 28
$branch = "main"

# Optional: create a temp file for edits
if (!(Test-Path ".\dummy.txt")) {
    New-Item -ItemType File -Path ".\dummy.txt" -Value "BrainX402 Development Log`n"
}

# Start the commit simulation
for ($i = $days; $i -ge 0; $i--) {
    # Calculate the date (i days ago)
    $date = (Get-Date).AddDays(-$i)

    # Generate random commit count (10–25)
    $commitCount = Get-Random -Minimum 10 -Maximum 25

    Write-Host "`n📅 Day: $($date.ToShortDateString()) – $commitCount commits"

    for ($c = 1; $c -le $commitCount; $c++) {
        # Simulate a file update (dummy or any .md / .ts / .py file)
        Add-Content ".\dummy.txt" "Update log at $(Get-Date -Format "HH:mm:ss") on $($date.ToShortDateString()) `n"

        # Stage the changes
        git add .

        # Create a random commit message
        $messages = @(
            "Refactor BrainX module",
            "Optimize X402 core logic",
            "Improve AI protocol sync",
            "Update agent registry structure",
            "Fix Solana contract event hook",
            "Tweak reward calculation model",
            "Update README visuals",
            "Add performance metrics",
            "Adjust SDK bindings",
            "Enhance cross-chain compatibility"
        )
        $msg = $messages | Get-Random

        # Commit with custom backdated date
        git commit --date "$($date.ToString("yyyy-MM-ddTHH:mm:ss"))" -m "$msg"
    }
}

# Finally push all commits
git push origin $branch
Write-Host "`n✅ Simulated 4 weeks of commit history successfully pushed!"
