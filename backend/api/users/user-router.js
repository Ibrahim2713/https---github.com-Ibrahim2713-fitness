const router = require('express').Router()
const User = require('./user-model')
const md = require('../auth/auth-middleware')




router.get('/', md.restricted,  (req,res,next) => {
    const userId = req.decoded.subject
    
  User.getUserInfo(userId)
  .then(response => {
    res.json(response)
    console.log(response)
  })
  .catch(err =>{
    res.json(err.message)
  })
})



router.delete('/', md.restricted, (req, res,next) => {
    const userId = req.decoded.subject
   User.deleteUser(userId)
   .then((delUser) => {
    res.json({message: 'User is deleted'})
   })
   .catch((error) => {
    res.json({message: 'internal errors'})
   })
})

router.post('/weight', md.restricted, async (req,res,next) => {
                const userId = req.decoded.subject
            const { current_weight, goal_weight} =req.body
          
    try {
         await User.addUserWeight(userId, current_weight, goal_weight)
        res.status(200).json({ message: 'Weight added successfully' });
    }
    catch(error) {
        console.error('Error adding weight:', error.message);
        res.status(500).json({ error: 'Failed to add weight' });
    }
})

router.put('/weight', md.restricted,  async (req,res,next) =>{
   
    const user_id = req.decoded.subject
   console.log(user_id)
   try{ 
        const {current_weight, goal_weight} = req.body
        if (!current_weight || !goal_weight) {
            return res.status(400).json({ error: 'Missing required data' });
          }
          const weightData = {
                current_weight: current_weight,
                goal_weight:goal_weight
          }

        await User.updateUserWeight(user_id, weightData)

   }
   catch(error) {

    console.error('Error adding weight:', error.message);
    res.status(500).json({ error: 'Internal server error' });
   }
})

router.post('/food', md.restricted, (req,res,next) => {
  const userId = req.decoded.subject
  const { food_name, carbohydrates, protein, fats,calories,serving_size, serving_unit} =req.body
  try{
    const possible = User.logFood(userId, food_name, carbohydrates, protein, fats,calories,serving_size, serving_unit)
    res.status(201).json(possible)
  }
  catch(err){
    console.error('Error adding log:', error.message);
    res.status(500).json({ error: 'Failed to log' });
  }
})

router.get('/food', md.restricted, (req,res,next) => {
  const userId = req.decoded.subject
  User.getAllFoodLogs(userId)
  .then(response => {
    res.json(response)
  })
  .catch(err => {
    res.json(err.message)
  })
})

router.post('/exercise', md.restricted, (req,res,next) => {
  const userId = req.decoded.subject
  const {exercise_name, calories_burned,active_minutes} = req.body
  try {
      const possible = User.addExercise(userId, exercise_name, calories_burned, active_minutes)
      res.status(201).json(possible)
  }
  catch(err) {
    console.error('Error adding log:', error.message);
    res.status(500).json({ error: 'Failed to log' });
  }
})

router.get('/exercise', md.restricted, (req,res,next) => {
  const userId = req.decoded.subject
  User.getAllExerciseLogs(userId)
  .then(response => {
    res.json(response)
  })
  .catch(err => {
    res.json(err.message)
  })
})
























module.exports = router