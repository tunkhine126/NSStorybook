# Move family from one community to another 

### Find family by name

family = Family.find_by(name: "Xindy Oneida Saravia Govhez")

### Change secure_id, slug, and intake_community_id

family.secure_id = xxx

family.slug = xxx

family.intake_community_id = x 
#### note that changing the community_id will also change the family's community association 

#### Check to see if the family has a home associated with them as well. You'll need to ensure that the allocated home is in the correct community. 

family.home will either return NIL or a home_id 