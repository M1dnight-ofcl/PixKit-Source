echo 'backup has begun...'

chmod a=rwx "/serverside/"

date=date +%b-%d-%Y
echo "$date"

search_dir=("/serverside" "/static" "/templates")
mkdir -p /serverside/backup/$date
backup /serverside/backup/$date

for dir in "$search_dir"
do
  echo "$dir"
  for file in "$dir"
  do
    echo "$entry"
    cp -i "$dir/$file" "$backup"
  done
done