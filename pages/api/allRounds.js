var fs = require('fs');

export default function handler(req, res) {
			console.log(__dirname);
            fs.readFile('allRounds.json', (err, data) => {
                if (err) throw err;              
                let allRounds = JSON.parse(data);
				res.status(200).json(allRounds);          

            });
  
}
