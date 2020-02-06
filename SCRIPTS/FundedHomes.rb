# Funded homes under a Collection

### Search by collection 
collection = Collection.find_by(slug: "pacific-sothebys")
 - Collection id: 22

or using the "friendly" gem

collection = Collection.friendly.find("pacific-sothebys")

### Under Collection is the method 'funded_homes'

funded_homes = collection.funded_homes

### Pluck the home_ids from the above variable

home_ids = funded_homes.pluck(:id)

### Map over the plucked ids to extract particular info

home_ids.map do |id|
  home = Home.find(id)
  [home.id, home.secure_id, (home.family.name if home.family.present?), (home.community.name if home.community.present?), home.funded_on_dts.strftime("%D")]
end