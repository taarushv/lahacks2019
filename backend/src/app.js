

var twilio = require('twilio');
var accountSid = 'AC38b2996733126c1e924dfd6df84119ea'; // Your Account SID from www.twilio.com/console
var authToken = '1e1075f969dd8643e24e6f04f97c74d3';   // Your Auth Token from www.twilio.com/console
const htmlToText = require('html-to-text');

const {Translate} = require('@google-cloud/translate');
const projectId = 'lahacks-236114'
const translate = new Translate({
    projectId: projectId,
});
   
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('9TPXEV-8LQ3W7P6VH');
const wiki = require('wikijs').default;

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD4B3vCkjkk5SZU5GTJyQrgMlou_4ICXe4'
});

function chunkString(str, len) {
    var _size = Math.ceil(str.length/len),
        _ret  = new Array(_size),
        _offset
    ;
    for (var _i=0; _i<_size; _i++) {
      _offset = _i * len;
      _ret[_i] = str.substring(_offset, _offset + len);
    }
    return _ret;
}
const getWikiInfo = async (name) => {
    console.time('ok')
    const page = await wiki().page(name)
    const summary = chunkString(await page.summary(),1550)
    const fullInfo = chunkString(JSON.stringify((await page.fullInfo()).general), 1550)
    console.timeEnd('ok')
    return [summary, fullInfo]
}
const getDirections = async(res,obj) => {
    var ret = {}
    googleMapsClient.directions({
        origin:obj.start,
        destination:[obj.destination],
        optimize:true,
        mode:'walking'
    }, function(err, response) {
       if (!err) {
           ret.distance = response.json.routes[0].legs[0].distance
           ret.duration = response.json.routes[0].legs[0].duration
           ret.instructions = []
           //response.json.routes[0].legs[0].steps.map(v => ret.instructions.push(v.html_instructions))
           const twiml = new MessagingResponse();
           var final = `Distance: ${ret.distance.text}\nTime (via Walk): ${ret.duration.text}, \nDirections: `
           var crazy = ''
           response.json.routes[0].legs[0].steps.map(v => crazy +=  (v.html_instructions)+ ',')
           const text = htmlToText.fromString(crazy, {
            wordwrap: 130
          });
           console.log(final + text)
           twiml.message(final + text)
           console.log(twiml.toString())
           res.writeHead(200, { 'Content-Type': 'text/xml' });
           res.end(twiml.toString());
        
         //console.log(response.json.routes[0].legs);
       }
       console.log(err)
     });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
/*
client.messages.create({
    body:'jeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeezjeez',
    to: '+19256609395',  // Text this number
    from: '+16504698411' // From a valid Twilio number
})
*/

const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


app.post('/', async (req, res) => {
  const q = req.body.Body;
  if(q[0] == 0){
    console.log(q)
    const query = await waApi.getShort(q.slice(2))
    console.log(query)
    const twiml = new MessagingResponse();
    twiml.message(`0 ${query}`)
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } else if(q[0] == 1){
      console.log(q)
      const target = q.slice(2,4)
      const sentence = q.slice(5)
      const a = await translate.translate(sentence, target)
      const twiml = new MessagingResponse();
      twiml.message(`1 ${a[0]}`)
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
      console.log(a[0])
  } else if(q[0] == 2){
      const name = q.slice(2)
      const res1 = await getWikiInfo(name)
      const summary = res1[0]
      console.log(summary)
      //const fullInfo = res[1]
      for (var i=0;i<summary.length;i++){
          console.log(summary[i])
         
        client.messages
        .create({
        body:  summary[i],
        from: '+16504698411',
        to: '+19256609395'
        })
        .then(message => console.log(message));
        await sleep(200)
        
      }
  }else if(q[0] == 3){
      console.log('eh')
      var start = [q.split(',')[1],q.split(',')[2]]
      var destination = q.split(',')[3]
      getDirections(res,{start:start, destination:destination})
      /*
      
      */
  }
  
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

