# All donations under a Collection

### Search by collection 
collection = Collection.find_by(slug: "pacific-sothebys")
 - Collection id: 22

or using the "friendly" gem

collection = Collection.friendly.find("pacific-sothebys")

### Under Collection is the method 'all_donations' 

donations = collection.all_donations

### Pluck the donation ids from the above variable

all_donation_ids = donations.pluck(:id)

### Map over the plucked ids to extract particular information

all_donation_ids.map do |id|
    donation = Donation.find(id)
    [donation.id, donation.secure_id, donation.user.name, donation.user.email, donation.donation_total_in_dollars.to_f, donation.investment_total_in_dollars.to_f, donation.created_at.strftime("%D"), donation.fully_allocated_at, donation.homes.map { |h| h.family.secure_id if h.family.present?}.join(","), donation.homes.map { |h| h.id if h.present?}.join(","), donation.homes.map { |h| h.community.name if h.community.present?}.join(",")]
end