import User from '../models/User.js'

export async function ensureAdminUser() {
  const email = (process.env.ADMIN_EMAIL || 'admin@vcolors.in').toLowerCase().trim()
  const password = process.env.ADMIN_PASSWORD || 'admin123'

  let user = await User.findOne({ email })

  if (!user) {
    user = new User({
      name: 'V Colors Admin',
      email,
      password,
      role: 'admin',
    })
    await user.save()
    console.log(`[admin] Created admin user: ${email}`)
    return user
  }

  if (process.env.ADMIN_PASSWORD) {
    const matches = await user.matchPassword(password)
    if (!matches) {
      user.password = password
      await user.save()
      console.log(`[admin] Synced admin password from environment`)
    }
  }

  return user
}
