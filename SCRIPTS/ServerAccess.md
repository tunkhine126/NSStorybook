## Access rails console on production 

#### monolith: 

$ heroku run bundle exec rails c --remote production

#### monolith remotes:

--remote production

--remote staging

#### hit:      

$ heroku run rails c --app hit-server-production

#### hit remotes:

--app hit-server-production

--app hit-server-dev

## pull from production database to local dev environment (use case: copy prod database locally to test something specific)

### monolith:

$ heroku pg:pull DATABASE_URL campaign-collections_development --remote production

### hit-server:

$ heroku pg:pull DATABASE_URL newstory-api_development --app hit-server-production

## interactive rebase in a branch

$ git rebase -i HEAD~3 (the number is the number of commits you want to go )

## interactive staging session that lets you choose portions of a file to add to the next commit (use y to stage, n to ignore)

$ git add -p 