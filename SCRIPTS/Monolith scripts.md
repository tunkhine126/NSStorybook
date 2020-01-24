# Database Scripts and functions: 

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

-----------------------------------------

## Sample Script to find all donations under one community:

### find community_id
Community.find_by(slug: "totolapan-mexico")
Community id: 19

### find all donations under the community
donations = Donation.joins(:homes).where("homes.community_id = 19")

### map or pluck the ids if necessary
donation_ids = donations.pluck(:id)
donation_ids = donations.map { |d| d.id }

### map to print specific attributes
donations.map do |donation|
    [donation.id, donation.secure_id, donation.donor.name, donation.donor.email, donation.donation_total_in_dollars.to_f, donation.investment_total_in_dollars.to_f, donation.created_at, (donation.affiliate.name if donation.affiliate.present?), (donation.donatable.name if donation.donatable.present?), donation.donatable_type]
end

-----------------------------------------
## Update donation amounts

### set a variable and find specific donation with given id

donation = Donation.find(####)

### update donation_total_in_dollars 

donation.donation_total_in_dollars = ####

### update investment_total_in_dollars 

donation.investment_total_in_dollars = ####

### then SAVE! 

donation.save

-----------------------------------------
## Tips and tricks: 


copy and paste chunk of code into clean tab on text editor and do "Find & Replace All" for every record "], [" to have them in separate lines (this will help you copy and paste into a spreadsheet better).

-----------------------------------------

## Sample Script to find all investment total in dollars in a certain timeframe:

### find all donations in 2018
donations = Donation.where("donations.created_at BETWEEN '2019-01-01 00:00:00' AND '2019-12-31 23:59:59'").where("donations.investment_total_in_dollars > 0")

### pluck donation_ids
donation_ids = donations.pluck(:id)

### map ids to print specific attributes
donation_ids.map do |id|
  donation = Donation.find(id)
  [id, donation.secure_id, donation.user.name, donation.user.email, donation.investment_total_in_dollars.to_f, donation.created_at]
end

-----------------------------------------

## Sample script for donors that gave 6K+ in 2018:

### of people that gave 6K+:
donor_ids_by_amount = User.joins("LEFT JOIN donations ON users.id=donations.donor_id").where("donations.created_at BETWEEN '2018-01-01 00:00:00' AND '2018-12-31 23:59:59'").where("donations.donation_total_in_dollars >= 6000")

donor_ids = donor_ids_by_amount

donor_ids = donor_ids_by_amount.pluck(:id)

donation_ids = donations.pluck(:id)

donation_ids.map do |id|
  donation = Donation.find(id)
  [donation.secure_id, donation.donation_total_in_dollars.to_f, donation.investment_total_in_dollars.to_f, donation.created_at]
end