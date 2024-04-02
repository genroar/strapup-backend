
const conditions = Object.freeze({
	"New": "New (Unworn)",
	"Used New": "Used (Like New)",
	"Used": "Used (Signs of Use)"
})

const caseSize = Object.freeze({
	"28mm": "28mm",
	"31mm": "31mm",
	"33mm": "33mm",
	"36mm": "36mm",
	"40mm": "40mm",
	"41mm": "41mm",
	"42mm": "42mm",
	"43mm": "43mm",
	"44mm": "44mm",
	"45mm": "45mm",
	"46mm": "46mm",
})

const caseMaterial = Object.freeze({
	"steel": "Steel",
	"yg" : "Yellow Gold",
	"wg" : "White Gold",
	"rg" : "Rose Gold",
	"tt" : "Two Tone",
	"titanium" : "Titanium",
	"carbon" : "Carbon",
	"platinum" : "Platinum",
})

const OriginalBoxPapers = Object.freeze({
	"bp": "Box & Papers",
	"bo" : "Box Only",
	"po" : "Papers Only",
	"nbp" : "No Box and Papers"
})

const PriceType = Object.freeze({
	"pricetype": "PriceType",
})


const Currency = Object.freeze({
	"AED": "AED",
	"USD": "USD"
})


const getAllFlags = (req, res) => {
    const flagsDirectory = path.join(__dirname, '../../svg/'); // Adjust the path as per your project structure
    
    fs.readdir(flagsDirectory, (err, files) => {
        if (err) {
            console.error('Error reading flags directory:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');

        const flagsData = svgFiles.map(file => ({
            country: path.basename(file, '.svg'), // Extract country code from filename
            flagUrl: `/flags/${path.basename(file)}` // URL to access the flag
        }));

        res.json(flagsData);
    });
};




module.exports = {conditions, caseSize, caseMaterial, OriginalBoxPapers, PriceType, Currency, getAllFlags};
