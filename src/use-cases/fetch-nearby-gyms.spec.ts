import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

const LATITUDE_DEFAULT = -16.6970487
const LONGITUDE_DEFAULT = -49.2452539

const LATITUDE_FAR = -16.9655114
const LONGITUDE_FAR = -49.2328913

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: LATITUDE_DEFAULT,
      longitude: LONGITUDE_DEFAULT,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: LATITUDE_FAR,
      longitude: LONGITUDE_FAR,
    })

    const { gyms } = await sut.execute({
      userLatitude: LATITUDE_DEFAULT,
      userLongitude: LONGITUDE_DEFAULT,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
