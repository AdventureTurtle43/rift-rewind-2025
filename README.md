## Inspiration
In ranked League of Legends, you can’t control your teammates, but you can control your draft. Picking the right champion can make or break a match before it even starts. We built Pool Party to help players make **smarter draft decisions** by understanding their own strengths and weaknesses, giving them the best possible odds before the game even begins.

## What it does
Pool Party is an AI-powered **champion pool analyst**. It pulls your match history directly from the Riot API, analyzes your performance, like your win rates, comfort picks, and tough matchups, and sends that data to an AI agent trained on deep League of Legends draft knowledge.
The result: **personalized champion suggestions, counterpick insights, and blind pick recommendations** tailored to you. Whether you’re one-tricking a champion or expanding your pool, Pool Party helps you play smarter and climb faster.

## How we built it
Pool Party combines AI reasoning with structured gameplay data with AWS:

- **Riot API** – Provides match history and player performance data  
- **AWS Bedrock Knowledge Base** – Supplies contextual game knowledge (champion data, categories, counters, etc.)  
- 🤖 **Strands Agents** – Multiple AI agents collaborate to analyze data, evaluate patterns, and generate intelligent suggestions  
-  **AWS Infrastructure** – Amplify, Lambda functions, s3 buckets, and more.

## Challenges we ran into
- Teaching the AI **champion context** — classes, counterpicks, blind pick safety
- Overcoming **API rate limits** and efficiently normalizing large sets of match data  

## What we learned
We are both brand new to AWS and learned everything from IAM to Knowledge Bases. It was a really fun experience learning everything from scratch and deploying an AI Agent in the end.

## What's next for Pool Party
Draft analysis for your whole team! 
