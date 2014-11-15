<img src="https://travis-ci.org/HIROSN/is-it-cold-enough-to-store-my-beer-outside.svg" alt="Travis CI Badge"></img>

## Is it cold enough to store my beer outside?
https://coldenoughtostorebeeroutside.herokuapp.com

```
client browser                              outside the domain
public/script.js

GET                   ==req==>              freegeoip.net
JSONP
https://freegeoip.net/json/

IP address            <==res==

client browser        server app            outside the domain
public/script.js      index.js

POST      ==req==>    GET        ==req==>   ip-api.com
JSON                  JSON
https:/api            http://ip-api.com/json/ip
data=ip
                      latitude   <==res==
                      longitude
                      ISP

                      GET        ==req==>   api.wunderground.com
                      JSON
                      http://api.wunderground.com/api/[api key]/conditions/q/...json
                      q=latitude,longitude

temp_f    <==res==    temp_f     <==res==
city                  city
state                 state
country               country
ISP
```
