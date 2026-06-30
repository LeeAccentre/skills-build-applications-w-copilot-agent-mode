import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
    location: { type: String, required: true }
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    city: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });
const leaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    streak: { type: Number, default: 0 }
}, { timestamps: true });
const workoutSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    focusArea: { type: String, required: true },
    equipment: { type: String, default: 'bodyweight' }
}, { timestamps: true });
export const User = models.User || model('User', userSchema);
export const Team = models.Team || model('Team', teamSchema);
export const Activity = models.Activity || model('Activity', activitySchema);
export const LeaderboardEntry = models.LeaderboardEntry || model('LeaderboardEntry', leaderboardSchema);
export const Workout = models.Workout || model('Workout', workoutSchema);
