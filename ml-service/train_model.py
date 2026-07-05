import pandas as pd
import joblib

from sklearn.ensemble import RandomForestRegressor
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

df = pd.read_csv("workflow_dataset.csv")

print("Dataset Loaded")
print(df.head())

X = df[
    [
        "taskType",
        "dependencyCount",
        "retryCount",
        "workflowSize",
        "previousDuration"
    ]
]

y = df["actualDuration"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

preprocessor = ColumnTransformer(
    transformers=[
        (
            "taskType",
            OneHotEncoder(),
            ["taskType"]
        )
    ],
    remainder="passthrough"
)

model = RandomForestRegressor(
    n_estimators=150,
    random_state=42
)

pipeline = Pipeline(
    [
        ("preprocessor", preprocessor),
        ("model", model)
    ]
)

print("\nTraining Model...\n")

pipeline.fit(X_train, y_train)

predictions = pipeline.predict(X_test)

mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("------------------------------------")
print(f"Mean Absolute Error : {mae:.2f}")
print(f"R² Score            : {r2:.4f}")
print("------------------------------------")

joblib.dump(
    pipeline,
    "workflow_model.pkl"
)

print("\nModel Saved Successfully.")