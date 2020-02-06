## Script to find homes without familes

### Grab all homes ids
all_homes = Homes.all.pluck(:id)

### Map over the ids to extract specific information
all_homes.map do |id| 
  home = Home.find(id)
    if home.family
      [id, home.secure_id, home.family.name, home.community.name, home.community.country.name, home.donation_total_in_dollars.to_f, home.funded_on_dts]
    else
      [id, home.secure_id, nil, home.community.name, home.community.country.name, home.donation_total_in_dollars.to_f, home.funded_on_dts]
  end
end