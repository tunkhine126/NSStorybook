# Update a donation date

### Find the donation with the secure_id

donation = Donation.find_by(secure_id: "don_58b869d630")

### Change the created_at date by creating a new instance of a DateTime object

donation.created_at = DateTime.new(2018,12,25,23,03,0)
=> Tue, 25 Dec 2018 23:03:00 +0000

### Save the change

donation.save