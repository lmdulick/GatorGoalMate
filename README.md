# GatorGoalMate

<img width="444" alt="image" src="https://github.com/lmdulick/GatorGoalMate/assets/116673406/13b53b2d-db9c-4c55-8337-8e8826a64157">

# Team Name: Ctrl + Alt + Elite
* Lauren Dulick - Project Manager

* Sophia Dadla - UX Designer

* Simar Khetpal - Scrum Master

* Roshan Ahmed - Quality Assurance Engineer

# Team Mission
Problem Statement: Many UF students struggle to stay accountable and motivated in achieving their academic, personal, and fitness goals each semester. Without a supportive community and effective tools to track progress, students often find themselves falling short of their aspirations.

Proposed Solution: GatorGoalMate, a social media website designed specifically for UF students to tackle these challenges head-on, provides a platform where students can set, track, and achieve their goals while fostering rich community involvement that uplifts and motivates peers to reach their full potential.

Stakeholders: UF Students

Unique Approach:
1. Tailored to UF Students 
2. Accountability through Social Engagement
3. Tangible Evidence to Track Progress
4. Dopamine-Rich Social Media Atmosphere

Presentation Link: https://youtu.be/Cqd6nSOu-go

# Architectural Design
<img width="763" alt="image" src="https://github.com/lmdulick/GatorGoalMate/assets/116673406/48c849c6-9d8a-4e0a-9ffc-72cee50f882b">

# Necessary Installations
- git
- npm / nodejs
```shell
npm i express
```
```shell
npm i nodemon -D
```
```shell
npm install react-scripts --save
```
```shell
npm install cors
```
```shell
npm install mongodb@4.1.0 --save
```
```shell
npm install multer --save
```
```shell
npm install react-router-dom
```

# Instructions to Clone and Edit the Project
To Clone the Repository:
```shell
git clone https://github.com/lmdulick/GatorGoalMate.git
```

When you open the project in VS Code, the bottom bar looks like this:
<img width="700" alt="image" src="https://github.com/lmdulick/GatorGoalMate/assets/116673406/f20afc30-cea6-4f9b-aeaa-ec0bd26d1c81">

When you click on 'MasterBranch,' you can change the current branch to your own branch (ex. origin/Lauren, origin/Sophia, origin/Simar, origin/Roshan)

This button will pull and push new commits from and to the current branch:
<img width="30" alt="image" src="https://github.com/lmdulick/GatorGoalMate/assets/116673406/96e57f92-7b2d-48e5-b028-56c410032991">

Additionally, you can manually push and pull to and from the repository with a comment in the System Command Prompt (cmd) using git with these commands:
```shell
git push origin <branch_name> -m "comment"
```
```shell
git pull origin <branch_name> -m "comment"
```
To add an entire folder:
```shell
git checkout <branch_name>
```
```shell
git add <folder_name>
```
```shell
git commit -m "comment"
```
```shell
git push
```
*Replace branch_name with the desired branch (ex. MasterBranch, Lauren, Sophia, Simar, Roshan)

# Frontend: 'client'

To run the client (Frontend):
```shell
cd client
```
```shell
npm start
```

# Backend: 'server'

To run the server (Backend):
```shell
cd server
```
```shell
npm run dev
```
