import { Schema } from 'mongoose';

const refreshTokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  memberEmail: {
    type: String,
    required: true,
  },
  expiresIn: {
    type: Date,
    required: true,
  },
});

export { refreshTokenSchema };
