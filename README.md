# [WIP] Custom REST API
### WITH CRUD FUNCTIONALITY

I have made this custom API with NodeJS, TypeScript, Express, Mongo (Atlas) and Prisma.

This will be a demo API with working functionality. This is deployed on Render, it has limited compute hours so please do not abuse this external API URL.

## Getting Started
If you would like to play with the code, please feel free to clone this repo and do with it to your hearts content. 

Start by running either `yarn install` or `npm install`(or any other package manager you may use).

To run the server, please use `yarn dev` or `npm run dev`.

## Important
I am using environment variables to protect my Mongo database. To use this please create a `.env` file in the project root and add the following:

`DATABASE_URL`: Your database URL. If you use anything other than Mongo, please also update the `prisma.schema` file to match.
`PORT`: Your port of choice. I typically use 1337.
