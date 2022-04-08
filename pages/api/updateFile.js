var fs = require('fs');

export default function handler(req, res) {
			
                fs.writeFile('allRounds.json', JSON.stringify(req.body.updateRounds, null, 2), (err) => {
                    if (err) throw err;
                    res.status(200).json("File Written success");
                });
  
}
