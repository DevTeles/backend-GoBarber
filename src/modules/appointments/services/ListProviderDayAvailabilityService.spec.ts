import FakeAppointmentsRepository from '../repositories/fakes/FakesAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppontmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeAppontmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppontmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppontmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppontmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
