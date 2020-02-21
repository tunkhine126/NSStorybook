# Find the community first 
community = Community.find_by(name:"Totolapan")

# Map through all donations
community.donations.map do |d|
  [d.id, d.secure_id, d.user.name, d.user.email, (d.donation_total_in_dollars if d.donation_total_in_dollars.present?).to_f, (d.investment_total_in_dollars if d.investment_total_in_dollars.present?).to_f, (d.homes.map { |h| (h.id) }), (d.donatable_type if d.donatable.present?), (d.donatable.name if d.donatable.present?)]
end
