const router = require('express').Router()
const axios = require('axios')



// query for food nututrition data
router.get('/food', async(req,res) => {
    const {foodName} = req.query
    if(!foodName) {
       return res.status(400).json({error: 'Food name is required'})
    }
    

    try {
       
        const appId = '74069e52'
        const appKey = '0ef8748c08df1aa2c52fec3989c275a9'

        const response = await axios.get(`https://trackapi.nutritionix.com/v2/search/instant/?query=${foodName}`, {
            headers: {
                'x-app-id' : appId,
                'x-app-key' : appKey
            }
        });

        if(response.status === 200) {
            const responseData = response.data
            res.json(responseData)
        } else {
            return res.status(response.status).json({error: 'Failed to fetch nutrition data'})
        }
      
      
    }
    catch(error) {
        res.status(500).json(error.message)
    }
})
// query for exercise information
router.post('/exercise', async(req,res) => {

    const {query} = req.body
   
    try {
        const appId = '74069e52'
        const appKey = '0ef8748c08df1aa2c52fec3989c275a9'

            const postData = {
                query: query
            }

        const response =  await axios.post('https://trackapi.nutritionix.com/v2/natural/exercise', postData, {
            headers: {
                'x-app-id' : appId,
                'x-app-key' : appKey
            },
        });
      
        if(response.status === 200){
            const responseData = response.data
            res.json(responseData)
        } else {
            return res.status(response.status).json({error: 'Error with posting exercise'})
        }
    }
    catch(error){
        res.status(500).json(error.message)
    }
})
























module.exports = router