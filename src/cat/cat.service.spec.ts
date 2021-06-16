import { Test, TestingModule } from '@nestjs/testing'
import { CatService } from './cat.service'

describe('CatService', () => {
  let service: CatService

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatService],
    }).compile()

    service = module.get<CatService>(CatService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should separate species', () => {
    const data = [
      {
        name: 'zome',
        species: 'mawzome',
      },
      {
        name: 'kunkun',
        species: 'mawslid',
      },
      {
        name: 'hlong',
        species: 'mawslid',
      },
    ]

    const expectData = {
      mawzome: [
        {
          name: 'zome',
        },
      ],
      mawslid: [
        {
          name: 'kunkun',
        },
        {
          name: 'hlong',
        },
      ],
    }
    const actual = service.groupCat(data)
    expect(actual).toMatchObject(expectData)
  })

  it('should same species ', () => {
    const data = [
      {
        name: 'zome',
        species: 'mawslid',
      },
      {
        name: 'kunkun',
        species: 'mawslid',
      },
      {
        name: 'hlong',
        species: 'mawslid',
      },
    ]

    const expectData = {
      mawslid: [
        {
          name: 'zome',
        },
        {
          name: 'kunkun',
        },
        {
          name: 'hlong',
        },
      ],
    }
    const actual = service.groupCat(data)
    expect(actual).toMatchObject(expectData)
  })

  it('should species unknown ', () => {
    const data = [
      {
        name: 'zome',
      },
      {
        name: 'kunkun',
        species: 'mawslid',
      },
      {
        name: 'hlong',
        species: 'mawslid',
      },
    ]

    const expectData = {
      unknown: [
        { name: 'zome' },
      ],
      mawslid: [
        { name: 'kunkun' },
        { name: 'hlong' },
      ],
    }
    const actual = service.groupCat(data)
    expect(actual).toMatchObject(expectData)
  })

  it('should species unknown', () => {
    const data = [
      {
        species: 'mawzome',
      },
      {
        name: 'kunkun',
        species: 'mawslid',
      },
      {
        name: 'hlong',
        species: 'mawslid',
      },
    ]

    const expectData = {
      mawzome: [
        { name: 'unknown' },
      ],
      mawslid: [
        { name: 'kunkun' },
        { name: 'hlong' },
      ],
    }
    const actual = service.groupCat(data)
    expect(actual).toMatchObject(expectData)
  })

  it('should species unknown and name unknown', () => {
    const data = [
      {},
      {
        name: 'kunkun',
        species: 'mawslid',
      },
      {
        name: 'hlong',
        species: 'mawslid',
      },
    ]

    const expectData = {
      unknown: [
        { name: 'unknown' },
      ],
      mawslid: [
        { name: 'kunkun' },
        { name: 'hlong' },
      ],
    }
    const actual = service.groupCat(data)
    expect(actual).toMatchObject(expectData)
  })
})
