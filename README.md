# Senior Application Engineer (Typescript) Homework
- Build a TypeScript / React application to connect to Currency Converter API
- Write a function to pull USD / BRL currency conversion rates every hour
- Print last 24 hours to a React page
- Include tests
- Update the README with intructions on how to run your application
- Push all code up to be reviewed (GitHub/GitLab)

# Instructions
1. git clone this repo to your local machine.
2. run 'npm install' to install dependencies.
3. run 'npm start' to view the application.
4. To view tests, run 'npm start test'

## Notes
The historical API resolves to 1 exchange rate per day so it is not possible to print the last 24 hours for each hour. Instead, I've embedded a form where the user can submit a number representing the most recent X number of days to show the exchange rate.


add react testing framework
layer on typescript

set table update to 24 hrs
turn on API
empty state objects