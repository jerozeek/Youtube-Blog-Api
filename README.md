# Youtube Blog api with Authentication

# Stacks
1. Nodejs
2. Typescript
3. MongoDB
4. Mongoose
5. Typegroose
6. Express
7. Cloudinary

# USE CLI WORKERS TO GENERATE CATEGORIES
1. Start Command: npm run worker
2. See Helps: help
3. Generate Random Categories: worker:generate category --count
4. Create a Category: worker:create category --name
5. Delete a Category: worker:delete category --id
6. Fetch all Categories: worker:get categories
7. Exit: exit or control-c


# Run on Development
1. Rename .envExample to .env
2. Goto src/app/constants/index.ts and add your api key and secret to start sending email
3. npm install
4. npm run dev
5. tsc --watch


# Run on Production
1. npm install
2. npm run build


# Run on Test
1. npm install
2. npm run test



TODO:
1. Jest unit testing.
2. Category CLI operations.


# NODE CLI
1. Generate categories: worker:category:generate
2. View List of Generated Categories: worker:category:list
3. Create a Custom Category: worker:category:create