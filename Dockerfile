FROM mongo

COPY ./collections/restaurants.json /init.json
CMD mongoimport --host mongodb --db Restaurants --collection Data --type json --file /init.json --jsonArray