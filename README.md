Run with `python3 -m http.server` then go to `localhost:8000`.

Add `db.csv` to `assets/data`.


### Compile

Code is written in Typescript. To compile the code, run `tsc` from the root folder.

 ### Run with docker

 ```
 docker run --name some-nginx -v /PATH/TO/PROJECT:/usr/share/nginx/html:ro -p8080:80 nginx
 ``` 