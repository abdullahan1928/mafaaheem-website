import Admin from "@/models/Admin";

export async function seedAdmin() {
  const adminEmail = 'abdullahan1928@gmail.com';
  const adminPassword = '192837456Ab@';

  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await Admin.create({ email: adminEmail, password: adminPassword });
    console.log('✅ Admin seeded successfully');
  } else {
    console.log('ℹ️ Admin already exists');
  }
}
