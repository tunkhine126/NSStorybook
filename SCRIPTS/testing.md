## Working script to get unique donors and their total donations dollars in a particular year 

donor_ids_by_amount = User.joins("LEFT JOIN donations ON users.id=donations.donor_id").where("donations.donor_id IS NOT NULL AND donations.reference_id IS NOT NULL AND donations.refund_reference_id IS NULL AND donations.created_at BETWEEN '2019-01-01 00:00:00' AND '2019-12-31 23:59:59'").having("SUM(donations.donation_total_in_dollars) > 0").having("SUM(donations.investment_total_in_dollars) > 0").group("users.id").pluck(:id).uniq

donor_ids = donor_ids_by_amount

donor_ids.map do |id|
user = User.find(id)
[id, user.name, user.email, user.donations.where("created_at BETWEEN '2019-01-01 00:00:00' and '2019-12-31 23:59:59'").pluck(:donation_total_in_dollars).sum.to_f, user.donations.where("created_at BETWEEN '2019-01-01 00:00:00' and '2019-12-31 23:59:59'").pluck(:investment_total_in_dollars).sum] 
end 

## testing 
