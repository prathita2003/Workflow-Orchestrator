import random
import pandas as pd

TASK_TYPES = [
    "REST",
    "DATABASE",
    "EMAIL",
    "FILE",
    "COMPUTE"
]

rows = []

for _ in range(10000):
    task_type = random.choice(TASK_TYPES)
    dependency_count = random.randint(0, 5)
    retry_count = random.randint(0, 3)
    workflow_size = random.randint(3, 20)
    previous_duration = round(random.uniform(1.0, 30.0), 2)

    duration = previous_duration
    duration += dependency_count * 1.5
    duration += retry_count * 2.0
    duration += workflow_size * 0.3

    if task_type == "DATABASE":
        duration += 5
    elif task_type == "REST":
        duration += 2
    elif task_type == "COMPUTE":
        duration += 8

    duration += random.uniform(-2, 2)

    rows.append([
        task_type,
        dependency_count,
        retry_count,
        workflow_size,
        previous_duration,
        round(duration, 2)
    ])

df = pd.DataFrame(
    rows,
    columns=[
        "taskType",
        "dependencyCount",
        "retryCount",
        "workflowSize",
        "previousDuration",
        "actualDuration"
    ]
)

df.to_csv("workflow_dataset.csv", index=False)

print(df.head())
print()
print(f"Generated {len(df)} workflow executions.")