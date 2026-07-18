Workflow Orchestrator

An enterprise-grade workflow orchestration platform built using Spring Boot, React, PostgreSQL, Apache Kafka, and Machine Learning for intelligent workflow execution and monitoring.

Overview

Workflow Orchestrator is a distributed workflow management platform designed to automate, execute, monitor, and optimize business workflows.

The application combines an event-driven backend with an interactive React frontend and integrates a machine learning service to estimate workflow execution time. It supports role-based access control, workflow lifecycle management, real-time monitoring, and detailed execution analytics.

Features
JWT Authentication & Authorization
Role-Based Access Control (Admin, Operator, Viewer)
Workflow Creation and Editing
DAG-based Task Dependencies
Workflow Execution Engine
Pause, Resume and Retry Execution
Real-time Workflow Monitoring
Kafka Event Streaming
Machine Learning Execution Time Prediction
Interactive Dashboard
Execution History
Audit Logs
User Management
Search & Filtering
Dockerized Deployment
System Architecture
                React Frontend
                       │
                       ▼
              Spring Boot Backend
          ┌────────────┼────────────┐
          ▼            ▼            ▼
   PostgreSQL      Kafka       ML Service

[INSERT IMAGE 1 HERE — System Architecture Diagram]

(Create a clean architecture diagram with draw.io or Excalidraw. This should be the first image after the architecture section.)

Technology Stack
Category	Technologies
Backend	Spring Boot, Spring Security, Spring Data JPA
Frontend	React, Material UI
Database	PostgreSQL
Authentication	JWT
Messaging	Apache Kafka
Machine Learning	Python, FastAPI, Scikit-Learn
Build Tools	Maven, Vite
Deployment	Docker, Render, Neon PostgreSQL
Application Screenshots
1. Login

Short description:

Secure JWT-based authentication supporting role-based access.

[INSERT IMAGE 2 HERE — Login Screen]

2. Dashboard

Displays workflow statistics, execution metrics and recent activity.

[INSERT IMAGE 3 HERE — Dashboard]

3. Workflow Management

Create, edit, clone and manage workflows with dependency visualization.

[INSERT IMAGE 4 HERE — Workflow List]

4. Workflow Designer

Create workflow tasks and define dependencies.

[INSERT IMAGE 5 HERE — Workflow Details / DAG]

5. Execution Monitoring

Monitor workflow execution in real time with task statuses.

[INSERT IMAGE 6 HERE — Execution Monitor]

6. Workflow Execution Details

Displays execution timeline, task information and execution metadata.

[INSERT IMAGE 7 HERE — Execution Details]

7. Machine Learning Prediction

Predicts workflow completion time before execution.

[INSERT IMAGE 8 HERE — ML Prediction Panel]

8. Kafka Event Monitoring

Shows workflow lifecycle events received through Kafka.

[INSERT IMAGE 9 HERE — Kafka Monitor]

9. Audit Logs

Tracks system-wide user activities and workflow actions.

[INSERT IMAGE 10 HERE — Audit Logs]

10. User Management

Administrative interface for managing users and roles.

[INSERT IMAGE 11 HERE — User Management]

Machine Learning Module

The application integrates a Python FastAPI service that predicts workflow execution time using a trained machine learning model.

Prediction inputs include workflow characteristics, and the predicted execution time is displayed before execution begins.

Security
JWT Authentication
Password Encryption using BCrypt
Stateless Authentication
Role-Based Access Control
Protected REST APIs
CORS Configuration
Project Structure
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
Deployment

The application has been deployed using Render and Neon PostgreSQL.

Component	Platform
Frontend	Render Static Site
Backend	Render Web Service
Machine Learning	Render Web Service
Database	Neon PostgreSQL
Future Improvements
Kubernetes deployment
Workflow scheduling using Quartz
Distributed tracing with OpenTelemetry
Email and Slack notifications
Multi-tenant workflow management
Workflow versioning
Prometheus & Grafana monitoring
Author

Prathita Kumar Madhusudhana

Bachelor of Technology (Mechanical Engineering)
Minor in Computer Science & Engineering
PES University, Bengaluru

Images to Capture

Capture these in 1920×1080 if possible, with the browser in full screen.

Image No.	Screenshot
1	System Architecture Diagram (draw.io)
2	Login page
3	Dashboard after login
4	Workflow list page
5	Workflow Details / DAG visualization
6	Execution Monitor (running workflow)
7	Execution Details page
8	ML Prediction panel showing estimated completion time
9	Kafka Monitor with events
10	Audit Logs
11	User Management page
