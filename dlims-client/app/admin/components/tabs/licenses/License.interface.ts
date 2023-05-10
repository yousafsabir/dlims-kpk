import { LicenseI } from '@/shared/interfaces/License.interface'

export interface LicenseFormI extends Omit<LicenseI, "image"> {
    image: File | null;
}
