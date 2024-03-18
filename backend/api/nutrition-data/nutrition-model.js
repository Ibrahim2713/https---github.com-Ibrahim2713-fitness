const db = require('../../database/db-config')



// User Log DB functions
//User activity logging
async function logFoodConsumption(userId, foodId, servingSize, consumedAt) {
    try {
        const UserFoodLog = await db('user_foods').insert({
            user_id: userId,
            food_id: foodId,
            serving_size: servingSize,
            consumed_at: consumedAt
        })
        return UserFoodLog
    }
    catch(error) {
        console.error('Error logging food')
        throw error
    }
}
// Logging Exercise Performed
async function logExercisePerformed(userId, exerciseID, duration, performed_at) {
    try {
        const exerciseLog = await db('user_exercises').insert({
            user_id: userId,
            user_exercises_id: exerciseID,
            duration_mintues: duration,
            performed_at: performed_at
        })
        return exerciseLog
    }
    catch(error) {
        console.error('Error logging your exercise',error)
        throw error
    }
    
}

// View a user food history
async function getUserFoodHistory(userId){
    try {
        const foodHistory = await db('user_foods')
        .select('*')
        .leftJoin('foods', 'user_foods.user_foods_id', 'foods.foods_id')
        .where('user_foods.user_id', userId)
        
        return foodHistory
    }
    catch(error) {
        console.error('Error fetching your user',error)
        throw error
    }

}
// View a user exercise history
async function getUserExerciseHistory(userId) {
    try {
        const exerciseHistory = await db('user_exercises')
        .where('user_exercises_id', userId)
        .orderBy('performed_at', 'desc')
        return exerciseHistory
    }
    catch(error) {
        console.error('Error fetching your user',error)
        throw error
    }

}

// delete user food log
async function deleteUserFoodLog(userFoodLogId ) {
    try {
        await db('user_foods')
        .where({user_foods_id: userFoodLogId })
        .del()
    } 
    catch(error) {
console.error('Trouble finding your food log', error)
        throw error
    }
}
// delete  user exercise log
async function deleteUserExerciseLog( userExerciseLogId) {
    try {
        await db('user_exercises')
        .where({ user_exercises_id: userExerciseLogId })
        .del()
    } 
    catch(error) {
console.error('Trouble finding your exercise log', error)
        throw error
    }
}

async function updateUserExerciseLog(userId, updatedData) {
    try {
        const updatedUser = await db('user_exercises')
        .where({user_exercises_id: userId })
        .update(updatedData)
        return updatedUser
    }
    catch(error) {
        console.error('trouble updating exercise log')
        throw error
    }
}

async function updateUserFoodLog(userId,updatedData) {
    try {
        const updatedUser = await db('user_foods')
        .where({user_foods_id: userId })
        .update(updatedData)
        return updatedUser
    }
    catch(error) {
        console.error('trouble upating food log')
        throw error
    }
}






module.exports = {
    logFoodConsumption,
    logExercisePerformed,
    getUserExerciseHistory,
    getUserFoodHistory,
    deleteUserFoodLog,
    deleteUserExerciseLog,
    updateUserExerciseLog,
    updateUserFoodLog
}