# Allocated donations towards homes under a Collection

### Search by collection 
collection = Collection.find_by(slug: "pacific-sothebys")
 - Collection id: 22

or using the "friendly" gem

collection = Collection.friendly.find("pacific-sothebys")

### Under Collection is the method 'allocated_donations'

allocated_donations = collection.allocated_donations

### Pluck the donation ids from the above variable

allocated_donation_ids = allocated_donations.pluck(:id)

### Map over the plucked ids to extract particular information

allocated_donation_ids.map do |id|
  donation = Donation.find(id)
  [donation.id, donation.secure_id, donation.user.name, donation.user.email, donation.donation_total_in_dollars.to_f, donation.investment_total_in_dollars.to_f, donation.created_at.strftime("%D"), donation.donatable_type, donation.donatable.name, donation.fully_allocated_at, donation.homes.map { |h| h.family.secure_id if h.family.present?}.join(",")]
end