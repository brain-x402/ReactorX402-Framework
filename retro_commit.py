import os
import subprocess
import random
import datetime

repo_path = r"C:\Users\Naquib\Downloads\MistralPay\BrainX"
os.chdir(repo_path)

start_date = datetime.date.today() - datetime.timedelta(days=120)  # 4 months ago
end_date = datetime.date.today()

current_date = start_date

while current_date <= end_date:
    # Random chance of making commits that day
    if random.random() < 0.85:  # 85% of days will have commits
        num_commits = random.randint(1, 5)  # 1–5 commits that day
        for i in range(num_commits):
            filename = f"activity_{current_date.strftime('%Y%m%d')}_{i}.txt"
            with open(filename, "a") as f:
                f.write(f"Simulated commit on {current_date} — update #{i}\n")

            subprocess.run(["git", "add", filename])
            commit_msg = f"Update work logs for {current_date} (#{i})"

            # set GIT author and committer date for this commit
            commit_date = current_date.strftime("%Y-%m-%dT12:%M:%S")
            env = os.environ.copy()
            env["GIT_AUTHOR_DATE"] = commit_date
            env["GIT_COMMITTER_DATE"] = commit_date

            subprocess.run(["git", "commit", "-m", commit_msg], env=env)
    current_date += datetime.timedelta(days=1)

subprocess.run(["git", "push"])
