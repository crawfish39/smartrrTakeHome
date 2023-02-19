# Senior Application Engineer (Typescript) Homework
- Build a TypeScript / React application to connect to Currency Converter API
- Write a function to pull USD / BRL currency conversion rates every hour
- Print last 24 hours to a React page
- Include tests
- Update the README with intructions on how to run your application
- Push all code up to be reviewed (GitHub/GitLab)

## Instructions
1. git clone this repo to your local machine.
2. run 'npm install' to install dependencies.
3. run 'npm start' to view the application.

## Testing
To run the test suite, complete No. 1 - 2 on the instructions above and then run 'npm start test'.

## Notes
The historical API resolves to 1 exchange rate per day so it is not possible to print the last 24 hours for each hour. Instead, I've embedded a form where the user can submit a number representing the most recent X number of days (up to 30 days) to they'd like to see the exchange rate for.

For the sake of time, I chose to go straight React and focus on feature deployment, but if you'd like, I can also retrofit the app with TS.