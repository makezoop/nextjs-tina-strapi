## Prerequisite

The quickest way to start implementation the CMS is to use pm2. The pm2 will start all corresponding processes for development

- strapi in development mode
- web-cms in development mode

Dependencies need to be installed by yourselves. To do that, visit all sub directories and `yarn`

## Install pm2

Simply using `npm install -g pm2`
After that, we can use `pm2 start ecosystem.yaml`

More detail of what get started can always be found in the `ecosystem.yaml`

## Start without pm2

### Start strapi server

- Visit tina-strapi-server
- Use `yarn develop` to get started
- Visit localhost:1337/admin to access admin screen

### Start web development

- Visit tina-web-cms
- Use `yarn dev` to get started
