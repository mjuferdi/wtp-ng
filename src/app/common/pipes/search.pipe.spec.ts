import { SearchRentalPipe } from './search.pipe';

describe('SearchRentalPipe', () => {
  let pipe: SearchRentalPipe;

  beforeEach(() => {
    pipe = new SearchRentalPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe("Searchpipe should", function () {

    it('filter cities', () => {
      let rentals = [];

      rentals.push({ id: 1, title: "cool", city: "Berlin", category: "room" });
      rentals.push({ id: 1, title: "cool", city: "Berlin", category: "flat" });
      rentals.push({ id: 1, title: "clean", city: "Hamburg", category: "flat" });
      rentals.push({ id: 1, title: "cheap", city: "Hamburg", category: "flat" });

      let filtered = pipe.transform(rentals, "Berlin");

      expect(filtered.length).toBe(2);
    });

  });
});
