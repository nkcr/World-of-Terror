LANG=  
LC_COLLATE="C"  
LC_CTYPE="C"  
LC_MESSAGES="C"  
LC_MONETARY="C"  
LC_NUMERIC="C"  
LC_TIME="C"  
LC_ALL=  

jot -r "$(wc -l db-without-first-line.csv)" 1 | paste - db-without-first-line.csv | sort -n | cut -f 2- | head -n 10000 > db-sub-10000.csv

