#!/bin/bash

# Nicholas Fox
# 9/10/22

# shell hacks Schonfeld problem
# This script takes 11 arguments. The first 10 are an enum with each value repersenting a type of security ID.
# The order of the values dictate the priority of the search with the left most value being the highest priority.
# The 11th argument is the the search query.
#
# USAGE ./search.sh 1 2 3 4 5 6 7 8 9 "SEARCH_TERM"
#
# Creates a text file named result with the search results. The results are the index of the security ID. The type is
# specified above.

echo '' > tmp.txt
db=(./db/*)

for num in {1..10}
do
	x=${db[${!num}]}
	y=${x%.csv}
	y=${y##*/}
	echo "######"
	echo ${y:5} >> tmp.txt
  grep -P -n "(?<=^|\n)[a-zA-Z0-9:;=_+#$&\(\(\^\-\.\ ]*${11}[a-zA-Z0-9:;=_+#$&\(\(\^\-\.\ ]*(?=$|\n)" ${db[${!num}]} >> tmp.txt |  uniq
	echo >> tmp.txt
done

grep  -P "(\n|^)[0-9]{1,9}:\K${11}(?=$|\n)" tmp.txt > tmp1.txt
if [ $? -eq 0 ]
then
	mv tmp1.txt result.csv
else
	mv tmp.txt result.csv
fi

exit 0
