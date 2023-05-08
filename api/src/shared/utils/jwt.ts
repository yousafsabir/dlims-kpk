import jwtLib from 'jsonwebtoken'
import Settings from '@/shared/config'
import { Token } from '@/shared/interfaces/jwtToken.interface'

export const generateToken = (id: string): string => {
  return jwtLib.sign({ id }, Settings.JWT_SECRET, {
    expiresIn: '7 days',
  })
}

export const verifyToken = (token: string): Token | null => {
  try {
    const payload = jwtLib.verify(token, Settings.JWT_SECRET)
    return payload as Token
  } catch (error) {
    console.log('Error in verifyToken')
    return null
  }
}

const jwt = { generateToken, verifyToken }

export default jwt
