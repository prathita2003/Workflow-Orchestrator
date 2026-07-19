# Workflow Orchestrator

> **An enterprise-grade workflow orchestration platform built using Spring Boot, React, PostgreSQL, Apache Kafka, and Machine Learning for intelligent workflow execution and monitoring.**

---

## Overview

Workflow Orchestrator is a distributed workflow management platform designed to automate, execute, monitor, and optimize business workflows.

The application combines an event-driven backend with an interactive React frontend and integrates a Machine Learning service to estimate workflow execution time. It supports role-based access control, workflow lifecycle management, execution monitoring, audit logging, and real-time workflow analytics.

---

## Features

- JWT Authentication & Authorization
- Role-Based Access Control (Admin, Operator, Viewer)
- Workflow Creation, Editing and Cloning
- DAG-based Task Dependency Management
- Workflow Execution Engine
- Pause, Resume and Retry Workflow Execution
- Machine Learning based Workflow Duration Prediction
- Real-time Workflow Monitoring
- Kafka Event Streaming
- Interactive Dashboard
- Execution History
- Audit Logging
- User Management
- Search & Filtering
- Dockerized Architecture

---

## System Architecture

<img width="506" height="341" alt="1  Flow chart" src="https://github.com/user-attachments/assets/d11d92d1-6149-4946-8b2a-13212d773b01" />

---

## Technology Stack

| Category | Technologies |
|----------|--------------|
| Backend | Spring Boot, Spring Security, Spring Data JPA |
| Frontend | React, Material UI |
| Database | PostgreSQL |
| Authentication | JWT |
| Messaging | Apache Kafka |
| Machine Learning | Python, FastAPI, Scikit-Learn |
| Build Tools | Maven, Vite |
| Deployment | Docker, Render, Neon PostgreSQL |

---

# Application Screenshots

## 1. Login

Secure JWT-based authentication supporting role-based access.
<img width="640" height="340" alt="Login" src="https://github.com/user-attachments/assets/d735d2c8-db38-46c6-ad15-ec167e59c665" />

---

## 2. Dashboard

Displays workflow statistics, execution metrics, and recent activity.

<img width="640" height="340" alt="2  Dashboard" src="https://github.com/user-attachments/assets/495dfeaf-ffe7-4443-afbc-fb70e205fda8" />


---

## 3. Workflow Management

Manage workflows by creating, editing, cloning, and deleting workflows.

<img width="640" height="340" alt="4  Workflow List" src="https://github.com/user-attachments/assets/3bac6f7d-1076-4f73-ad01-b413ae216062" />

---

## 4. Workflow Designer

Configure workflow tasks and define task dependencies.

<img width="640" height="340" alt="5  create Workflow" src="https://github.com/user-attachments/assets/1145f6a6-5969-41c6-b4ed-4db4decdaec5" />

<img width="640" height="340" alt="5  create workflow 2" src="https://github.com/user-attachments/assets/7249b9fb-ac71-4146-a830-03af3cd593ea" />

---

## 5. Execution Monitor

Track workflow execution in real time with task status updates.

<img width="640" height="340![Uploading 5. create Workflow.png…]()
" alt="6  Execution Monitor" src="https://github.com/user-attachments/assets/b6fbbcdd-62d6-4450-bb84-dd6efde27dbb" />

---

## 6. Workflow Execution Details

Detailed view of workflow execution including task progress and metadata.

<img width="640" height="340" alt="6  Execution Monitor" src="https://github.com/user-attachments/assets/0cbf957c-7f9c-4462-a421-2567181cc231" />


---

## 7. Machine Learning Prediction

Predict workflow completion time before execution using the integrated ML service.

<img width="640" height="340" alt="8  ML Service" src="https://github.com/user-attachments/assets/a53274f8-07e3-4e8a-a3bf-b06367982305" />


---

## 8. Kafka Event Monitoring

Monitor workflow lifecycle events published through Apache Kafka.
<img width="640" height="340" alt="9  Kafka" src="https://github.com/user-attachments/assets/bea2ff78-8204-4a34-b8bf-e067a74b74d6" />


---

## 9. Audit Logs

Track user activities and important workflow operations.
<img width="640" height="340" alt="10  Audit Timeline" src="https://github.com/user-attachments/assets/c9cb6dc3-e2eb-40b7-aa5d-cef4d5e1d41e" />

---

## 10. User Management

Manage application users and their assigned roles.

<img width="640" height="340" alt="11  User Management" src="https://github.com/user-attachments/assets/b6b5fb86-c1a5-46ea-a814-c03d3e2908fa" />


---

## Machine Learning Module

The application integrates a Python FastAPI service that predicts workflow execution time using a trained machine learning model.

The prediction service analyzes workflow characteristics and estimates execution duration before the workflow is started.

---

## Security

- JWT Authentication
- BCrypt Password Encryption
- Stateless Authentication
- Role-Based Access Control
- Protected REST APIs
- CORS Configuration

---

## Project Structure

```text
Workflow-Orchestrator
│
├── workflow
│   ├── Spring Boot Backend
│   └── REST APIs
│
├── workflow-ui
│   └── React Frontend
│
├── ml-service
│   └── FastAPI Machine Learning Service
│
└── docker-compose.yml
```

---

## Deployment

The application is deployed using Render and Neon PostgreSQL.

| Component | Platform |
|-----------|----------|
| Frontend | Render Static Site |
| Backend | Render Web Service |
| Machine Learning Service | Render Web Service |
| Database | Neon PostgreSQL |

## Demo Credentials

You can explore the application using the following demo account:
**Link:** https://workflow-orchestrator-ct3q.onrender.com

**Username:** admin
**Password:** admin123

Register a new account using the profiles page on Admin Profile.
> Note: This project uses JWT-based authentication. The demo account has administrative privileges to showcase all features.

### Deployment Note
This project follows a microservices architecture with the backend and ML prediction service deployed independently on Render's free tier. Due to Render's automatic sleep policy for inactive services, the ML service may require a brief warm-up after periods of inactivity.

If the prediction feature is unavailable on the first attempt, please visit the ML service URL once, wait 20–30 seconds, and then retry the prediction.

- Frontend: https://workflow-orchestrator-ct3q.onrender.com
- Backend: https://workflow-backend-h5ew.onrender.com
- ML Service: https://workflow-orchestrator-3aaw.onrender.com


---

## Future Improvements

- Kubernetes deployment
- Workflow scheduling
- Email and Slack notifications
- Distributed tracing
- Prometheus & Grafana monitoring
- Multi-tenant workflow management
- Workflow versioning

---

## Author

**Prathita Kumar Madhusudhana**

Bachelor of Technology (Mechanical Engineering)  
Minor in Computer Science & Engineering  
PES University, Bengaluru
Mechanical Engineer and Java Full Stack Developer
