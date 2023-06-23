echo "Logging in"

curl --insecure -v -d "@login.json" POST -H "Content-Type:application/json" http://mike.cit270.com


# curl -v -d "@login.json" POST -H "Content-Type:application/json" https://dev.stedi.me/login
# curl -v https://dev.stedi.me/validate/651982fb-97c5-47d8-97de-bf8032ceee1c