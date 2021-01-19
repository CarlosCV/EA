const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/english-advanced'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/english-advanced/index.html'));
});

app.listen(process.env.PORT || 8080);