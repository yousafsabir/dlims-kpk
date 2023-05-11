import { LicenseI } from '@/shared/interfaces/License.interface'

export interface LicenseFormI extends Omit<LicenseI, 'image' | 'id'> {
  image: File | string | null
}
