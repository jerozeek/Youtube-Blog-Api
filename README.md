# Youtube Blog api with Authentication

# Stacks
1. Nodejs
2. Typescript
3. MongoDB
4. Mongoose
5. Typegroose
6. Express
7. Cloudinary

# Run on Development
1. Rename .envExample to .env
2. Set the app BASE_URL in .env
3. Goto src/app/constants/index.ts and add your api key and secret to start sending email
4. npm install
5. npm run dev
6. tsc --watch


# USE CLI WORKERS TO GENERATE CATEGORIES
1. Make sure the app is running
2. Start Command: npm run worker
3. See Helps: help
4. See Stats: stats
5. Create a Category: worker:create category --name
6. Fetch all Categories: worker:get categories
7. Exit: exit or control-c

# Run on Production
1. npm install
2. npm run build


# Run on Test
1. npm install
2. npm run test

TODO:
1. Jest unit testing.

# NODE CLI
1. Generate categories: worker:category:generate
2. View List of Generated Categories: worker:category:list
3. Create a Custom Category: worker:category:create