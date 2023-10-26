# Install and development

- Run `npm i`
- Run `npm run dev`
  - This will start a development server which restarts every time the code is changed
  - Also it will build the sql files

# Task:

Create a trpc function called `transferMoney` which is exposed as OpenAPI endpoint `/banking/transferMoney` with method `POST`.
It will get 3 input parameters: sender_user_id, receiver_user_id, amount.

It's task is to move the given amount from the sender to the receiver. It should only be moved if the sender has enough money.

It should return the sender and receiver user as an array.

Match the style of the existing trpc functions.