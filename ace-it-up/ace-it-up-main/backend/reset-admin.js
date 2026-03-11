const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: 'd:/ace it up 2/ace-it-up/ace-it-up-main/backend/.env' });

async function reset() {
  await mongoose.connect(process.env.MONGODB_URI);
  const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    passwordHash: String,
    fullName: String,
    role: String
  }));

  const emails = ['chainiiiiii06@gmail.com', 'sureshmmaneri@gmail.com'];
  const newHash = await bcrypt.hash('admin123', 10);

  for (const email of emails) {
    await User.updateOne(
      { email },
      { $set: { passwordHash: newHash, role: 'admin' } },
      { upsert: true }
    );
    console.log(`✅ Password reset for ${email} to 'admin123'`);
  }
  process.exit(0);
}

reset();
