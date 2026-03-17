# Project Manager
ProjectManager is a full-stack SaaS platform for freelance and small-team developers to manage software projects. Users can track clients, projects, tasks, time and invoices while also integrating with Git repositories to view commits, pull requests and development statuses. The platform is built with Next.js (frontend), Express.js (backend), Microsoft SQL Server (database) and can be containerized with Docker and orchestrated with Kubernetes for production-scale deployment.

## Page layout
### authentication
- /login
- /register
### dashboard
- /dashboard
- recent activity
    - active projects
    - assigned tasks
    - time tracking summary
### projects
- /projects
- /projects/:id
    - overview
    - tasks
    - members
    - repositories
    - deployments
    - docs
    - activity
    - invoices
### tasks
- tasks/:id
    - description
    - commits
    - time entries
    - comments
    - status updates
### clients
- /clients
- /clients/:id
### invoices
- /invoices
- /invoices/:id
### settings
- /settings
- /settings/integrations
- /settings/profile
