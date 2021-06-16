import { Injectable } from '@nestjs/common'

@Injectable()
export class CatService {
  public groupCat(data: Record<string, any>): Record<string, any> {
    return data.reduce((accum, current) => {
      const {
        species = 'unknown',
        name = 'unknown',
      } = current
      accum[species] ? accum[species].push({ name }) : accum[species] = [{ name }]
      return accum
    }, {})
  }
}
