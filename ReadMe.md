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

<img width="768" height="512" alt="image" src="https://github.com/user-attachments/assets/dafe5c4c-dd20-43a5-8cc7-20dcb2aac8a3" />


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

**[INSERT IMAGE 2 HERE — Login Page]**

---

## 2. Dashboard

Displays workflow statistics, execution metrics, and recent activity.

**[INSERT IMAGE 3 HERE — Dashboard]**

---

## 3. Workflow Management

Manage workflows by creating, editing, cloning, and deleting workflows.

**[INSERT IMAGE 4 HERE — Workflow List]**

---

## 4. Workflow Designer

Configure workflow tasks and define task dependencies.

**[INSERT IMAGE 5 HERE — Workflow Details / DAG View]**

---

## 5. Execution Monitor

Track workflow execution in real time with task status updates.

**[INSERT IMAGE 6 HERE — Execution Monitor]**

---

## 6. Workflow Execution Details

Detailed view of workflow execution including task progress and metadata.

**[INSERT IMAGE 7 HERE — Execution Details]**

---

## 7. Machine Learning Prediction

Predict workflow completion time before execution using the integrated ML service.

**[INSERT IMAGE 8 HERE — ML Prediction]**

---

## 8. Kafka Event Monitoring

Monitor workflow lifecycle events published through Apache Kafka.

**[INSERT IMAGE 9 HERE — Kafka Monitor]**

---

## 9. Audit Logs

Track user activities and important workflow operations.

**[INSERT IMAGE 10 HERE — Audit Logs]**

---

## 10. User Management

Manage application users and their assigned roles.

**[INSERT IMAGE 11 HERE — User Management]**

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
