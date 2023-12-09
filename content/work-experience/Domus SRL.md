---
date: '2020-01-01'
title: 'Full-stack Developer'
company: 'Domus SRL'
location: 'Cochabamba, Bolivia'
range: 'January 2020 - March 2021'
url: ''
---

- DomusFix, in its web iteration, provides registration and a secure payment gateway tailored for independent workers. This initiative is an integral component of a comprehensive system designed to streamline the process of discovering and engaging independent workers in Cochabamba, accomplished through a user-friendly mobile application. The oversight of independent workers, along with the intricacies of their subscriptions, is handled within the Admin DomusFix project.
- For all my contributions as a full-stack developer on Web DomusFix and Admin DomusFix that I will mention below, I want to comment that I develop the functionalities on both sides, frontend with React and backend with Spring Boot.
- Creating from scratch the Admin DomusFix project, which is an information system for managing independent workers of the DomusFix mobile app. This project handles subscription requests from independent workers for the mobile application, providing the required pages for this process. Additionally, the project includes a payment history feature and the option for workers to pay in cash if they are unable to use the online payment gateway. Furthermore, it incorporates a reporting section to assist administrators in making informed decisions based on subscription data.
- Creating from scratch the Web DomusFix project, with a sophisticated registration form and the integration of a secure payment gateway for independent workers reliability.
- Actively participating in coordination calls with the CEO and the developer of the DomusFix mobile app, ensuring strategic alignment and facilitating seamless integration of systems for consistent goal execution.
- I implemented the entire automated infrastructure for CI/CD, streamlining the code deployment to production upon merging into the master branch. For the backend, it executes build processes, preparing the application for proper packaging in Docker. The image is then registered in a private image repository and downloaded to AWS ECS for deployment. Regarding the frontend, it initiates build processes and uploads the application to an AWS S3 bucket for deployment. Both deployments pass through AWS CloudFront for global deployment, which, in turn, utilizes AWS Route 53 to use the *.domusfixbolivia.com domain.
