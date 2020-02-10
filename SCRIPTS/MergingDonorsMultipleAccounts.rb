# Merging a donors multiple accounts

# - In monolith dashboard, find the all the users accounts 
# - Make note of each donor_id which is the user id
#  - Specifically note the id of the account you'd like to keep
# - Also note of the donations associated with each account

# Find each donation 

donation = Donation.find_by(slug: "don_52e1945017")

# => #<Donation id: 93397, donor_id: 2372, donation_total_in_dollars: 0.25e2, investment_total_in_dollars: nil, transaction_fee_in_dollars: 0.0, is_anonymous: false, comment: nil, reference_id: "ch_1Fv1zsH2CyW63mpnplGH0bIh", donatable_id: nil, secure_id: "don_52e1945017".....

# Change each donation's donor_id (Remember that the donor id is a user id)

donation.donor_id = xxxx 

# Save the change and double check the via the monolith dashboard (Specfically the change is reflected in the User's donation page)

donation.save 

# Once you've moved all the donations into the single source of truth account you can move to delete the duplicate accounts. 

user = User.find(xxxx)

# make sure you check that donations are no longer associated before you delete

user.delete 

# You may run into an issue where the user id is associated with an Activity. If that is the case, find the Activities associated with the user id. Then change them to match the correct user id.

