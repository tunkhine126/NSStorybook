# Batch script to remove donations from a specific home or homes from a specific donation

#  1. You'll need to group the donation secure_id's and home_id's into an array. 

# Example below has multiple donations on a single home. 

array = [
	{ donation_id: 'don_a17f347bc1', home_id: '1190' },
	{ donation_id: 'don_38680493b0', home_id: '1190' },
	{ donation_id: 'don_4f2f772266', home_id: '1190' },
	{ donation_id: 'don_e887da2a80', home_id: '1190' },
]

# 2. You'll need to run the below script to ensure that the the allocations exist.

array.each do |a|
  donation = Donation.find_by(secure_id: a[:donation_id])
  home     = Home.find_by(id: a[:home_id])
  allocation = AllocatedDonation.find_by(
    donation_id: donation.id,
    home_id:     home.try(:id),
  )
  if allocation
    puts "Successfully found allocation: #{allocation.id}"
    puts "Community: #{home.community.name}"
  else
    puts "ERROR: Could not find allocation #{a.inspect}"
  end

end

# If there are no errors (check the trace for them), run the below to remove the allocations away from the home.

array.each do |a|
  donation = Donation.find_by(secure_id: a[:donation_id])
  home     = Home.find_by(id: a[:home_id])
  allocation = AllocatedDonation.find_by(
    donation_id: donation.id,
    home_id:     home.try(:id),
  )
  if allocation && allocation.destroy
    puts "Successfully destroyed allocation: #{allocation.id}"
    puts "Updating donation fully_allocated_at..."
    if donation.update(fully_allocated_at: nil)
      puts "Donation #{donation.id} marked as not fully allocated"
    else
      puts "ERROR: Could not mark donation as not fully allocated: #{donation.inspect}"
    end
    if home.update(funded_on_dts: nil)
      puts "Home #{home.id} marked as not fully funded"
    else
      puts "ERROR: Could not mark home as not fully funded: #{home.inspect}"
    end
  else
    puts "ERROR: Could not find allocation #{a.inspect}"
  end
end