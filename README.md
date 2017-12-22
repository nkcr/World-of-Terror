## Installation

### Set up database

Move `dist/db.csv` (from the root folder) to `assets/data`. 

*Note*: The provided database has been reduced due to its size. It contains only 10'000 records, taken uniformly from the original database.

### Add compiled typescript files

Delete folder `src` and move `dist/src` to the root folder.

## Run application

### Run with docker (option 1)

```
docker run --name some-nginx -v /PATH/TO/PROJECT:/usr/share/nginx/html:ro -p8000:80 nginx
``` 

...then go to *localhost:8000* 

### Run with python (option 2)

```
python3 -m http.server
```

...then fo to *localhost:8000*

### Run with any webserver (option 3)

You can use any webserver to serve the website. Use the root project folder as the webserver root.

## In case you want to compile

Code is written in Typescript `2.6.2`. To compile the code, run `tsc` from the root folder.