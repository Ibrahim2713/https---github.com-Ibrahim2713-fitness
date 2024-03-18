const db = require('../../database/db-config')

module.exports = {
addUser,
findBy,
getUserInfo,
updateUser,
deleteUser,
addUserWeight,
updateUserWeight,
getUserWeight,
logFood,
getAllFoodLogs,
addExercise,
getAllExerciseLogs
}

async function getUserWeight(user_id) {
   try {
      const userWeight = await db('weights').where('user_id',user_id).select('*')
      return userWeight
   }
   catch(error) {
      console.error('error getting user data', error)
   }

}
async function addUserWeight(user_id, current_weight = 150 , goal_weight = 150) {
   try {
       await db('weights').insert({
               user_id: user_id,
               current_weight: current_weight,
               goal_weight: goal_weight
      })
      console.log(`Weight added for user ${user_id}`)
   }
   catch(err) {
      console.error('Error inserting weight:', err.message)
   }
}

async function updateUserWeight(user_id, updatedData){
   try {
      await db('weights').where({user_id: user_id}).update(updatedData)
      console.log('user info is updated')
   }
   catch(error) {
         console.log('error updating', error)
   }
}

 async function addUser(user) {
    const [id] = await db('users').insert(user)
    return id
}
async function findBy(filter){
   return db('users').where(filter)

}

async function getUserInfo(user_id) {
  try { const userInfo = await db('users')
  .where('users.user_id', user_id)
   .join('weights', 'users.user_id', 'weights.weight_id')
   .select('users.user_id','username', 'first_name', 'last_name', 'current_weight', 'goal_weight', )
   return userInfo
}
catch(error) {
   console.error('error getting user data', error)
}
}

async  function updateUser(userId, updatedData) {
   try {
     const updatedUser = await db('users')
          .where({ user_id: userId })
          .update(updatedData);
      return updatedUser; 
  } catch (error) {
      console.error('Error updating user:', error);
      throw error;
  }
}

async function deleteUser(userId) {
   try {
       const deletedUser = await db('users')
      .where('user_id',userId )
      .del()
      return deletedUser
   }
   catch(err){
      console.error('Error deleting user', err);
   }
}

async function logFood(user_id, food_name, carbohydrates, protein, fats,calories,serving_size, serving_unit) {
      try {
         await db('food_log').insert({
            user_id: user_id,
            food_name: food_name,
            carbohydrates: carbohydrates,
            protein: protein,
            fats: fats,
            calories: calories,
            serving_size: serving_size,
            serving_unit: serving_unit,
         })
         console.log('food is logged')
      }
      catch(err){
         console.error('Error inserting food:', err.message)
      }
}

async function getAllFoodLogs(user_id) {
   try {
      const foodLogs = await db('food_log').where('user_id', user_id)
      return foodLogs
   }
   catch(err){
      console.error('Error fetching food logs:', err.message);
      return [];
   }
}
async function addExercise(user_id, exercise_name, calories_burned, active_minutes) {
   try {
      await db('exercise_log').insert({
         user_id: user_id,
         exercise_name: exercise_name,
         calories_burned: calories_burned,
         active_minutes: active_minutes
      })
   console.log('exercise added')
   }
   catch(err) {
      console.log('error inserting exercises', err.message)
   }
}

async function getAllExerciseLogs(user_id) {
   try {
      const exerciseLogs = await db('exercise_log').where('user_id', user_id)
      return exerciseLogs
   }
   catch(err){
      console.error('Error fetching food logs:', err.message);
      return [];
   }
}


